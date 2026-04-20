const fs = require("fs/promises");
const path = require("path");

const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
const SITE_ASSET_BUCKET = "site-assets";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
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

async function fetchSiteSettings() {
  if (!SUPABASE_SERVICE_ROLE_KEY) return null;
  const url = `${SUPABASE_URL}/rest/v1/site_settings?select=title,description,thumbnail_path,favicon_path,meta_tags,block_crawling&order=updated_at.desc&limit=1`;
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Supabase site_settings fetch failed: ${response.status}`);
  }
  const rows = await response.json();
  return rows?.[0] || null;
}

function resolveSiteAssetUrl(pathValue = "") {
  if (!pathValue) return "";
  if (/^(https?:|data:)/i.test(pathValue)) return pathValue;
  return `${SUPABASE_URL}/storage/v1/object/public/${SITE_ASSET_BUCKET}/${pathValue}`;
}

function buildMetaTags(requestUrl, settings = null) {
  const title = settings?.title || PRIVATE_TITLE;
  const description = settings?.description || PRIVATE_DESCRIPTION;
  const image = resolveSiteAssetUrl(settings?.thumbnail_path || "");
  const favicon = resolveSiteAssetUrl(settings?.favicon_path || "");
  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta name="googlebot" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta name="bingbot" content="${escapeHtml(ROBOTS_DIRECTIVE)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(requestUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  ${image ? `<meta property="og:image" content="${escapeHtml(image)}">` : ""}
  <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}">` : ""}
  ${favicon ? `<link rel="icon" href="${escapeHtml(favicon)}">` : ""}
  `;
}

module.exports = async (req, res) => {
  try {
    const htmlPath = path.join(process.cwd(), "index.html");
    let html = await fs.readFile(htmlPath, "utf8");
    let settings = null;

    try {
      settings = await fetchSiteSettings();
    } catch (error) {
      settings = null;
    }

    const requestUrl = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}${req.url || "/"}`;
    const titleMatch = html.match(/<title>[\s\S]*?<\/title>/i);
    const descriptionMatch = html.match(/<meta\s+name="description"[\s\S]*?>/i);
    const robotsMatch = html.match(/<meta\s+name="robots"[\s\S]*?>/i);
    const ogTagsMatch = html.match(/<meta\s+property="og:[^>]+>[\s\S]*?(?=<link|<\/head>)/i);
    const twitterTagsMatch = html.match(/<meta\s+name="twitter:[^>]+>[\s\S]*?(?=<link|<\/head>)/i);
    const faviconMatch = html.match(/<link\s+rel="icon"[\s\S]*?>/i);
    const injectedMeta = buildMetaTags(requestUrl, settings);

    if (titleMatch) html = html.replace(titleMatch[0], "");
    if (descriptionMatch) html = html.replace(descriptionMatch[0], "");
    if (robotsMatch) html = html.replace(robotsMatch[0], "");
    if (ogTagsMatch) html = html.replace(ogTagsMatch[0], "");
    if (twitterTagsMatch) html = html.replace(twitterTagsMatch[0], "");
    if (faviconMatch) html = html.replace(faviconMatch[0], "");

    html = html.replace("</head>", `${injectedMeta}\n</head>`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    res.setHeader("X-Robots-Tag", ROBOTS_DIRECTIVE);
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Failed to render page.");
  }
};
