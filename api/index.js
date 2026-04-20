const fs = require("fs/promises");
const path = require("path");

const PRIVATE_TITLE = "BLUE WORKS";
const PRIVATE_DESCRIPTION = "Private workspace";
const ROBOTS_DIRECTIVE = "noindex, nofollow, noarchive, nosnippet, noimageindex";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildMetaTags(requestUrl) {
  return `
  <title>${escapeHtml(PRIVATE_TITLE)}</title>
  <meta name="description" content="${escapeHtml(PRIVATE_DESCRIPTION)}">
  <meta name="robots" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta name="googlebot" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta name="bingbot" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(requestUrl)}">
  <meta property="og:title" content="${escapeHtml(PRIVATE_TITLE)}">
  <meta property="og:description" content="${escapeHtml(PRIVATE_DESCRIPTION)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(PRIVATE_TITLE)}">
  <meta name="twitter:description" content="${escapeHtml(PRIVATE_DESCRIPTION)}">
  `;
}

module.exports = async (req, res) => {
  try {
    const htmlPath = path.join(process.cwd(), "index.html");
    let html = await fs.readFile(htmlPath, "utf8");

    const requestUrl = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}${req.url || "/"}`;
    const titleMatch = html.match(/<title>[\s\S]*?<\/title>/i);
    const descriptionMatch = html.match(/<meta\s+name="description"[\s\S]*?>/i);
    const robotsMatch = html.match(/<meta\s+name="robots"[\s\S]*?>/i);
    const ogTagsMatch = html.match(/<meta\s+property="og:[^>]+>[\s\S]*?(?=<link|<\/head>)/i);
    const twitterTagsMatch = html.match(/<meta\s+name="twitter:[^>]+>[\s\S]*?(?=<link|<\/head>)/i);
    const injectedMeta = buildMetaTags(requestUrl);

    if (titleMatch) html = html.replace(titleMatch[0], "");
    if (descriptionMatch) html = html.replace(descriptionMatch[0], "");
    if (robotsMatch) html = html.replace(robotsMatch[0], "");
    if (ogTagsMatch) html = html.replace(ogTagsMatch[0], "");
    if (twitterTagsMatch) html = html.replace(twitterTagsMatch[0], "");

    html = html.replace("</head>", `${injectedMeta}\n</head>`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    res.setHeader("X-Robots-Tag", ROBOTS_DIRECTIVE);
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Failed to render page.");
  }
};
