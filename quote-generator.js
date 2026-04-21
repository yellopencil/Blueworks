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

  function getAgreementHtml() {
    return els.agreementContent.innerHTML.trim();
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
      openNoticeModal("제작 요청사, 담당자명, 담당자 연락처를 입력해주세요.");
      return;
    }
    if (!window.html2canvas || !window.jspdf?.jsPDF) {
      openNoticeModal("PDF 라이브러리를 불러오지 못했습니다.");
      return;
    }

    const data = collectPdfData();
    const rootEl = els.pdfTemplateRoot;
    if (!rootEl) {
      openNoticeModal("PDF 템플릿 영역을 찾지 못했습니다.");
      return;
    }

    const prevLabel = els.downloadPdfBtn.textContent;
    els.downloadPdfBtn.disabled = true;
    els.downloadPdfBtn.textContent = "PDF 준비 중...";

    try {
      rootEl.classList.remove("hidden");
      rootEl.innerHTML = "";
      const pages = [buildPageOne(data), ...buildAgreementPages(data)];
      pages.forEach((page, index) => {
        const pageNo = page.querySelector("[data-page-number]");
        if (pageNo) pageNo.textContent = `${index + 1} / ${pages.length}`;
      });
      pages.forEach((page) => rootEl.appendChild(page));

      await waitForPdfAssets(rootEl);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      for (let index = 0; index < pages.length; index += 1) {
        els.downloadPdfBtn.textContent = `PDF 내보내기 ${index + 1}/${pages.length}`;
        const canvas = await window.html2canvas(pages[index], {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false
        });
        const imageData = canvas.toDataURL("image/png", 0.96);
        if (index > 0) pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, 0, 210, 297, undefined, "FAST");
      }

      const fileName = createPdfFilename(data);
      const pdfBlob = pdf.output("blob");
      await savePdfHistoryRecord(makePdfHistoryRecord(data, pdfBlob));
      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error(error);
      openNoticeModal("PDF를 내보내는 중 문제가 발생했습니다.");
    } finally {
      rootEl.innerHTML = "";
      rootEl.classList.add("hidden");
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
