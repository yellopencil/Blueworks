const fs = require("fs/promises");
const path = require("path");
const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");

const MAX_HTML_LENGTH = 900000;
const ALLOWED_IMAGE_HOSTS = new Set(["cdn.imweb.me"]);
const ALLOWED_FONT_HOSTS = new Set(["cdn.jsdelivr.net"]);
const DEFAULT_CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body);
  } catch (error) {
    return {};
  }
}

function stripUnsafeHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/<link[\s\S]*?>/gi, "")
    .replace(/<meta[\s\S]*?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(?:src|href)\s*=\s*(['"])\s*javascript:[\s\S]*?\1/gi, "");
}

function buildPdfHtml(pagesHtml, quoteCss) {
  const safePagesHtml = stripUnsafeHtml(pagesHtml);
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @font-face {
      font-family: "Pretendard";
      font-weight: 400;
      font-display: swap;
      src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2") format("woff2");
    }
    @font-face {
      font-family: "Pretendard";
      font-weight: 700;
      font-display: swap;
      src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2") format("woff2");
    }
    @font-face {
      font-family: "Pretendard";
      font-weight: 800;
      font-display: swap;
      src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-ExtraBold.woff2") format("woff2");
    }
    ${quoteCss}
    @page {
      size: A4;
      margin: 0;
    }
    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    #pdfTemplateRoot {
      position: static !important;
      left: auto !important;
      top: auto !important;
      width: 794px !important;
      margin: 0 !important;
      pointer-events: auto !important;
    }
    .qa-pdf-page {
      page-break-after: always;
      break-after: page;
      box-shadow: none !important;
    }
    .qa-pdf-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
  </style>
</head>
<body>
  <div id="pdfTemplateRoot">${safePagesHtml}</div>
</body>
</html>`;
}

async function createBrowser() {
  const chromiumPackUrl = process.env.CHROMIUM_PACK_URL || DEFAULT_CHROMIUM_PACK_URL;
  const executablePath = process.env.CHROMIUM_EXECUTABLE_PATH || (await chromium.executablePath(chromiumPackUrl));
  const viewport = {
    width: 794,
    height: 1123,
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  };

  return puppeteer.launch({
    args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    defaultViewport: viewport,
    executablePath,
    headless: "shell",
    ignoreHTTPSErrors: true,
  });
}

function shouldExposeDebugError(req) {
  try {
    const url = new URL(req.url || "", `https://${req.headers.host || "blueworks.local"}`);
    return url.searchParams.get("debug") === "1";
  } catch (error) {
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
    return;
  }

  let browser = null;
  try {
    const body = parseBody(req);
    const pagesHtml = String(body.pagesHtml || "");
    if (!pagesHtml || pagesHtml.length > MAX_HTML_LENGTH) {
      res.status(400).json({ error: "PDF HTML payload is empty or too large." });
      return;
    }

    const quoteCss = await fs.readFile(path.join(process.cwd(), "quote-generator.css"), "utf8");
    const html = buildPdfHtml(pagesHtml, quoteCss);
    browser = await createBrowser();
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      const resourceType = request.resourceType();
      if (url === "about:blank" || url.startsWith("data:")) {
        request.continue();
        return;
      }
      try {
        const { hostname, protocol } = new URL(url);
        if (protocol === "https:" && resourceType === "image" && ALLOWED_IMAGE_HOSTS.has(hostname)) {
          request.continue();
          return;
        }
        if (protocol === "https:" && resourceType === "font" && ALLOWED_FONT_HOSTS.has(hostname)) {
          request.continue();
          return;
        }
      } catch (error) {
        // Fall through to abort.
      }
      request.abort();
    });

    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => (document.fonts ? document.fonts.ready.then(() => true) : true));
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=\"blueworks-quote.pdf\"");
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Quote PDF generation failed:", error);
    const payload = { error: "PDF generation failed." };
    if (shouldExposeDebugError(req)) {
      payload.detail = error?.message || String(error);
      payload.stack = error?.stack || "";
    }
    res.status(500).json(payload);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
};

module.exports.config = {
  maxDuration: 60,
};
