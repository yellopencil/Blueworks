(function () {
  const doc = document;
  const root = doc.getElementById("quoteApp");
  if (!root) return;

  const TERMS_TEMPLATE = `[??議? 怨꾩빟??- ?뱀궗?댄듃 怨꾩빟?쒕뒗 ?쒖옉 ?붿껌?ш? ?뱀궗?댄듃 ?쒖옉 ?쒕퉬?ㅻ? ?댁슜?섎뒗 ?좎쭨, 湲곌컙, 湲덉븸 ?깆쓣 ?뺤빟?섎뒗 怨꾩빟?쒖엯?덈떎.
- ?쒖옉 ?붿껌?щ뒗 ?쎄??숈쓽???댁슜???숈??섏뿬 怨꾩빟??寃곗젙?섏??쇰ŉ ?쒓났?섎뒗 ?쒕퉬?ㅺ? ?곷떞 ?댁슜??諛섑븯吏 ?딅뒗 ??蹂??쎄??숈쓽?쒖쓽 ?댁슜??以?⑺빀?덈떎.

[??議? ?뺣낫 ?쒓났 ?숈쓽
- ?쒖옉?щ뒗 ?먰솢???ъ씠???쒖옉???꾪빐 ?쒖옉 ?붿껌?ъ쓽 ?뺣낫瑜??붽뎄?????덉쑝硫??쒖옉 ?붿껌?щ뒗 ?뺣낫 ?쒓났???숈쓽?⑸땲??
- ?쒖옉?щ뒗 ?쒓났諛쏆? ?쒖옉 ?붿껌?ъ쓽 ?뺣낫瑜??뱀궗?댄듃 ?쒖옉, 怨꾩빟 ?댁쇅??紐⑹쟻?쇰줈 ?ъ슜?섏? ?딆뒿?덈떎.

[??議? ?쒖옉 ?댁슜
- ?뱀궗?댄듃 ?쒖옉 ?붾（?섏? ?꾩엫?뱀쓣 ?댁슜?⑸땲??
- 300留뚯썝 ?댄븯 寃곗젣嫄댁? 100% ?좎엯湲덉씠硫??낃툑???ㅼ쓬?좊????먮즺 以鍮?諛??묒뾽???쒖옉?⑸땲??
- 1李??쒖옉(PC踰꾩쟾) ?꾨즺?쇱? 怨꾩빟?쒖뿉 湲곗옱??湲고븳?濡?吏꾪뻾?⑸땲??
- PC 踰꾩쟾 寃???꾨즺 ??紐⑤컮??理쒖쟻???묒뾽???쒖옉?섎ŉ ?곸뾽??湲곗? 理쒕? 5???대궡 ?꾨즺?⑸땲??
- ?꾨찓??諛??꾩엫???몄뒪?? SSL 蹂댁븞?몄쬆??鍮꾩슜? 蹂꾨룄?낅땲??

[??議? ?쒓났
- 怨꾩빟?쒖뿉 湲곗옱??湲덉븸? 留욎땄 ?붿옄?? ?뱀궗?댄듃 ?쒖옉, 紐⑤컮??理쒖쟻?? SEO 理쒖쟻?? 諛섏쓳?? A/S瑜??ы븿??湲덉븸?낅땲??
- ?묒뾽臾쇱쓽 ?ъ슜沅뚭낵 ?뚯쑀沅뚯? 100% ?쒖옉 ?붿껌?ъ뿉 ?덉쑝硫? ??묎텒? ?쒖옉?ъ뿉 ?덉뒿?덈떎.

[??議? ?먮즺 ?쒓났
- ?뱀궗?댄듃 ?쒖옉???꾩슂??濡쒓퀬, ?댁슜, ?ъ쭊, ?곸긽 ?깆? ??묎텒踰뺤뿉 ?닿툔?섏? ?딅뒗 ?먮즺濡?蹂대궡二쇱뀛???⑸땲??
- ?대?吏 以鍮꾧? ?대젮?곗떎 寃쎌슦 ?곸뾽???ъ슜??媛?ν븳 ?ㅽ넚 ?대?吏瑜?理쒕? 10???쒓났?⑸땲??
- ?묒뾽???꾩슂???먮즺??寃곗젣 ??7???대궡 ?꾨떖?댁＜?붿빞 ?⑸땲??

[??議? ?섏젙
- PC 1李??쒖옉 ?꾨즺 ??寃??諛??섏젙 ?붿껌??媛?ν빀?덈떎.
- ?섏젙 ?잛닔??怨꾩빟?쒖뿉 湲곗옱???잛닔 ?댁뿉??媛?ν븯硫??щ윭 ?붿껌????踰덉뿉 臾띠뼱 ?꾨떖?댁＜?쒕㈃ 1?뚮줈 泥섎━?⑸땲??
- ?묒뾽臾쇱쓽 50% ?댁긽 ?섏젙 ?붿껌 ???쒖옉?щ뒗 ?섏젙 嫄곕? ?먮뒗 異붽? 鍮꾩슜??泥?뎄?????덉뒿?덈떎.

[??議? ?????먮ℓ
- ?먯씠?꾩떆 諛???됱궗媛 ???먯쓽 ?쒖옉????됲븷 ???덉쑝??李⑥씡 痍⑤뱷???곕Ⅸ 臾몄젣???쒖옉?ъ뿉??梨낆엫吏吏 ?딆뒿?덈떎.
- ?묒뾽臾쇱쓽 ?붿옄????묎텒? ?쒖옉?ъ뿉 洹?띾맗?덈떎.

[??議? ?ы썑 愿由?- ?쒖옉 ?꾨즺 ???덊럹?댁? 愿由ъ뿉 ???梨낆엫? ?쒖옉 ?붿껌?ъ뿉 ?덉뒿?덈떎.

[??議? 痍⑥냼 諛??섎텋
- ?쒖옉?ъ쓽 洹梨???100% ?섎텋?⑸땲??
- ?쒖옉 ?붿껌?щ뒗 ?밸퀎???ъ쑀 ?놁씠 ?쒖옉 以묐룄 痍⑥냼 諛??섎텋??遺덇??⑸땲??
- 寃곗젣 ???먮즺 以鍮?湲곌컙 以묒씠?쇰룄 ?ъ쟾 ?묒뾽?됱뿉 ?곕씪 遺遺??섎텋留?媛?ν빀?덈떎.

[??0議? 怨꾩빟???좏슚
- ?먮줈?쒖뒳??紐⑤뱺 ?곹뭹 怨꾩빟? 蹂??쎄????숈쓽 ??寃곗젣媛 ?꾨즺?섎㈃ 怨꾩빟???깆궗?⑸땲??`;

  const DEFAULT_ROWS = [
    { name: "援ъ텞 諛??밸뵒?먯씤", desc: "硫붿씤?섏씠吏 1P + ?쒕툕?섏씠吏 6P", qty: 1, unit: 1400000 },
    { name: "?붿옄??理쒖쟻??, desc: "PC 쨌 MOBILE 理쒖쟻??, qty: 1, unit: 0 },
    { name: "寃?됱뿏吏?理쒖쟻??, desc: "SEO 쨌 GEO 쨌 AEO ?묒뾽", qty: 1, unit: 0 },
    { name: "湲고쉷", desc: "UX/UI ?ㅺ퀎 쨌 媛?낆꽦 ?묒뾽", qty: 1, unit: 0 },
    { name: "鍮꾩＜??肄섑뀗痢?, desc: "?ㅽ넚 ?대?吏 쨌 AI ?앹꽦 鍮꾩＜??肄섑뀗痢??쒓났", qty: 1, unit: 0 },
    { name: "寃곗젣 紐⑤뱢", desc: "寃곗젣 紐⑤뱢(PG) ?곕룞 諛??명똿", qty: 1, unit: 200000 },
    { name: "異붽? ?쒕퉬??, desc: "?묒뾽 ?섏씠吏 異붽?", qty: 1, unit: 100000 }
  ];

  const PAYMENT_LINES = {
    normal: [
      "怨꾩쥖?댁껜 諛??좎슜移대뱶濡?寃곗젣媛 媛?ν빀?덈떎.",
      "?멸툑怨꾩궛?쒓? ?꾩슂?섏떊 寃쎌슦 ?ъ뾽?먮벑濡앹쬆怨??대찓?쇱쓣 ?꾨떖?댁＜?몄슂.",
      "移대뱶 寃곗젣 ?붿껌 ??寃곗젣 留곹겕瑜??꾨떖?쒕┰?덈떎.",
      "怨꾩쥖踰덊샇 : 3333-01-8399628 / 移댁뭅?ㅻ콉?? ?좎듅吏?,
      "",
      "?곴린 寃ъ쟻? ?붿껌 踰붿쐞 湲곗??쇰줈 ?곗젙?섏뿀?쇰ŉ, 踰붿쐞 蹂寃???湲덉븸??議곗젙?????덉뒿?덈떎.",
      "?몄뒪?? ?꾨찓?? SSL 鍮꾩슜? 蹂꾨룄?낅땲??"
    ],
    kmong: [
      "?щそ ?섎ː?몄쓽 寃쎌슦 ?щそ ?덉떖 寃곗젣濡?吏꾪뻾?⑸땲??",
      "",
      "?곴린 寃ъ쟻? ?붿껌 踰붿쐞 湲곗??쇰줈 ?곗젙?섏뿀?쇰ŉ, 踰붿쐞 蹂寃???湲덉븸??議곗젙?????덉뒿?덈떎.",
      "?몄뒪?? ?꾨찓?? SSL 鍮꾩슜? 蹂꾨룄?낅땲??"
    ]
  };

  const ROW_PRESET_STORAGE_KEY = "yellopencil-quote-row-preset-v1";
  const QUOTE_SETTINGS_STORAGE_KEY = "yellopencil-quote-settings-v1";
  const PDF_HISTORY_DB_NAME = "yellopencil-quote-history-db";
  const PDF_HISTORY_STORE_NAME = "pdfHistory";
  const PDF_HISTORY_MAX_AGE = 365 * 24 * 60 * 60 * 1000;
  const PDF_LOGO_URL = "https://cdn.imweb.me/upload/S20210903c0421227bca81/11e1f4c49fda7.png";
  const PDF_STAMP_URL = "https://cdn.imweb.me/upload/S20210903c0421227bca81/8f10c47f62d80.png";

  const els = {
    itemsBody: doc.getElementById("itemsBody"),
    addRowBtn: doc.getElementById("addRowBtn"),
    saveRowPresetBtn: doc.getElementById("saveRowPresetBtn"),
    loadRowPresetBtn: doc.getElementById("loadRowPresetBtn"),
    downloadPdfBtn: doc.getElementById("downloadPdfBtn"),
    docButtons: Array.from(doc.querySelectorAll(".qa-docbtn")),
    docTitle: doc.getElementById("docTitle"),
    quoteDate: doc.getElementById("quoteDate"),
    clientCompany: doc.getElementById("clientCompany"),
    clientName: doc.getElementById("clientName"),
    clientPhone: doc.getElementById("clientPhone"),
    reqWarn: doc.getElementById("reqWarn"),
    langCount: doc.getElementById("langCount"),
    langRateTxt: doc.getElementById("langRateTxt"),
    langFeeTxt: doc.getElementById("langFeeTxt"),
    workPeriod: doc.getElementById("workPeriod"),
    revCount: doc.getElementById("revCount"),
    memo: doc.getElementById("memo"),
    termsList: doc.getElementById("termsList"),
    termsEditBtn: doc.getElementById("termsEditBtn"),
    termsSaveBtn: doc.getElementById("termsSaveBtn"),
    termsEditor: doc.getElementById("termsEditor"),
    baseSubtotalTxt: doc.getElementById("baseSubtotalTxt"),
    langRowLabel: doc.getElementById("langRowLabel"),
    langAddonTxt: doc.getElementById("langAddonTxt"),
    subtotalTxt: doc.getElementById("subtotalTxt"),
    vatTxt: doc.getElementById("vatTxt"),
    totalTxt: doc.getElementById("totalTxt"),
    vatToggle: doc.getElementById("vatToggle"),
    signNote: doc.getElementById("signNote"),
    agreementContent: doc.getElementById("agreementContent"),
    agreementBoldBtn: doc.getElementById("agreementBoldBtn"),
    agreementEditBtn: doc.getElementById("agreementEditBtn"),
    agreementSaveBtn: doc.getElementById("agreementSaveBtn"),
    pdfTemplateRoot: doc.getElementById("pdfTemplateRoot")
  };

  let currentDocType = "estimate";
  let termsEditable = false;
  let agreementEditable = false;
  let dragRow = null;
  let dragGhost = null;
  let pointerOffsetX = 0;
  let pointerOffsetY = 0;
  let currentPdfPreviewUrl = null;
  let quoteSettings = loadQuoteSettings();
  let quoteSettingsSyncPromise = null;

  function getTodayIso() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function formatKRW(value) {
    return Number(value || 0).toLocaleString("ko-KR");
  }

  function parseNumber(value) {
    const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isContractDoc(type) {
    return String(type).startsWith("contract");
  }

  function isKrmongDoc(type) {
    return String(type).includes("krmong");
  }

  function getDocTitle(type) {
    return isContractDoc(type) ? "?덊럹?댁? ?쒖옉 怨꾩빟?? : "?덊럹?댁? ?쒖옉 寃ъ쟻??;
  }

  function getDocTypeLabel(type) {
    switch (String(type || "")) {
      case "estimate":
        return "寃ъ쟻??;
      case "contract":
        return "怨꾩빟??;
      case "estimate_krmong":
        return "寃ъ쟻???щそ)";
      case "contract_krmong":
        return "怨꾩빟???щそ)";
      default:
        return isContractDoc(type) ? "怨꾩빟?? : "寃ъ쟻??;
    }
  }

  function getPaymentLines() {
    if (isKrmongDoc(currentDocType)) {
      return Array.isArray(quoteSettings.paymentLines?.kmong) ? quoteSettings.paymentLines.kmong : PAYMENT_LINES.kmong;
    }
    return Array.isArray(quoteSettings.paymentLines?.normal) ? quoteSettings.paymentLines.normal : PAYMENT_LINES.normal;
  }

  function createDefaultQuoteSettings() {
    return {
      agreementHtml: agreementTextToHtml(TERMS_TEMPLATE),
      paymentLines: {
        normal: [...PAYMENT_LINES.normal],
        kmong: [...PAYMENT_LINES.kmong],
      },
    };
  }

  function normalizeQuoteSettings(raw) {
    const fallback = createDefaultQuoteSettings();
    const paymentLines = raw && typeof raw === "object" ? raw.paymentLines || {} : {};
    return {
      agreementHtml: String(raw?.agreementHtml || fallback.agreementHtml || "").trim() || fallback.agreementHtml,
      paymentLines: {
        normal: Array.isArray(paymentLines.normal) ? paymentLines.normal.map((line) => String(line ?? "")) : fallback.paymentLines.normal,
        kmong: Array.isArray(paymentLines.kmong) ? paymentLines.kmong.map((line) => String(line ?? "")) : fallback.paymentLines.kmong,
      },
    };
  }

  function loadQuoteSettings() {
    try {
      const raw = localStorage.getItem(QUOTE_SETTINGS_STORAGE_KEY);
      if (!raw) return createDefaultQuoteSettings();
      return normalizeQuoteSettings(JSON.parse(raw));
    } catch (error) {
      console.warn("寃ъ쟻 ?ㅼ젙??遺덈윭?ㅼ? 紐삵뻽?듬땲??", error);
      return createDefaultQuoteSettings();
    }
  }

  function saveQuoteSettings() {
    quoteSettings = normalizeQuoteSettings(quoteSettings);
    localStorage.setItem(QUOTE_SETTINGS_STORAGE_KEY, JSON.stringify(quoteSettings));
  }

  function getDefaultQuoteSettingsSerialized() {
    return JSON.stringify(normalizeQuoteSettings(createDefaultQuoteSettings()));
  }

  function isDefaultQuoteSettings(settings) {
    return JSON.stringify(normalizeQuoteSettings(settings)) === getDefaultQuoteSettingsSerialized();
  }

  function isEmptySupabaseQuoteSettings(record) {
    if (!record || typeof record !== "object") return true;
    const agreement = String(record.agreement_html || "").trim();
    const normal = Array.isArray(record.payment_lines_normal) ? record.payment_lines_normal : [];
    const kmong = Array.isArray(record.payment_lines_kmong) ? record.payment_lines_kmong : [];
    return !agreement && !normal.length && !kmong.length;
  }

  function getSupabaseBridge() {
    return window.BLUEWORKS_SUPABASE || null;
  }

  async function hasAuthenticatedSession() {
    const bridge = getSupabaseBridge();
    if (!bridge || !bridge.isReady?.()) return false;
    const sessionResult = await bridge.getSession();
    return Boolean(sessionResult?.data?.session);
  }

  function buildQuoteSettingsPayload() {
    quoteSettings = normalizeQuoteSettings(quoteSettings);
    return {
      id: "global",
      agreement_html: quoteSettings.agreementHtml,
      payment_lines_normal: quoteSettings.paymentLines.normal,
      payment_lines_kmong: quoteSettings.paymentLines.kmong,
      updated_at: new Date().toISOString(),
    };
  }

  function applySupabaseQuoteSettings(record) {
    if (!record) return false;
    quoteSettings = normalizeQuoteSettings({
      agreementHtml: record.agreement_html,
      paymentLines: {
        normal: Array.isArray(record.payment_lines_normal) ? record.payment_lines_normal : undefined,
        kmong: Array.isArray(record.payment_lines_kmong) ? record.payment_lines_kmong : undefined,
      },
    });
    saveQuoteSettings();
    els.agreementContent.innerHTML = quoteSettings.agreementHtml || agreementTextToHtml(TERMS_TEMPLATE);
    renderTerms();
    syncTermsEditor();
    syncAgreementEditor();
    calc();
    return true;
  }

  async function loadQuoteSettingsFromSupabase() {
    const bridge = getSupabaseBridge();
    if (!bridge || !bridge.isReady?.()) return null;
    if (!(await hasAuthenticatedSession())) return null;
    const result = await bridge.fetchQuoteSettings();
    if (result?.error) throw result.error;
    if (!result?.data || isEmptySupabaseQuoteSettings(result.data)) {
      if (!isDefaultQuoteSettings(quoteSettings)) {
        await persistQuoteSettingsToSupabase();
      }
      return null;
    }
    applySupabaseQuoteSettings(result.data);
    return result.data;
  }

  async function persistQuoteSettingsToSupabase() {
    const bridge = getSupabaseBridge();
    if (!bridge || !bridge.isReady?.()) return null;
    if (!(await hasAuthenticatedSession())) return null;
    const result = await bridge.upsertQuoteSettings(buildQuoteSettingsPayload());
    if (result?.error) throw result.error;
    return result?.data || null;
  }

  function queueQuoteSettingsSync() {
    if (quoteSettingsSyncPromise) return quoteSettingsSyncPromise;
    quoteSettingsSyncPromise = persistQuoteSettingsToSupabase()
      .catch((error) => {
        console.warn("寃ъ쟻 ?ㅼ젙??Supabase????ν븯吏 紐삵뻽?듬땲??", error);
        return null;
      })
      .finally(() => {
        quoteSettingsSyncPromise = null;
      });
    return quoteSettingsSyncPromise;
  }

  async function persistQuoteSettingsWithFeedback(successMessage, failurePrefix) {
    saveQuoteSettings();
    try {
      await persistQuoteSettingsToSupabase();
      openNoticeModal(successMessage);
      return true;
    } catch (error) {
      console.error(error);
      openNoticeModal(`${failurePrefix}\n${error?.message || "???以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎."}`);
      return false;
    }
  }

  function ensureNoticeModal() {
    let modal = doc.getElementById("qaNoticeModal");
    if (modal) return modal;

    modal = doc.createElement("div");
    modal.id = "qaNoticeModal";
    modal.className = "qa-modal-overlay hidden";
    modal.innerHTML = `
      <div class="qa-modal-card" role="dialog" aria-modal="true" aria-labelledby="qaNoticeMessage">
        <h3 id="qaNoticeMessage" class="qa-modal-message"></h3>
        <div class="qa-modal-actions">
          <button id="qaNoticeConfirmBtn" type="button" class="qa-btn qa-btn-primary">?뺤씤</button>
        </div>
      </div>
    `;
    doc.body.appendChild(modal);
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) closeNoticeModal();
    });
    modal.querySelector("#qaNoticeConfirmBtn")?.addEventListener("click", closeNoticeModal);
    return modal;
  }

  function openNoticeModal(message) {
    const modal = ensureNoticeModal();
    const messageEl = modal.querySelector("#qaNoticeMessage");
    if (messageEl) messageEl.textContent = message;
    modal.classList.remove("hidden");
  }

  function closeNoticeModal() {
    const modal = doc.getElementById("qaNoticeModal");
    if (modal) modal.classList.add("hidden");
  }

  function ensureHistoryButton() {
    if (doc.getElementById("historyQuotesBtn") || !els.downloadPdfBtn) return;
    const button = doc.createElement("button");
    button.id = "historyQuotesBtn";
    button.type = "button";
    button.className = "qa-btn qa-btn-subtle";
    button.textContent = "吏??寃ъ쟻 쨌 怨꾩빟??;
    els.downloadPdfBtn.insertAdjacentElement("beforebegin", button);
  }

  function ensureHistoryModal() {
    let modal = doc.getElementById("qaHistoryModal");
    if (modal) return modal;

    modal = doc.createElement("div");
    modal.id = "qaHistoryModal";
    modal.className = "qa-modal-overlay qa-history-overlay hidden";
    modal.innerHTML = `
      <div class="qa-modal-card qa-history-card" role="dialog" aria-modal="true" aria-labelledby="qaHistoryTitle">
        <div class="qa-history-head">
          <div>
            <h3 id="qaHistoryTitle" class="qa-history-title">吏??寃ъ쟻 쨌 怨꾩빟??/h3>
            <p class="qa-history-sub">?댁쟾???대낫??PDF ?뚯씪???뺤씤?섍퀬 ?ㅼ떆 ?대젮諛쏄굅??諛붾줈 蹂????덉뒿?덈떎.</p>
          </div>
          <button id="qaHistoryCloseBtn" type="button" class="qa-btn qa-btn-subtle qa-history-close">?リ린</button>
        </div>
        <div class="qa-history-search">
          <input id="qaHistorySearchInput" type="text" class="qa-input" placeholder="?쒖옉 ?붿껌?? ?대떦?먮챸, ?대떦???곕씫泥섎줈 寃??>
        </div>
        <div class="qa-history-list-wrap">
          <div id="qaHistoryList" class="qa-history-list"></div>
        </div>
      </div>
    `;

    doc.body.appendChild(modal);
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) modal.classList.add("hidden");
    });
    modal.querySelector("#qaHistoryCloseBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
    modal.querySelector("#qaHistorySearchInput")?.addEventListener("input", renderPdfHistoryList);
    return modal;
  }

  function ensurePdfViewerModal() {
    let modal = doc.getElementById("qaPdfViewerModal");
    if (modal) return modal;

    modal = doc.createElement("div");
    modal.id = "qaPdfViewerModal";
    modal.className = "qa-modal-overlay qa-pdf-viewer-overlay hidden";
    modal.innerHTML = `
      <div class="qa-modal-card qa-pdf-viewer-card" role="dialog" aria-modal="true" aria-labelledby="qaPdfViewerTitle">
        <div class="qa-pdf-viewer-head">
          <h3 id="qaPdfViewerTitle" class="qa-history-title">寃ъ쟻??誘몃━蹂닿린</h3>
          <button id="qaPdfViewerCloseBtn" type="button" class="qa-btn qa-btn-subtle qa-history-close">?リ린</button>
        </div>
        <div class="qa-pdf-viewer-body">
          <iframe id="qaPdfViewerFrame" title="PDF 誘몃━蹂닿린"></iframe>
        </div>
      </div>
    `;

    doc.body.appendChild(modal);
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) closePdfViewerModal();
    });
    modal.querySelector("#qaPdfViewerCloseBtn")?.addEventListener("click", closePdfViewerModal);
    return modal;
  }

  function ensureDeleteConfirmModal() {
    let modal = doc.getElementById("qaDeleteConfirmModal");
    if (modal) return modal;

    modal = doc.createElement("div");
    modal.id = "qaDeleteConfirmModal";
    modal.className = "qa-modal-overlay hidden";
    modal.innerHTML = `
      <div class="qa-modal-card qa-confirm-card" role="dialog" aria-modal="true" aria-labelledby="qaDeleteConfirmMessage">
        <p id="qaDeleteConfirmMessage" class="qa-modal-message qa-modal-message-multiline">?뺣쭚 ??젣?섏떆寃좎뒿?덇퉴?</p>
        <div class="qa-confirm-actions">
          <button id="qaDeleteCancelBtn" type="button" class="qa-btn qa-btn-subtle">痍⑥냼</button>
          <button id="qaDeleteConfirmBtn" type="button" class="qa-btn qa-btn-primary">??젣</button>
        </div>
      </div>
    `;

    doc.body.appendChild(modal);
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) modal.classList.add("hidden");
    });
    modal.querySelector("#qaDeleteCancelBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
      delete modal.dataset.targetId;
    });
    return modal;
  }

  function closePdfViewerModal() {
    const modal = doc.getElementById("qaPdfViewerModal");
    const frame = doc.getElementById("qaPdfViewerFrame");
    if (frame) frame.removeAttribute("src");
    if (currentPdfPreviewUrl) {
      URL.revokeObjectURL(currentPdfPreviewUrl);
      currentPdfPreviewUrl = null;
    }
    if (modal) modal.classList.add("hidden");
  }

  function agreementTextToHtml(text) {
    return String(text || "")
      .split("\n")
      .map((line) => (line.trim() ? `<div>${escapeHtml(line)}</div>` : "<div><br></div>"))
      .join("");
  }

  function isAgreementBlockTag(tagName) {
    return ["DIV", "P", "SECTION", "ARTICLE", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "PRE"].includes(tagName);
  }

  function normalizeAgreementColor(value) {
    const color = String(value || "").trim();
    if (!color) return "";
    if (/^#[0-9a-f]{3,8}$/i.test(color)) return color;
    if (/^rgb(a)?\([\d\s.,%]+\)$/i.test(color)) return color.replace(/\s+/g, " ");
    return "";
  }

  function sanitizeAgreementInlineNode(node) {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      return doc.createTextNode(node.textContent || "");
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tagName = node.tagName.toUpperCase();
    if (tagName === "BR") return doc.createElement("br");

    if (tagName === "A") {
      const anchor = doc.createElement("a");
      const href = String(node.getAttribute("href") || "").trim();
      if (/^(https?:|mailto:|tel:)/i.test(href)) {
        anchor.setAttribute("href", href);
      }
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) anchor.appendChild(sanitizedChild);
      });
      return anchor;
    }

    if (["STRONG", "B"].includes(tagName)) {
      const strong = doc.createElement("strong");
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) strong.appendChild(sanitizedChild);
      });
      return strong;
    }

    if (["EM", "I"].includes(tagName)) {
      const em = doc.createElement("em");
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) em.appendChild(sanitizedChild);
      });
      return em;
    }

    if (tagName === "U") {
      const underline = doc.createElement("u");
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) underline.appendChild(sanitizedChild);
      });
      return underline;
    }

    if (["SPAN", "FONT"].includes(tagName)) {
      const span = doc.createElement("span");
      const color = normalizeAgreementColor(node.style?.color || node.getAttribute("color"));
      if (color) span.style.color = color;
      if (/^(700|800|900|bold)$/i.test(node.style?.fontWeight || "") || /font-weight\s*:\s*(700|800|900|bold)/i.test(node.getAttribute("style") || "")) {
        span.style.fontWeight = "700";
      }
      if (/italic/i.test(node.style?.fontStyle || "")) {
        span.style.fontStyle = "italic";
      }
      if (/underline/i.test(node.style?.textDecoration || "")) {
        span.style.textDecoration = "underline";
      }
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) span.appendChild(sanitizedChild);
      });
      if (!span.getAttribute("style")) {
        const fragment = doc.createDocumentFragment();
        Array.from(span.childNodes).forEach((child) => fragment.appendChild(child));
        return fragment;
      }
      return span;
    }

    const fragment = doc.createDocumentFragment();
    Array.from(node.childNodes).forEach((child) => {
      const sanitizedChild = sanitizeAgreementInlineNode(child);
      if (sanitizedChild) fragment.appendChild(sanitizedChild);
    });
    return fragment;
  }

  function buildAgreementBlockHtmlFromNode(node) {
    if (!node) return [];
    if (node.nodeType === Node.TEXT_NODE) {
      return String(node.textContent || "")
        .replace(/\r\n?/g, "\n")
        .split("\n")
        .map((line) => (line.trim() ? `<div>${escapeHtml(line)}</div>` : "<div><br></div>"));
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return [];

    const tagName = node.tagName.toUpperCase();
    if (tagName === "BR") return ["<div><br></div>"];

    if (["UL", "OL"].includes(tagName)) {
      const list = doc.createElement(tagName.toLowerCase());
      Array.from(node.children).forEach((child) => {
        if (child.tagName?.toUpperCase() !== "LI") return;
        const li = doc.createElement("li");
        Array.from(child.childNodes).forEach((liChild) => {
          const sanitizedChild = sanitizeAgreementInlineNode(liChild);
          if (sanitizedChild) li.appendChild(sanitizedChild);
        });
        if (!li.innerHTML.trim()) li.innerHTML = "<br>";
        list.appendChild(li);
      });
      return list.children.length ? [list.outerHTML] : [];
    }

    if (tagName === "LI") {
      const list = doc.createElement("ul");
      const li = doc.createElement("li");
      Array.from(node.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) li.appendChild(sanitizedChild);
      });
      if (!li.innerHTML.trim()) li.innerHTML = "<br>";
      list.appendChild(li);
      return [list.outerHTML];
    }

    if (isAgreementBlockTag(tagName)) {
      const wrapper = doc.createElement("div");
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && String(child.textContent || "").includes("\n")) {
          buildAgreementBlockHtmlFromNode(child).forEach((blockHtml) => {
            const temp = doc.createElement("div");
            temp.innerHTML = blockHtml;
            const first = temp.firstElementChild;
            if (first) wrapper.appendChild(first);
          });
          return;
        }
        const sanitizedChild = sanitizeAgreementInlineNode(child);
        if (sanitizedChild) wrapper.appendChild(sanitizedChild);
      });
      return [wrapper.innerHTML.trim() ? wrapper.outerHTML : "<div><br></div>"];
    }

    const wrapper = doc.createElement("div");
    const sanitizedNode = sanitizeAgreementInlineNode(node);
    if (sanitizedNode) wrapper.appendChild(sanitizedNode);
    return [wrapper.innerHTML.trim() ? wrapper.outerHTML : "<div><br></div>"];
  }

  function sanitizeAgreementHtml(html) {
    const temp = doc.createElement("div");
    temp.innerHTML = html || "";
    const blocks = [];
    Array.from(temp.childNodes).forEach((node) => {
      buildAgreementBlockHtmlFromNode(node).forEach((blockHtml) => blocks.push(blockHtml));
    });
    const sanitized = blocks.join("").trim();
    if (sanitized) return sanitized;
    return agreementTextToHtml(temp.textContent || "");
  }

  function insertAgreementTextAtCursor(text) {
    const html = agreementTextToHtml(String(text || "").replace(/\r\n?/g, "\n"));
    els.agreementContent.focus();
    doc.execCommand("insertHTML", false, html);
  }

  function getAgreementHtml() {
    const sanitized = sanitizeAgreementHtml(els.agreementContent.innerHTML);
    els.agreementContent.innerHTML = sanitized;
    return sanitized;
  }

  function sanitizeFilename(value) {
    return String(value || "document").replace(/[\\/:*?"<>|]/g, "_").trim() || "document";
  }

  function createPdfFilename(data) {
    return `${sanitizeFilename(data.title)}_${sanitizeFilename(data.clientCompany || "client")}_${sanitizeFilename(data.date || getTodayIso())}.pdf`;
  }

  function openPdfHistoryDb() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(PDF_HISTORY_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PDF_HISTORY_STORE_NAME)) {
          const store = db.createObjectStore(PDF_HISTORY_STORE_NAME, { keyPath: "id" });
          store.createIndex("createdAt", "createdAt", { unique: false });
          store.createIndex("searchText", "searchText", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function pruneOldPdfHistory() {
    const threshold = Date.now() - PDF_HISTORY_MAX_AGE;
    const db = await openPdfHistoryDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_HISTORY_STORE_NAME, "readwrite");
      const store = transaction.objectStore(PDF_HISTORY_STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const rows = Array.isArray(request.result) ? request.result : [];
        rows.forEach((row) => {
          if ((row?.createdAt || 0) < threshold) store.delete(row.id);
        });
      };
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };
    });
  }

  function makePdfHistoryRecord(data, blob) {
    const createdAt = Date.now();
    return {
      id: `pdf_${createdAt}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt,
      date: data.date || getTodayIso(),
      title: data.title || "",
      clientCompany: data.clientCompany || "",
      clientName: data.clientName || "",
      clientPhone: data.clientPhone || "",
      total: Number(data.total || 0),
      docType: currentDocType,
      docTypeLabel: getDocTypeLabel(currentDocType),
      filename: createPdfFilename(data),
      searchText: `${data.clientCompany || ""} ${data.clientName || ""} ${data.clientPhone || ""}`.toLowerCase(),
      blob
    };
  }

  async function savePdfHistoryRecord(record) {
    await pruneOldPdfHistory();
    const db = await openPdfHistoryDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_HISTORY_STORE_NAME, "readwrite");
      const store = transaction.objectStore(PDF_HISTORY_STORE_NAME);
      store.put(record);
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };
    });
  }

  async function getPdfHistoryRecords() {
    await pruneOldPdfHistory();
    const db = await openPdfHistoryDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(PDF_HISTORY_STORE_NAME, "readonly");
      const store = transaction.objectStore(PDF_HISTORY_STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const rows = (request.result || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        resolve(rows);
      };
      request.onerror = () => resolve([]);
      transaction.oncomplete = () => db.close();
      transaction.onerror = () => db.close();
      transaction.onabort = () => db.close();
    });
  }

  async function deletePdfHistoryRecord(id) {
    if (!id) return;
    const db = await openPdfHistoryDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_HISTORY_STORE_NAME, "readwrite");
      const store = transaction.objectStore(PDF_HISTORY_STORE_NAME);
      store.delete(id);
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };
    });
  }

  function triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = doc.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    doc.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function formatHistoryDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  }

  function resolveHistoryDocTypeLabel(row) {
    if (row?.docTypeLabel) return row.docTypeLabel;
    if (row?.docType) return getDocTypeLabel(row.docType);
    const title = String(row?.title || "");
    if (title.includes("怨꾩빟??)) return "怨꾩빟??;
    return "寃ъ쟻??;
  }

  async function renderPdfHistoryList() {
    const modal = ensureHistoryModal();
    const listEl = modal.querySelector("#qaHistoryList");
    const query = String(modal.querySelector("#qaHistorySearchInput")?.value || "").trim().toLowerCase();
    if (!listEl) return;

    listEl.innerHTML = `<div class="qa-history-empty">遺덈윭?ㅻ뒗 以?..</div>`;
    const rows = await getPdfHistoryRecords();
    const filtered = rows.filter((row) => !query || String(row.searchText || "").includes(query));

    if (!filtered.length) {
      listEl.innerHTML = `<div class="qa-history-empty">議곌굔??留욌뒗 寃ъ쟻?쒓? ?놁뒿?덈떎.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map((row) => `
      <article class="qa-history-item" data-id="${row.id}">
        <div class="qa-history-item-main">
          <div class="qa-history-item-grid">
            <div class="qa-history-primary">
              <div class="qa-history-doc-type">${escapeHtml(resolveHistoryDocTypeLabel(row))}</div>
            </div>
            <div><span class="qa-history-label">?쒖옉 ?붿껌??/span><strong>${escapeHtml(row.clientCompany || "-")}</strong></div>
            <div><span class="qa-history-label">?대떦?먮챸</span><strong>${escapeHtml(row.clientName || "-")}</strong></div>
            <div><span class="qa-history-label">?대떦???곕씫泥?/span><strong>${escapeHtml(row.clientPhone || "-")}</strong></div>
            <div><span class="qa-history-label">寃ъ쟻 湲덉븸</span><strong>${formatKRW(row.total || 0)}??/strong></div>
            <div><span class="qa-history-label">?묒꽦??/span><strong>${escapeHtml(formatHistoryDate(row.date || row.createdAt))}</strong></div>
          </div>
        </div>
        <div class="qa-history-item-actions">
          <button type="button" class="qa-btn qa-btn-subtle qa-history-download">?대젮諛쏄린</button>
          <button type="button" class="qa-btn qa-btn-primary qa-history-preview">諛붾줈蹂닿린</button>
          <button type="button" class="qa-btn qa-btn-subtle qa-history-delete">??젣</button>
        </div>
      </article>
    `).join("");

    listEl.querySelectorAll(".qa-history-item").forEach((item) => {
      const id = item.getAttribute("data-id");
      const row = filtered.find((entry) => entry.id === id);
      if (!row) return;
      item.querySelector(".qa-history-download")?.addEventListener("click", () => {
        triggerBlobDownload(row.blob, row.filename || createPdfFilename(row));
      });
      item.querySelector(".qa-history-preview")?.addEventListener("click", () => {
        const viewer = ensurePdfViewerModal();
        const frame = viewer.querySelector("#qaPdfViewerFrame");
        closePdfViewerModal();
        currentPdfPreviewUrl = URL.createObjectURL(row.blob);
        if (frame) frame.src = currentPdfPreviewUrl;
        viewer.classList.remove("hidden");
      });
      item.querySelector(".qa-history-delete")?.addEventListener("click", () => {
        const confirmModal = ensureDeleteConfirmModal();
        confirmModal.dataset.targetId = row.id;
        confirmModal.classList.remove("hidden");
      });
    });
  }

  async function openPdfHistoryModal() {
    const modal = ensureHistoryModal();
    modal.classList.remove("hidden");
    await renderPdfHistoryList();
  }

  function parseAgreementSectionsFromHtml(html) {
    const temp = doc.createElement("div");
    temp.innerHTML = html || "";
    const lines = [];

    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        String(node.textContent || "").split("\n").forEach((part) => {
          if (part.trim()) lines.push({ html: escapeHtml(part.trim()), text: part.trim() });
        });
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const text = (node.textContent || "").trim();
        const inner = node.innerHTML?.trim();
        if (text || inner === "<br>") {
          lines.push({ html: inner === "<br>" ? "" : node.innerHTML.trim(), text });
        }
      }
    });

    const sections = [];
    let current = null;
    lines.forEach((line) => {
      if (!line.text && !line.html) return;
      if (/^\[\s*??\s*\d+議?]/.test(line.text)) {
        current = { heading: line, lines: [] };
        sections.push(current);
        return;
      }
      if (!current) {
        current = { heading: { html: "", text: "" }, lines: [] };
        sections.push(current);
      }
      current.lines.push(line);
    });

    return sections;
  }

  function buildAgreementLineHtml(line, isHeading) {
    const content = line.html || escapeHtml(line.text || "");
    return {
      sectionId: line.sectionId,
      isHeading,
      html: `<div class="qa-pdf-agreement-line${isHeading ? " qa-pdf-agreement-line-heading" : ""}">${content || "<br>"}</div>`
    };
  }

  function renderAgreementItems(items) {
    if (!Array.isArray(items) || !items.length) return "";
    const sections = [];
    let currentSectionId = null;
    let buffer = [];

    const flush = () => {
      if (!buffer.length) return;
      sections.push(`
        <section class="qa-pdf-agreement-section qa-pdf-agreement-block">
          ${buffer.join("")}
        </section>
      `);
      buffer = [];
    };

    items.forEach((item) => {
      if (item.sectionId !== currentSectionId) {
        flush();
        currentSectionId = item.sectionId;
      }
      buffer.push(item.html);
    });
    flush();
    return sections.join("");
  }

  function createAgreementPageElement(contentHtml, includeIntro) {
    const page = doc.createElement("section");
    page.className = "qa-pdf-page";
    page.innerHTML = `
      <h2 class="qa-pdf-agreement-title">?쎄??숈쓽??/h2>
      ${includeIntro ? '<p class="qa-pdf-agreement-sub">?꾨옒 ?쎄??숈쓽???댁슜??異⑸텇???쎌뼱二쇱꽭?? 怨꾩빟 ?댁슜 誘몄닕吏濡?諛쒖깮??臾몄젣??梨낆엫吏吏 ?딆뒿?덈떎.</p>' : ""}
      ${contentHtml}
      <div class="qa-pdf-footer">
        <span>Copyright ???먮줈?쒖뒳 All Rights Reserved.</span>
        <span data-page-number></span>
      </div>
    `;
    return page;
  }

  function measureAgreementPageFits(measureRoot, items, includeIntro) {
    const page = createAgreementPageElement(renderAgreementItems(items), includeIntro);
    page.style.position = "absolute";
    page.style.left = "0";
    page.style.top = "0";
    page.style.visibility = "hidden";
    measureRoot.appendChild(page);
    const fits = page.scrollHeight <= page.clientHeight + 2;
    page.remove();
    return fits;
  }

  function syncTermsEditor() {
    els.termsList.classList.toggle("hidden", termsEditable);
    els.termsEditor.classList.toggle("hidden", !termsEditable);
    els.termsEditBtn.classList.toggle("hidden", termsEditable);
    els.termsSaveBtn.classList.toggle("hidden", !termsEditable);
    if (!termsEditable) {
      els.termsEditor.value = getPaymentLines().join("\n");
    }
  }

  function syncAgreementEditor() {
    els.agreementContent.contentEditable = agreementEditable ? "true" : "false";
    els.agreementContent.classList.toggle("is-editable", agreementEditable);
    els.agreementBoldBtn.classList.toggle("hidden", !agreementEditable);
    els.agreementEditBtn.classList.toggle("hidden", agreementEditable);
    els.agreementSaveBtn.classList.toggle("hidden", !agreementEditable);
  }

  function renderTerms() {
    const lines = getPaymentLines();
    els.termsList.innerHTML = "";
    lines.forEach((line) => {
      const li = doc.createElement("li");
      if (!String(line || "").trim()) {
        li.style.listStyle = "none";
        li.style.height = "8px";
      } else {
        li.textContent = line;
      }
      els.termsList.appendChild(li);
    });
    if (!termsEditable) els.termsEditor.value = lines.join("\n");
  }

  function setDocType(type) {
    currentDocType = type;
    els.docButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.doc === type);
    });
    els.docTitle.textContent = getDocTitle(type);
    els.signNote.textContent = isContractDoc(type)
      ? "蹂?臾몄꽌???꾩옄臾몄꽌濡? 蹂꾨룄??吏곸씤/?쒕챸 ?놁씠 寃곗젣 ??怨꾩빟??泥닿껐?⑸땲??"
      : "蹂?臾몄꽌 ?좏슚湲곌컙? 諛쒗뻾?쇰줈遺??7?쇱엯?덈떎.";
    renderTerms();
  }

  function validateRequired() {
    const valid = Boolean(
      els.clientCompany.value.trim() &&
      els.clientName.value.trim() &&
      els.clientPhone.value.trim()
    );
    els.reqWarn.classList.toggle("hidden", valid);
    return valid;
  }

  function getRows() {
    return Array.from(els.itemsBody.querySelectorAll("tr")).map((tr) => ({
      name: tr.querySelector('[data-role="name"]').value.trim(),
      desc: tr.querySelector('[data-role="desc"]').value.trim(),
      qty: parseNumber(tr.querySelector('[data-role="qty"]').value),
      unit: parseNumber(tr.querySelector('[data-role="unit"]').value)
    }));
  }

  function calc() {
    const rows = getRows();
    const baseSubtotal = rows.reduce((sum, row) => sum + Math.max(0, row.qty * row.unit), 0);
    const langCount = Number(els.langCount.value || 0);
    const langRate = langCount * 0.3;
    const langFee = Math.round(baseSubtotal * langRate);
    const subtotal = baseSubtotal + langFee;
    const vat = els.vatToggle.checked ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + vat;

    Array.from(els.itemsBody.querySelectorAll("tr")).forEach((tr) => {
      const qty = parseNumber(tr.querySelector('[data-role="qty"]').value);
      const unit = parseNumber(tr.querySelector('[data-role="unit"]').value);
      tr.querySelector('[data-role="amount"]').value = formatKRW(Math.max(0, qty * unit));
    });

    els.baseSubtotalTxt.textContent = `${formatKRW(baseSubtotal)}??;
    els.langRowLabel.textContent = `?ㅺ뎅??異붽?(30% 횞 ${langCount})`;
    els.langAddonTxt.textContent = `${formatKRW(langFee)}??;
    els.langRateTxt.textContent = `${Math.round(langRate * 100)}%`;
    els.langFeeTxt.textContent = `${formatKRW(langFee)}??;
    els.subtotalTxt.textContent = `${formatKRW(subtotal)}??;
    els.vatTxt.textContent = `${formatKRW(vat)}??;
    els.totalTxt.textContent = `${formatKRW(total)}??;
  }

  function createRow(data = {}) {
    const tr = doc.createElement("tr");
    tr.innerHTML = `
      <td><input class="qa-cell" data-role="name" value="${escapeHtml(data.name || "")}" placeholder="?? 援ъ텞 諛??밸뵒?먯씤"></td>
      <td><input class="qa-cell" data-role="desc" value="${escapeHtml(data.desc || "")}" placeholder="?? 硫붿씤?섏씠吏 1P + ?쒕툕?섏씠吏 6P"></td>
      <td class="num"><input class="qa-cell num" data-role="qty" value="${data.qty ?? 1}" inputmode="numeric"></td>
      <td class="num"><input class="qa-cell num" data-role="unit" value="${formatKRW(data.unit || 0)}" inputmode="numeric"></td>
      <td class="num"><input class="qa-cell num" data-role="amount" value="0" readonly></td>
      <td class="no-print">
        <div class="qa-row-actions">
          <button class="qa-drag" type="button" title="?쒕옒洹명빐???쒖꽌 蹂寃?>??떘</button>
          <button class="qa-del" type="button" title="??젣">??/button>
        </div>
      </td>
    `;

    const unitEl = tr.querySelector('[data-role="unit"]');
    const qtyEl = tr.querySelector('[data-role="qty"]');
    const refresh = () => calc();

    qtyEl.addEventListener("input", refresh);
    unitEl.addEventListener("focus", () => {
      unitEl.value = parseNumber(unitEl.value) ? String(parseNumber(unitEl.value)) : "";
    });
    unitEl.addEventListener("input", refresh);
    unitEl.addEventListener("blur", () => {
      const current = parseNumber(unitEl.value);
      unitEl.value = current ? formatKRW(current) : "";
      refresh();
    });

    tr.querySelector(".qa-del").addEventListener("click", () => {
      tr.remove();
      calc();
    });

    return tr;
  }

  function addRow(row) {
    els.itemsBody.appendChild(createRow(row));
    calc();
  }

  function saveRowPreset() {
    const rows = getRows();
    if (!rows.length) {
      openNoticeModal("??ν븷 寃ъ쟻 ??ぉ???놁뒿?덈떎.");
      return;
    }
    localStorage.setItem(ROW_PRESET_STORAGE_KEY, JSON.stringify(rows));
    openNoticeModal("寃ъ쟻 ??ぉ????λ릺?덉뒿?덈떎.");
  }

  function loadRowPreset() {
    const raw = localStorage.getItem(ROW_PRESET_STORAGE_KEY);
    if (!raw) {
      openNoticeModal("??λ맂 寃ъ쟻 ??ぉ???놁뒿?덈떎.");
      return;
    }
    try {
      const rows = JSON.parse(raw);
      els.itemsBody.innerHTML = "";
      rows.forEach(addRow);
      calc();
      openNoticeModal("??λ맂 寃ъ쟻 ??ぉ??遺덈윭?붿뒿?덈떎.");
    } catch (error) {
      console.error(error);
      openNoticeModal("??ぉ??遺덈윭?ㅻ뒗 以?臾몄젣媛 諛쒖깮?덉뒿?덈떎.");
    }
  }

  function buildGhost(row) {
    const ghost = row.cloneNode(true);
    ghost.classList.add("qa-drag-ghost");
    const rect = row.getBoundingClientRect();
    ghost.style.width = `${rect.width}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    [...ghost.children].forEach((cell, index) => {
      const sourceRect = row.children[index]?.getBoundingClientRect();
      if (sourceRect) cell.style.width = `${sourceRect.width}px`;
    });
    return ghost;
  }

  function getAfterElement(y) {
    const rows = [...els.itemsBody.querySelectorAll("tr:not(.is-dragging-source)")];
    return rows.reduce((closest, row) => {
      const box = row.getBoundingClientRect();
      const offset = y - (box.top + box.height / 2);
      if (offset < 0 && offset > closest.offset) return { offset, element: row };
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  function initSortable() {
    els.itemsBody.addEventListener("pointerdown", (event) => {
      const handle = event.target.closest(".qa-drag");
      if (!handle) return;
      event.preventDefault();
      dragRow = handle.closest("tr");
      const rect = dragRow.getBoundingClientRect();
      pointerOffsetX = event.clientX - rect.left;
      pointerOffsetY = event.clientY - rect.top;
      dragGhost = buildGhost(dragRow);
      doc.body.appendChild(dragGhost);
      dragRow.classList.add("is-dragging-source");

      const onMove = (moveEvent) => {
        moveEvent.preventDefault();
        dragGhost.style.left = `${moveEvent.clientX - pointerOffsetX}px`;
        dragGhost.style.top = `${moveEvent.clientY - pointerOffsetY}px`;
        const after = getAfterElement(moveEvent.clientY);
        if (after) els.itemsBody.insertBefore(dragRow, after);
        else els.itemsBody.appendChild(dragRow);
      };

      const onUp = () => {
        dragRow?.classList.remove("is-dragging-source");
        dragGhost?.remove();
        dragRow = null;
        dragGhost = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp, { passive: false });
    });
  }

  function collectPdfData() {
    const rows = getRows().map((row) => ({ ...row, amount: Math.max(0, row.qty * row.unit) }));
    const baseSubtotal = rows.reduce((sum, row) => sum + row.amount, 0);
    const langCount = Number(els.langCount.value || 0);
    const langRate = langCount * 0.3;
    const langFee = Math.round(baseSubtotal * langRate);
    const subtotal = baseSubtotal + langFee;
    const vat = els.vatToggle.checked ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + vat;

    return {
      title: getDocTitle(currentDocType),
      date: els.quoteDate.value || getTodayIso(),
      clientCompany: els.clientCompany.value.trim(),
      clientName: els.clientName.value.trim(),
      clientPhone: els.clientPhone.value.trim(),
      workPeriod: els.workPeriod.value.trim(),
      revCount: els.revCount.value.trim(),
      memo: els.memo.value.trim(),
      langCount,
      langFee,
      baseSubtotal,
      subtotal,
      vat,
      total,
      rows,
      paymentLines: getPaymentLines().slice(),
      agreementHtml: getAgreementHtml(),
      signNote: els.signNote.textContent.trim()
    };
  }

  function buildPageOne(data) {
    const paymentLinesText = data.paymentLines
      .filter((line) => String(line || "").trim())
      .map((line) => `쨌 ${String(line).replace(/^[쨌??-\s]+/, "")}`)
      .join("\n");

    const page = doc.createElement("section");
    page.className = "qa-pdf-page qa-pdf-page-cover";
    page.innerHTML = `
      <div class="qa-pdf-header">
        <div class="qa-pdf-brand">
          <img class="qa-pdf-logo" src="${PDF_LOGO_URL}" alt="?먮줈?쒖뒳 濡쒓퀬" crossorigin="anonymous" referrerpolicy="no-referrer">
          <h1 class="qa-pdf-title">${escapeHtml(data.title)}</h1>
        </div>
        <div class="qa-pdf-date">?묒꽦??: ${escapeHtml(data.date || "-")}</div>
      </div>

      <div class="qa-pdf-meta">
        <div class="qa-pdf-box">
          <h4>?쒖옉???뺣낫</h4>
          <div class="qa-pdf-kv">
            <div class="k">?곹샇紐?/div><div class="v">?먮줈?쒖뒳</div>
            <div class="k">?ъ뾽?먮쾲??/div><div class="v">276-06-02233</div>
            <div class="k">???/div><div class="v">李⑤??? ?좎듅吏?/div>
            <div class="k">?곕씫泥?/div><div class="v">010-7368-7241</div>
          </div>
        </div>
        <div class="qa-pdf-box">
          <h4>?쒖옉 ?붿껌???뺣낫</h4>
          <div class="qa-pdf-kv">
            <div class="k">?쒖옉 ?붿껌??/div><div class="v">${escapeHtml(data.clientCompany || "-")}</div>
            <div class="k">?대떦?먮챸</div><div class="v">${escapeHtml(data.clientName || "-")}</div>
            <div class="k">?대떦???곕씫泥?/div><div class="v">${escapeHtml(data.clientPhone || "-")}</div>
          </div>
        </div>
      </div>

      <table class="qa-pdf-table">
        <colgroup>
          <col style="width: 24%;">
          <col style="width: 36%;">
          <col style="width: 8%;">
          <col style="width: 16%;">
          <col style="width: 16%;">
        </colgroup>
        <thead>
          <tr>
            <th>??ぉ</th>
            <th>?ㅻ챸</th>
            <th class="qa-pdf-num">?섎웾</th>
            <th class="qa-pdf-num">?④?</th>
            <th class="qa-pdf-num">湲덉븸</th>
          </tr>
        </thead>
        <tbody>
          ${data.rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.name)}</td>
              <td>${escapeHtml(row.desc)}</td>
              <td class="qa-pdf-num">${row.qty}</td>
              <td class="qa-pdf-num">${formatKRW(row.unit)}??/td>
              <td class="qa-pdf-num">${formatKRW(row.amount)}??/td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="qa-pdf-subgrid">
        <div class="qa-pdf-note"><strong>?묒뾽 ?쇱젙</strong>
