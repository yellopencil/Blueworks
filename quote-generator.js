(function () {
  const doc = document;
  const root = doc.getElementById("quoteApp");
  if (!root) return;

  const TERMS_TEMPLATE = `[제1조] 계약서
- 웹사이트 계약서는 제작 요청사가 웹사이트 제작 서비스를 이용하는 날짜, 기간, 금액 등을 확약하는 계약서입니다.
- 제작 요청사는 약관동의서 내용을 숙지하여 계약을 결정하였으며 제공되는 서비스가 상담 내용에 반하지 않는 한 본 약관동의서의 내용을 준용합니다.

[제2조] 정보 제공 동의
- 제작사는 원활한 사이트 제작을 위해 제작 요청사의 정보를 요구할 수 있으며 제작 요청사는 정보 제공을 동의합니다.
- 제작사는 제공받은 제작 요청사의 정보를 웹사이트 제작, 계약 이외의 목적으로 사용하지 않습니다.

[제3조] 제작 내용
- 웹사이트 제작 솔루션은 아임웹을 이용합니다.
- 300만원 이하 결제건은 100% 선입금이며 입금일 다음날부터 자료 준비 및 작업이 시작됩니다.
- 1차 제작(PC버전) 완료일은 계약서에 기재된 기한대로 진행됩니다.
- PC 버전 검수 완료 후 모바일 최적화 작업을 시작하며 영업일 기준 최대 5일 이내 완료됩니다.
- 도메인 및 아임웹 호스팅, SSL 보안인증서 비용은 별도입니다.

[제4조] 제공
- 계약서에 기재된 금액은 맞춤 디자인, 웹사이트 제작, 모바일 최적화, SEO 최적화, 반응형, A/S를 포함한 금액입니다.
- 작업물의 사용권과 소유권은 100% 제작 요청사에 있으며, 저작권은 제작사에 있습니다.

[제5조] 자료 제공
- 웹사이트 제작에 필요한 로고, 내용, 사진, 영상 등은 저작권법에 어긋나지 않는 자료로 보내주셔야 합니다.
- 이미지 준비가 어려우실 경우 상업적 사용이 가능한 스톡 이미지를 최대 10장 제공합니다.
- 작업에 필요한 자료는 결제 후 7일 이내 전달해주셔야 합니다.

[제6조] 수정
- PC 1차 제작 완료 후 검수 및 수정 요청이 가능합니다.
- 수정 횟수는 계약서에 기재된 횟수 내에서 가능하며 여러 요청을 한 번에 묶어 전달해주시면 1회로 처리됩니다.
- 작업물의 50% 이상 수정 요청 시 제작사는 수정 거부 또는 추가 비용을 청구할 수 있습니다.

[제7조] 제3자 판매
- 에이전시 및 대행사가 제3자의 제작을 대행할 수 있으나 차익 취득에 따른 문제는 제작사에서 책임지지 않습니다.
- 작업물의 디자인 저작권은 제작사에 귀속됩니다.

[제8조] 사후 관리
- 제작 완료 후 홈페이지 관리에 대한 책임은 제작 요청사에 있습니다.

[제9조] 취소 및 환불
- 제작사의 귀책 시 100% 환불됩니다.
- 제작 요청사는 특별한 사유 없이 제작 중도 취소 및 환불이 불가합니다.
- 결제 후 자료 준비 기간 중이라도 사전 작업량에 따라 부분 환불만 가능합니다.

[제10조] 계약의 유효
- 옐로펜슬의 모든 상품 계약은 본 약관에 동의 후 결제가 완료되면 계약이 성사됩니다.`;

  const DEFAULT_ROWS = [
    { name: "구축 및 웹디자인", desc: "메인페이지 1P + 서브페이지 6P", qty: 1, unit: 1400000 },
    { name: "디자인 최적화", desc: "PC · MOBILE 최적화", qty: 1, unit: 0 },
    { name: "검색엔진 최적화", desc: "SEO · GEO · AEO 작업", qty: 1, unit: 0 },
    { name: "기획", desc: "UX/UI 설계 · 가독성 작업", qty: 1, unit: 0 },
    { name: "비주얼 콘텐츠", desc: "스톡 이미지 · AI 생성 비주얼 콘텐츠 제공", qty: 1, unit: 0 },
    { name: "결제 모듈", desc: "결제 모듈(PG) 연동 및 세팅", qty: 1, unit: 200000 },
    { name: "추가 서비스", desc: "작업 페이지 추가", qty: 1, unit: 100000 }
  ];

  const PAYMENT_LINES = {
    normal: [
      "계좌이체 및 신용카드로 결제가 가능합니다.",
      "세금계산서가 필요하신 경우 사업자등록증과 이메일을 전달해주세요.",
      "카드 결제 요청 시 결제 링크를 전달드립니다.",
      "계좌번호 : 3333-01-8399628 / 카카오뱅크, 신승진",
      "",
      "상기 견적은 요청 범위 기준으로 산정되었으며, 범위 변경 시 금액이 조정될 수 있습니다.",
      "호스팅, 도메인, SSL 비용은 별도입니다."
    ],
    kmong: [
      "크몽 의뢰인의 경우 크몽 안심 결제로 진행합니다.",
      "",
      "상기 견적은 요청 범위 기준으로 산정되었으며, 범위 변경 시 금액이 조정될 수 있습니다.",
      "호스팅, 도메인, SSL 비용은 별도입니다."
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
    return isContractDoc(type) ? "홈페이지 제작 계약서" : "홈페이지 제작 견적서";
  }

  function getDocTypeLabel(type) {
    switch (String(type || "")) {
      case "estimate":
        return "견적서";
      case "contract":
        return "계약서";
      case "estimate_krmong":
        return "견적서(크몽)";
      case "contract_krmong":
        return "계약서(크몽)";
      default:
        return isContractDoc(type) ? "계약서" : "견적서";
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
    const agreementSource = String(raw?.agreementHtml || fallback.agreementHtml || "").trim() || fallback.agreementHtml;
    return {
      agreementHtml: sanitizeAgreementHtml(agreementSource),
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
      console.warn("견적 설정을 불러오지 못했습니다.", error);
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
    if (bridge.cachedSession?.access_token) return true;
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
        console.warn("견적 설정을 Supabase에 저장하지 못했습니다.", error);
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
      openNoticeModal(`${failurePrefix}\n${error?.message || "저장 중 오류가 발생했습니다."}`);
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
          <button id="qaNoticeConfirmBtn" type="button" class="qa-btn qa-btn-primary">확인</button>
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
    button.textContent = "지난 견적 · 계약서";
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
            <h3 id="qaHistoryTitle" class="qa-history-title">지난 견적 · 계약서</h3>
            <p class="qa-history-sub">이전에 내보낸 PDF 파일을 확인하고 다시 내려받거나 바로 볼 수 있습니다.</p>
          </div>
          <button id="qaHistoryCloseBtn" type="button" class="qa-btn qa-btn-subtle qa-history-close">닫기</button>
        </div>
        <div class="qa-history-search">
          <input id="qaHistorySearchInput" type="text" class="qa-input" placeholder="제작 요청사, 담당자명, 담당자 연락처로 검색">
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
          <h3 id="qaPdfViewerTitle" class="qa-history-title">견적서 미리보기</h3>
          <button id="qaPdfViewerCloseBtn" type="button" class="qa-btn qa-btn-subtle qa-history-close">닫기</button>
        </div>
        <div class="qa-pdf-viewer-body">
          <iframe id="qaPdfViewerFrame" title="PDF 미리보기"></iframe>
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
        <p id="qaDeleteConfirmMessage" class="qa-modal-message qa-modal-message-multiline">정말 삭제하시겠습니까?</p>
        <div class="qa-confirm-actions">
          <button id="qaDeleteCancelBtn" type="button" class="qa-btn qa-btn-subtle">취소</button>
          <button id="qaDeleteConfirmBtn" type="button" class="qa-btn qa-btn-primary">삭제</button>
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

  const PDF_PAGE_SIZE = { width: 595.28, height: 841.89 };
  const PDF_MARGIN = { top: 42, right: 42, bottom: 40, left: 42 };
  const PDF_ASSET_CACHE = new Map();

  function uniqueTextCharacters(value) {
    return Array.from(new Set(Array.from(String(value || "")))).join("");
  }

  function stripHtmlText(value) {
    const temp = doc.createElement("div");
    temp.innerHTML = String(value || "");
    return temp.textContent || "";
  }

  function collectAgreementPdfBlocks(html) {
    const temp = doc.createElement("div");
    temp.innerHTML = html || "";
    const blocks = [];

    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        String(node.textContent || "")
          .replace(/\r\n?/g, "\n")
          .split("\n")
          .forEach((line) => {
            const text = line.trim();
            if (text) {
              blocks.push({ text, kind: /^\[\s*제\s*\d+조\]/.test(text) ? "heading" : "body" });
            } else {
              blocks.push({ text: "", kind: "spacer" });
            }
          });
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tagName = node.tagName.toUpperCase();

      if (["UL", "OL"].includes(tagName)) {
        Array.from(node.children).forEach((child, index) => {
          const bulletText = stripHtmlText(child.innerHTML).trim();
          if (!bulletText) return;
          const prefix = tagName === "OL" ? `${index + 1}. ` : "- ";
          blocks.push({ text: `${prefix}${bulletText}`, kind: "body" });
        });
        blocks.push({ text: "", kind: "spacer" });
        return;
      }

      const text = stripHtmlText(node.innerHTML).trim();
      if (!text) {
        blocks.push({ text: "", kind: "spacer" });
        return;
      }
      blocks.push({ text, kind: /^\[\s*제\s*\d+조\]/.test(text) ? "heading" : "body" });
    });

    return blocks;
  }

  function buildPdfFontSeed(data) {
    const staticText = [
      "옐로펜슬",
      "웹사이트 제작 견적서",
      "웹사이트 제작 계약서",
      "작성일",
      "시작자 정보",
      "시작 요청자 정보",
      "상호명",
      "사업자번호",
      "대표",
      "연락처",
      "담당자명",
      "작업 일정",
      "수정 횟수",
      "비고",
      "결제 방법",
      "기본 견적",
      "다국어 추가",
      "공급가액",
      "부가세",
      "총 합계",
      "약관동의서",
      "아래 약관동의서 내용을 충분히 읽어주세요. 계약 내용 미숙지로 발생한 문제는 책임지지 않습니다.",
      "Copyright ⓒ 옐로펜슬 All Rights Reserved.",
    ].join("\n");

    const dynamicText = [
      data.title,
      data.date,
      data.clientCompany,
      data.clientName,
      data.clientPhone,
      data.workPeriod,
      data.revCount,
      data.memo,
      data.signNote,
      ...data.paymentLines,
      ...data.rows.flatMap((row) => [
        row.name,
        row.desc,
        String(row.qty),
        formatKRW(row.unit),
        formatKRW(row.amount),
      ]),
      ...collectAgreementPdfBlocks(data.agreementHtml).map((block) => block.text),
      `${formatKRW(data.baseSubtotal)}원`,
      `${formatKRW(data.langFee)}원`,
      `${formatKRW(data.subtotal)}원`,
      `${formatKRW(data.vat)}원`,
      `${formatKRW(data.total)}원`,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 [](){}<>-_=+/*%:;,.?&@#'\"!~|\\",
    ].join("\n");

    return uniqueTextCharacters(`${staticText}\n${dynamicText}`);
  }

  async function fetchBinaryAsset(url, asText = false) {
    if (!url) throw new Error("요청할 자산 주소가 없습니다.");
    const cacheKey = `${asText ? "text" : "bin"}:${url}`;
    if (!PDF_ASSET_CACHE.has(cacheKey)) {
      PDF_ASSET_CACHE.set(cacheKey, (async () => {
        const response = await fetch(url, { cache: "force-cache", mode: "cors" });
        if (!response.ok) {
          throw new Error(`자산을 불러오지 못했습니다. (${response.status})`);
        }
        if (asText) return response.text();
        return new Uint8Array(await response.arrayBuffer());
      })());
    }
    const asset = await PDF_ASSET_CACHE.get(cacheKey);
    return asText ? asset : asset.slice();
  }

  function extractGoogleFontUrl(cssText) {
    const match = String(cssText || "").match(/url\(([^)]+)\)\s*format\(['"]?(woff2|woff|truetype|opentype)['"]?\)/i) ||
      String(cssText || "").match(/url\(([^)]+)\)/i);
    if (!match) return "";
    return String(match[1] || "").replace(/^['"]|['"]$/g, "").trim();
  }

  async function fetchGoogleFontSubset(weight, textSeed) {
    const uniqueChars = uniqueTextCharacters(textSeed);
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&display=swap&text=${encodeURIComponent(uniqueChars)}`;
    const cssText = await fetchBinaryAsset(cssUrl, true);
    const fontUrl = extractGoogleFontUrl(cssText);
    if (!fontUrl) {
      throw new Error("한글 PDF 폰트 주소를 찾지 못했습니다.");
    }
    return fetchBinaryAsset(fontUrl, false);
  }

  function wrapPdfText(text, font, size, maxWidth) {
    const paragraphs = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
    const lines = [];

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const normalized = paragraph.replace(/\t/g, "    ");
      if (!normalized) {
        lines.push("");
        return;
      }

      let current = "";
      Array.from(normalized).forEach((char) => {
        const candidate = current + char;
        if (!current || font.widthOfTextAtSize(candidate, size) <= maxWidth) {
          current = candidate;
          return;
        }
        lines.push(current);
        current = char;
      });
      if (current) lines.push(current);
      if (paragraphIndex < paragraphs.length - 1 && !paragraphs[paragraphIndex + 1]) {
        lines.push("");
      }
    });

    return lines.length ? lines : [""];
  }

  function drawWrappedPdfText(page, text, x, topY, options) {
    const {
      font,
      size,
      maxWidth,
      lineHeight = size * 1.5,
      color,
    } = options;
    const lines = wrapPdfText(text, font, size, maxWidth);
    let y = topY;
    lines.forEach((line) => {
      if (line) {
        page.drawText(line, { x, y, font, size, color });
      }
      y -= lineHeight;
    });
    return {
      bottomY: y,
      renderedHeight: lines.length * lineHeight,
      lines,
      lineHeight,
    };
  }

  function drawPdfRect(page, x, yTop, width, height, style) {
    page.drawRectangle({
      x,
      y: yTop - height,
      width,
      height,
      borderWidth: style.borderWidth || 1,
      borderColor: style.borderColor,
      color: style.fillColor,
      opacity: style.opacity ?? 1,
      borderOpacity: style.borderOpacity ?? 1,
    });
  }

  function drawPdfInfoBox(page, title, rows, x, yTop, width, fonts, palette) {
    const titleHeight = 16;
    const rowGap = 4;
    const bodyLineHeight = 13;
    const labelWidth = 70;
    const innerX = x + 12;
    const innerWidth = width - 24;
    const valueWidth = innerWidth - labelWidth - 8;

    const measuredRows = rows.map((row) => {
      const valueLines = wrapPdfText(row.value || "-", fonts.regular, 10, valueWidth);
      return { ...row, valueLines, height: Math.max(bodyLineHeight, valueLines.length * bodyLineHeight) };
    });

    const boxHeight = 16 + titleHeight + measuredRows.reduce((sum, row) => sum + row.height, 0) + rowGap * Math.max(0, measuredRows.length - 1) + 12;
    drawPdfRect(page, x, yTop, width, boxHeight, {
      borderColor: palette.border,
      fillColor: palette.white,
      borderWidth: 1,
    });

    page.drawText(title, {
      x: innerX,
      y: yTop - 16,
      font: fonts.bold,
      size: 11,
      color: palette.text,
    });

    let currentY = yTop - 34;
    measuredRows.forEach((row) => {
      page.drawText(row.label, {
        x: innerX,
        y: currentY,
        font: fonts.bold,
        size: 9.5,
        color: palette.muted,
      });

      drawWrappedPdfText(page, row.value || "-", innerX + labelWidth + 8, currentY, {
        font: fonts.regular,
        size: 10,
        maxWidth: valueWidth,
        lineHeight: bodyLineHeight,
        color: palette.text,
      });
      currentY -= row.height + rowGap;
    });

    return yTop - boxHeight;
  }

  function drawPdfTable(page, data, startY, fonts, palette) {
    const x = PDF_MARGIN.left;
    const widths = [120, 175, 42, 82, 94];
    const headerHeight = 24;
    const rowPaddingY = 7;
    const cellPaddingX = 7;
    const bodyLineHeight = 12;
    const totalWidth = widths.reduce((sum, width) => sum + width, 0);

    drawPdfRect(page, x, startY, totalWidth, headerHeight, {
      borderColor: palette.border,
      fillColor: palette.headerFill,
      borderWidth: 1,
    });

    const headers = ["항목", "설명", "수량", "단가", "금액"];
    let cursorX = x;
    headers.forEach((header, index) => {
      if (index > 0) {
        page.drawLine({
          start: { x: cursorX, y: startY },
          end: { x: cursorX, y: startY - headerHeight },
          thickness: 1,
          color: palette.border,
        });
      }
      page.drawText(header, {
        x: cursorX + cellPaddingX,
        y: startY - 16,
        font: fonts.bold,
        size: 10,
        color: palette.text,
      });
      cursorX += widths[index];
    });

    let currentY = startY - headerHeight;
    data.rows.forEach((row) => {
      const rowLines = [
        wrapPdfText(row.name, fonts.regular, 10, widths[0] - cellPaddingX * 2),
        wrapPdfText(row.desc, fonts.regular, 10, widths[1] - cellPaddingX * 2),
        wrapPdfText(String(row.qty), fonts.regular, 10, widths[2] - cellPaddingX * 2),
        wrapPdfText(formatKRW(row.unit), fonts.regular, 10, widths[3] - cellPaddingX * 2),
        wrapPdfText(`${formatKRW(row.amount)}원`, fonts.regular, 10, widths[4] - cellPaddingX * 2),
      ];
      const maxLines = Math.max(...rowLines.map((lines) => lines.length));
      const rowHeight = maxLines * bodyLineHeight + rowPaddingY * 2;

      drawPdfRect(page, x, currentY, totalWidth, rowHeight, {
        borderColor: palette.border,
        fillColor: palette.white,
        borderWidth: 1,
      });

      let rowX = x;
      rowLines.forEach((lines, columnIndex) => {
        if (columnIndex > 0) {
          page.drawLine({
            start: { x: rowX, y: currentY },
            end: { x: rowX, y: currentY - rowHeight },
            thickness: 1,
            color: palette.border,
          });
        }

        const isNumeric = columnIndex >= 2;
        const alignedX = isNumeric ? rowX + widths[columnIndex] - cellPaddingX : rowX + cellPaddingX;
        const blockY = currentY - rowPaddingY - 10;

        lines.forEach((line, lineIndex) => {
          const lineWidth = fonts.regular.widthOfTextAtSize(line || "", 10);
          page.drawText(line || "", {
            x: isNumeric ? alignedX - lineWidth : alignedX,
            y: blockY - lineIndex * bodyLineHeight,
            font: fonts.regular,
            size: 10,
            color: palette.text,
          });
        });

        rowX += widths[columnIndex];
      });

      currentY -= rowHeight;
    });

    return currentY;
  }

  function buildPdfSummaryBlocks(data) {
    return [
      { label: "작업 일정", value: data.workPeriod || "-" },
      { label: "수정 횟수", value: data.revCount || "-" },
      { label: "비고", value: data.memo || "-" },
      { label: "결제 방법", value: data.paymentLines.filter((line) => String(line || "").trim()).join("\n") || "-" },
    ];
  }

  function drawPdfSummaryBox(page, title, blocks, x, yTop, width, fonts, palette) {
    const innerX = x + 12;
    const innerWidth = width - 24;
    const titleHeight = 14;
    const sectionGap = 8;
    let bodyHeight = 0;

    const measured = blocks.map((block) => {
      const labelHeight = 12;
      const valueLines = wrapPdfText(block.value || "-", fonts.regular, 10, innerWidth);
      const valueHeight = Math.max(12, valueLines.length * 13);
      const height = labelHeight + 2 + valueHeight;
      bodyHeight += height;
      return { ...block, valueLines, height };
    });

    bodyHeight += sectionGap * Math.max(0, measured.length - 1);
    const boxHeight = 16 + titleHeight + bodyHeight + 12;

    drawPdfRect(page, x, yTop, width, boxHeight, {
      borderColor: palette.border,
      fillColor: palette.white,
      borderWidth: 1,
    });

    page.drawText(title, {
      x: innerX,
      y: yTop - 16,
      font: fonts.bold,
      size: 11,
      color: palette.text,
    });

    let currentY = yTop - 34;
    measured.forEach((block, index) => {
      page.drawText(block.label, {
        x: innerX,
        y: currentY,
        font: fonts.bold,
        size: 9.5,
        color: palette.muted,
      });
      currentY -= 14;
      block.valueLines.forEach((line) => {
        if (line) {
          page.drawText(line, {
            x: innerX,
            y: currentY,
            font: fonts.regular,
            size: 10,
            color: palette.text,
          });
        }
        currentY -= 13;
      });
      if (index < measured.length - 1) currentY -= sectionGap;
    });

    return yTop - boxHeight;
  }

  function drawPdfTotalsBox(page, data, x, yTop, width, fonts, palette) {
    const rows = [
      { label: "기본 견적", value: `${formatKRW(data.baseSubtotal)}원` },
      { label: `다국어 추가 (${data.langCount}개)`, value: `${formatKRW(data.langFee)}원` },
      { label: "공급가액", value: `${formatKRW(data.subtotal)}원`, strong: true },
      { label: "부가세 (VAT 10%)", value: `${formatKRW(data.vat)}원`, strong: true },
      { label: "총 합계", value: `${formatKRW(data.total)}원`, strong: true, grand: true },
    ];

    const boxHeight = 16 + rows.length * 22 + 10;
    drawPdfRect(page, x, yTop, width, boxHeight, {
      borderColor: palette.border,
      fillColor: palette.white,
      borderWidth: 1,
    });

    page.drawText("합계", {
      x: x + 12,
      y: yTop - 16,
      font: fonts.bold,
      size: 11,
      color: palette.text,
    });

    let currentY = yTop - 40;
    rows.forEach((row, index) => {
      const font = row.strong ? fonts.bold : fonts.regular;
      const size = row.grand ? 13 : 10.5;
      const valueWidth = font.widthOfTextAtSize(row.value, size);
      page.drawText(row.label, {
        x: x + 12,
        y: currentY,
        font,
        size,
        color: row.grand ? palette.accent : palette.text,
      });
      page.drawText(row.value, {
        x: x + width - 12 - valueWidth,
        y: currentY,
        font,
        size,
        color: row.grand ? palette.accent : palette.text,
      });
      currentY -= 20;
      if (index === 1 || index === 3) {
        page.drawLine({
          start: { x: x + 12, y: currentY + 6 },
          end: { x: x + width - 12, y: currentY + 6 },
          thickness: 1,
          color: palette.border,
        });
      }
    });

    return yTop - boxHeight;
  }

  async function embedPdfPng(pdfDoc, url) {
    try {
      const bytes = await fetchBinaryAsset(url, false);
      return await pdfDoc.embedPng(bytes);
    } catch (error) {
      console.warn("PDF 이미지 자산을 불러오지 못했습니다.", url, error);
      return null;
    }
  }

  async function loadPdfFonts(pdfDoc, data) {
    if (!window.fontkit) {
      throw new Error("PDF 폰트 엔진을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    }
    pdfDoc.registerFontkit(window.fontkit);
    const fontSeed = buildPdfFontSeed(data);
    const [regularBytes, boldBytes] = await Promise.all([
      fetchGoogleFontSubset(400, fontSeed),
      fetchGoogleFontSubset(700, fontSeed),
    ]);
    const [regular, bold] = await Promise.all([
      pdfDoc.embedFont(regularBytes, { subset: true }),
      pdfDoc.embedFont(boldBytes, { subset: true }),
    ]);
    return { regular, bold };
  }

  function addPdfFooters(pdfDoc, fonts, palette) {
    const pages = pdfDoc.getPages();
    pages.forEach((page, index) => {
      const text = `${index + 1} / ${pages.length}`;
      const size = 9;
      const width = fonts.regular.widthOfTextAtSize(text, size);
      page.drawText(text, {
        x: PDF_PAGE_SIZE.width - PDF_MARGIN.right - width,
        y: 18,
        font: fonts.regular,
        size,
        color: palette.muted,
      });
      page.drawText("Copyright ⓒ 옐로펜슬 All Rights Reserved.", {
        x: PDF_MARGIN.left,
        y: 18,
        font: fonts.regular,
        size: 8.5,
        color: palette.muted,
      });
    });
  }

  function createPdfPalette(rgb) {
    return {
      text: rgb(0.07, 0.09, 0.16),
      muted: rgb(0.39, 0.45, 0.56),
      border: rgb(0.86, 0.89, 0.94),
      headerFill: rgb(0.96, 0.97, 0.99),
      white: rgb(1, 1, 1),
      accent: rgb(0.14, 0.35, 0.86),
    };
  }

  function drawPdfAgreementPages(pdfDoc, data, fonts, palette) {
    const blocks = collectAgreementPdfBlocks(data.agreementHtml);
    if (!blocks.length) return;

    let page = pdfDoc.addPage([PDF_PAGE_SIZE.width, PDF_PAGE_SIZE.height]);
    let y = PDF_PAGE_SIZE.height - PDF_MARGIN.top;
    const contentWidth = PDF_PAGE_SIZE.width - PDF_MARGIN.left - PDF_MARGIN.right;

    const startAgreementPage = (isFirstPage) => {
      page.drawText("약관동의서", {
        x: PDF_MARGIN.left,
        y,
        font: fonts.bold,
        size: 18,
        color: palette.text,
      });
      y -= 24;
      if (isFirstPage) {
        const intro = "아래 약관동의서 내용을 충분히 읽어주세요. 계약 내용 미숙지로 발생한 문제는 책임지지 않습니다.";
        const introBlock = drawWrappedPdfText(page, intro, PDF_MARGIN.left, y, {
          font: fonts.regular,
          size: 10.5,
          maxWidth: contentWidth,
          lineHeight: 15,
          color: palette.muted,
        });
        y = introBlock.bottomY - 10;
      } else {
        y -= 4;
      }
    };

    startAgreementPage(true);

    blocks.forEach((block) => {
      const isHeading = block.kind === "heading";
      const isSpacer = block.kind === "spacer";
      if (isSpacer) {
        y -= 8;
        if (y < PDF_MARGIN.bottom + 32) {
          page = pdfDoc.addPage([PDF_PAGE_SIZE.width, PDF_PAGE_SIZE.height]);
          y = PDF_PAGE_SIZE.height - PDF_MARGIN.top;
          startAgreementPage(false);
        }
        return;
      }

      const font = isHeading ? fonts.bold : fonts.regular;
      const size = isHeading ? 11.5 : 10.5;
      const lineHeight = isHeading ? 16 : 15;
      const lines = wrapPdfText(block.text, font, size, contentWidth);
      const blockHeight = lines.length * lineHeight;
      if (y - blockHeight < PDF_MARGIN.bottom + 18) {
        page = pdfDoc.addPage([PDF_PAGE_SIZE.width, PDF_PAGE_SIZE.height]);
        y = PDF_PAGE_SIZE.height - PDF_MARGIN.top;
        startAgreementPage(false);
      }

      const rendered = drawWrappedPdfText(page, block.text, PDF_MARGIN.left, y, {
        font,
        size,
        maxWidth: contentWidth,
        lineHeight,
        color: palette.text,
      });
      y = rendered.bottomY - (isHeading ? 8 : 4);
    });
  }

  async function buildDownloadablePdfBlob(data) {
    if (!window.PDFLib?.PDFDocument) {
      throw new Error("PDF 생성 엔진을 아직 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    }

    const { PDFDocument, rgb } = window.PDFLib;
    const pdfDoc = await PDFDocument.create();
    const palette = createPdfPalette(rgb);
    const fonts = await loadPdfFonts(pdfDoc, data);
    const [logoImage, stampImage] = await Promise.all([
      embedPdfPng(pdfDoc, PDF_LOGO_URL),
      embedPdfPng(pdfDoc, PDF_STAMP_URL),
    ]);

    const page = pdfDoc.addPage([PDF_PAGE_SIZE.width, PDF_PAGE_SIZE.height]);
    const contentWidth = PDF_PAGE_SIZE.width - PDF_MARGIN.left - PDF_MARGIN.right;
    let y = PDF_PAGE_SIZE.height - PDF_MARGIN.top;

    if (logoImage) {
      const logoWidth = 82;
      const scale = logoWidth / logoImage.width;
      const logoHeight = logoImage.height * scale;
      page.drawImage(logoImage, {
        x: PDF_MARGIN.left,
        y: y - logoHeight + 4,
        width: logoWidth,
        height: logoHeight,
      });
      y -= logoHeight + 10;
    }

    page.drawText(data.title, {
      x: PDF_MARGIN.left,
      y,
      font: fonts.bold,
      size: 20,
      color: palette.text,
    });
    const dateText = `작성일 : ${data.date || "-"}`;
    const dateSize = 10.5;
    const dateWidth = fonts.bold.widthOfTextAtSize(dateText, dateSize);
    page.drawText(dateText, {
      x: PDF_PAGE_SIZE.width - PDF_MARGIN.right - dateWidth,
      y: y + 2,
      font: fonts.bold,
      size: dateSize,
      color: palette.muted,
    });
    y -= 26;

    const infoTop = y;
    const boxGap = 12;
    const boxWidth = (contentWidth - boxGap) / 2;
    const companyBottom = drawPdfInfoBox(page, "시작자 정보", [
      { label: "상호명", value: "옐로펜슬" },
      { label: "사업자번호", value: "276-06-02233" },
      { label: "대표", value: "차민석" },
      { label: "연락처", value: "010-7368-7241" },
    ], PDF_MARGIN.left, infoTop, boxWidth, fonts, palette);
    const clientBottom = drawPdfInfoBox(page, "시작 요청자 정보", [
      { label: "시작 요청자", value: data.clientCompany || "-" },
      { label: "담당자명", value: data.clientName || "-" },
      { label: "담당자 연락처", value: data.clientPhone || "-" },
    ], PDF_MARGIN.left + boxWidth + boxGap, infoTop, boxWidth, fonts, palette);
    y = Math.min(companyBottom, clientBottom) - 16;

    y = drawPdfTable(page, data, y, fonts, palette) - 16;

    const summaryWidth = contentWidth * 0.58;
    const totalsWidth = contentWidth - summaryWidth - boxGap;
    const summaryBottom = drawPdfSummaryBox(page, "작업 정보", buildPdfSummaryBlocks(data), PDF_MARGIN.left, y, summaryWidth, fonts, palette);
    const totalsBottom = drawPdfTotalsBox(page, data, PDF_MARGIN.left + summaryWidth + boxGap, y, totalsWidth, fonts, palette);
    y = Math.min(summaryBottom, totalsBottom) - 16;

    page.drawText(data.signNote || "", {
      x: PDF_MARGIN.left,
      y,
      font: fonts.regular,
      size: 10.5,
      color: palette.text,
    });
    y -= 18;
    const signText = "옐로펜슬 대표 차민석 (인)";
    page.drawText(signText, {
      x: PDF_MARGIN.left,
      y,
      font: fonts.bold,
      size: 12,
      color: palette.text,
    });
    if (stampImage) {
      const stampWidth = 64;
      const scale = stampWidth / stampImage.width;
      const stampHeight = stampImage.height * scale;
      page.drawImage(stampImage, {
        x: PDF_MARGIN.left + fonts.bold.widthOfTextAtSize(signText, 12) + 10,
        y: y - stampHeight / 2 + 6,
        width: stampWidth,
        height: stampHeight,
      });
    }

    drawPdfAgreementPages(pdfDoc, data, fonts, palette);
    addPdfFooters(pdfDoc, fonts, palette);

    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    });
    return new Blob([pdfBytes], { type: "application/pdf" });
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
    if (title.includes("계약서")) return "계약서";
    return "견적서";
  }

  async function renderPdfHistoryList() {
    const modal = ensureHistoryModal();
    const listEl = modal.querySelector("#qaHistoryList");
    const query = String(modal.querySelector("#qaHistorySearchInput")?.value || "").trim().toLowerCase();
    if (!listEl) return;

    listEl.innerHTML = `<div class="qa-history-empty">불러오는 중...</div>`;
    const rows = await getPdfHistoryRecords();
    const filtered = rows.filter((row) => !query || String(row.searchText || "").includes(query));

    if (!filtered.length) {
      listEl.innerHTML = `<div class="qa-history-empty">조건에 맞는 견적서가 없습니다.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map((row) => `
      <article class="qa-history-item" data-id="${row.id}">
        <div class="qa-history-item-main">
          <div class="qa-history-item-grid">
            <div class="qa-history-primary">
              <div class="qa-history-doc-type">${escapeHtml(resolveHistoryDocTypeLabel(row))}</div>
            </div>
            <div><span class="qa-history-label">제작 요청사</span><strong>${escapeHtml(row.clientCompany || "-")}</strong></div>
            <div><span class="qa-history-label">담당자명</span><strong>${escapeHtml(row.clientName || "-")}</strong></div>
            <div><span class="qa-history-label">담당자 연락처</span><strong>${escapeHtml(row.clientPhone || "-")}</strong></div>
            <div><span class="qa-history-label">견적 금액</span><strong>${formatKRW(row.total || 0)}원</strong></div>
            <div><span class="qa-history-label">작성일</span><strong>${escapeHtml(formatHistoryDate(row.date || row.createdAt))}</strong></div>
          </div>
        </div>
        <div class="qa-history-item-actions">
          <button type="button" class="qa-btn qa-btn-subtle qa-history-download">내려받기</button>
          <button type="button" class="qa-btn qa-btn-primary qa-history-preview">바로보기</button>
          <button type="button" class="qa-btn qa-btn-subtle qa-history-delete">삭제</button>
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
      if (/^\[\s*제?\s*\d+조\]/.test(line.text)) {
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
      <h2 class="qa-pdf-agreement-title">약관동의서</h2>
      ${includeIntro ? '<p class="qa-pdf-agreement-sub">아래 약관동의서 내용을 충분히 읽어주세요. 계약 내용 미숙지로 발생한 문제는 책임지지 않습니다.</p>' : ""}
      ${contentHtml}
      <div class="qa-pdf-footer">
        <span>Copyright ⓒ 옐로펜슬 All Rights Reserved.</span>
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
      ? "본 문서는 전자문서로, 별도의 직인/서명 없이 결제 시 계약이 체결됩니다."
      : "본 문서 유효기간은 발행일로부터 7일입니다.";
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

    els.baseSubtotalTxt.textContent = `${formatKRW(baseSubtotal)}원`;
    els.langRowLabel.textContent = `다국어 추가(30% × ${langCount})`;
    els.langAddonTxt.textContent = `${formatKRW(langFee)}원`;
    els.langRateTxt.textContent = `${Math.round(langRate * 100)}%`;
    els.langFeeTxt.textContent = `${formatKRW(langFee)}원`;
    els.subtotalTxt.textContent = `${formatKRW(subtotal)}원`;
    els.vatTxt.textContent = `${formatKRW(vat)}원`;
    els.totalTxt.textContent = `${formatKRW(total)}원`;
  }

  function createRow(data = {}) {
    const tr = doc.createElement("tr");
    tr.innerHTML = `
      <td><input class="qa-cell" data-role="name" value="${escapeHtml(data.name || "")}" placeholder="예: 구축 및 웹디자인"></td>
      <td><input class="qa-cell" data-role="desc" value="${escapeHtml(data.desc || "")}" placeholder="예: 메인페이지 1P + 서브페이지 6P"></td>
      <td class="num"><input class="qa-cell num" data-role="qty" value="${data.qty ?? 1}" inputmode="numeric"></td>
      <td class="num"><input class="qa-cell num" data-role="unit" value="${formatKRW(data.unit || 0)}" inputmode="numeric"></td>
      <td class="num"><input class="qa-cell num" data-role="amount" value="0" readonly></td>
      <td class="no-print">
        <div class="qa-row-actions">
          <button class="qa-drag" type="button" title="드래그해서 순서 변경">⋮⋮</button>
          <button class="qa-del" type="button" title="삭제">✕</button>
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
      openNoticeModal("저장할 견적 항목이 없습니다.");
      return;
    }
    localStorage.setItem(ROW_PRESET_STORAGE_KEY, JSON.stringify(rows));
    openNoticeModal("견적 항목이 저장되었습니다.");
  }

  function loadRowPreset() {
    const raw = localStorage.getItem(ROW_PRESET_STORAGE_KEY);
    if (!raw) {
      openNoticeModal("저장된 견적 항목이 없습니다.");
      return;
    }
    try {
      const rows = JSON.parse(raw);
      els.itemsBody.innerHTML = "";
      rows.forEach(addRow);
      calc();
      openNoticeModal("저장된 견적 항목을 불러왔습니다.");
    } catch (error) {
      console.error(error);
      openNoticeModal("항목을 불러오는 중 문제가 발생했습니다.");
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
      .map((line) => `· ${String(line).replace(/^[·•\-\s]+/, "")}`)
      .join("\n");

    const page = doc.createElement("section");
    page.className = "qa-pdf-page qa-pdf-page-cover";
    page.innerHTML = `
      <div class="qa-pdf-header">
        <div class="qa-pdf-brand">
          <img class="qa-pdf-logo" src="${PDF_LOGO_URL}" alt="옐로펜슬 로고" crossorigin="anonymous" referrerpolicy="no-referrer">
          <h1 class="qa-pdf-title">${escapeHtml(data.title)}</h1>
        </div>
        <div class="qa-pdf-date">작성일 : ${escapeHtml(data.date || "-")}</div>
      </div>

      <div class="qa-pdf-meta">
        <div class="qa-pdf-box">
          <h4>제작사 정보</h4>
          <div class="qa-pdf-kv">
            <div class="k">상호명</div><div class="v">옐로펜슬</div>
            <div class="k">사업자번호</div><div class="v">276-06-02233</div>
            <div class="k">대표</div><div class="v">차민석, 신승진</div>
            <div class="k">연락처</div><div class="v">010-7368-7241</div>
          </div>
        </div>
        <div class="qa-pdf-box">
          <h4>제작 요청사 정보</h4>
          <div class="qa-pdf-kv">
            <div class="k">제작 요청사</div><div class="v">${escapeHtml(data.clientCompany || "-")}</div>
            <div class="k">담당자명</div><div class="v">${escapeHtml(data.clientName || "-")}</div>
            <div class="k">담당자 연락처</div><div class="v">${escapeHtml(data.clientPhone || "-")}</div>
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
            <th>항목</th>
            <th>설명</th>
            <th class="qa-pdf-num">수량</th>
            <th class="qa-pdf-num">단가</th>
            <th class="qa-pdf-num">금액</th>
          </tr>
        </thead>
        <tbody>
          ${data.rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.name)}</td>
              <td>${escapeHtml(row.desc)}</td>
              <td class="qa-pdf-num">${row.qty}</td>
              <td class="qa-pdf-num">${formatKRW(row.unit)}원</td>
              <td class="qa-pdf-num">${formatKRW(row.amount)}원</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="qa-pdf-subgrid">
        <div class="qa-pdf-note"><strong>작업 일정</strong>
1차 작업 기간 : ${escapeHtml(data.workPeriod || "-")}
수정 횟수 : ${escapeHtml(data.revCount || "-")}회

<strong>비고</strong>
${escapeHtml(data.memo || "-")}

<strong>결제 방법</strong>
<span class="qa-pdf-payment-lines">${escapeHtml(paymentLinesText || "-")}</span></div>
        <div class="qa-pdf-side">
          <div class="qa-pdf-totals">
            <div class="qa-pdf-total-row"><span>기본 견적</span><strong>${formatKRW(data.baseSubtotal)}원</strong></div>
            <div class="qa-pdf-total-row"><span>다국어 추가(30% × ${data.langCount})</span><strong>${formatKRW(data.langFee)}원</strong></div>
            <div class="qa-pdf-total-divider"></div>
            <div class="qa-pdf-total-row"><span>공급가액</span><strong>${formatKRW(data.subtotal)}원</strong></div>
            <div class="qa-pdf-total-row"><span>부가세(VAT 10%)</span><strong>${formatKRW(data.vat)}원</strong></div>
            <div class="qa-pdf-total-divider"></div>
            <div class="qa-pdf-total-row qa-pdf-total-row-grand"><span>총 합계</span><strong>${formatKRW(data.total)}원</strong></div>
          </div>
        </div>
      </div>

      <div class="qa-pdf-sign qa-pdf-sign-compact">
        <div class="qa-pdf-sign-note">${escapeHtml(data.signNote || "")}</div>
        <div class="qa-pdf-sign-name">
          옐로펜슬 대표 차민석 (인)
          <img src="${PDF_STAMP_URL}" alt="직인" crossorigin="anonymous" referrerpolicy="no-referrer">
        </div>
      </div>
    `;
    return page;
  }

  function buildPrintableRowsHtml(data) {
    return data.rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.desc)}</td>
        <td class="num">${row.qty}</td>
        <td class="num">${formatKRW(row.unit)}원</td>
        <td class="num">${formatKRW(row.amount)}원</td>
      </tr>
    `).join("");
  }

  function buildPrintablePaymentLinesHtml(lines) {
    return lines
      .filter((line) => String(line || "").trim())
      .map((line) => `<li>${escapeHtml(String(line).replace(/^[•·\-\s]+/, ""))}</li>`)
      .join("");
  }

  function buildPrintableDocumentHtml(data) {
    const printableTitle = createPdfFilename(data);
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(printableTitle)}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-size: 11px;
      line-height: 1.65;
    }
    main {
      width: 100%;
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
      page-break-before: always;
      break-before: page;
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
    }
    .agreement-html ul,
    .agreement-html ol {
      padding-left: 18px;
    }
    .agreement-html li {
      margin: 4px 0;
      break-inside: avoid;
      page-break-inside: avoid;
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
          <img class="logo" src="${PDF_LOGO_URL}" alt="옐로펜슬 로고">
          <h1>${escapeHtml(data.title)}</h1>
        </div>
        <div class="doc-date">작성일: ${escapeHtml(data.date || "-")}</div>
      </div>

      <div class="meta-grid">
        <section class="box">
          <h3>제작사 정보</h3>
          <div class="kv">
            <div class="kv-label">상호명</div><div class="kv-value">옐로펜슬</div>
            <div class="kv-label">사업자번호</div><div class="kv-value">276-06-02233</div>
            <div class="kv-label">대표</div><div class="kv-value">차민석</div>
            <div class="kv-label">연락처</div><div class="kv-value">010-7368-7241</div>
          </div>
        </section>
        <section class="box">
          <h3>제작 요청사 정보</h3>
          <div class="kv">
            <div class="kv-label">제작 요청사</div><div class="kv-value">${escapeHtml(data.clientCompany || "-")}</div>
            <div class="kv-label">담당자명</div><div class="kv-value">${escapeHtml(data.clientName || "-")}</div>
            <div class="kv-label">담당자 연락처</div><div class="kv-value">${escapeHtml(data.clientPhone || "-")}</div>
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
            <th>항목</th>
            <th>설명</th>
            <th class="num">수량</th>
            <th class="num">단가</th>
            <th class="num">금액</th>
          </tr>
        </thead>
        <tbody>
          ${buildPrintableRowsHtml(data)}
        </tbody>
      </table>

      <div class="summary-grid">
        <section class="note-box"><strong>작업 일정</strong>
1차 작업 기간 : ${escapeHtml(data.workPeriod || "-")}
수정 횟수 : ${escapeHtml(data.revCount || "-")}회

<strong>비고</strong>
${escapeHtml(data.memo || "-")}

<strong>결제 방법</strong>
<ul class="payment-list">${buildPrintablePaymentLinesHtml(data.paymentLines)}</ul></section>

        <section class="totals">
          <div class="total-row"><span>기본 견적</span><strong>${formatKRW(data.baseSubtotal)}원</strong></div>
          <div class="total-row"><span>다국어 추가(30% × ${data.langCount})</span><strong>${formatKRW(data.langFee)}원</strong></div>
          <div class="total-divider"></div>
          <div class="total-row"><span>공급가액</span><strong>${formatKRW(data.subtotal)}원</strong></div>
          <div class="total-row"><span>부가세(VAT 10%)</span><strong>${formatKRW(data.vat)}원</strong></div>
          <div class="total-divider"></div>
          <div class="total-row total-grand"><span>총 합계</span><strong>${formatKRW(data.total)}원</strong></div>
        </section>
      </div>

      <section class="sign">
        <div class="sign-note">${escapeHtml(data.signNote || "")}</div>
        <div class="sign-name">
          옐로펜슬 대표 차민석 (인)
          <img class="stamp" src="${PDF_STAMP_URL}" alt="직인">
        </div>
      </section>
    </section>

    <section class="agreement-wrap">
      <h2 class="agreement-title">약관동의서</h2>
      <p class="agreement-sub">약관동의서 내용을 꼼꼼히 읽어주세요. 계약 내용 미숙지로 발생한 문제는 책임지지 않습니다.</p>
      <div class="agreement-html">${data.agreementHtml}</div>
      <div class="agreement-footer">Copyright ⓒ 옐로펜슬 All Rights Reserved.</div>
    </section>
  </main>
  <script>
    const waitForAssets = () => {
      const images = Array.from(document.images || []);
      return Promise.all(images.map((img) => new Promise((resolve) => {
        if (img.complete) {
          resolve();
          return;
        }
        img.onload = resolve;
        img.onerror = resolve;
      }))).then(() => document.fonts?.ready || Promise.resolve());
    };
    window.addEventListener("load", () => {
      waitForAssets().finally(() => {
        setTimeout(() => {
          window.focus();
          window.print();
        }, 150);
      });
    });
    window.addEventListener("afterprint", () => {
      setTimeout(() => window.close(), 150);
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
        <h2 class="qa-pdf-agreement-title">약관동의서</h2>
        ${index === 0 ? '<p class="qa-pdf-agreement-sub">약관동의서 내용을 꼼꼼히 읽어주세요. 계약 내용 미숙지로 발생한 문제는 책임지지 않습니다.</p>' : ""}
        ${content}
        <div class="qa-pdf-footer">
          <span>Copyright ⓒ 옐로펜슬 All Rights Reserved.</span>
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
      openNoticeModal("시작 요청자, 담당자명, 담당자 연락처를 입력해주세요.");
      return;
    }

    const data = collectPdfData();
    const prevLabel = els.downloadPdfBtn.textContent;
    els.downloadPdfBtn.disabled = true;
    els.downloadPdfBtn.textContent = "PDF 생성 중...";

    try {
      const blob = await buildDownloadablePdfBlob(data);
      const record = makePdfHistoryRecord(data, blob);
      await savePdfHistoryRecord(record);
      triggerBlobDownload(blob, record.filename || createPdfFilename(data));
    } catch (error) {
      console.error(error);
      openNoticeModal(`PDF를 생성하지 못했습니다.\n${error?.message || "알 수 없는 오류가 발생했습니다."}`);
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
      const saved = await persistQuoteSettingsWithFeedback("저장이 완료되었습니다.", "약관동의서 저장에 실패했습니다.");
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
      const saved = await persistQuoteSettingsWithFeedback("저장이 완료되었습니다.", "결제 방법 저장에 실패했습니다.");
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
      console.warn("견적 설정을 Supabase에서 불러오지 못했습니다.", error);
    });
    const bridge = getSupabaseBridge();
    bridge?.onAuthStateChange?.((event, session) => {
      if (session) {
        loadQuoteSettingsFromSupabase().catch((error) => {
          console.warn("로그인 후 견적 설정을 다시 불러오지 못했습니다.", error);
        });
      }
    });
  }

  init();
})();
