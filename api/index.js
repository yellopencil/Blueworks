const fs = require("fs/promises");
const path = require("path");

const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zJqlCjId8XiTq6W05l_JSA_8VHISJ3-";
const SITE_ASSET_BUCKET = "site-assets";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function fetchSiteSettings() {
  const url = `${SUPABASE_URL}/rest/v1/site_settings?select=title,description,thumbnail_path,favicon_path,meta_tags,block_crawling&order=updated_at.desc&limit=1`;
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase site_settings fetch failed: ${response.status}`);
  }

  const rows = await response.json();
  return rows?.[0] || null;
}

function buildMetaTags(settings, requestUrl) {
  const title = settings?.title || "옐로펜슬 업무 관리 데모";
  const description = settings?.description || "옐로펜슬 업무 관리 데모";
  const image = settings?.thumbnail_path
    ? (/^(https?:|data:)/i.test(settings.thumbnail_path)
      ? settings.thumbnail_path
      : `${SUPABASE_URL}/storage/v1/object/public/${SITE_ASSET_BUCKET}/${settings.thumbnail_path}`)
    : "";
  const robots = settings?.block_crawling ? "noindex,nofollow" : "index,follow";

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:url" content="${escapeHtml(requestUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  ${image ? `<meta property="og:image" content="${escapeHtml(image)}">` : ""}
  <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}">` : ""}
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
    const injectedMeta = buildMetaTags(settings, requestUrl);

    if (titleMatch) html = html.replace(titleMatch[0], "");
    if (descriptionMatch) html = html.replace(descriptionMatch[0], "");
    if (robotsMatch) html = html.replace(robotsMatch[0], "");
    if (ogTagsMatch) html = html.replace(ogTagsMatch[0], "");
    if (twitterTagsMatch) html = html.replace(twitterTagsMatch[0], "");

    html = html.replace("</head>", `${injectedMeta}\n</head>`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Failed to render page.");
  }
};