1李??묒뾽 湲곌컙 : ${escapeHtml(data.workPeriod || "-")}
?섏젙 ?잛닔 : ${escapeHtml(data.revCount || "-")}??
<strong>鍮꾧퀬</strong>
${escapeHtml(data.memo || "-")}

<strong>寃곗젣 諛⑸쾿</strong>
<span class="qa-pdf-payment-lines">${escapeHtml(paymentLinesText || "-")}</span></div>
        <div class="qa-pdf-side">
          <div class="qa-pdf-totals">
            <div class="qa-pdf-total-row"><span>湲곕낯 寃ъ쟻</span><strong>${formatKRW(data.baseSubtotal)}??/strong></div>
            <div class="qa-pdf-total-row"><span>?ㅺ뎅??異붽?(30% 횞 ${data.langCount})</span><strong>${formatKRW(data.langFee)}??/strong></div>
            <div class="qa-pdf-total-divider"></div>
            <div class="qa-pdf-total-row"><span>怨듦툒媛??/span><strong>${formatKRW(data.subtotal)}??/strong></div>
            <div class="qa-pdf-total-row"><span>遺媛??VAT 10%)</span><strong>${formatKRW(data.vat)}??/strong></div>
            <div class="qa-pdf-total-divider"></div>
            <div class="qa-pdf-total-row qa-pdf-total-row-grand"><span>珥??⑷퀎</span><strong>${formatKRW(data.total)}??/strong></div>
          </div>
        </div>
      </div>

      <div class="qa-pdf-sign qa-pdf-sign-compact">
        <div class="qa-pdf-sign-note">${escapeHtml(data.signNote || "")}</div>
        <div class="qa-pdf-sign-name">
          ?먮줈?쒖뒳 ???李⑤???(??
          <img src="${PDF_STAMP_URL}" alt="吏곸씤" crossorigin="anonymous" referrerpolicy="no-referrer">
        </div>
      </div>
    `;
    return page;
  }

  function buildPrintRowsHtml(data) {
    return data.rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.desc)}</td>
        <td class="num">${row.qty}</td>
        <td class="num">${formatKRW(row.unit)}??/td>
        <td class="num">${formatKRW(row.amount)}??/td>
      </tr>
    `).join("");
  }

  function buildPaymentLinesHtml(lines) {
    return lines
      .filter((line) => String(line || "").trim())
      .map((line) => `<li>${escapeHtml(String(line).replace(/^[??-\s]+/, ""))}</li>`)
      .join("");
  }

  function buildPrintableDocumentHtml(data) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(createPdfFilename(data))}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #0f172a;
      font-family: "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .doc-page {
      page-break-after: always;
    }
    .doc-page:last-child {
      page-break-after: auto;
    }
    .cover-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
    }
    .brand {
      display: grid;
      gap: 8px;
    }
    .logo {
      width: 84px;
      height: auto;
      display: block;
    }
    h1 {
      margin: 0;
      font-size: 20px;
      line-height: 1.25;
      font-weight: 800;
    }
    .doc-date {
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      white-space: nowrap;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }
    .box {
      border: 1px solid #dbe3f0;
      border-radius: 10px;
      padding: 12px;
    }
    .box h3 {
      margin: 0 0 8px;
      font-size: 12px;
      font-weight: 800;
    }
    .kv {
      display: grid;
      grid-template-columns: 78px 1fr;
      gap: 6px 8px;
      font-size: 11px;
      line-height: 1.5;
    }
    .kv-label {
      color: #64748b;
      font-weight: 700;
    }
    .kv-value {
      font-weight: 700;
      word-break: break-word;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 11px;
    }
    th, td {
      border: 1px solid #dbe3f0;
      padding: 8px 9px;
      vertical-align: top;
      line-height: 1.45;
      word-break: break-word;
    }
    th {
      background: #f8faff;
      text-align: left;
      font-weight: 800;
      color: #475569;
    }
    td.num, th.num {
      text-align: right;
      white-space: nowrap;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 12px;
      margin-top: 12px;
      align-items: start;
    }
    .note-box {
      border: 1px solid #dbe3f0;
      border-radius: 10px;
      padding: 12px;
      font-size: 11px;
      line-height: 1.65;
      white-space: pre-line;
    }
    .note-box strong {
      color: #0f172a;
    }
    .payment-list {
      margin: 6px 0 0 18px;
      padding: 0;
    }
    .payment-list li {
      margin: 0 0 4px;
    }
    .totals {
      border: 1px solid #dbe3f0;
      border-radius: 10px;
      padding: 10px 12px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 0;
      font-size: 11px;
      font-weight: 700;
    }
    .total-row strong {
      white-space: nowrap;
    }
    .total-divider {
      height: 1px;
      background: #dbe3f0;
      margin: 8px 0;
    }
    .total-grand {
      font-size: 13px;
    }
    .sign {
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid #dbe3f0;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: end;
    }
    .sign-note {
      font-size: 11px;
      line-height: 1.55;
      font-weight: 700;
      color: #334155;
    }
    .sign-name {
      position: relative;
      min-width: 180px;
      text-align: right;
      font-size: 12px;
      font-weight: 800;
      padding-right: 12px;
    }
    .stamp {
      position: absolute;
      right: -2px;
      top: -28px;
      width: 58px;
      opacity: 0.92;
    }
    .agreement-wrap {
      page-break-inside: auto;
    }
    .agreement-title {
      margin: 0 0 8px;
      font-size: 17px;
      font-weight: 800;
    }
    .agreement-sub {
      margin: 0 0 18px;
      padding-bottom: 16px;
      border-bottom: 1px solid #dbe3f0;
      font-size: 11px;
      line-height: 1.6;
      color: #475569;
      font-weight: 700;
    }
    .agreement-html {
      font-size: 11px;
      line-height: 1.72;
      color: #334155;
    }
    .agreement-html > *:first-child {
      margin-top: 0;
    }
    .agreement-html > div,
    .agreement-html > p,
    .agreement-html > section,
    .agreement-html > article,
    .agreement-html > blockquote,
    .agreement-html > pre,
    .agreement-html > ul,
    .agreement-html > ol {
      margin: 0 0 8px;
      page-break-inside: avoid;
    }
    .agreement-html ul,
    .agreement-html ol {
      padding-left: 18px;
    }
    .agreement-html li {
      margin: 4px 0;
    }
    .agreement-html a {
      color: #1d4ed8;
      text-decoration: underline;
    }
    .agreement-footer {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #e5e7eb;
      color: #94a3b8;
      font-size: 10px;
      font-weight: 700;
      text-align: right;
    }
  </style>
</head>
<body>
  <main>
    <section class="doc-page">
      <div class="cover-head">
        <div class="brand">
          <img class="logo" src="${PDF_LOGO_URL}" alt="?먮줈?쒖뒳 濡쒓퀬">
          <h1>${escapeHtml(data.title)}</h1>
        </div>
        <div class="doc-date">?묒꽦?? ${escapeHtml(data.date || "-")}</div>
      </div>

      <div class="meta-grid">
        <section class="box">
          <h3>?쒓났???뺣낫</h3>
          <div class="kv">
            <div class="kv-label">?곹샇紐?/div><div class="kv-value">?먮줈?쒖뒳</div>
            <div class="kv-label">?ъ뾽?먮쾲??/div><div class="kv-value">276-06-02233</div>
            <div class="kv-label">???/div><div class="kv-value">李⑤???/div>
            <div class="kv-label">?곕씫泥?/div><div class="kv-value">010-7368-7241</div>
          </div>
        </section>
        <section class="box">
          <h3>怨좉컼 ?뺣낫</h3>
          <div class="kv">
            <div class="kv-label">?섎ː ?낆껜</div><div class="kv-value">${escapeHtml(data.clientCompany || "-")}</div>
            <div class="kv-label">?대떦?먮챸</div><div class="kv-value">${escapeHtml(data.clientName || "-")}</div>
            <div class="kv-label">?곕씫泥?/div><div class="kv-value">${escapeHtml(data.clientPhone || "-")}</div>
          </div>
        </section>
      </div>

      <table>
        <colgroup>
          <col style="width:24%">
          <col style="width:36%">
          <col style="width:8%">
          <col style="width:16%">
          <col style="width:16%">
        </colgroup>
        <thead>
          <tr>
            <th>??ぉ</th>
            <th>?ㅻ챸</th>
            <th class="num">?섎웾</th>
            <th class="num">?④?</th>
            <th class="num">湲덉븸</th>
          </tr>
        </thead>
        <tbody>
          ${buildPrintRowsHtml(data)}
        </tbody>
      </table>

      <div class="summary-grid">
        <section class="note-box"><strong>?묒뾽 ?쇱젙</strong>
1李??묒뾽 湲곌컙 : ${escapeHtml(data.workPeriod || "-")}
?섏젙 ?잛닔 : ${escapeHtml(data.revCount || "-")}
<strong>鍮꾧퀬</strong>
${escapeHtml(data.memo || "-")}

<strong>寃곗젣 諛⑸쾿</strong>
<ul class="payment-list">${buildPaymentLinesHtml(data.paymentLines)}</ul></section>

        <section class="totals">
          <div class="total-row"><span>湲곕낯 寃ъ쟻</span><strong>${formatKRW(data.baseSubtotal)}??/strong></div>
          <div class="total-row"><span>?ㅺ뎅??異붽?(30% 횞 ${data.langCount})</span><strong>${formatKRW(data.langFee)}??/strong></div>
          <div class="total-divider"></div>
          <div class="total-row"><span>怨듦툒媛??/span><strong>${formatKRW(data.subtotal)}??/strong></div>
          <div class="total-row"><span>遺媛??VAT 10%)</span><strong>${formatKRW(data.vat)}??/strong></div>
          <div class="total-divider"></div>
          <div class="total-row total-grand"><span>珥??⑷퀎</span><strong>${formatKRW(data.total)}??/strong></div>
        </section>
      </div>

      <section class="sign">
        <div class="sign-note">${escapeHtml(data.signNote || "")}</div>
        <div class="sign-name">
          ?먮줈?쒖뒳 ???李⑤???(??
          <img class="stamp" src="${PDF_STAMP_URL}" alt="?꾩옣">
        </div>
      </section>
    </section>

    <section class="agreement-wrap">
      <h2 class="agreement-title">?쎄??숈쓽??/h2>
      <p class="agreement-sub">?꾨옒 ?쎄??숈쓽???댁슜??異⑸텇???쎌뼱二쇱꽭?? 怨꾩빟 ?댁슜 誘몄닕吏濡?諛쒖깮??臾몄젣??梨낆엫吏吏 ?딆뒿?덈떎.</p>
      <div class="agreement-html">${data.agreementHtml}</div>
      <div class="agreement-footer">Copyright ???먮줈?쒖뒳 All Rights Reserved.</div>
    </section>
  </main>
  <script>
    window.addEventListener("load", () => {
      const tryPrint = () => {
        window.focus();
        window.print();
      };
      if (document.fonts?.ready) {
        document.fonts.ready.then(tryPrint).catch(tryPrint);
      } else {
        setTimeout(tryPrint, 250);
      }
    });
  </script>
</body>
</html>`;
  }

  function buildAgreementPages(data) {
    const sections = parseAgreementSectionsFromHtml(data.agreementHtml);
    if (!sections.length) return [];

    const pages = [];
    let currentHtml = "";
    let currentLength = 0;
    const maxLength = 3400;

    sections.forEach((section) => {
      const agreementLines = [section.heading, ...section.lines].filter((line) => line && (line.text || line.html));
      const sectionHtml = `
        <section class="qa-pdf-agreement-section qa-pdf-agreement-block">
          ${agreementLines.map((line) => `<div class="qa-pdf-agreement-line">${line.html || escapeHtml(line.text || "")}</div>`).join("")}
        </section>
      `;
      const estimateLength = agreementLines.map((line) => line.text || "").join("").length;
      if (currentHtml && currentLength + estimateLength > maxLength) {
        pages.push(currentHtml);
        currentHtml = "";
        currentLength = 0;
      }
      currentHtml += sectionHtml;
      currentLength += estimateLength;
    });

    if (currentHtml) pages.push(currentHtml);

    return pages.map((content, index) => {
      const page = doc.createElement("section");
      page.className = "qa-pdf-page";
      page.innerHTML = `
        <h2 class="qa-pdf-agreement-title">?쎄??숈쓽??/h2>
        ${index === 0 ? '<p class="qa-pdf-agreement-sub">?쎄??숈쓽???댁슜??瑗쇨세???쎌뼱二쇱꽭?? 怨꾩빟 ?댁슜 誘몄닕吏濡?諛쒖깮??臾몄젣??梨낆엫吏吏 ?딆뒿?덈떎.</p>' : ""}
        ${content}
        <div class="qa-pdf-footer">
          <span>Copyright ???먮줈?쒖뒳 All Rights Reserved.</span>
          <span data-page-number></span>
        </div>
      `;
      return page;
    });
  }

  function buildAgreementPages(data, measureRoot) {
    const sections = parseAgreementSectionsFromHtml(data.agreementHtml);
    if (!sections.length) return [];

    const flatItems = [];
    const sectionHeadings = new Map();

    sections.forEach((section, sectionIndex) => {
      const sectionId = `section-${sectionIndex}`;
      const heading = section.heading && (section.heading.text || section.heading.html)
        ? { ...section.heading, sectionId }
        : null;
      if (heading) {
        const headingItem = buildAgreementLineHtml(heading, true);
        flatItems.push(headingItem);
        sectionHeadings.set(sectionId, headingItem);
      }
      section.lines
        .filter((line) => line && (line.text || line.html))
        .forEach((line) => {
          flatItems.push(buildAgreementLineHtml({ ...line, sectionId }, false));
        });
    });

    const pages = [];
    let currentItems = [];
    let includeIntro = true;

    flatItems.forEach((item) => {
      const candidateItems = [...currentItems, item];
      if (measureAgreementPageFits(measureRoot, candidateItems, includeIntro)) {
        currentItems = candidateItems;
        return;
      }

      if (currentItems.length) {
        pages.push(createAgreementPageElement(renderAgreementItems(currentItems), includeIntro));
        includeIntro = false;
      }

      currentItems = [];
      if (!item.isHeading) {
        const headingItem = sectionHeadings.get(item.sectionId);
        if (headingItem) currentItems.push(headingItem);
      }
      currentItems.push(item);

      if (!measureAgreementPageFits(measureRoot, currentItems, includeIntro) && currentItems.length > 1) {
        pages.push(createAgreementPageElement(renderAgreementItems([currentItems[0]]), includeIntro));
        includeIntro = false;
        currentItems = [item];
      }
    });

    if (currentItems.length) {
      pages.push(createAgreementPageElement(renderAgreementItems(currentItems), includeIntro));
    }

    return pages;
  }

  async function waitForPdfAssets(rootEl) {
    if (document.fonts?.ready) await document.fonts.ready;
    const images = Array.from(rootEl.querySelectorAll("img"));
    await Promise.all(images.map((img) => new Promise((resolve) => {
      if (img.complete) {
        resolve();
        return;
      }
      img.onload = resolve;
      img.onerror = resolve;
    })));
    await new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
  }

  async function exportPdf() {
    if (!validateRequired()) {
      openNoticeModal("시작 요청서의 담당자명, 담당자 연락처를 입력해주세요.");
      return;
    }

    const data = collectPdfData();
    const prevLabel = els.downloadPdfBtn.textContent;
    els.downloadPdfBtn.disabled = true;
    els.downloadPdfBtn.textContent = "PDF 인쇄 준비 중...";

    try {
      const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=900");
      if (!printWindow) {
        openNoticeModal("팝업이 차단되어 인쇄 창을 열지 못했습니다. 이 사이트의 팝업을 허용한 뒤 다시 시도해주세요.");
        return;
      }

      printWindow.document.open();
      printWindow.document.write(buildPrintableDocumentHtml(data));
      printWindow.document.close();
    } catch (error) {
      console.error(error);
      openNoticeModal("PDF 인쇄용 문서를 만드는 중 문제가 발생했습니다.");
    } finally {
      els.downloadPdfBtn.disabled = false;
      els.downloadPdfBtn.textContent = prevLabel;
    }
  }

  function bindEvents() {
    doc.getElementById("historyQuotesBtn")?.addEventListener("click", openPdfHistoryModal);
    doc.getElementById("qaDeleteConfirmBtn")?.addEventListener("click", async () => {
      const modal = ensureDeleteConfirmModal();
      const targetId = modal.dataset.targetId;
      if (!targetId) {
        modal.classList.add("hidden");
        return;
      }
      await deletePdfHistoryRecord(targetId);
      delete modal.dataset.targetId;
      modal.classList.add("hidden");
      await renderPdfHistoryList();
    });
    els.addRowBtn.addEventListener("click", () => addRow({ qty: 1, unit: 0 }));
    els.saveRowPresetBtn?.addEventListener("click", saveRowPreset);
    els.loadRowPresetBtn?.addEventListener("click", loadRowPreset);
    els.downloadPdfBtn.addEventListener("click", exportPdf);

    els.agreementEditBtn.addEventListener("click", () => {
      agreementEditable = true;
      syncAgreementEditor();
      els.agreementContent.focus();
    });

    els.agreementSaveBtn.addEventListener("click", async () => {
      quoteSettings.agreementHtml = getAgreementHtml();
      const saved = await persistQuoteSettingsWithFeedback("??μ씠 ?꾨즺?섏뿀?듬땲??", "?쎄??숈쓽????μ뿉 ?ㅽ뙣?덉뒿?덈떎.");
      if (!saved) return;
      agreementEditable = false;
      syncAgreementEditor();
    });

    els.agreementBoldBtn.addEventListener("click", () => {
      els.agreementContent.focus();
      doc.execCommand("bold");
    });

    els.termsEditBtn.addEventListener("click", () => {
      termsEditable = true;
      syncTermsEditor();
    });

    els.termsSaveBtn.addEventListener("click", async () => {
      const key = isKrmongDoc(currentDocType) ? "kmong" : "normal";
      quoteSettings.paymentLines[key] = els.termsEditor.value.split("\n");
      const saved = await persistQuoteSettingsWithFeedback("??μ씠 ?꾨즺?섏뿀?듬땲??", "寃곗젣 諛⑸쾿 ??μ뿉 ?ㅽ뙣?덉뒿?덈떎.");
      if (!saved) return;
      termsEditable = false;
      renderTerms();
      syncTermsEditor();
    });

    els.docButtons.forEach((button) => {
      button.addEventListener("click", () => setDocType(button.dataset.doc));
    });

    [els.clientCompany, els.clientName, els.clientPhone].forEach((field) => {
      field.addEventListener("input", validateRequired);
    });

    [els.workPeriod, els.revCount, els.memo].forEach((field) => {
      field.addEventListener("input", calc);
    });

    els.agreementContent.addEventListener("input", calc);
    els.agreementContent.addEventListener("paste", (event) => {
      if (!agreementEditable) return;
      event.preventDefault();
      const pastedText = event.clipboardData?.getData("text/plain") || "";
      insertAgreementTextAtCursor(pastedText);
      calc();
    });
    els.langCount.addEventListener("change", calc);
    els.vatToggle.addEventListener("change", calc);
    els.revCount.addEventListener("input", () => {
      els.revCount.value = String(els.revCount.value || "").replace(/[^\d]/g, "");
    });
  }

  function init() {
    ensureHistoryButton();
    ensureHistoryModal();
    ensurePdfViewerModal();
    ensureDeleteConfirmModal();
    els.quoteDate.value = els.quoteDate.value || getTodayIso();
    quoteSettings = normalizeQuoteSettings(quoteSettings);
    els.agreementContent.innerHTML = quoteSettings.agreementHtml || agreementTextToHtml(TERMS_TEMPLATE);
    DEFAULT_ROWS.forEach(addRow);
    initSortable();
    bindEvents();
    syncTermsEditor();
    syncAgreementEditor();
    setDocType("estimate");
    calc();
    validateRequired();
    pruneOldPdfHistory().catch((error) => console.error(error));
    loadQuoteSettingsFromSupabase().catch((error) => {
      console.warn("寃ъ쟻 ?ㅼ젙??Supabase?먯꽌 遺덈윭?ㅼ? 紐삵뻽?듬땲??", error);
    });
    const bridge = getSupabaseBridge();
    bridge?.onAuthStateChange?.((event, session) => {
      if (session) {
        loadQuoteSettingsFromSupabase().catch((error) => {
          console.warn("濡쒓렇????寃ъ쟻 ?ㅼ젙???ㅼ떆 遺덈윭?ㅼ? 紐삵뻽?듬땲??", error);
        });
      }
    });
  }

  init();
})();

