const STORAGE_KEY = "agency-work-manager-demo-v3";

const CHANGE_HISTORY_LIMIT = 20;

const STATUS_META = {
  ready: { title: "작업 준비" },
  inProgress: { title: "작업 중" },
  done: { title: "작업 완료" },
};

const PROGRESS_STAGE_META = {
  firstDraft: "1차 시안 작업 중",
  firstDraftDone: "1차 시안 완료",
  firstRevisionDone: "1차 수정 완료",
  secondRevisionDone: "2차 수정 완료",
  thirdRevisionDone: "3차 수정 완료",
  mobileDone: "모바일 · SEO 작업 완료",
};

const CALENDAR_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const HOLIDAY_MAP = {
  "2026-01-01": "신정",
  "2026-02-16": "설날 연휴",
  "2026-02-17": "설날",
  "2026-02-18": "설날 연휴",
  "2026-03-01": "삼일절",
  "2026-05-05": "어린이날",
  "2026-05-24": "부처님오신날",
  "2026-06-06": "현충일",
  "2026-08-15": "광복절",
  "2026-09-24": "추석 연휴",
  "2026-09-25": "추석",
  "2026-09-26": "추석 연휴",
  "2026-10-03": "개천절",
  "2026-10-09": "한글날",
  "2026-12-25": "성탄절",
};

const DEFAULT_ARCHIVE_CODE_CATEGORIES = [
  "기본",
  "텍스트",
  "입력폼",
  "게시판",
  "갤러리",
  "동영상",
  "고급",
  "쇼핑",
  "상단바",
  "플러팅 배너",
];

const ARCHIVE_NOTE_COLORS = [
  { id: "red", label: "레드", bg: "#fff1f1", border: "#f4c7c7" },
  { id: "coral", label: "코랄", bg: "#fff3ee", border: "#f3c8b9" },
  { id: "orange", label: "오렌지", bg: "#fff5e9", border: "#f0cfaa" },
  { id: "amber", label: "앰버", bg: "#fff8df", border: "#efd88e" },
  { id: "yellow", label: "옐로", bg: "#fffbe6", border: "#e8dda1" },
  { id: "lime", label: "라임", bg: "#f6fae9", border: "#cfdfa3" },
  { id: "green", label: "그린", bg: "#edf9f0", border: "#acd8b7" },
  { id: "mint", label: "민트", bg: "#eaf9f5", border: "#a9d9cd" },
  { id: "cyan", label: "시안", bg: "#eaf8fb", border: "#a8d7e2" },
  { id: "blue", label: "블루", bg: "#eef5ff", border: "#b8cff4" },
  { id: "navy", label: "네이비", bg: "#eef2f8", border: "#b6c0d0" },
  { id: "purple", label: "퍼플", bg: "#f4efff", border: "#cdbdee" },
  { id: "pink", label: "핑크", bg: "#fff0f7", border: "#efbed5" },
  { id: "brown", label: "브라운", bg: "#f8f1ea", border: "#d9c1aa" },
  { id: "gray", label: "그레이", bg: "#f4f6f8", border: "#cbd3dc" },
  { id: "ink", label: "먹색", bg: "#eef0f2", border: "#aeb6c0" },
];

function getArchiveNoteColor(colorId) {
  return ARCHIVE_NOTE_COLORS.find((color) => color.id === colorId) || ARCHIVE_NOTE_COLORS[14];
}

function createDefaultArchiveCategories() {
  return DEFAULT_ARCHIVE_CODE_CATEGORIES.map((name) => ({
    id: crypto.randomUUID(),
    name,
    color: "gray",
  }));
}

const els = {
  body: document.body,
  authView: document.querySelector("#authView"),
  appView: document.querySelector("#appView"),
  dashboardView: document.querySelector("#dashboardView"),
  membersView: document.querySelector("#membersView"),
  customersView: document.querySelector("#customersView"),
  salesView: document.querySelector("#salesView"),
  quotesView: document.querySelector("#quotesView"),
  archiveNotesView: document.querySelector("#archiveNotesView"),
  archiveCodesView: document.querySelector("#archiveCodesView"),
  settingsView: document.querySelector("#settingsView"),
  navDashboardBtn: document.querySelector("#navDashboardBtn"),
  navMembersBtn: document.querySelector("#navMembersBtn"),
  navCustomersBtn: document.querySelector("#navCustomersBtn"),
  navSalesBtn: document.querySelector("#navSalesBtn"),
  navQuotesBtn: document.querySelector("#navQuotesBtn"),
  navArchiveBtn: document.querySelector("#navArchiveBtn"),
  navArchiveNotesBtn: document.querySelector("#navArchiveNotesBtn"),
  navArchiveCodesBtn: document.querySelector("#navArchiveCodesBtn"),
  navSettingsBtn: document.querySelector("#navSettingsBtn"),
  archiveSubnav: document.querySelector("#archiveSubnav"),
  sidebarToggleBtn: document.querySelector("#sidebarToggleBtn"),
  mobileNavOpenBtn: document.querySelector("#mobileNavOpenBtn"),
  mobileNavCloseBtn: document.querySelector("#mobileNavCloseBtn"),
  mobileNavOverlay: document.querySelector("#mobileNavOverlay"),
  loginPanel: document.querySelector("#loginPanel"),
  loginForm: document.querySelector("#loginForm"),
  loginStatusMessage: document.querySelector("#loginStatusMessage"),
  registerForm: document.querySelector("#registerForm"),
  registerStatusMessage: document.querySelector("#registerStatusMessage"),
  registerPanel: document.querySelector("#registerPanel"),
  openRegisterPanelBtn: document.querySelector("#openRegisterPanelBtn"),
  backToLoginBtn: document.querySelector("#backToLoginBtn"),
  pendingApprovalCard: document.querySelector("#pendingApprovalCard"),
  welcomeText: document.querySelector("#welcomeText"),
  membersHeroText: document.querySelector("#membersHeroText"),
  projectsHeroText: document.querySelector("#projectsHeroText"),
  salesHeroText: document.querySelector("#salesHeroText"),
  quotesHeroText: document.querySelector("#quotesHeroText"),
  archiveNotesHeroText: document.querySelector("#archiveNotesHeroText"),
  archiveCodesHeroText: document.querySelector("#archiveCodesHeroText"),
  sidebarSiteTitle: document.querySelector("#sidebarSiteTitle"),
  homepageShortcutBtn: document.querySelector("#homepageShortcutBtn"),
  portfolioShortcutBtn: document.querySelector("#portfolioShortcutBtn"),
  reviewShortcutBtn: document.querySelector("#reviewShortcutBtn"),
  logoutBtn: document.querySelector("#logoutBtn"),
  openScheduleModalBtn: document.querySelector("#openScheduleModalBtn"),
  projectBoard: document.querySelector("#projectBoard"),
  projectForm: document.querySelector("#projectForm"),
  uploadContractBtn: document.querySelector("#uploadContractBtn"),
  contractGuide: document.querySelector("#contractGuide"),
  contractFile: document.querySelector("#contractFile"),
  documentTypeSelect: document.querySelector("#documentTypeSelect"),
  contractList: document.querySelector("#contractList"),
  readyCount: document.querySelector("#readyCount"),
  progressCount: document.querySelector("#progressCount"),
  progressStageSummary: document.querySelector("#progressStageSummary"),
  yearProjectCount: document.querySelector("#yearProjectCount"),
  yearSalesLabel: document.querySelector("#yearSalesLabel"),
  yearSalesAmount: document.querySelector("#yearSalesAmount"),
  salesTotalSummary: document.querySelector("#salesTotalSummary"),
  approvalList: document.querySelector("#approvalList"),
  memberList: document.querySelector("#memberList"),
  customerSearchInput: document.querySelector("#customerSearchInput"),
  customerSortSelect: document.querySelector("#customerSortSelect"),
  customerList: document.querySelector("#customerList"),
  customerListMeta: document.querySelector("#customerListMeta"),
  newArchiveNoteBtn: document.querySelector("#newArchiveNoteBtn"),
  archiveNotesList: document.querySelector("#archiveNotesList"),
  newArchiveCodeBtn: document.querySelector("#newArchiveCodeBtn"),
  archiveCodesList: document.querySelector("#archiveCodesList"),
  newArchiveCategoryBtn: document.querySelector("#newArchiveCategoryBtn"),
  archiveCodeCategoriesList: document.querySelector("#archiveCodeCategoriesList"),
  salesMonthlySummary: document.querySelector("#salesMonthlySummary"),
  salesMonthlyChart: document.querySelector("#salesMonthlyChart"),
  salesYearlySummary: document.querySelector("#salesYearlySummary"),
  salesYearlyChart: document.querySelector("#salesYearlyChart"),
  newMemberBtn: document.querySelector("#newMemberBtn"),
  scheduleModalForm: document.querySelector("#scheduleModalForm"),
  scheduleList: document.querySelector("#scheduleList"),
  calendarTitle: document.querySelector("#calendarTitle"),
  calendarWeekdays: document.querySelector("#calendarWeekdays"),
  calendarGrid: document.querySelector("#calendarGrid"),
  annualGoalBoard: document.querySelector("#annualGoalBoard"),
  openAnnualGoalAddBtn: document.querySelector("#openAnnualGoalAddBtn"),
  openAnnualGoalArchiveBtn: document.querySelector("#openAnnualGoalArchiveBtn"),
  annualGoalModal: document.querySelector("#annualGoalModal"),
  annualGoalModalCloseBtn: document.querySelector("#annualGoalModalCloseBtn"),
  annualGoalSearchInput: document.querySelector("#annualGoalSearchInput"),
  annualGoalActiveList: document.querySelector("#annualGoalActiveList"),
  annualGoalDoneList: document.querySelector("#annualGoalDoneList"),
  annualGoalAddModal: document.querySelector("#annualGoalAddModal"),
  annualGoalAddTitle: document.querySelector("#annualGoalAddTitle"),
  annualGoalAddForm: document.querySelector("#annualGoalAddForm"),
  annualGoalAddCloseBtn: document.querySelector("#annualGoalAddCloseBtn"),
  annualGoalAddCancelBtn: document.querySelector("#annualGoalAddCancelBtn"),
  prevMonthBtn: document.querySelector("#prevMonthBtn"),
  nextMonthBtn: document.querySelector("#nextMonthBtn"),
  newProjectBtn: document.querySelector("#newProjectBtn"),
  toast: document.querySelector("#toast"),
  projectModal: document.querySelector("#projectModal"),
  projectModalTitle: document.querySelector("#projectModalTitle"),
  topDeleteProjectBtn: document.querySelector("#topDeleteProjectBtn"),
  projectModalCloseBtn: document.querySelector("#projectModalCloseBtn"),
  projectStageField: document.querySelector("#projectStageField"),
  progressStageSelect: document.querySelector("#progressStageSelect"),
  languageCountSelect: document.querySelector("#languageCountSelect"),
  languageFields: document.querySelector("#languageFields"),
  paymentMethodSelect: document.querySelector("#paymentMethodSelect"),
  paybackStatusSelect: document.querySelector("#paybackStatusSelect"),
  paybackAmountField: document.querySelector("#paybackAmountField"),
  kmongFeeField: document.querySelector("#kmongFeeField"),
  taxInvoiceField: document.querySelector("#taxInvoiceField"),
  confirmModal: document.querySelector("#confirmModal"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmOkBtn: document.querySelector("#confirmOkBtn"),
  confirmCancelBtn: document.querySelector("#confirmCancelBtn"),
  scheduleDetailModal: document.querySelector("#scheduleDetailModal"),
  scheduleDetailCloseBtn: document.querySelector("#scheduleDetailCloseBtn"),
  scheduleDetailEditBtn: document.querySelector("#scheduleDetailEditBtn"),
  scheduleDetailDeleteBtn: document.querySelector("#scheduleDetailDeleteBtn"),
  scheduleDetailTitle: document.querySelector("#scheduleDetailTitle"),
  scheduleDetailDate: document.querySelector("#scheduleDetailDate"),
  scheduleDetailNotes: document.querySelector("#scheduleDetailNotes"),
  scheduleEditorModal: document.querySelector("#scheduleEditorModal"),
  scheduleEditorTitle: document.querySelector("#scheduleEditorTitle"),
  scheduleEditorSubmitBtn: document.querySelector("#scheduleEditorSubmitBtn"),
  scheduleEditorCloseBtn: document.querySelector("#scheduleEditorCloseBtn"),
  calendarDayModal: document.querySelector("#calendarDayModal"),
  calendarDayTitle: document.querySelector("#calendarDayTitle"),
  calendarDayList: document.querySelector("#calendarDayList"),
  calendarDayCloseBtn: document.querySelector("#calendarDayCloseBtn"),
  calendarDayAddBtn: document.querySelector("#calendarDayAddBtn"),
  documentPreviewModal: document.querySelector("#documentPreviewModal"),
  documentPreviewTitle: document.querySelector("#documentPreviewTitle"),
  documentPreviewBody: document.querySelector("#documentPreviewBody"),
  documentPreviewCloseBtn: document.querySelector("#documentPreviewCloseBtn"),
  documentPreviewDownloadBtn: document.querySelector("#documentPreviewDownloadBtn"),
  noticeModal: document.querySelector("#noticeModal"),
  noticeMessage: document.querySelector("#noticeMessage"),
  noticeOkBtn: document.querySelector("#noticeOkBtn"),
  worklogModal: document.querySelector("#worklogModal"),
  worklogForm: document.querySelector("#worklogForm"),
  worklogTitle: document.querySelector("#worklogTitle"),
  worklogTasks: document.querySelector("#worklogTasks"),
  worklogCloseBtn: document.querySelector("#worklogCloseBtn"),
  addWorklogTaskBtn: document.querySelector("#addWorklogTaskBtn"),
  worklogProgressText: document.querySelector("#worklogProgressText"),
  worklogProgressSummary: document.querySelector("#worklogProgressSummary"),
  worklogProgressFill: document.querySelector("#worklogProgressFill"),
  memberModal: document.querySelector("#memberModal"),
  memberModalTitle: document.querySelector("#memberModalTitle"),
  memberModalCloseBtn: document.querySelector("#memberModalCloseBtn"),
  memberForm: document.querySelector("#memberForm"),
  memberManagerField: document.querySelector("#memberManagerField"),
  archiveNoteModal: document.querySelector("#archiveNoteModal"),
  archiveNoteModalTitle: document.querySelector("#archiveNoteModalTitle"),
  archiveNoteForm: document.querySelector("#archiveNoteForm"),
  archiveNoteColorPalette: document.querySelector("#archiveNoteColorPalette"),
  archiveNoteEditBtn: document.querySelector("#archiveNoteEditBtn"),
  archiveNoteSaveBtn: document.querySelector("#archiveNoteSaveBtn"),
  archiveNoteCloseBtn: document.querySelector("#archiveNoteCloseBtn"),
  archiveNoteDeleteBtn: document.querySelector("#archiveNoteDeleteBtn"),
  archiveCodeModal: document.querySelector("#archiveCodeModal"),
  archiveCodeModalTitle: document.querySelector("#archiveCodeModalTitle"),
  archiveCodeForm: document.querySelector("#archiveCodeForm"),
  archiveCodeInput: document.querySelector("#archiveCodeInput"),
  archiveCodeHighlight: document.querySelector("#archiveCodeHighlight"),
  archiveCodeEditBtn: document.querySelector("#archiveCodeEditBtn"),
  archiveCodeSaveBtn: document.querySelector("#archiveCodeSaveBtn"),
  archiveCodeCloseBtn: document.querySelector("#archiveCodeCloseBtn"),
  archiveCodeDeleteBtn: document.querySelector("#archiveCodeDeleteBtn"),
  archiveCategoryModal: document.querySelector("#archiveCategoryModal"),
  archiveCategoryModalTitle: document.querySelector("#archiveCategoryModalTitle"),
  archiveCategoryForm: document.querySelector("#archiveCategoryForm"),
  archiveCategoryColorPalette: document.querySelector("#archiveCategoryColorPalette"),
  archiveCategorySaveBtn: document.querySelector("#archiveCategorySaveBtn"),
  archiveCategoryCloseBtn: document.querySelector("#archiveCategoryCloseBtn"),
  archiveCategoryDeleteBtn: document.querySelector("#archiveCategoryDeleteBtn"),
  siteSettingsForm: document.querySelector("#siteSettingsForm"),
  faviconUploadInput: document.querySelector("#faviconUploadInput"),
  thumbnailUploadInput: document.querySelector("#thumbnailUploadInput"),
  faviconRemoveBtn: document.querySelector("#faviconRemoveBtn"),
  thumbnailRemoveBtn: document.querySelector("#thumbnailRemoveBtn"),
  faviconPreview: document.querySelector("#faviconPreview"),
  thumbnailPreview: document.querySelector("#thumbnailPreview"),
  supabaseStatusCard: document.querySelector("#supabaseStatusCard"),
  supabaseStatusText: document.querySelector("#supabaseStatusText"),
  supabaseStatusDetail: document.querySelector("#supabaseStatusDetail"),
  openChangeHistoryBtn: document.querySelector("#openChangeHistoryBtn"),
  changeHistoryModal: document.querySelector("#changeHistoryModal"),
  changeHistoryCloseBtn: document.querySelector("#changeHistoryCloseBtn"),
  changeHistoryList: document.querySelector("#changeHistoryList"),
};

let state = loadState();
let lastHistorySnapshotJson = serializeStateForHistory(state);
let currentMonth = new Date();
let pendingConfirmAction = null;
let currentScheduleDetailId = null;
let currentPreviewDocumentId = null;
let currentPreviewObjectUrl = null;
let draftProjectDocuments = [];
let currentCalendarDayKey = "";
let currentWorklogDate = "";
let currentWorklogDraft = null;
let draggedWorklogTaskId = null;
let currentMemberId = null;
let currentCustomerPage = 1;
let currentSalesYear = "";
let currentSalesMonthKey = "";
let currentRichLinkContext = null;
let pendingUnsavedLeaveAction = null;
let currentArchiveNoteId = null;
let currentArchiveCodeId = null;
let currentArchiveCategoryId = null;
let archiveNoteEditing = false;
let archiveCodeEditing = false;
let draggedArchiveNoteId = null;
let draggedArchiveCodeId = null;
let archiveCardDragGhost = null;
let archiveCardPointerOffsetX = 0;
let archiveCardPointerOffsetY = 0;
let draggedArchiveCategoryId = null;
let archiveCategoryDragGhost = null;
let archiveCategoryPointerOffsetX = 0;
let archiveCategoryPointerOffsetY = 0;
let authStateSubscription = null;
const modalSnapshots = {
  project: "",
  schedule: "",
  member: "",
  worklog: "",
  archiveNote: "",
  archiveCode: "",
  archiveCategory: "",
};

bindEvents();
normalizeAppLayout();
render();
syncProjectsAndSchedulesFromSupabase();
initializeSupabaseAuth();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return normalizeState(JSON.parse(saved));

  const initial = {
    sessionUserId: null,
    selectedProjectId: null,
    currentView: "dashboard",
    archiveMenuOpen: false,
    sidebarCollapsed: false,
    pendingApproval: null,
    siteSettings: {
      title: "",
      description: "",
      faviconDataUrl: "",
      thumbnailDataUrl: "",
      metaTags: "",
      blockCrawling: false,
    },
    rememberedLogin: {
      enabled: false,
      username: "",
      password: "",
    },
    users: [
      {
        id: crypto.randomUUID(),
        username: "owner",
        password: "owner1234!",
        name: "차민석",
        roleLabel: "대표",
        phone: "",
        email: "",
        notes: "",
        lastLoginAt: "",
        lastLoginIp: "",
        canManageMembers: true,
        isOwner: true,
        approved: true,
        createdAt: new Date().toISOString(),
      },
    ],
    projects: [],
    schedules: [],
    worklogs: {},
    yearGoals: [],
    changeHistory: [],
    archiveNotes: [],
    archiveCodeCategories: createDefaultArchiveCategories(),
    archiveCodes: [],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function normalizeState(source) {
  const normalized = {
    ...source,
    currentView: source.currentView || "dashboard",
    archiveMenuOpen: Boolean(source.archiveMenuOpen),
    sidebarCollapsed: Boolean(source.sidebarCollapsed),
    changeHistory: Array.isArray(source.changeHistory) ? source.changeHistory.slice(0, CHANGE_HISTORY_LIMIT) : [],
    siteSettings: {
      title: "",
      description: "",
      faviconDataUrl: "",
      thumbnailDataUrl: "",
      metaTags: "",
      blockCrawling: false,
      ...(source.siteSettings || {}),
    },
    rememberedLogin: source.rememberedLogin || { enabled: false, username: "", password: "" },
    users: (source.users || []).map((user) => ({
      phone: "",
      email: "",
      notes: "",
      lastLoginAt: "",
      lastLoginIp: "",
      canManageMembers: false,
      rejected: false,
      ...user,
    })),
    projects: (source.projects || []).map((project) => ({
      ...project,
      contracts: project.contracts || [],
      paybackStatus: project.paybackStatus || "none",
      paybackAmount: project.paybackAmount || "",
      paybackNote: project.paybackNote || "",
      kmongFee: project.kmongFee || "",
    })),
    schedules: source.schedules || [],
    worklogs: source.worklogs || {},
    yearGoals: (source.yearGoals || []).map((goal) => ({
      id: goal.id || crypto.randomUUID(),
      year: Number(goal.year || new Date().getFullYear()),
      half: goal.half === "second" ? "second" : "first",
      text: goal.text || "",
      done: Boolean(goal.done),
      createdAt: goal.createdAt || new Date().toISOString(),
      completedAt: goal.completedAt || "",
    })),
    archiveNotes: (source.archiveNotes || []).map((item) => ({
      id: item.id || crypto.randomUUID(),
      title: item.title || "",
      content: item.content || "",
      color: item.color || "gray",
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    })),
    archiveCodeCategories: (source.archiveCodeCategories || createDefaultArchiveCategories()).map((item) => ({
      id: item.id || crypto.randomUUID(),
      name: item.name || "기본",
      color: item.color || "gray",
    })),
    archiveCodes: (source.archiveCodes || []).map((item) => ({
      id: item.id || crypto.randomUUID(),
      title: item.title || "",
      description: item.description || "",
      categoryId: item.categoryId || "",
      content: item.content || "",
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    })),
  };

  if (!normalized.archiveCodeCategories.length) {
    normalized.archiveCodeCategories = createDefaultArchiveCategories();
  }
  const fallbackCategoryId = normalized.archiveCodeCategories[0].id;
  normalized.archiveCodes = normalized.archiveCodes.map((item) => ({
    ...item,
    categoryId: normalized.archiveCodeCategories.some((category) => category.id === item.categoryId) ? item.categoryId : fallbackCategoryId,
  }));

  normalized.projects = normalized.projects.map((project) => ({
    ...project,
    searchIndex: buildProjectSearchIndex(project),
  }));

  return normalized;
}

function createHistorySnapshot(source) {
  const {
    changeHistory,
    currentView,
    sidebarCollapsed,
    archiveMenuOpen,
    sessionUserId,
    selectedProjectId,
    rememberedLogin,
    pendingApproval,
    ...rest
  } = source || {};
  return {
    ...rest,
    siteSettings: {
      ...(rest.siteSettings || {}),
      faviconDataUrl: "",
      thumbnailDataUrl: "",
    },
    projects: (rest.projects || []).map((project) => ({
      ...project,
      documents: (project.documents || []).map((document) => ({
        ...document,
        dataUrl: "",
      })),
    })),
  };
}

function serializeStateForHistory(source) {
  return JSON.stringify(createHistorySnapshot(source));
}

function saveState(options = {}) {
  const shouldCaptureHistory = options.history !== false;
  const nextHistorySnapshotJson = serializeStateForHistory(state);
  if (shouldCaptureHistory && lastHistorySnapshotJson && lastHistorySnapshotJson !== nextHistorySnapshotJson) {
    state.changeHistory = [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        snapshot: lastHistorySnapshotJson,
      },
      ...(state.changeHistory || []),
    ].slice(0, CHANGE_HISTORY_LIMIT);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    try {
      state.changeHistory = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (secondError) {
      return false;
    }
  }
  lastHistorySnapshotJson = nextHistorySnapshotJson;
  return true;
}

function getSupabaseBridge() {
  return window.BLUEWORKS_SUPABASE || null;
}

function setAuthStatus(target, message = "") {
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("hidden", !message);
}

function amountFromSupabase(value) {
  if (value === null || value === undefined || value === "") return "";
  return formatAmount(String(value));
}

function serializeProjectForSupabase(project, index = 0) {
  return {
    id: project.id,
    title: project.title || "",
    client: project.client || "",
    manager_name: project.managerName || "",
    manager_phone: project.managerPhone || "",
    status: project.status || "ready",
    progress_stage: project.progressStage || "",
    start_date: project.startDate || null,
    due_date: project.dueDate || null,
    timeline: project.timeline || "",
    notes: project.notes || "",
    imweb_id: project.imwebId || "",
    imweb_password: project.imwebPassword || "",
    contract_amount: parseAmount(project.contractAmount),
    payback_status: project.paybackStatus || "none",
    payback_amount: parseAmount(project.paybackAmount),
    payback_note: project.paybackNote || "",
    kmong_fee: parseAmount(project.kmongFee),
    payment_method: project.paymentMethod || "cash",
    tax_invoice: project.taxInvoice || "",
    package_type: project.packageType || "",
    site_type: project.siteType || "",
    language_count: Number(project.languageCount || 0),
    progress_order: index,
    project_type: project.projectType || "",
    website_url: project.websiteUrl || "",
    languages: Array.isArray(project.languages) ? project.languages : [],
    contracts_json: Array.isArray(project.contracts) ? project.contracts : [],
    created_at: project.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function deserializeProjectFromSupabase(row) {
  const project = {
    id: row.id || crypto.randomUUID(),
    title: row.title || "",
    client: row.client || "",
    projectType: row.project_type || "",
    websiteUrl: row.website_url || "",
    managerName: row.manager_name || "",
    managerPhone: row.manager_phone || "",
    packageType: row.package_type || "",
    siteType: row.site_type || "",
    languageCount: Number(row.language_count || 0),
    languages: Array.isArray(row.languages) ? row.languages : [],
    status: row.status || "ready",
    progressStage: row.progress_stage || "",
    startDate: row.start_date || "",
    dueDate: row.due_date || "",
    timeline: row.timeline || "",
    notes: row.notes || "",
    imwebId: row.imweb_id || "",
    imwebPassword: row.imweb_password || "",
    contractAmount: amountFromSupabase(row.contract_amount),
    paybackStatus: row.payback_status || "none",
    paybackAmount: amountFromSupabase(row.payback_amount),
    paybackNote: row.payback_note || "",
    paymentMethod: row.payment_method || "cash",
    kmongFee: amountFromSupabase(row.kmong_fee),
    taxInvoice: row.tax_invoice || "",
    contracts: Array.isArray(row.contracts_json) ? row.contracts_json : [],
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
  project.searchIndex = buildProjectSearchIndex(project);
  return project;
}

function serializeScheduleForSupabase(schedule) {
  return {
    id: schedule.id,
    title: schedule.title || "",
    date: schedule.date || null,
    notes: schedule.notes || "",
    project_id: schedule.projectId || null,
    created_at: schedule.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function deserializeScheduleFromSupabase(row) {
  return {
    id: row.id || crypto.randomUUID(),
    title: row.title || "",
    date: row.date || "",
    notes: row.notes || "",
    projectId: row.project_id || "",
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

async function syncProjectsAndSchedulesFromSupabase() {
  const bridge = getSupabaseBridge();
  if (!bridge?.isReady()) {
    renderSiteSettings();
    return;
  }

  bridge.statusDetail = "Supabase에서 프로젝트와 일정을 확인하는 중입니다.";
  renderSiteSettings();

  const [projectResult, scheduleResult] = await Promise.all([
    bridge.fetchProjects(),
    bridge.fetchSchedules(),
  ]);

  if (projectResult.error || scheduleResult.error) {
    bridge.mode = "supabase-error";
    bridge.error = projectResult.error || scheduleResult.error;
    bridge.statusDetail = bridge.error?.message || "Supabase 데이터를 가져오지 못했습니다.";
    renderSiteSettings();
    return;
  }

  const remoteProjects = (projectResult.data || []).map(deserializeProjectFromSupabase);
  const remoteSchedules = (scheduleResult.data || []).map(deserializeScheduleFromSupabase);
  const hasRemoteData = remoteProjects.length > 0 || remoteSchedules.length > 0;
  const hasLocalData = state.projects.length > 0 || state.schedules.length > 0;

  if (!hasRemoteData && hasLocalData) {
    const seedResult = await seedSupabaseFromLocalState();
    if (!seedResult.ok) {
      bridge.mode = "supabase-error";
      bridge.error = seedResult.error;
      bridge.statusDetail = seedResult.error?.message || "브라우저 데이터를 Supabase로 옮기지 못했습니다.";
      renderSiteSettings();
      return;
    }
    bridge.statusDetail = "브라우저에 있던 프로젝트와 일정을 Supabase로 복사했어요.";
    renderSiteSettings();
    return;
  }

  state.projects = remoteProjects;
  state.schedules = remoteSchedules;
  saveState({ history: false });
  bridge.statusDetail = `프로젝트 ${remoteProjects.length}개, 일정 ${remoteSchedules.length}개를 Supabase에서 불러왔어요.`;
  render();
}

async function seedSupabaseFromLocalState() {
  const bridge = getSupabaseBridge();
  if (!bridge?.isReady()) return { ok: false, error: new Error("Supabase client is not ready.") };

  for (const [index, project] of state.projects.entries()) {
    const result = await bridge.upsertProject(serializeProjectForSupabase(project, index));
    if (result.error) return { ok: false, error: result.error };
  }

  for (const schedule of state.schedules) {
    const result = await bridge.upsertSchedule(serializeScheduleForSupabase(schedule));
    if (result.error) return { ok: false, error: result.error };
  }

  return { ok: true };
}

function upsertMetaByName(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!content) {
    meta?.remove();
    return;
  }
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!content) {
    meta?.remove();
    return;
  }
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function applySiteSettings() {
  const settings = state.siteSettings || {};
  document.title = settings.title || "옐로펜슬";
  if (els.sidebarSiteTitle) {
    els.sidebarSiteTitle.textContent = settings.title || "옐로펜슬";
  }
  upsertMetaByName("description", settings.description || "");
  upsertMetaByName("robots", settings.blockCrawling ? "noindex,nofollow" : "");
  upsertMetaByProperty("og:title", settings.title || "");
  upsertMetaByProperty("og:description", settings.description || "");
  upsertMetaByProperty("og:image", settings.thumbnailDataUrl || "");

  let favicon = document.querySelector('link[rel="icon"]');
  if (settings.faviconDataUrl) {
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      document.head.appendChild(favicon);
    }
    favicon.setAttribute("href", settings.faviconDataUrl);
  } else {
    favicon?.remove();
  }
}

function renderSiteSettings() {
  if (!els.siteSettingsForm) return;
  const settings = state.siteSettings || {};
  els.siteSettingsForm.elements.title.value = settings.title || "";
  els.siteSettingsForm.elements.description.value = settings.description || "";
  els.siteSettingsForm.elements.metaTags.value = settings.metaTags || "";
  els.siteSettingsForm.elements.blockCrawling.checked = Boolean(settings.blockCrawling);
  renderSiteImagePreview("faviconDataUrl");
  renderSiteImagePreview("thumbnailDataUrl");
  renderSupabaseStatus();
}

function renderSupabaseStatus() {
  if (!els.supabaseStatusCard || !els.supabaseStatusText || !els.supabaseStatusDetail) return;
  const bridge = window.BLUEWORKS_SUPABASE;
  els.supabaseStatusCard.classList.remove("is-ready", "is-error");
  if (!bridge) {
    els.supabaseStatusText.textContent = "Supabase 스크립트를 찾지 못했어요.";
    els.supabaseStatusDetail.textContent = "다음 단계로 넘어가기 전에 supabase-client.js가 정상적으로 로드되는지 확인이 필요합니다.";
    els.supabaseStatusCard.classList.add("is-error");
    return;
  }

  if (bridge.mode === "supabase-ready") {
    els.supabaseStatusText.textContent = "Supabase 연결 준비가 완료됐어요.";
    els.supabaseStatusDetail.textContent = bridge.statusDetail || `프로젝트 URL: ${bridge.url} · 다음 단계에서 프로젝트와 일정 데이터를 Supabase로 옮길 수 있습니다.`;
    els.supabaseStatusCard.classList.add("is-ready");
    return;
  }

  els.supabaseStatusText.textContent = "Supabase 연결 준비 중 문제가 있어요.";
  els.supabaseStatusDetail.textContent = bridge.error?.message || "Supabase 설정 또는 스크립트 로드 상태를 확인해주세요.";
  els.supabaseStatusCard.classList.add("is-error");
}

function renderSiteImagePreview(key) {
  const settings = state.siteSettings || {};
  const target = key === "faviconDataUrl" ? els.faviconPreview : els.thumbnailPreview;
  if (!target) return;
  if (!settings[key]) {
    target.textContent = "미등록";
    target.style.backgroundImage = "";
    target.classList.remove("has-image");
    return;
  }
  target.textContent = "";
  target.style.backgroundImage = `url("${settings[key]}")`;
  target.classList.add("has-image");
}

async function handleSiteImageUpload(event, key) {
  const [file] = event.currentTarget.files || [];
  if (!file) return;
  state.siteSettings = state.siteSettings || {};
  const previousValue = state.siteSettings[key] || "";
  state.siteSettings[key] = await readFileAsDataUrl(file);
  event.currentTarget.value = "";
  if (!saveState()) {
    state.siteSettings[key] = previousValue;
    renderSiteImagePreview(key);
    openNoticeModal("저장 공간이 부족해서 이미지를 저장하지 못했어요.");
    return;
  }
  renderSiteImagePreview(key);
  applySiteSettings();
}

function removeSiteImage(key) {
  state.siteSettings = state.siteSettings || {};
  const previousValue = state.siteSettings[key] || "";
  if (!previousValue) {
    openNoticeModal("삭제할 이미지가 없습니다.");
    return;
  }
  state.siteSettings[key] = "";
  if (!saveState()) {
    state.siteSettings[key] = previousValue;
    openNoticeModal("저장 공간이 부족해서 삭제 상태를 저장하지 못했어요.");
    return;
  }
  renderSiteImagePreview(key);
  applySiteSettings();
  openNoticeModal("삭제가 완료되었어요!");
}

function handleSiteSettingsSave(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const previousSettings = { ...(state.siteSettings || {}) };
  state.siteSettings = {
    ...(state.siteSettings || {}),
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    metaTags: String(formData.get("metaTags") || "").trim(),
    blockCrawling: Boolean(formData.get("blockCrawling")),
  };
  if (!saveState()) {
    state.siteSettings = previousSettings;
    openNoticeModal("저장 공간이 부족해서 저장하지 못했어요.");
    return;
  }
  applySiteSettings();
  openNoticeModal("저장이 완료되었어요!");
}

function currentUser() {
  return state.users.find((user) => user.id === state.sessionUserId) || null;
}

function normalizeProfileRecord(profile = {}) {
  return {
    id: profile.id || crypto.randomUUID(),
    username: profile.username || "",
    password: "",
    name: profile.name || "",
    roleLabel: profile.role_label || profile.roleLabel || "멤버",
    phone: profile.phone || "",
    email: profile.email || "",
    notes: profile.notes || "",
    lastLoginAt: profile.last_login_at || profile.lastLoginAt || "",
    lastLoginIp: profile.last_login_ip || profile.lastLoginIp || "",
    canManageMembers: Boolean(profile.can_manage_members ?? profile.canManageMembers),
    isOwner: Boolean(profile.is_owner ?? profile.isOwner),
    approved: Boolean(profile.approved),
    rejected: Boolean(profile.rejected),
    createdAt: profile.created_at || profile.createdAt || new Date().toISOString(),
    updatedAt: profile.updated_at || profile.updatedAt || new Date().toISOString(),
  };
}

async function syncProfilesFromSupabase() {
  const bridge = getSupabaseBridge();
  if (!bridge?.isReady()) return { ok: false, error: new Error("Supabase client is not ready.") };
  const result = await bridge.fetchProfiles();
  if (result.error) return { ok: false, error: result.error };
  state.users = (result.data || []).map(normalizeProfileRecord);
  saveState({ history: false });
  return { ok: true, data: state.users };
}

async function applyAuthSession(session, options = {}) {
  state.sessionUserId = session?.user?.id || null;
  if (!state.sessionUserId) {
    state.users = [];
    saveState({ history: false });
    render();
    return { ok: true, message: "" };
  }

  const bridge = getSupabaseBridge();
  let profile = null;

  const currentProfileResult = await bridge?.fetchCurrentProfile?.(state.sessionUserId);
  if (currentProfileResult?.data) {
    profile = normalizeProfileRecord(currentProfileResult.data);
    const otherUsers = state.users.filter((user) => user.id !== profile.id);
    state.users = [profile, ...otherUsers];
  } else {
    const profileResult = await syncProfilesFromSupabase();
    if (!profileResult.ok) {
      const message = profileResult.error?.message || currentProfileResult?.error?.message || "멤버 정보를 불러오지 못했습니다.";
      toast(message);
      return { ok: false, message };
    }
    profile = currentUser();
  }
  if (!profile) {
    await bridge?.signOut();
    state.sessionUserId = null;
    state.users = [];
    saveState({ history: false });
    render();
    const message = "회원 정보를 찾지 못해 다시 로그인해주세요.";
    toast(message);
    return { ok: false, message };
  }

  if (profile.rejected) {
    await bridge?.signOut();
    state.sessionUserId = null;
    state.users = [];
    saveState({ history: false });
    render();
    const message = "가입 요청이 거절되었습니다.";
    if (!options.silent) toast(message);
    return { ok: false, message };
  }

  if (!profile.approved) {
    await bridge?.signOut();
    state.sessionUserId = null;
    saveState({ history: false });
    render();
    const message = "아직 소유자 승인이 완료되지 않았습니다.";
    if (!options.silent) toast(message);
    return { ok: false, message };
  }

  syncProfilesFromSupabase().catch(() => {});
  saveState({ history: false });
  render();
  return { ok: true, message: "" };
}

async function initializeSupabaseAuth() {
  const bridge = getSupabaseBridge();
  if (!bridge?.isReady()) return;

  const sessionResult = await bridge.getSession();
  await applyAuthSession(sessionResult.data?.session || null, { silent: true });

  authStateSubscription?.data?.subscription?.unsubscribe?.();
  authStateSubscription = bridge.onAuthStateChange(async (_event, session) => {
    await applyAuthSession(session, { silent: true });
  });
}

function canManageMembers(user = currentUser()) {
  return Boolean(user?.isOwner || user?.canManageMembers);
}

function selectedProject() {
  return state.projects.find((project) => project.id === state.selectedProjectId) || null;
}

function bindEvents() {
  ensureHomepageShortcut();
  setupProjectFieldLabels();
  setupCustomerFilters();
  setupProjectRichEditors();
  ensureUnsavedLeaveModal();
  ensureSalesDetailPanel();
  ensureSalesMetricPanels();
  ensureSalesFilterPanel();
  ensureProjectServiceTypeField();
  els.loginForm.addEventListener("submit", handleLogin);
  els.registerForm.addEventListener("submit", handleRegister);
  els.openRegisterPanelBtn.addEventListener("click", openRegisterPanel);
  els.backToLoginBtn.addEventListener("click", closeRegisterPanel);
  els.logoutBtn.addEventListener("click", logout);
  els.navDashboardBtn.addEventListener("click", () => switchView("dashboard"));
  els.navMembersBtn.addEventListener("click", () => switchView("members"));
  els.navCustomersBtn.addEventListener("click", () => switchView("customers"));
  els.navSalesBtn.addEventListener("click", () => switchView("sales"));
  els.navQuotesBtn.addEventListener("click", () => switchView("quotes"));
  els.navArchiveBtn?.addEventListener("click", toggleArchiveMenu);
  els.navArchiveNotesBtn?.addEventListener("click", () => switchView("archiveNotes"));
  els.navArchiveCodesBtn?.addEventListener("click", () => switchView("archiveCodes"));
  els.navSettingsBtn?.addEventListener("click", () => switchView("settings"));
  els.sidebarToggleBtn.addEventListener("click", toggleSidebar);
  els.mobileNavOpenBtn?.addEventListener("click", openMobileNav);
  els.mobileNavCloseBtn?.addEventListener("click", closeMobileNav);
  els.mobileNavOverlay?.addEventListener("click", closeMobileNav);
  els.newProjectBtn.addEventListener("click", () => openProjectModal());
  els.newMemberBtn.addEventListener("click", () => openMemberModal());
  els.openScheduleModalBtn.addEventListener("click", () => openScheduleEditorModal());
  els.newArchiveNoteBtn?.addEventListener("click", () => openArchiveNoteModal());
  els.newArchiveCodeBtn?.addEventListener("click", () => openArchiveCodeModal());
  els.newArchiveCategoryBtn?.addEventListener("click", () => openArchiveCategoryModal());

  els.projectModalCloseBtn.addEventListener("click", closeProjectModal);
  els.projectForm.addEventListener("submit", handleProjectSave);
  els.topDeleteProjectBtn.addEventListener("click", deleteCurrentProject);
  els.uploadContractBtn.addEventListener("click", handleDocumentUpload);
  els.projectForm.elements.status.addEventListener("change", syncProjectStageField);
  if (els.projectForm.elements.projectType) {
    els.projectForm.elements.projectType.addEventListener("change", syncProjectServiceFields);
  }
  els.languageCountSelect.addEventListener("change", () => renderLanguageFields(Number(els.languageCountSelect.value || 0)));
  els.paymentMethodSelect.addEventListener("change", syncPaymentFields);
  els.paybackStatusSelect.addEventListener("change", syncPaybackField);
  els.projectForm.elements.contractAmount.addEventListener("input", handleContractAmountInput);
  els.projectForm.elements.paybackAmount.addEventListener("input", handleContractAmountInput);
  if (els.projectForm.elements.kmongFee) {
    els.projectForm.elements.kmongFee.addEventListener("input", handleContractAmountInput);
  }
  if (els.customerSortSelect) {
    els.customerSortSelect.addEventListener("change", () => {
      currentCustomerPage = 1;
      renderCustomers();
    });
  }

  els.prevMonthBtn.addEventListener("click", () => moveMonth(-1));
  els.nextMonthBtn.addEventListener("click", () => moveMonth(1));
  els.openAnnualGoalAddBtn?.addEventListener("click", () => openAnnualGoalAddModal());
  els.openAnnualGoalArchiveBtn?.addEventListener("click", openAnnualGoalArchiveModal);
  els.annualGoalModalCloseBtn?.addEventListener("click", closeAnnualGoalArchiveModal);
  els.annualGoalSearchInput?.addEventListener("input", renderAnnualGoalArchiveLists);
  els.annualGoalAddForm?.addEventListener("submit", handleAnnualGoalAdd);
  els.annualGoalAddCloseBtn?.addEventListener("click", closeAnnualGoalAddModal);
  els.annualGoalAddCancelBtn?.addEventListener("click", closeAnnualGoalAddModal);
  els.openChangeHistoryBtn?.addEventListener("click", openChangeHistoryModal);
  els.changeHistoryCloseBtn?.addEventListener("click", closeChangeHistoryModal);

  els.scheduleModalForm.addEventListener("submit", handleScheduleSave);
  els.scheduleEditorCloseBtn.addEventListener("click", closeScheduleEditorModal);
  els.calendarDayCloseBtn.addEventListener("click", closeCalendarDayModal);
  els.calendarDayAddBtn.addEventListener("click", () => {
    const date = currentCalendarDayKey;
    closeCalendarDayModal();
    openScheduleEditorModal(null, date);
  });
  els.scheduleDetailCloseBtn.addEventListener("click", closeScheduleModal);
  els.scheduleDetailEditBtn.addEventListener("click", editScheduleFromDetailModal);
  els.scheduleDetailDeleteBtn?.addEventListener("click", deleteScheduleFromDetailModal);
  els.siteSettingsForm?.addEventListener("submit", handleSiteSettingsSave);
  els.faviconUploadInput?.addEventListener("change", (event) => handleSiteImageUpload(event, "faviconDataUrl"));
  els.thumbnailUploadInput?.addEventListener("change", (event) => handleSiteImageUpload(event, "thumbnailDataUrl"));
  els.faviconRemoveBtn?.addEventListener("click", () => removeSiteImage("faviconDataUrl"));
  els.thumbnailRemoveBtn?.addEventListener("click", () => removeSiteImage("thumbnailDataUrl"));

  els.confirmOkBtn.addEventListener("click", runConfirmedAction);
  els.confirmCancelBtn.addEventListener("click", closeConfirmModal);

  els.documentPreviewCloseBtn.addEventListener("click", closeDocumentPreviewModal);
  els.documentPreviewDownloadBtn.addEventListener("click", () => {
    if (currentPreviewDocumentId) downloadDocument(currentPreviewDocumentId);
  });
  els.noticeOkBtn.addEventListener("click", closeNoticeModal);
  els.worklogCloseBtn.addEventListener("click", closeWorklogModal);
  els.addWorklogTaskBtn.addEventListener("click", () => {
    ensureWorklogDraft();
    currentWorklogDraft.tasks.push(createWorklogTask());
    renderWorklogTasks();
  });
  els.worklogForm.addEventListener("submit", handleWorklogSave);
  els.memberModalCloseBtn.addEventListener("click", closeMemberModal);
  els.memberForm.addEventListener("submit", handleMemberSave);
  els.archiveNoteCloseBtn?.addEventListener("click", closeArchiveNoteModal);
  els.archiveNoteEditBtn?.addEventListener("click", () => setArchiveNoteEditing(true));
  els.archiveNoteDeleteBtn?.addEventListener("click", deleteCurrentArchiveNote);
  els.archiveNoteForm?.addEventListener("submit", handleArchiveNoteSave);
  els.archiveCodeCloseBtn?.addEventListener("click", closeArchiveCodeModal);
  els.archiveCodeEditBtn?.addEventListener("click", () => setArchiveCodeEditing(true));
  els.archiveCodeDeleteBtn?.addEventListener("click", deleteCurrentArchiveCode);
  els.archiveCodeForm?.addEventListener("submit", handleArchiveCodeSave);
  els.archiveCodeInput?.addEventListener("input", syncArchiveCodeHighlight);
  els.archiveCodeInput?.addEventListener("scroll", syncArchiveCodeScroll);
  els.archiveCategoryCloseBtn?.addEventListener("click", closeArchiveCategoryModal);
  els.archiveCategoryDeleteBtn?.addEventListener("click", deleteCurrentArchiveCategory);
  els.archiveCategoryForm?.addEventListener("submit", handleArchiveCategorySave);
  if (els.customerSearchInput) {
    els.customerSearchInput.addEventListener("input", () => {
      currentCustomerPage = 1;
      renderCustomers();
    });
  }

  els.sidebarToggleBtn.classList.add("icon-btn");
  if (els.scheduleDetailCloseBtn.parentElement && !els.scheduleDetailCloseBtn.parentElement.classList.contains("modal-head-actions")) {
    const headActions = document.createElement("div");
    headActions.className = "modal-head-actions";
    els.scheduleDetailCloseBtn.parentElement.appendChild(headActions);
    headActions.appendChild(els.scheduleDetailEditBtn);
    headActions.appendChild(els.scheduleDetailCloseBtn);
  }
  els.memberForm.elements.approved.closest("label").classList.add("checkbox-card");
  els.memberForm.elements.canManageMembers.closest("label").classList.add("checkbox-card");

  document.querySelectorAll(".picker-date").forEach(setupDatePickerInput);
  initializeCustomSelects();
  bindOverlayDismissals();
}

function setupProjectFieldLabels() {
  const websiteLabel = els.projectForm?.elements?.websiteUrl?.closest("label");
  if (!websiteLabel) return;
  const textNode = Array.from(websiteLabel.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) textNode.textContent = "홈페이지 주소";
  if (els.projectForm?.elements?.startDate) els.projectForm.elements.startDate.required = true;
  if (els.projectForm?.elements?.dueDate) els.projectForm.elements.dueDate.required = true;
}

function ensureHomepageShortcut() {
  const linkGroup = document.querySelector(".utility-home-link") || document.querySelector(".utility-actions");
  if (!linkGroup) return;
  const links = [
    ["homepageShortcutBtn", "옐로펜슬", "https://yellopencil.com"],
    ["portfolioShortcutBtn", "포트폴리오", "https://yellopencil.com/design_report"],
    ["reviewShortcutBtn", "후기", "https://yellopencil.com/review"],
  ];
  links.forEach(([id, label, url]) => {
    let button = document.querySelector(`#${id}`);
    if (!button) {
      button = document.createElement("button");
      button.id = id;
      button.type = "button";
      button.className = "ghost small-btn utility-shortcut-btn";
      linkGroup.appendChild(button);
    }
    button.classList.add("utility-shortcut-btn");
    button.textContent = label;
    if (button.dataset.bound === "true") return;
    button.addEventListener("click", () => {
      window.open(url, "_blank", "noopener,noreferrer");
    });
    button.dataset.bound = "true";
  });
}

function ensureProjectServiceTypeField() {
  const projectTitleField = els.projectForm?.elements?.title?.closest(".two-col");
  const packageRow = els.projectForm?.elements?.packageType?.closest(".three-col");
  if (!projectTitleField || !packageRow || els.projectForm.elements.projectType) return;

  packageRow.insertAdjacentHTML(
    "beforebegin",
    `
      <label id="projectTypeField">작업 유형
        <select name="projectType">
          <option value="">선택</option>
          <option value="newHomepage">신규 홈페이지</option>
          <option value="renewal">홈페이지 리뉴얼</option>
          <option value="partialManagement">홈페이지 부분 수정 · 관리</option>
          <option value="popupBanner">팝업 · 배너</option>
          <option value="detailPage">상세페이지</option>
          <option value="businessCard">명함</option>
          <option value="other">기타</option>
        </select>
      </label>
    `,
  );
  initializeCustomSelects();
}

function setupCustomerFilters() {
  const searchField = document.querySelector(".customer-search-field");
  if (!searchField || document.querySelector("#customerFilterPackage")) return;
  searchField.insertAdjacentHTML("afterend", `
    <section class="customer-filter-panel">
      <div class="customer-filter-grid customer-filter-grid-primary">
        <label>계약 연도
          <select id="customerFilterContractYear">
            <option value="">전체</option>
          </select>
        </label>
        <label>계약 월
          <select id="customerFilterContractMonth">
            <option value="">전체</option>
            <option value="01">1월</option>
            <option value="02">2월</option>
            <option value="03">3월</option>
            <option value="04">4월</option>
            <option value="05">5월</option>
            <option value="06">6월</option>
            <option value="07">7월</option>
            <option value="08">8월</option>
            <option value="09">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </label>
        <label>작업 상태
          <select id="customerFilterStatus">
            <option value="">전체</option>
            <option value="ready">작업 준비</option>
            <option value="inProgress">작업 중</option>
            <option value="done">작업 완료</option>
          </select>
        </label>
      </div>
      <details class="customer-filter-advanced">
        <summary>상세 필터 보기</summary>
        <div class="customer-filter-grid customer-filter-grid-secondary">
          <label>작업 유형
            <select id="customerFilterProjectType">
              <option value="">전체</option>
              <option value="newHomepage">신규 홈페이지</option>
              <option value="renewal">홈페이지 리뉴얼</option>
              <option value="partialManagement">홈페이지 부분 수정 · 관리</option>
              <option value="popupBanner">팝업 · 배너</option>
              <option value="detailPage">상세페이지</option>
              <option value="businessCard">명함</option>
              <option value="other">기타</option>
            </select>
          </label>
          <label>패키지
            <select id="customerFilterPackage">
              <option value="">전체</option>
              <option value="basic">베이직 패키지</option>
              <option value="premium">프리미엄 패키지</option>
            </select>
          </label>
          <label>타입
            <select id="customerFilterType">
              <option value="">전체</option>
              <option value="onePage">원페이지 타입</option>
              <option value="business">비즈니스 타입</option>
              <option value="businessPlus">비즈니스 플러스 타입</option>
              <option value="shoppingMall">쇼핑몰 타입</option>
            </select>
          </label>
          <label>다국어
            <select id="customerFilterLanguage">
              <option value="">전체</option>
              <option value="none">다국어 없음</option>
              <option value="enabled">다국어 있음</option>
            </select>
          </label>
          <label>페이백
            <select id="customerFilterPayback">
              <option value="">전체</option>
              <option value="none">페이백 안함</option>
              <option value="enabled">페이백 함</option>
            </select>
          </label>
          <label>결제 방식
            <select id="customerFilterPayment">
              <option value="">전체</option>
              <option value="card">카드 결제</option>
              <option value="cash">현금 결제</option>
              <option value="kmong">크몽 결제</option>
            </select>
          </label>
          <label>세금계산서
            <select id="customerFilterTax">
              <option value="">전체</option>
              <option value="issued">발행</option>
              <option value="notIssued">미발행</option>
            </select>
          </label>
        </div>
      </details>
      <div class="customer-filter-actions">
        <button type="button" id="customerFilterResetBtn" class="ghost small-btn">초기화</button>
      </div>
    </section>
  `);

  [
    "#customerFilterProjectType",
    "#customerFilterPackage",
    "#customerFilterType",
    "#customerFilterLanguage",
    "#customerFilterPayback",
    "#customerFilterPayment",
    "#customerFilterTax",
      "#customerFilterContractYear",
      "#customerFilterContractMonth",
      "#customerFilterStatus",
    ].forEach((selector) => {
    const field = document.querySelector(selector);
    if (!field) return;
    field.addEventListener("change", () => {
      currentCustomerPage = 1;
      renderCustomers();
    });
  });

  document.querySelector("#customerFilterResetBtn")?.addEventListener("click", () => {
    [
      "#customerFilterContractYear",
      "#customerFilterContractMonth",
      "#customerFilterStatus",
      "#customerFilterProjectType",
      "#customerFilterPackage",
      "#customerFilterType",
      "#customerFilterLanguage",
      "#customerFilterPayback",
      "#customerFilterPayment",
      "#customerFilterTax",
    ].forEach((selector) => {
      const field = document.querySelector(selector);
      if (!field) return;
      field.value = "";
      refreshCustomSelect(field);
    });
    if (els.customerSearchInput) els.customerSearchInput.value = "";
    currentCustomerPage = 1;
    renderCustomers();
  });

  populateCustomerContractYears();
  initializeCustomSelects();
}

function setupProjectRichEditors() {
  ensureRichLinkModal();
  [
    { name: "timeline", label: "타임라인" },
    { name: "notes", label: "메모" },
  ].forEach(({ name, label }) => {
    const textarea = els.projectForm?.elements?.[name];
    if (!textarea || textarea.dataset.richEditor === "ready") return;
    textarea.dataset.richEditor = "ready";
    textarea.classList.add("hidden-rich-input");
    textarea.insertAdjacentHTML(
      "afterend",
      `
        <div class="rich-editor" data-editor-for="${name}">
          <div class="rich-editor-toolbar">
            <button type="button" class="ghost tiny-btn" data-rich-action="bold">볼드</button>
            <div class="rich-editor-color">
              <span>폰트 컬러</span>
              <button type="button" class="rich-color-trigger" data-rich-action="color-trigger" aria-label="${label} 폰트 컬러">
                <span class="rich-color-swatch" data-rich-color-swatch></span>
              </button>
              <div class="rich-color-popover hidden" data-rich-color-popover>
                <div class="rich-color-presets">
                  <button type="button" class="rich-color-preset" data-rich-preset="#c85b5b" style="--preset-color:#c85b5b" aria-label="레드"></button>
                  <button type="button" class="rich-color-preset" data-rich-preset="#5f84d6" style="--preset-color:#5f84d6" aria-label="블루"></button>
                  <button type="button" class="rich-color-preset" data-rich-preset="#58a378" style="--preset-color:#58a378" aria-label="그린"></button>
                  <button type="button" class="rich-color-preset" data-rich-preset="#8b6ad1" style="--preset-color:#8b6ad1" aria-label="퍼플"></button>
                  <button type="button" class="rich-color-preset" data-rich-preset="#a97452" style="--preset-color:#a97452" aria-label="브라운"></button>
                  <button type="button" class="rich-color-preset" data-rich-preset="#3f5f9d" style="--preset-color:#3f5f9d" aria-label="네이비"></button>
                </div>
                <div class="rich-color-popover-row">
                  <input type="text" class="rich-color-hex-input" value="#111827" data-rich-action="color-hex" inputmode="text" spellcheck="false">
                  <button type="button" class="ghost tiny-btn rich-color-reset-btn" data-rich-action="color-reset">기본색으로 되돌리기</button>
                </div>
                <label class="rich-color-picker-field">
                  <span>직접 선택</span>
                  <input type="color" value="#111827" data-rich-action="color">
                </label>
              </div>
            </div>
            <label class="rich-editor-size">
              <span>글씨 크기</span>
              <select data-rich-action="size">
                <option value="3">기본</option>
                <option value="2">작게</option>
                <option value="4">크게</option>
                <option value="5">더 크게</option>
              </select>
            </label>
            <button type="button" class="ghost tiny-btn rich-link-btn" data-rich-action="link" aria-label="${label} 링크">🔗</button>
          </div>
          <div class="rich-editor-surface" contenteditable="true" data-rich-surface="${name}"></div>
        </div>
      `,
    );
    const editor = document.querySelector(`[data-editor-for="${name}"]`);
    const surface = editor?.querySelector(`[data-rich-surface="${name}"]`);
    const colorTrigger = editor?.querySelector('[data-rich-action="color-trigger"]');
    const colorSwatch = editor?.querySelector("[data-rich-color-swatch]");
    const colorPopover = editor?.querySelector("[data-rich-color-popover]");
    const colorInput = editor?.querySelector('[data-rich-action="color"]');
    const colorHexInput = editor?.querySelector('[data-rich-action="color-hex"]');
    const colorResetBtn = editor?.querySelector('[data-rich-action="color-reset"]');
    const presetButtons = Array.from(editor.querySelectorAll("[data-rich-preset]"));
    const sizeSelect = editor?.querySelector('[data-rich-action="size"]');
    const boldBtn = editor?.querySelector('[data-rich-action="bold"]');
    const linkBtn = editor?.querySelector('[data-rich-action="link"]');
    if (!editor || !surface || !colorTrigger || !colorSwatch || !colorPopover || !colorInput || !colorHexInput || !colorResetBtn || !sizeSelect || !boldBtn || !linkBtn) return;

    const applyColor = (value) => {
      const normalized = normalizeHexColor(value);
      if (!normalized) return false;
      colorInput.value = normalized;
      colorHexInput.value = normalized;
      colorSwatch.style.background = normalized;
      surface.focus();
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("foreColor", false, normalized);
      syncValue();
      return true;
    };

    const syncValue = () => {
      surface.querySelectorAll("a").forEach((anchor) => {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      });
      textarea.value = normalizeRichEditorHtml(surface.innerHTML);
    };

    surface.addEventListener("input", syncValue);
    surface.addEventListener("blur", syncValue);

    boldBtn.addEventListener("click", () => {
      surface.focus();
      document.execCommand("bold");
      syncValue();
    });

    colorInput.addEventListener("input", () => {
      applyColor(colorInput.value);
    });

    presetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyColor(button.dataset.richPreset);
      });
    });

    colorHexInput.addEventListener("change", () => {
      if (!applyColor(colorHexInput.value)) colorHexInput.value = colorInput.value;
    });

    colorHexInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      if (!applyColor(colorHexInput.value)) colorHexInput.value = colorInput.value;
    });

    colorResetBtn.addEventListener("click", () => {
      applyColor("#111827");
    });

    colorTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelectorAll(".rich-color-popover").forEach((popover) => {
        if (popover !== colorPopover) popover.classList.add("hidden");
      });
      colorPopover.classList.toggle("hidden");
    });

    colorPopover.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", () => {
      colorPopover.classList.add("hidden");
    });

    sizeSelect.addEventListener("change", () => {
      surface.focus();
      document.execCommand("fontSize", false, sizeSelect.value);
      syncValue();
    });

    linkBtn.addEventListener("click", () => {
      const selection = window.getSelection?.();
      const selectedText = String(selection?.toString?.() || "").trim();
      if (!selectedText) {
        openNoticeModal("링크를 걸 텍스트를 먼저 선택해주세요.");
        return;
      }
      currentRichLinkContext = {
        surface,
        range: selection && selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null,
      };
      openRichLinkModal();
    });

    surface.addEventListener("click", (event) => {
      const anchor = event.target.closest("a");
      if (!anchor) return;
      event.preventDefault();
      window.open(anchor.href, "_blank", "noopener,noreferrer");
    });
  });
}

function ensureRichLinkModal() {
  if (document.querySelector("#richLinkModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="richLinkModal" class="modal-overlay hidden">
      <div class="modal-card rich-link-modal-card">
        <div class="modal-head">
          <div>
            <h3>링크 추가</h3>
          </div>
          <button type="button" id="richLinkCloseBtn" class="ghost">닫기</button>
        </div>
        <div class="form-stack">
          <label>링크 주소
            <input id="richLinkInput" type="url" value="https://">
          </label>
        </div>
        <div class="modal-actions">
          <button type="button" id="richLinkApplyBtn" class="primary">링크 적용</button>
        </div>
      </div>
    </div>
  `);

  const modal = document.querySelector("#richLinkModal");
  const closeBtn = document.querySelector("#richLinkCloseBtn");
  const applyBtn = document.querySelector("#richLinkApplyBtn");
  const input = document.querySelector("#richLinkInput");
  closeBtn?.addEventListener("click", closeRichLinkModal);
  applyBtn?.addEventListener("click", applyRichLink);
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    applyRichLink();
  });
  modal?.addEventListener("mousedown", (event) => {
    if (event.target === modal) closeRichLinkModal();
  });
}

function ensureUnsavedLeaveModal() {
  if (document.querySelector("#unsavedLeaveModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="unsavedLeaveModal" class="modal-overlay hidden">
      <div class="modal-card unsaved-leave-modal-card">
        <h3>변경된 사항이 있습니다.<br>저장하고 나가시겠습니까?</h3>
        <div class="modal-actions">
          <button type="button" id="unsavedLeaveStayBtn" class="ghost">계속 작성하기</button>
          <button type="button" id="unsavedLeaveSaveBtn" class="primary">저장하고 나가기</button>
        </div>
      </div>
    </div>
  `);

  document.querySelector("#unsavedLeaveSaveBtn")?.addEventListener("click", () => {
    const action = pendingUnsavedLeaveAction;
    closeUnsavedLeaveModal();
    if (action) action();
  });
  document.querySelector("#unsavedLeaveStayBtn")?.addEventListener("click", closeUnsavedLeaveModal);
}

function openUnsavedLeaveModal(action) {
  pendingUnsavedLeaveAction = action;
  document.querySelector("#unsavedLeaveModal")?.classList.remove("hidden");
}

function closeUnsavedLeaveModal() {
  pendingUnsavedLeaveAction = null;
  document.querySelector("#unsavedLeaveModal")?.classList.add("hidden");
}

function openRichLinkModal() {
  const modal = document.querySelector("#richLinkModal");
  const input = document.querySelector("#richLinkInput");
  if (!modal || !input) return;
  input.value = "https://";
  modal.classList.remove("hidden");
  setTimeout(() => {
    input.focus();
    const cursorPosition = input.value.length;
    input.setSelectionRange(cursorPosition, cursorPosition);
  }, 0);
}

function closeRichLinkModal() {
  document.querySelector("#richLinkModal")?.classList.add("hidden");
  currentRichLinkContext = null;
}

function applyRichLink() {
  const input = document.querySelector("#richLinkInput");
  const urlValue = String(input?.value || "").trim();
  if (!urlValue || !currentRichLinkContext?.surface || !currentRichLinkContext?.range) {
    closeRichLinkModal();
    return;
  }
  const normalizedUrl = /^(https?:)?\/\//i.test(urlValue) ? urlValue : `https://${urlValue}`;
  const { surface, range } = currentRichLinkContext;
  surface.focus();
  const selection = window.getSelection?.();
  if (!selection) return;
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("createLink", false, normalizedUrl);
  surface.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  });
  const textarea = els.projectForm?.elements?.[surface.dataset.richSurface || ""];
  if (textarea) textarea.value = normalizeRichEditorHtml(surface.innerHTML);
  closeRichLinkModal();
}

function ensureSalesDetailPanel() {
  const existing = document.querySelector("#salesDetailPanel");
  if (existing) existing.remove();
}

function ensureSalesMetricPanels() {
  if (!document.querySelector("#salesMonthlyMetrics") && els.salesMonthlyChart) {
    els.salesMonthlyChart.insertAdjacentHTML("afterend", `
      <div id="salesMonthlyMetrics" class="sales-metrics sales-metrics-inline"></div>
      <div id="salesMonthlyMix" class="sales-mix-grid"></div>
    `);
  }
  if (!document.querySelector("#salesYearlyMetrics") && els.salesYearlyChart) {
    els.salesYearlyChart.insertAdjacentHTML("afterend", `
      <div id="salesYearlyMetrics" class="sales-metrics sales-metrics-inline"></div>
      <div id="salesYearlyMix" class="sales-mix-grid"></div>
    `);
  }
}

function ensureSalesFilterPanel() {
  const salesGrid = document.querySelector(".sales-grid");
  if (!salesGrid || document.querySelector("#salesFilterPanel")) return;
  salesGrid.insertAdjacentHTML("afterend", `
    <section id="salesFilterPanel" class="panel sales-filter-panel">
      <div class="section-head">
        <div>
          <h3>매출 찾기</h3>
        </div>
        <div class="board-tools">
          <button type="button" id="salesFilterResetBtn" class="ghost">초기화</button>
        </div>
      </div>
      <div class="sales-filter-grid">
        <label>연도
          <select id="salesFilterYear">
            <option value="">전체</option>
          </select>
        </label>
        <label>월
          <select id="salesFilterMonth">
            <option value="">전체</option>
            <option value="01">1월</option>
            <option value="02">2월</option>
            <option value="03">3월</option>
            <option value="04">4월</option>
            <option value="05">5월</option>
            <option value="06">6월</option>
            <option value="07">7월</option>
            <option value="08">8월</option>
            <option value="09">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </label>
        <label>결제 방식
          <select id="salesFilterPayment">
            <option value="">전체</option>
            <option value="card">카드 결제</option>
            <option value="cash">현금 결제</option>
            <option value="kmong">크몽 결제</option>
          </select>
        </label>
        <label>세금계산서
          <select id="salesFilterTax">
            <option value="">전체</option>
            <option value="issued">발행</option>
            <option value="notIssued">미발행</option>
            <option value="none">해당없음</option>
          </select>
        </label>
        <label>페이백
          <select id="salesFilterPayback">
            <option value="">전체</option>
            <option value="enabled">페이백 있음</option>
            <option value="none">페이백 없음</option>
          </select>
        </label>
        <label>기간 시작
          <input id="salesFilterStartDate" type="date" class="picker-date">
        </label>
        <label>기간 종료
          <input id="salesFilterEndDate" type="date" class="picker-date">
        </label>
        <label>검색
          <input id="salesFilterKeyword" type="search" placeholder="고객사명 또는 프로젝트명">
        </label>
      </div>
      <div id="salesFilterMetrics" class="sales-metrics sales-filter-metrics"></div>
    </section>
  `);

  [
    "#salesFilterYear",
    "#salesFilterMonth",
    "#salesFilterPayment",
    "#salesFilterTax",
    "#salesFilterPayback",
    "#salesFilterStartDate",
    "#salesFilterEndDate",
    "#salesFilterKeyword",
  ].forEach((selector) => {
    const node = document.querySelector(selector);
    if (!node) return;
    node.addEventListener(node.type === "search" ? "input" : "change", () => renderSales());
  });

  const resetBtn = document.querySelector("#salesFilterResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      [
        "#salesFilterYear",
        "#salesFilterMonth",
        "#salesFilterPayment",
        "#salesFilterTax",
        "#salesFilterPayback",
        "#salesFilterStartDate",
        "#salesFilterEndDate",
        "#salesFilterKeyword",
      ].forEach((selector) => {
        const node = document.querySelector(selector);
        if (!node) return;
        node.value = "";
      });
      syncAllCustomSelects();
      renderSales();
    });
  }

  document.querySelectorAll("#salesFilterPanel .picker-date").forEach(setupDatePickerInput);
  initializeCustomSelects();
}

function populateSalesFilterYears() {
  const yearSelect = document.querySelector("#salesFilterYear");
  if (!yearSelect) return;
  const currentValue = yearSelect.value;
  const yearSet = new Set([String(new Date().getFullYear())]);
  state.projects.forEach((project) => {
    const year = String(project.startDate || "").slice(0, 4);
    if (year) yearSet.add(year);
  });
  const options = Array.from(yearSet).sort((a, b) => a.localeCompare(b));
  yearSelect.innerHTML = '<option value="">전체</option>' + options.map((year) => `<option value="${year}">${year}년</option>`).join("");
  yearSelect.value = options.includes(currentValue) ? currentValue : "";
  refreshCustomSelect(yearSelect);
}

function getSalesFilterState() {
  return {
    year: String(document.querySelector("#salesFilterYear")?.value || ""),
    month: String(document.querySelector("#salesFilterMonth")?.value || ""),
    payment: String(document.querySelector("#salesFilterPayment")?.value || ""),
    tax: String(document.querySelector("#salesFilterTax")?.value || ""),
    payback: String(document.querySelector("#salesFilterPayback")?.value || ""),
    startDate: String(document.querySelector("#salesFilterStartDate")?.value || ""),
    endDate: String(document.querySelector("#salesFilterEndDate")?.value || ""),
    keyword: String(document.querySelector("#salesFilterKeyword")?.value || "").trim().toLowerCase(),
  };
}

function getCustomerFilters() {
  return {
    contractYear: String(document.querySelector("#customerFilterContractYear")?.value || ""),
    contractMonth: String(document.querySelector("#customerFilterContractMonth")?.value || ""),
    status: String(document.querySelector("#customerFilterStatus")?.value || ""),
    sort: String(document.querySelector("#customerSortSelect")?.value || "contractAsc"),
    projectType: String(document.querySelector("#customerFilterProjectType")?.value || ""),
    packageType: String(document.querySelector("#customerFilterPackage")?.value || ""),
    siteType: String(document.querySelector("#customerFilterType")?.value || ""),
    language: String(document.querySelector("#customerFilterLanguage")?.value || ""),
    payback: String(document.querySelector("#customerFilterPayback")?.value || ""),
    payment: String(document.querySelector("#customerFilterPayment")?.value || ""),
    tax: String(document.querySelector("#customerFilterTax")?.value || ""),
  };
}

function populateCustomerContractYears() {
  const yearSelect = document.querySelector("#customerFilterContractYear");
  if (!yearSelect) return;
  const currentValue = yearSelect.value;
  const years = Array.from(new Set(
    state.projects
      .map((project) => String(project.startDate || "").slice(0, 4))
      .filter(Boolean),
  )).sort((a, b) => a.localeCompare(b));
  yearSelect.innerHTML = '<option value="">전체</option>' + years.map((year) => `<option value="${year}">${year}년</option>`).join("");
  yearSelect.value = years.includes(currentValue) ? currentValue : "";
  refreshCustomSelect(yearSelect);
}

function normalizeAppLayout() {
  const appContent = document.querySelector(".app-content");
  const utilityBar = document.querySelector(".utility-bar:not(.utility-bar-clone)");
  const utilityBarClone = document.querySelector(".utility-bar-clone");
  if (utilityBarClone) utilityBarClone.remove();
  if (appContent && utilityBar && appContent.firstElementChild !== utilityBar) {
    appContent.insertBefore(utilityBar, appContent.firstElementChild);
  }
}

function serializeFormControls(form) {
  if (!form) return "";
  return JSON.stringify(
    Array.from(form.querySelectorAll("input, select, textarea"))
      .filter((field) => field.name && field.type !== "file")
      .map((field) => {
        if (field.type === "checkbox" || field.type === "radio") {
          return [field.name, Boolean(field.checked)];
        }
        return [field.name, field.value];
      }),
  );
}

function captureProjectModalState() {
  syncProjectRichEditorValues();
  return JSON.stringify({
    form: serializeFormControls(els.projectForm),
    documents: draftProjectDocuments,
  });
}

function captureScheduleModalState() {
  return serializeFormControls(els.scheduleModalForm);
}

function captureMemberModalState() {
  return serializeFormControls(els.memberForm);
}

function captureWorklogModalState() {
  ensureWorklogDraft();
  return JSON.stringify({
    tasks: currentWorklogDraft.tasks,
    notes: String(els.worklogForm?.elements?.notes?.value || ""),
  });
}

function captureArchiveNoteModalState() {
  return serializeFormControls(els.archiveNoteForm);
}

function captureArchiveCodeModalState() {
  return serializeFormControls(els.archiveCodeForm);
}

function captureArchiveCategoryModalState() {
  return serializeFormControls(els.archiveCategoryForm);
}

function setModalSnapshot(key, value) {
  modalSnapshots[key] = value;
}

function hasUnsavedChanges(key) {
  switch (key) {
    case "project":
      return modalSnapshots.project !== captureProjectModalState();
    case "schedule":
      return modalSnapshots.schedule !== captureScheduleModalState();
    case "member":
      return modalSnapshots.member !== captureMemberModalState();
    case "worklog":
      return modalSnapshots.worklog !== captureWorklogModalState();
    case "archiveNote":
      return modalSnapshots.archiveNote !== captureArchiveNoteModalState();
    case "archiveCode":
      return modalSnapshots.archiveCode !== captureArchiveCodeModalState();
    case "archiveCategory":
      return modalSnapshots.archiveCategory !== captureArchiveCategoryModalState();
    default:
      return false;
  }
}

function saveAndCloseDirtyModal(key) {
  switch (key) {
    case "project":
      els.projectForm?.requestSubmit();
      break;
    case "schedule":
      els.scheduleModalForm?.requestSubmit();
      break;
    case "member":
      els.memberForm?.requestSubmit();
      break;
    case "worklog":
      els.worklogForm?.requestSubmit();
      break;
    case "archiveNote":
      els.archiveNoteForm?.requestSubmit();
      break;
    case "archiveCode":
      els.archiveCodeForm?.requestSubmit();
      break;
    case "archiveCategory":
      els.archiveCategoryForm?.requestSubmit();
      break;
    default:
      break;
  }
}

function bindOverlayDismissals() {
  const overlayClosers = [
    [els.projectModal, closeProjectModal, "project"],
    [els.confirmModal, closeConfirmModal],
    [els.scheduleDetailModal, closeScheduleModal],
    [els.scheduleEditorModal, closeScheduleEditorModal, "schedule"],
    [els.calendarDayModal, closeCalendarDayModal],
    [els.documentPreviewModal, closeDocumentPreviewModal],
    [els.noticeModal, closeNoticeModal],
    [els.worklogModal, closeWorklogModal, "worklog"],
    [els.annualGoalModal, closeAnnualGoalArchiveModal],
    [els.annualGoalAddModal, closeAnnualGoalAddModal],
    [els.changeHistoryModal, closeChangeHistoryModal],
    [els.memberModal, closeMemberModal, "member"],
    [els.archiveNoteModal, closeArchiveNoteModal, "archiveNote"],
    [els.archiveCodeModal, closeArchiveCodeModal, "archiveCode"],
    [els.archiveCategoryModal, closeArchiveCategoryModal, "archiveCategory"],
  ];

  overlayClosers.forEach(([overlay, close, dirtyKey]) => {
    if (!overlay) return;
    overlay.addEventListener("mousedown", (event) => {
      if (event.target !== overlay) return;
      if (!dirtyKey || !hasUnsavedChanges(dirtyKey)) {
        close();
        return;
      }
      openUnsavedLeaveModal(() => saveAndCloseDirtyModal(dirtyKey));
    });
  });
}

function render() {
  els.body.removeAttribute("data-theme");
  applySiteSettings();
  const user = currentUser();

  els.authView.classList.toggle("hidden", Boolean(user));
  els.appView.classList.toggle("hidden", !user);
  els.pendingApprovalCard.classList.toggle("hidden", !state.pendingApproval || Boolean(user));
  if (!user) {
    closeRegisterPanel();
    hydrateRememberedLogin();
    return;
  }

  const roleLabel = String(user.roleLabel || "").trim();
  const userLabel = [user.name, roleLabel].filter(Boolean).join(" ");
  els.welcomeText.textContent = `${userLabel}님, 블루웍스에 오신 것을 환영해요!`;
  if (els.membersHeroText) {
    els.membersHeroText.textContent = `${roleLabel || "멤버"}님, 옐로펜슬 멤버를 관리하세요.`;
  }
  if (els.projectsHeroText) {
    els.projectsHeroText.textContent = `${roleLabel || "멤버"}님, 모든 프로젝트를 모아놨어요.`;
  }
  if (els.salesHeroText) {
    els.salesHeroText.textContent = `${roleLabel || "멤버"}님, 월별 · 연도별 매출표에요.`;
  }
  if (els.quotesHeroText) {
    els.quotesHeroText.textContent = `${roleLabel || "멤버"}님, 견적서와 계약서를 생성하고 관리하세요.`;
  }
  if (els.archiveNotesHeroText) {
    els.archiveNotesHeroText.textContent = `${roleLabel || "멤버"}님, 자주 쓰는 문장을 아카이브하세요.`;
  }
  if (els.archiveCodesHeroText) {
    els.archiveCodesHeroText.textContent = `${roleLabel || "멤버"}님, 자주 쓰는 코드를 아카이브하세요.`;
  }
  syncCurrentView();
  syncSidebar();
  if (new URLSearchParams(window.location.search).get("mobileNav") === "open") {
    openMobileNav();
  } else {
    closeMobileNav();
  }

  renderSummary();
  renderBoard();
  renderSchedules();
  renderCalendar();
  renderAnnualGoals();
  renderMembers();
  renderCustomers();
  renderSales();
  renderArchiveNotes();
  renderArchiveCodeCategories();
  renderArchiveCodes();
  renderSiteSettings();
  applySiteSettings();
  syncAllCustomSelects();
}

function switchView(view) {
  if (view === "members" && !canManageMembers()) return;
  state.currentView = view;
  if (view === "archiveNotes" || view === "archiveCodes") state.archiveMenuOpen = true;
  saveState({ history: false });
  syncCurrentView();
  closeMobileNav();
}

function syncCurrentView() {
  const user = currentUser();
  const memberAccess = canManageMembers(user);
  if (!memberAccess && state.currentView === "members") {
    state.currentView = "dashboard";
    saveState({ history: false });
  }
  const activeView = state.currentView || "dashboard";
  els.dashboardView.classList.toggle("hidden", activeView !== "dashboard");
  els.membersView.classList.toggle("hidden", activeView !== "members");
  els.customersView.classList.toggle("hidden", activeView !== "customers");
  els.salesView.classList.toggle("hidden", activeView !== "sales");
  els.quotesView.classList.toggle("hidden", activeView !== "quotes");
  els.archiveNotesView.classList.toggle("hidden", activeView !== "archiveNotes");
  els.archiveCodesView.classList.toggle("hidden", activeView !== "archiveCodes");
  els.settingsView?.classList.toggle("hidden", activeView !== "settings");
  els.navDashboardBtn.classList.toggle("active", activeView === "dashboard");
  els.navMembersBtn.classList.toggle("active", activeView === "members");
  els.navCustomersBtn.classList.toggle("active", activeView === "customers");
  els.navSalesBtn.classList.toggle("active", activeView === "sales");
  els.navQuotesBtn.classList.toggle("active", activeView === "quotes");
  els.navArchiveBtn?.classList.toggle("active", activeView === "archiveNotes" || activeView === "archiveCodes");
  els.navArchiveNotesBtn?.classList.toggle("active", activeView === "archiveNotes");
  els.navArchiveCodesBtn?.classList.toggle("active", activeView === "archiveCodes");
  els.navSettingsBtn?.classList.toggle("active", activeView === "settings");
  els.navMembersBtn.classList.toggle("hidden", !memberAccess);
  els.newMemberBtn.disabled = !memberAccess;
  const archiveOpen = Boolean(state.archiveMenuOpen && !state.sidebarCollapsed);
  els.archiveSubnav?.classList.toggle("is-open", archiveOpen);
}

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  saveState({ history: false });
  syncSidebar();
}

function syncSidebar() {
  const collapsed = Boolean(state.sidebarCollapsed);
  els.body.setAttribute("data-sidebar-collapsed", String(collapsed));
  els.sidebarToggleBtn.textContent = collapsed ? "❯" : "❮";
  els.sidebarToggleBtn.setAttribute("aria-label", collapsed ? "사이드바 펼치기" : "사이드바 접기");
  const archiveOpen = Boolean(state.archiveMenuOpen && !collapsed);
  els.archiveSubnav?.classList.toggle("is-open", archiveOpen);
}

function openMobileNav() {
  els.body.setAttribute("data-mobile-nav-open", "true");
  els.mobileNavOverlay?.classList.remove("hidden");
}

function closeMobileNav() {
  els.body.setAttribute("data-mobile-nav-open", "false");
  els.mobileNavOverlay?.classList.add("hidden");
}

function toggleArchiveMenu() {
  state.archiveMenuOpen = !state.archiveMenuOpen;
  if (state.archiveMenuOpen && !["archiveNotes", "archiveCodes"].includes(state.currentView)) {
    state.currentView = "archiveNotes";
  }
  saveState({ history: false });
  syncCurrentView();
}

async function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  const rememberLogin = Boolean(formData.get("rememberLogin"));
  const submitButton = form.querySelector('button[type="submit"]');
  const bridge = getSupabaseBridge();
  setAuthStatus(els.loginStatusMessage, "");

  if (!email || !password) {
    const message = "이메일과 비밀번호를 모두 입력해주세요.";
    setAuthStatus(els.loginStatusMessage, message);
    toast(message);
    return;
  }

  if (!/.+@.+\..+/.test(email)) {
    const message = "올바른 이메일 주소를 입력해주세요.";
    setAuthStatus(els.loginStatusMessage, message);
    toast(message);
    return;
  }

  if (!bridge?.isReady()) {
    const message = "Supabase 로그인 준비가 아직 끝나지 않았습니다.";
    setAuthStatus(els.loginStatusMessage, message);
    toast(message);
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "로그인 중...";
  }
  setAuthStatus(els.loginStatusMessage, "로그인 정보를 확인하고 있어요...");

  try {
    const { data, error } = await bridge.signInWithPassword({ email, password });
    if (error) {
      const message = error.message || "이메일 또는 비밀번호를 확인해주세요.";
      setAuthStatus(els.loginStatusMessage, message);
      toast(message);
      return;
    }

    state.rememberedLogin = rememberLogin
      ? { enabled: true, username: email, password: "" }
      : { enabled: false, username: "", password: "" };
    saveState({ history: false });
    const session = data?.session || (await bridge.getSession()).data?.session || null;
    if (!session) {
      const message = "로그인 세션을 확인하지 못했습니다. 잠시 후 다시 시도해주세요.";
      setAuthStatus(els.loginStatusMessage, message);
      toast(message);
      return;
    }
    form.reset();
    setAuthStatus(els.loginStatusMessage, "로그인에 성공했어요. 화면을 전환하고 있습니다...");
    const authResult = await applyAuthSession(session);
    if (!authResult?.ok) {
      setAuthStatus(els.loginStatusMessage, authResult?.message || "로그인은 되었지만 계정 정보를 불러오지 못했어요. 다시 시도해주세요.");
      return;
    }
  } catch (error) {
    const message = error?.message || "로그인 처리 중 문제가 생겼습니다.";
    setAuthStatus(els.loginStatusMessage, message);
    toast(message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || "로그인";
      delete submitButton.dataset.originalText;
    }
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  const roleLabel = String(formData.get("roleLabel")).trim();
  const username = email.split("@")[0] || "user";
  const submitButton = form.querySelector('button[type="submit"]');
  const bridge = getSupabaseBridge();
  setAuthStatus(els.registerStatusMessage, "");

  if (!name || !email || !password || !roleLabel) {
    const message = "이름, 이메일, 비밀번호, 직책을 모두 입력해주세요.";
    setAuthStatus(els.registerStatusMessage, message);
    toast(message);
    return;
  }

  if (!/.+@.+\..+/.test(email)) {
    const message = "올바른 이메일 주소를 입력해주세요.";
    setAuthStatus(els.registerStatusMessage, message);
    toast(message);
    return;
  }

  if (password.length < 8) {
    const message = "비밀번호는 8자 이상으로 입력해주세요.";
    setAuthStatus(els.registerStatusMessage, message);
    toast(message);
    return;
  }

  if (!bridge?.isReady()) {
    const message = "Supabase 회원가입 준비가 아직 끝나지 않았습니다.";
    setAuthStatus(els.registerStatusMessage, message);
    toast(message);
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "가입 요청 보내는 중...";
  }
  setAuthStatus(els.registerStatusMessage, "가입 요청을 보내고 있어요...");

  try {
    const { data, error } = await bridge.signUp({
      email,
      password,
      options: {
        data: {
          username,
          name,
          role_label: roleLabel,
        },
        emailRedirectTo: window.location.href,
      },
    });

    if (error) {
      const message = error.message || "회원가입에 실패했습니다.";
      setAuthStatus(els.registerStatusMessage, message);
      toast(message);
      return;
    }

    state.pendingApproval = { username: email, createdAt: new Date().toISOString() };
    saveState({ history: false });
    form.reset();
    openRegisterPanel();

    if (data?.session) {
      await applyAuthSession(data.session);
      setAuthStatus(els.registerStatusMessage, "가입이 완료되었습니다.");
      toast("가입이 완료되었습니다.");
      return;
    }

    setAuthStatus(els.registerStatusMessage, "가입 요청이 접수되었어요. 이메일 인증 후 로그인해주세요.");
    toast("가입 요청이 접수되었어요. 이메일 인증 후 로그인해주세요.");
  } catch (error) {
    const message = error?.message || "회원가입 처리 중 문제가 생겼습니다.";
    setAuthStatus(els.registerStatusMessage, message);
    toast(message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || "가입 요청 보내기";
      delete submitButton.dataset.originalText;
    }
  }
}

function logout() {
  const bridge = getSupabaseBridge();
  if (!bridge?.isReady()) {
    state.sessionUserId = null;
    saveState({ history: false });
    render();
    return;
  }
  bridge.signOut().then(() => {
    state.sessionUserId = null;
    state.users = [];
    saveState({ history: false });
    render();
  });
}

function hydrateRememberedLogin() {
  const remembered = state.rememberedLogin || {};
  if (!els.loginForm) return;
  els.loginForm.elements.email.value = remembered.enabled ? remembered.username || "" : "";
  els.loginForm.elements.password.value = "";
  if (els.loginForm.elements.rememberLogin) {
    els.loginForm.elements.rememberLogin.checked = Boolean(remembered.enabled);
  }
}

function openRegisterPanel() {
  els.registerPanel.classList.remove("hidden");
  els.loginPanel.classList.add("hidden");
  els.authView.classList.add("auth-grid-single");
}

function closeRegisterPanel() {
  els.registerPanel.classList.add("hidden");
  els.loginPanel.classList.remove("hidden");
  els.authView.classList.add("auth-grid-single");
}

function renderSummary() {
  els.readyCount.textContent = state.projects.filter((project) => project.status === "ready").length;
  els.progressCount.textContent = state.projects.filter((project) => project.status === "inProgress").length;
  const currentYear = new Date().getFullYear();
  const yearlyProjects = state.projects.filter((project) => {
    const sourceDate = project.startDate || project.createdAt || "";
    return sourceDate.startsWith(String(currentYear));
  });
  const yearlySales = yearlyProjects.reduce((sum, project) => sum + getProjectNetAmount(project), 0);
  if (els.yearSalesLabel) {
    els.yearSalesLabel.textContent = `${currentYear}년 매출`;
  }

  els.yearProjectCount.textContent = `${yearlyProjects.length}건`;
  els.yearSalesAmount.textContent = `${yearlySales.toLocaleString("ko-KR")}원`;

  const stageCounts = Object.entries(PROGRESS_STAGE_META)
    .map(([key, label]) => {
      const count = state.projects.filter((project) => project.status === "inProgress" && project.progressStage === key).length;
      return count ? `<span class="summary-stage-chip">${escapeHtml(label)} ${count}</span>` : "";
    })
    .filter(Boolean)
    .join("");
  els.progressStageSummary.innerHTML = stageCounts || '<span class="summary-stage-chip">세부 단계 없음</span>';
}
function renderBoard() {
  const readyProjects = state.projects.filter((project) => project.status === "ready");
  const progressSections = Object.entries(PROGRESS_STAGE_META).map(([key, label]) => {
    const projects = state.projects.filter((project) => project.status === "inProgress" && project.progressStage === key);
    const cards = projects.map((project) => `
      <article class="project-card status-${project.status} stage-${key}" data-project-id="${project.id}">
        <div class="project-card-head">
          <div>
            <strong>${escapeHtml(project.client || project.title)}</strong>
          </div>
        </div>
      </article>
    `).join("");
    return `
      <div class="progress-stage-group stage-${key}">
        <div class="progress-stage-head">
          <span>${escapeHtml(label)}</span>
          <strong>${projects.length}</strong>
        </div>
        ${cards || '<p class="muted small stage-empty">해당 단계 프로젝트가 없습니다.</p>'}
      </div>
    `;
  }).join("");

  const readyCards = readyProjects.length
    ? readyProjects.map((project) => `
        <article class="project-card status-${project.status}" data-project-id="${project.id}">
          <div class="project-card-head">
            <div>
              <strong>${escapeHtml(project.client || project.title)}</strong>
            </div>
          </div>
        </article>
      `).join("")
    : '<p class="muted small">아직 등록된 프로젝트가 없습니다.</p>';

  els.projectBoard.innerHTML = `
    <section class="board-column status-ready">
      <h4>${STATUS_META.ready.title}</h4>
      ${readyCards}
    </section>
    <section class="board-column status-inProgress">
      <h4>${STATUS_META.inProgress.title}</h4>
      <div class="progress-stage-board">${progressSections}</div>
    </section>
  `;

  els.projectBoard.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => {
      openProjectModal(card.dataset.projectId);
    });
  });
}

function renderMembers() {
  const viewer = currentUser();
  if (!canManageMembers(viewer)) {
    els.approvalList.innerHTML = '<li class="muted small">멤버 관리 권한이 없습니다.</li>';
    els.memberList.innerHTML = '<li class="muted small">멤버 관리 권한이 없습니다.</li>';
    return;
  }

  const pendingUsers = state.users
    .filter((user) => !user.isOwner && !user.approved && !user.rejected)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const ownerUsers = state.users
    .filter((user) => user.isOwner)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const approvedUsers = state.users
    .filter((user) => !user.isOwner && user.approved)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  if (!pendingUsers.length) {
    els.approvalList.innerHTML = '<li class="muted small">현재 대기 중인 가입 요청이 없습니다.</li>';
  } else {
    els.approvalList.innerHTML = pendingUsers.map((user) => `
      <li class="approval-item">
        <div class="member-item-main">
          <div class="member-name-row">
            <strong>${escapeHtml(user.name || user.username)}</strong>
            <span class="member-pill pending">승인 대기</span>
          </div>
          <div class="member-meta">
            <span>${escapeHtml(user.email || "-")}</span>
            <span>${escapeHtml(user.roleLabel || "-")}</span>
            <span>최근 로그인 ${user.lastLoginAt ? escapeHtml(formatDateTime(user.lastLoginAt)) : "-"}</span>
            <span>IP ${escapeHtml(user.lastLoginIp || "-")}</span>
            <span>${formatDateTime(user.createdAt)}</span>
          </div>
        </div>
        <div class="approval-actions">
          <button type="button" class="ghost" data-edit-member="${user.id}">수정</button>
          <button type="button" class="secondary" data-approve-member="${user.id}">승인</button>
          <button type="button" class="danger" data-reject-member="${user.id}">거절</button>
        </div>
      </li>
    `).join("");
  }

  const visibleMembers = [...ownerUsers, ...approvedUsers];

  if (!visibleMembers.length) {
    els.memberList.innerHTML = '<li class="muted small">등록된 멤버가 없습니다.</li>';
  } else {
    els.memberList.innerHTML = visibleMembers.map((user) => `
      <li class="approval-item">
        <div class="member-item-main">
          <div class="member-name-row">
            <strong>${escapeHtml(user.name || user.username)}</strong>
            <span class="member-pill">${user.isOwner ? "소유자" : user.canManageMembers ? "운영진" : escapeHtml(user.roleLabel || "멤버")}</span>
          </div>
          <div class="member-meta">
            <span>${escapeHtml(user.email || "-")}</span>
            <span>${escapeHtml(user.phone || "-")}</span>
            <span>${escapeHtml(user.roleLabel || "-")}</span>
            <span>최근 로그인 ${user.lastLoginAt ? escapeHtml(formatDateTime(user.lastLoginAt)) : "-"}</span>
            <span>IP ${escapeHtml(user.lastLoginIp || "-")}</span>
          </div>
        </div>
        <div class="approval-actions">
          <button type="button" class="ghost" data-edit-member="${user.id}">${user.isOwner ? "보기" : "수정"}</button>
        </div>
      </li>
    `).join("");
  }

  document.querySelectorAll("[data-approve-member]").forEach((button) => {
    button.addEventListener("click", () => updateApproval(button.dataset.approveMember));
  });
  document.querySelectorAll("[data-reject-member]").forEach((button) => {
    button.addEventListener("click", () => rejectUser(button.dataset.rejectMember));
  });
  document.querySelectorAll("[data-edit-member]").forEach((button) => {
    button.addEventListener("click", () => openMemberModal(button.dataset.editMember));
  });
}

function renderCustomers() {
  if (!els.customerList) return;

  const PER_PAGE = 20;
  const keyword = String(els.customerSearchInput?.value || "").trim().toLowerCase();
  populateCustomerContractYears();
  const filters = getCustomerFilters();
  const filteredProjects = state.projects
    .filter((project) => {
      const contractDate = String(project.startDate || "");
      if (filters.contractYear && !contractDate.startsWith(filters.contractYear)) return false;
      if (filters.contractMonth && contractDate.slice(5, 7) !== filters.contractMonth) return false;
      if (filters.status && project.status !== filters.status) return false;
      if (filters.projectType && project.projectType !== filters.projectType) return false;
      if (filters.packageType && project.packageType !== filters.packageType) return false;
      if (filters.siteType && project.siteType !== filters.siteType) return false;
      if (filters.language === "none" && Number(project.languageCount || 0) > 0) return false;
      if (filters.language === "enabled" && Number(project.languageCount || 0) === 0) return false;
      if (filters.payback && (project.paybackStatus || "none") !== filters.payback) return false;
      if (filters.payment && (project.paymentMethod || "") !== filters.payment) return false;
      if (filters.tax && (project.taxInvoice || "") !== filters.tax) return false;
      if (keyword) {
        const blob = [
          project.client,
          project.title,
          project.searchIndex || buildProjectSearchIndex(project),
        ].filter(Boolean).join(" ").toLowerCase();
        if (!blob.includes(keyword)) return false;
      }
      return true;
    });

  filteredProjects.sort((a, b) => {
    switch (filters.sort) {
      case "contractDesc":
        return String(a.startDate || "").localeCompare(String(b.startDate || ""));
      case "amountAsc":
        return getProjectNetAmount(b) - getProjectNetAmount(a);
      case "amountDesc":
        return getProjectNetAmount(a) - getProjectNetAmount(b);
      case "contractAsc":
      default:
        return String(b.startDate || "").localeCompare(String(a.startDate || ""));
    }
  });

  if (!filteredProjects.length) {
    if (els.customerListMeta) {
      els.customerListMeta.innerHTML = '<span class="meta-stat"><span>고객사 수</span><strong>0개</strong></span><span class="meta-stat"><span>프로젝트 수</span><strong>0개</strong></span>';
    }
    els.customerList.innerHTML = '<div class="muted small">검색된 프로젝트 데이터가 없습니다.</div>';
    return;
  }

  if (els.customerListMeta) {
    const customerCount = new Set(filteredProjects.map((project) => String(project.client || project.title || "").trim() || "고객사 미지정")).size;
    els.customerListMeta.innerHTML = `<span class="meta-stat"><span>고객사 수</span><strong>${customerCount}개</strong></span><span class="meta-stat"><span>프로젝트 수</span><strong>${filteredProjects.length}개</strong></span>`;
  }

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PER_PAGE));
  currentCustomerPage = Math.min(Math.max(currentCustomerPage, 1), totalPages);
  const startIndex = (currentCustomerPage - 1) * PER_PAGE;
  const pagedProjects = filteredProjects.slice(startIndex, startIndex + PER_PAGE);

  els.customerList.innerHTML = pagedProjects.map((project) => `
    <button type="button" class="customer-project-row status-${escapeHtml(project.status || "")}" data-project-id="${project.id}">
      <div>
        <strong>${escapeHtml(project.title || "프로젝트명 미지정")}</strong>
        <p>${escapeHtml(project.client || "고객사 미지정")}</p>
        <p>${escapeHtml(formatProjectStatus(project))}${project.startDate ? ` · 계약일 ${escapeHtml(formatDateOnly(project.startDate))}` : ""}</p>
      </div>
      <span>${formatAmount(getProjectNetAmount(project)) || "0"}원</span>
    </button>
  `).join("") + (totalPages > 1 ? `
    <div class="customer-pagination">
      <button type="button" class="ghost" data-customer-page="prev" ${currentCustomerPage === 1 ? "disabled" : ""}>이전</button>
      <strong>${currentCustomerPage} / ${totalPages}</strong>
      <button type="button" class="ghost" data-customer-page="next" ${currentCustomerPage === totalPages ? "disabled" : ""}>다음</button>
    </div>
  ` : "");

  els.customerList.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.projectId));
  });
  els.customerList.querySelectorAll("[data-customer-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentCustomerPage += button.dataset.customerPage === "next" ? 1 : -1;
      renderCustomers();
    });
  });
}

function renderArchiveNotes() {
  if (!els.archiveNotesList) return;
  if (!state.archiveNotes.length) {
    els.archiveNotesList.innerHTML = '<div class="archive-empty muted small">등록된 메모가 없습니다. 새 메모로 첫 기록을 남겨보세요.</div>';
    return;
  }

  els.archiveNotesList.innerHTML = state.archiveNotes.map((item) => `
    <article class="archive-card archive-note-card" data-archive-type="note" data-archive-id="${item.id}" style="--note-card-bg:${getArchiveNoteColor(item.color).bg}; --note-card-border:${getArchiveNoteColor(item.color).border};">
      <div class="archive-card-head">
        <strong>${escapeHtml(item.title || "제목 없음")}</strong>
        <button type="button" class="archive-drag-handle" data-archive-drag="note" aria-label="메모 순서 변경">⋮⋮</button>
      </div>
    </article>
  `).join("");

  bindArchiveListInteractions("note");
}

function renderArchiveNoteColorPalette(selectedColor = "gray") {
  if (!els.archiveNoteColorPalette) return;
  els.archiveNoteColorPalette.innerHTML = ARCHIVE_NOTE_COLORS.map((color) => `
    <button
      type="button"
      class="archive-color-chip ${color.id === selectedColor ? "is-active" : ""}"
      data-archive-note-color="${color.id}"
      title="${escapeHtml(color.label)}"
      aria-label="${escapeHtml(color.label)}"
      style="--chip-bg:${color.bg}; --chip-border:${color.border};"
    ></button>
  `).join("");

  els.archiveNoteColorPalette.querySelectorAll("[data-archive-note-color]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!archiveNoteEditing) return;
      const colorId = button.dataset.archiveNoteColor || "gray";
      if (els.archiveNoteForm?.elements?.color) {
        els.archiveNoteForm.elements.color.value = colorId;
      }
      renderArchiveNoteColorPalette(colorId);
    });
  });
}

function renderArchiveCategoryColorPalette(selectedColor = "gray") {
  if (!els.archiveCategoryColorPalette) return;
  els.archiveCategoryColorPalette.innerHTML = ARCHIVE_NOTE_COLORS.map((color) => `
    <button
      type="button"
      class="archive-color-chip ${color.id === selectedColor ? "is-active" : ""}"
      data-archive-category-color="${color.id}"
      title="${escapeHtml(color.label)}"
      aria-label="${escapeHtml(color.label)}"
      style="--chip-bg:${color.bg}; --chip-border:${color.border};"
    ></button>
  `).join("");

  els.archiveCategoryColorPalette.querySelectorAll("[data-archive-category-color]").forEach((button) => {
    button.addEventListener("click", () => {
      const colorId = button.dataset.archiveCategoryColor || "gray";
      if (els.archiveCategoryForm?.elements?.color) {
        els.archiveCategoryForm.elements.color.value = colorId;
      }
      renderArchiveCategoryColorPalette(colorId);
    });
  });
}

function populateArchiveCodeCategorySelect(selectedId = "") {
  const select = els.archiveCodeForm?.elements?.categoryId;
  if (!select) return;
  select.innerHTML = state.archiveCodeCategories
    .map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`)
    .join("");
  select.value = selectedId && state.archiveCodeCategories.some((category) => category.id === selectedId)
    ? selectedId
    : (state.archiveCodeCategories[0]?.id || "");
  refreshCustomSelect(select);
}

function renderArchiveCodeCategories() {
  if (!els.archiveCodeCategoriesList) return;
  if (!state.archiveCodeCategories.length) {
    els.archiveCodeCategoriesList.innerHTML = '<div class="archive-empty muted small">등록된 카테고리가 없습니다. 새 카테고리로 첫 분류를 만들어보세요.</div>';
    populateArchiveCodeCategorySelect("");
    return;
  }

  els.archiveCodeCategoriesList.innerHTML = state.archiveCodeCategories.map((category) => `
    <article class="archive-category-card archive-coded-card" data-archive-category-id="${category.id}" draggable="true" style="--archive-code-bg:${getArchiveNoteColor(category.color).bg}; --archive-code-border:${getArchiveNoteColor(category.color).border};">
      <div class="archive-category-card-head">
        <strong>${escapeHtml(category.name)}</strong>
        <div class="archive-category-card-actions">
          <span class="archive-category-card-meta">코드 ${state.archiveCodes.filter((item) => item.categoryId === category.id).length}개</span>
          <button type="button" class="ghost small-btn" data-archive-category-edit="${category.id}">수정</button>
          <button type="button" class="archive-drag-handle" data-archive-category-drag aria-label="카테고리 순서 변경">⋮⋮</button>
        </div>
      </div>
    </article>
  `).join("");

  els.archiveCodeCategoriesList.querySelectorAll("[data-archive-category-edit]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openArchiveCategoryModal(button.dataset.archiveCategoryEdit);
    });
  });

  els.archiveCodeCategoriesList.querySelectorAll("[data-archive-category-id]").forEach((card) => {
    const handle = card.querySelector("[data-archive-category-drag]");
    handle?.addEventListener("pointerdown", (event) => startArchiveCategoryDrag(event, card));
  });

  populateArchiveCodeCategorySelect(els.archiveCodeForm?.elements?.categoryId?.value || "");
}

function buildArchiveCategoryGhost(card) {
  const ghost = card.cloneNode(true);
  ghost.classList.add("archive-category-card-ghost");
  const rect = card.getBoundingClientRect();
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  return ghost;
}

function getArchiveCategoryAfterElement(y) {
  const cards = [...els.archiveCodeCategoriesList.querySelectorAll(".archive-category-card:not(.is-dragging)")];
  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);
    if (offset < 0 && offset > closest.offset) return { offset, element: card };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function startArchiveCategoryDrag(event, card) {
  event.preventDefault();
  draggedArchiveCategoryId = card.dataset.archiveCategoryId;
  const rect = card.getBoundingClientRect();
  archiveCategoryPointerOffsetX = event.clientX - rect.left;
  archiveCategoryPointerOffsetY = event.clientY - rect.top;
  archiveCategoryDragGhost?.remove();
  archiveCategoryDragGhost = buildArchiveCategoryGhost(card);
  document.body.appendChild(archiveCategoryDragGhost);
  card.classList.add("is-dragging");

  const onMove = (moveEvent) => {
    moveEvent.preventDefault();
    if (!archiveCategoryDragGhost) return;
    archiveCategoryDragGhost.style.left = `${moveEvent.clientX - archiveCategoryPointerOffsetX}px`;
    archiveCategoryDragGhost.style.top = `${moveEvent.clientY - archiveCategoryPointerOffsetY}px`;
    const after = getArchiveCategoryAfterElement(moveEvent.clientY);
    if (after) els.archiveCodeCategoriesList.insertBefore(card, after);
    else els.archiveCodeCategoriesList.appendChild(card);
  };

  const onUp = () => {
    card.classList.remove("is-dragging");
    archiveCategoryDragGhost?.remove();
    archiveCategoryDragGhost = null;
    const orderedIds = [...els.archiveCodeCategoriesList.querySelectorAll(".archive-category-card")].map((item) => item.dataset.archiveCategoryId);
    state.archiveCodeCategories = orderedIds.map((id) => state.archiveCodeCategories.find((item) => item.id === id)).filter(Boolean);
    draggedArchiveCategoryId = null;
    saveState();
    renderArchiveCodeCategories();
    renderArchiveCodes();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp, { passive: false });
}

function renderArchiveCodes() {
  if (!els.archiveCodesList) return;
  if (!state.archiveCodes.length) {
    els.archiveCodesList.innerHTML = '<div class="archive-empty muted small">등록된 코드가 없습니다. 새 코드로 자주 쓰는 스니펫을 정리해보세요.</div>';
    return;
  }
  const grouped = state.archiveCodeCategories.map((category) => ({
    ...category,
    items: state.archiveCodes.filter((item) => item.categoryId === category.id),
  }));

  els.archiveCodesList.innerHTML = grouped.map((group) => `
    <section class="archive-code-group" data-archive-group-id="${group.id}">
      <div class="archive-code-group-head">
        <h4>${escapeHtml(group.name)}</h4>
        <span>${group.items.length}개</span>
      </div>
      <div class="archive-code-group-list">
        ${group.items.length ? group.items.map((item) => `
          <article class="archive-card archive-code-card archive-coded-card" data-archive-type="code" data-archive-id="${item.id}" data-archive-category="${group.id}" style="--archive-code-bg:${getArchiveNoteColor(group.color).bg}; --archive-code-border:${getArchiveNoteColor(group.color).border};">
            <div class="archive-card-head">
              <strong>${escapeHtml(item.title || "제목 없음")}</strong>
              <button type="button" class="archive-drag-handle" data-archive-drag="code" aria-label="코드 순서 변경">⋮⋮</button>
            </div>
          </article>
        `).join("") : '<div class="archive-empty muted small">등록된 코드가 없습니다.</div>'}
      </div>
    </section>
  `).join("");

  bindArchiveListInteractions("code");
}

function buildArchiveCardGhost(card) {
  const ghost = card.cloneNode(true);
  ghost.classList.add("archive-card-ghost");
  const rect = card.getBoundingClientRect();
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  return ghost;
}

function getArchiveCardAfterElement(container, x, y, selector) {
  const cards = [...container.querySelectorAll(selector)].filter((item) => !item.classList.contains("is-dragging"));
  for (const card of cards) {
    const box = card.getBoundingClientRect();
    const midX = box.left + box.width / 2;
    const midY = box.top + box.height / 2;
    const inSameRow = y >= box.top && y <= box.bottom;

    if (inSameRow && x < midX) return card;
    if (y < midY && x <= box.right) return card;
  }
  return null;
}

function persistArchiveCardOrder(type, container) {
  if (type === "note") {
    const orderedIds = [...container.querySelectorAll('[data-archive-type="note"]')].map((item) => item.dataset.archiveId);
    state.archiveNotes = orderedIds
      .map((id) => state.archiveNotes.find((item) => item.id === id))
      .filter(Boolean);
    return;
  }

  const groupedCodes = [];
  state.archiveCodeCategories.forEach((category) => {
    const group = els.archiveCodesList?.querySelector(`.archive-code-group[data-archive-group-id="${category.id}"] .archive-code-group-list`);
    const orderedIds = group
      ? [...group.querySelectorAll('[data-archive-type="code"]')].map((item) => item.dataset.archiveId)
      : [];
    orderedIds.forEach((id) => {
      const found = state.archiveCodes.find((item) => item.id === id);
      if (found) groupedCodes.push(found);
    });
  });
  state.archiveCodes = groupedCodes;
}

function startArchiveCardDrag(event, card, type) {
  event.preventDefault();
  const container = type === "note"
    ? els.archiveNotesList
    : card.closest(".archive-code-group-list");
  if (!container) return;

  const dragId = card.dataset.archiveId;
  if (type === "note") draggedArchiveNoteId = dragId;
  else draggedArchiveCodeId = dragId;

  const rect = card.getBoundingClientRect();
  archiveCardPointerOffsetX = event.clientX - rect.left;
  archiveCardPointerOffsetY = event.clientY - rect.top;
  archiveCardDragGhost?.remove();
  archiveCardDragGhost = buildArchiveCardGhost(card);
  document.body.appendChild(archiveCardDragGhost);
  card.classList.add("is-dragging");

  const selector = type === "note"
    ? '[data-archive-type="note"]'
    : `[data-archive-type="code"][data-archive-category="${card.dataset.archiveCategory}"]`;

  const onMove = (moveEvent) => {
    moveEvent.preventDefault();
    if (!archiveCardDragGhost) return;
    archiveCardDragGhost.style.left = `${moveEvent.clientX - archiveCardPointerOffsetX}px`;
    archiveCardDragGhost.style.top = `${moveEvent.clientY - archiveCardPointerOffsetY}px`;
    const after = getArchiveCardAfterElement(container, moveEvent.clientX, moveEvent.clientY, selector);
    if (after) container.insertBefore(card, after);
    else container.appendChild(card);
  };

  const onUp = () => {
    card.classList.remove("is-dragging");
    archiveCardDragGhost?.remove();
    archiveCardDragGhost = null;
    persistArchiveCardOrder(type, container);
    draggedArchiveNoteId = null;
    draggedArchiveCodeId = null;
    saveState();
    render();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp, { passive: false });
}

function bindArchiveListInteractions(type) {
  const container = type === "note" ? els.archiveNotesList : els.archiveCodesList;
  if (!container) return;
  const selector = `[data-archive-type="${type}"]`;
  container.querySelectorAll(selector).forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-archive-drag]")) return;
      if (type === "note") openArchiveNoteModal(card.dataset.archiveId);
      else openArchiveCodeModal(card.dataset.archiveId);
    });
    const handle = card.querySelector("[data-archive-drag]");
    handle?.addEventListener("pointerdown", (event) => startArchiveCardDrag(event, card, type));
  });
}


function renderSales() {
  if (!els.salesMonthlyChart || !els.salesYearlyChart) return;
  populateSalesFilterYears();

  const monthlyTotals = new Map();
  const yearlyTotals = new Map();

  state.projects.forEach((project) => {
    const baseDate = String(project.startDate || "").trim();
    if (!baseDate) return;
    const amount = getProjectNetAmount(project);
    const monthKey = baseDate.slice(0, 7);
    const yearKey = baseDate.slice(0, 4);
    monthlyTotals.set(monthKey, (monthlyTotals.get(monthKey) || 0) + amount);
    yearlyTotals.set(yearKey, (yearlyTotals.get(yearKey) || 0) + amount);
  });

  const currentYear = String(new Date().getFullYear());
  const currentMonthKey = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  if (!yearlyTotals.has(currentYear)) yearlyTotals.set(currentYear, 0);

  const monthlyEntries = Array.from(monthlyTotals.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const yearlyEntries = Array.from(yearlyTotals.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const totalSales = yearlyEntries.reduce((sum, [, value]) => sum + value, 0);
  const fallbackYear = yearlyEntries[yearlyEntries.length - 1]?.[0] || currentYear;
  if (!yearlyEntries.some(([year]) => year === currentSalesYear)) {
    currentSalesYear = fallbackYear;
  }
  const filteredMonthlyEntries = monthlyEntries.filter(([month]) => month.startsWith(currentSalesYear));
  const fallbackMonth = filteredMonthlyEntries[filteredMonthlyEntries.length - 1]?.[0] || `${currentSalesYear}-01`;
  if (!filteredMonthlyEntries.some(([month]) => month === currentSalesMonthKey)) {
    currentSalesMonthKey = fallbackMonth;
  }
  const currentMonthProjects = state.projects.filter((project) => String(project.startDate || "").startsWith(currentMonthKey));
  const selectedYearProjects = state.projects.filter((project) => String(project.startDate || "").startsWith(currentSalesYear));
  const selectedMonthProjects = state.projects.filter((project) => String(project.startDate || "").startsWith(currentSalesMonthKey));
  const monthBreakdown = getSalesBreakdown(currentMonthProjects);
  const yearBreakdown = getSalesBreakdown(selectedYearProjects);
  const selectedMonthBreakdown = getSalesBreakdown(selectedMonthProjects);
  const salesFilters = getSalesFilterState();
  const filteredProjects = state.projects.filter((project) => matchesSalesFilters(project, salesFilters));
  const filteredBreakdown = getSalesBreakdown(filteredProjects);

  renderSalesChart(
    els.salesMonthlyChart,
    filteredMonthlyEntries,
    "선택한 연도의 월별 데이터가 없습니다.",
    (label) => label.replace("-", "."),
    {
      interactive: true,
      activeKey: currentSalesMonthKey,
      dataAttr: "data-sales-month",
    },
  );
  renderSalesChart(
    els.salesYearlyChart,
    yearlyEntries,
    "연도별 데이터가 없습니다.",
    (label) => `${label}년`,
    {
      interactive: true,
      activeKey: currentSalesYear,
      dataAttr: "data-sales-year",
    },
  );

  if (els.salesMonthlySummary) {
    els.salesMonthlySummary.textContent = `${currentSalesMonthKey.replace("-", ".")} 기준 매출 현황`;
  }
  if (els.salesYearlySummary) {
    els.salesYearlySummary.textContent = yearlyEntries.length
      ? `${currentSalesYear}년 기준 매출 현황`
      : "연도별 집계를 위한 데이터가 아직 없습니다.";
  }
  renderSalesMetrics(document.querySelector("#salesMonthlyMetrics"), selectedMonthBreakdown, {
    totalLabel: "전체 매출",
    cardLabel: "카드 매출",
    cashLabel: "현금 매출",
    kmongLabel: "크몽 매출",
    taxLabel: "세금계산서 발행",
    taxNotIssuedLabel: "세금계산서 미발행",
    paybackLabel: "페이백",
  });
  renderSalesMix(
    document.querySelector("#salesMonthlyMix"),
    selectedMonthBreakdown,
    formatSalesMonthMixTitle(currentSalesMonthKey),
  );
  renderSalesMetrics(document.querySelector("#salesYearlyMetrics"), yearBreakdown, {
    totalLabel: "전체 매출",
    cardLabel: "카드 매출",
    cashLabel: "현금 매출",
    kmongLabel: "크몽 매출",
    taxLabel: "세금계산서 발행",
    taxNotIssuedLabel: "세금계산서 미발행",
    paybackLabel: "페이백",
  });
  renderSalesMix(
    document.querySelector("#salesYearlyMix"),
    yearBreakdown,
    `${currentSalesYear}년 비율`,
  );
  if (els.salesTotalSummary) {
    els.salesTotalSummary.innerHTML = "";
    els.salesTotalSummary.closest(".sales-total-panel")?.classList.add("hidden");
  }

  renderSalesFilterResults(filteredProjects, filteredBreakdown, salesFilters);
  const detailPanel = document.querySelector("#salesDetailPanel");
  if (detailPanel) detailPanel.remove();

  els.salesYearlyChart.querySelectorAll("[data-sales-year]").forEach((button) => {
    button.addEventListener("click", () => {
      currentSalesYear = button.dataset.salesYear;
      renderSales();
    });
  });
  els.salesMonthlyChart.querySelectorAll("[data-sales-month]").forEach((button) => {
    button.addEventListener("click", () => {
      currentSalesMonthKey = button.dataset.salesMonth;
      renderSales();
    });
  });
}

function matchesSalesFilters(project, filters) {
  const baseDate = String(project.startDate || "");
  if (filters.year && !baseDate.startsWith(filters.year)) return false;
  if (filters.month && baseDate.slice(5, 7) !== filters.month) return false;
  if (filters.payment && (project.paymentMethod || "") !== filters.payment) return false;
  if (filters.tax === "issued" && project.taxInvoice !== "issued") return false;
  if (filters.tax === "notIssued" && project.taxInvoice !== "notIssued") return false;
  if (filters.tax === "none" && project.paymentMethod === "cash") return false;
  if (filters.payback && (project.paybackStatus || "none") !== filters.payback) return false;
  if (filters.startDate && baseDate && baseDate < filters.startDate) return false;
  if (filters.endDate && baseDate && baseDate > filters.endDate) return false;
  if (filters.keyword) {
    const blob = [
      project.client,
      project.title,
      project.managerName,
      project.websiteUrl,
    ].filter(Boolean).join(" ").toLowerCase();
    if (!blob.includes(filters.keyword)) return false;
  }
  return true;
}

function renderSalesFilterResults(filteredProjects, breakdown, filters) {
  const metricsTarget = document.querySelector("#salesFilterMetrics");
  if (metricsTarget) {
    renderSalesMetrics(metricsTarget, breakdown, {
      totalLabel: "전체 매출",
      cardLabel: "카드 매출",
      cashLabel: "현금 매출",
      kmongLabel: "크몽 매출",
      taxLabel: filters.tax === "notIssued" ? "미발행 금액" : "세금계산서 발행",
      taxNotIssuedLabel: "세금계산서 미발행",
      paybackLabel: "페이백 금액",
    });
  }
}

function getSalesBreakdown(projects) {
  return projects.reduce((acc, project) => {
    const net = getProjectNetAmount(project);
    const payback = project.paybackStatus === "enabled" ? parseAmount(project.paybackAmount) : 0;
    const kmongFee = project.paymentMethod === "kmong" ? parseAmount(project.kmongFee) : 0;
    if (project.paymentMethod === "card") acc.card += net;
    if (project.paymentMethod === "cash") acc.cash += net;
    if (project.paymentMethod === "kmong") acc.kmong += net;
    if (project.taxInvoice === "issued") acc.taxIssued += net;
    if (project.paymentMethod === "cash" && project.taxInvoice === "notIssued") acc.taxNotIssued += net;
    acc.payback += payback;
    acc.kmongFee += kmongFee;
    acc.net += net;
    return acc;
  }, { card: 0, cash: 0, kmong: 0, taxIssued: 0, taxNotIssued: 0, payback: 0, kmongFee: 0, net: 0 });
}

function renderSalesMetrics(target, breakdown, labels = {}) {
  if (!target) return;
  target.innerHTML = `
    <article class="sales-metric-card sales-metric-card-total">
      <span>${labels.totalLabel || "전체 매출"}</span>
      <strong>${breakdown.net.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.cashLabel || "현금 매출"}</span>
      <strong>${breakdown.cash.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.cardLabel || "카드 매출"}</span>
      <strong>${breakdown.card.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.kmongLabel || "크몽 매출"}</span>
      <strong>${breakdown.kmong.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.taxLabel || "세금계산서 발행"}</span>
      <strong>${breakdown.taxIssued.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.taxNotIssuedLabel || "세금계산서 미발행"}</span>
      <strong>${breakdown.taxNotIssued.toLocaleString("ko-KR")}원</strong>
    </article>
    <article class="sales-metric-card">
      <span>${labels.paybackLabel || "페이백"}</span>
      <strong>${breakdown.payback.toLocaleString("ko-KR")}원</strong>
    </article>
  `;
}

function renderSalesMix(target, breakdown, title = "매출 비율") {
  if (!target) return;
  const paymentTotal = breakdown.card + breakdown.cash + breakdown.kmong;
  const taxTotal = breakdown.taxIssued + breakdown.taxNotIssued;
  const paymentItems = [
    { label: "현금 매출", value: breakdown.cash, color: "#4f7fe0" },
    { label: "카드 매출", value: breakdown.card, color: "#8fb0f2" },
    { label: "크몽 매출", value: breakdown.kmong, color: "#c3b4f4" },
  ];
  const taxItems = [
    { label: "세금계산서 발행", value: breakdown.taxIssued, color: "#6b95ea" },
    { label: "세금계산서 미발행", value: breakdown.taxNotIssued, color: "#b5caf7" },
  ];

  const renderBar = (items, total) => {
    if (!total) return '<div class="sales-mix-empty">표시할 비율 데이터가 없습니다.</div>';
    return `
      <div class="sales-mix-bar">
        ${items.map((item) => {
          const ratio = total ? (item.value / total) * 100 : 0;
          return `<span class="sales-mix-bar-segment" style="width:${Math.max(ratio, ratio > 0 ? 8 : 0)}%; --segment-color:${item.color}"></span>`;
        }).join("")}
      </div>
      <div class="sales-mix-legend">
        ${items.map((item) => {
          const ratio = total ? Math.round((item.value / total) * 100) : 0;
          return `
            <div class="sales-mix-item">
              <span class="sales-mix-dot" style="--dot-color:${item.color}"></span>
              <span class="sales-mix-label">${item.label}</span>
              <strong>${ratio}%</strong>
            </div>
          `;
        }).join("")}
      </div>
    `;
  };

  target.innerHTML = `
    <article class="sales-mix-card">
      <h4>${title}</h4>
      <div class="sales-mix-section">
        <div class="sales-mix-head">
          <span>결제 비율</span>
          <strong>${paymentTotal.toLocaleString("ko-KR")}원 기준</strong>
        </div>
        ${renderBar(paymentItems, paymentTotal)}
      </div>
      <div class="sales-mix-section">
        <div class="sales-mix-head">
          <span>세금계산서 비율</span>
          <strong>${taxTotal.toLocaleString("ko-KR")}원 기준</strong>
        </div>
        ${renderBar(taxItems, taxTotal)}
      </div>
    </article>
  `;
}

function formatSalesMonthMixTitle(monthKey) {
  const [year, month] = String(monthKey || "").split("-");
  if (!year || !month) return "월별 비율";
  return `${year}년 ${Number(month)}월 비율`;
}

function renderSalesChart(target, entries, emptyMessage, labelFormatter, options = {}) {
  if (!entries.length) {
    target.innerHTML = `<div class="muted small">${emptyMessage}</div>`;
    return;
  }

  const maxValue = Math.max(...entries.map(([, value]) => value), 1);
  const rowTag = options.interactive ? "button" : "div";
  target.innerHTML = entries.map(([label, value]) => `
    <${rowTag}
      type="${options.interactive ? "button" : ""}"
      class="sales-chart-row ${options.activeKey === label ? "is-active" : ""}"
      ${options.dataAttr ? `${options.dataAttr}="${label}"` : ""}
    >
      <div class="sales-chart-label">${escapeHtml(labelFormatter(label))}</div>
      <div class="sales-chart-bar-track">
        <div class="sales-chart-bar-fill" style="width:${Math.max(10, (value / maxValue) * 100)}%"></div>
      </div>
      <div class="sales-chart-value">${value.toLocaleString("ko-KR")}원</div>
    </${rowTag}>
  `).join("");
}

function openProjectModal(projectId = null) {
  state.selectedProjectId = projectId;
  saveState();
  const project = selectedProject();
  draftProjectDocuments = project ? [...(project.contracts || [])] : [];

  els.projectModalTitle.textContent = project ? "프로젝트 상세" : "새 프로젝트";
  els.topDeleteProjectBtn.disabled = !project;
  els.topDeleteProjectBtn.classList.toggle("hidden", !project);
  els.projectForm.reset();

  els.projectForm.elements.id.value = project?.id || "";
  els.projectForm.elements.title.value = project?.title || "";
  els.projectForm.elements.client.value = project?.client || "";
  els.projectForm.elements.websiteUrl.value = project?.websiteUrl || "";
  els.projectForm.elements.managerName.value = project?.managerName || "";
  els.projectForm.elements.managerPhone.value = project?.managerPhone || "";
  if (els.projectForm.elements.projectType) {
    els.projectForm.elements.projectType.value = project?.projectType || "";
  }
  els.projectForm.elements.packageType.value = project?.packageType || "";
  els.projectForm.elements.siteType.value = project?.siteType || "";
  els.projectForm.elements.languageCount.value = String(project?.languageCount || 0);
  els.projectForm.elements.status.value = project?.status || "ready";
  els.projectForm.elements.progressStage.value = project?.progressStage || "";
  els.projectForm.elements.startDate.value = project?.startDate || "";
  els.projectForm.elements.dueDate.value = project?.dueDate || "";
  els.projectForm.elements.timeline.value = project?.timeline || "";
  els.projectForm.elements.notes.value = project?.notes || "";
  els.projectForm.elements.imwebId.value = project?.imwebId || "";
  els.projectForm.elements.imwebPassword.value = project?.imwebPassword || "";
  els.projectForm.elements.contractAmount.value = project?.contractAmount || "";
  els.projectForm.elements.paybackStatus.value = project?.paybackStatus || "none";
  els.projectForm.elements.paybackAmount.value = project?.paybackAmount || "";
  els.projectForm.elements.paybackNote.value = project?.paybackNote || "";
  if (els.projectForm.elements.kmongFee) {
    els.projectForm.elements.kmongFee.value = project?.kmongFee || "";
  }
  els.projectForm.elements.paymentMethod.value = project?.paymentMethod || "";
  els.projectForm.elements.taxInvoice.value = project?.taxInvoice || "";

  renderLanguageFields(Number(project?.languageCount || 0), project?.languages || []);
  syncProjectServiceFields();
  syncProjectStageField();
  syncPaymentFields();
  syncPaybackField();
  populateProjectRichEditors();
  syncAllCustomSelects();
  renderDocuments();
  els.projectModal.classList.remove("hidden");
  setModalSnapshot("project", captureProjectModalState());
  const projectModalCard = els.projectModal.querySelector(".project-modal-card");
  if (projectModalCard) {
    projectModalCard.scrollTop = 0;
    requestAnimationFrame(() => {
      projectModalCard.scrollTop = 0;
    });
  }
}

function closeProjectModal() {
  const projectModalCard = els.projectModal.querySelector(".project-modal-card");
  if (projectModalCard) projectModalCard.scrollTop = 0;
  els.projectModal.classList.add("hidden");
  els.contractFile.value = "";
}

function populateProjectRichEditors() {
  ["timeline", "notes"].forEach((name) => {
    const textarea = els.projectForm?.elements?.[name];
    const surface = document.querySelector(`[data-rich-surface="${name}"]`);
    if (!textarea || !surface) return;
    surface.innerHTML = plainTextToRichHtml(textarea.value);
  });
}

function syncProjectRichEditorValues() {
  ["timeline", "notes"].forEach((name) => {
    const textarea = els.projectForm?.elements?.[name];
    const surface = document.querySelector(`[data-rich-surface="${name}"]`);
    if (!textarea || !surface) return;
    textarea.value = normalizeRichEditorHtml(surface.innerHTML);
  });
}

function syncPaymentFields() {
  const paymentMethod = els.projectForm.elements.paymentMethod.value;
  const isCard = paymentMethod === "card";
  const isKmong = paymentMethod === "kmong";
  const hideTaxInvoice = isCard || isKmong;
  els.taxInvoiceField.classList.toggle("hidden", hideTaxInvoice);
  els.kmongFeeField?.classList.toggle("hidden", !isKmong);
  if (hideTaxInvoice) els.projectForm.elements.taxInvoice.value = "";
  if (!isKmong && els.projectForm.elements.kmongFee) els.projectForm.elements.kmongFee.value = "";
  refreshCustomSelect(els.paymentMethodSelect);
  if (els.projectForm.elements.taxInvoice) refreshCustomSelect(els.projectForm.elements.taxInvoice);
}

function syncPaybackField() {
  const enabled = els.projectForm.elements.paybackStatus.value === "enabled";
  els.paybackAmountField.classList.toggle("hidden", !enabled);
  if (!enabled) {
    els.projectForm.elements.paybackAmount.value = "";
    els.projectForm.elements.paybackNote.value = "";
  }
  refreshCustomSelect(els.paybackStatusSelect);
}

function syncProjectStageField() {
  const isInProgress = els.projectForm.elements.status.value === "inProgress";
  els.projectStageField.classList.toggle("hidden", !isInProgress);
  if (!isInProgress) els.projectForm.elements.progressStage.value = "";
  refreshCustomSelect(els.projectForm.elements.status);
  refreshCustomSelect(els.progressStageSelect);
}

function syncProjectServiceFields() {
  const type = String(els.projectForm.elements.projectType?.value || "");
  const showHomepageOptions = type === "newHomepage" || type === "new" || type === "renewal";
  const packageField = els.projectForm.elements.packageType?.closest(".three-col");
  if (packageField) packageField.classList.toggle("hidden", !showHomepageOptions);
  if (!showHomepageOptions) {
    els.projectForm.elements.packageType.value = "";
    els.projectForm.elements.siteType.value = "";
    els.languageCountSelect.value = "0";
    renderLanguageFields(0, []);
  }
  refreshCustomSelect(els.projectForm.elements.projectType);
  refreshCustomSelect(els.projectForm.elements.packageType);
  refreshCustomSelect(els.projectForm.elements.siteType);
  refreshCustomSelect(els.languageCountSelect);
}

function renderLanguageFields(count, values = []) {
  const total = Number(count || 0);
  els.languageFields.classList.toggle("hidden", total < 2);
  if (total < 2) {
    els.languageFields.innerHTML = "";
    return;
  }

  els.languageFields.innerHTML = Array.from({ length: total }, (_, index) => `
    <label>언어 ${index + 1}
      <input name="language_${index + 1}" type="text" value="${escapeHtml(values[index] || "")}">
    </label>
  `).join("");
}

function buildProjectSearchIndex(project) {
  return [
    project.client,
    project.title,
    project.projectType,
    getProjectTypeLabel(project.projectType),
    project.websiteUrl,
    project.managerName,
    project.managerPhone,
    project.packageType,
    project.siteType,
    project.languageCount ? String(project.languageCount) : "",
    ...(project.languages || []),
    project.status,
    project.progressStage,
    project.startDate,
    project.dueDate,
    stripHtml(project.timeline),
    stripHtml(project.notes),
    project.imwebId,
    project.imwebPassword,
    project.contractAmount,
    project.paybackStatus,
    project.paybackAmount,
    project.paybackNote,
    project.paymentMethod,
    project.kmongFee,
    project.taxInvoice,
    ...((project.contracts || []).flatMap((doc) => [doc.type, doc.name, doc.mimeType, doc.uploadedAt])),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function plainTextToRichHtml(value) {
  if (!value) return "";
  const raw = String(value);
  if (raw.includes("<") && raw.includes(">")) return raw;
  return escapeHtml(raw).replace(/\n/g, "<br>");
}

function normalizeRichEditorHtml(value) {
  const html = String(value || "")
    .replace(/<div><br><\/div>/gi, "<br>")
    .replace(/<div>/gi, "<br>")
    .replace(/<\/div>/gi, "")
    .trim();
  return html === "<br>" ? "" : html;
}

function normalizeHexColor(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const prefixed = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#[0-9a-fA-F]{6}$/.test(prefixed) ? prefixed.toLowerCase() : "";
}

function getProjectTypeLabel(type) {
  switch (type) {
    case "new":
    case "newHomepage":
      return "신규 홈페이지";
    case "renewal":
      return "홈페이지 리뉴얼";
    case "partial":
    case "partialManagement":
      return "홈페이지 부분 수정 · 관리";
    case "popup":
    case "popupBanner":
      return "팝업 · 배너";
    case "detail":
    case "detailPage":
      return "상세페이지";
    case "businessCard":
      return "명함";
    case "etc":
    case "other":
      return "기타";
    default:
      return "";
  }
}

async function handleProjectSave(event) {
  event.preventDefault();
  syncProjectRichEditorValues();
  const formData = new FormData(event.currentTarget);
  const startDate = String(formData.get("startDate") || "");
  const dueDate = String(formData.get("dueDate") || "");
  if (!startDate || !dueDate) {
    openNoticeModal("계약일과 1차 시안 마감일을 선택해주세요.");
    return;
  }
  const languageCount = Number(formData.get("languageCount") || 0);
  const languages = languageCount >= 2
    ? Array.from({ length: languageCount }, (_, index) => String(formData.get(`language_${index + 1}`) || "").trim()).filter(Boolean)
    : [];
  const payload = {
    id: String(formData.get("id") || crypto.randomUUID()),
    title: String(formData.get("title")).trim(),
    client: String(formData.get("client")).trim(),
    projectType: String(formData.get("projectType") || ""),
    websiteUrl: String(formData.get("websiteUrl")).trim(),
    managerName: String(formData.get("managerName")).trim(),
    managerPhone: String(formData.get("managerPhone")).trim(),
    packageType: String(formData.get("packageType")),
    siteType: String(formData.get("siteType")),
    languageCount,
    languages,
    status: String(formData.get("status")),
    progressStage: String(formData.get("status")) === "inProgress" ? String(formData.get("progressStage")) : "",
    startDate,
    dueDate,
    timeline: String(formData.get("timeline")).trim(),
    notes: String(formData.get("notes")).trim(),
    imwebId: String(formData.get("imwebId")).trim(),
    imwebPassword: String(formData.get("imwebPassword")).trim(),
    contractAmount: formatAmount(String(formData.get("contractAmount")).trim()),
    paybackStatus: String(formData.get("paybackStatus") || "none"),
    paybackAmount: String(formData.get("paybackStatus")) === "enabled"
      ? formatAmount(String(formData.get("paybackAmount")).trim())
      : "",
    paybackNote: String(formData.get("paybackStatus")) === "enabled"
      ? String(formData.get("paybackNote") || "").trim()
      : "",
    paymentMethod: String(formData.get("paymentMethod")),
    kmongFee: formData.get("paymentMethod") === "kmong"
      ? formatAmount(String(formData.get("kmongFee") || "").trim())
      : "",
    taxInvoice: ["card", "kmong"].includes(String(formData.get("paymentMethod"))) ? "" : String(formData.get("taxInvoice")),
  };
  payload.searchIndex = buildProjectSearchIndex({ ...payload, contracts: [...draftProjectDocuments] });

  const existing = state.projects.find((project) => project.id === payload.id);
  const previousProject = existing ? structuredClone(existing) : null;
  if (existing) {
    Object.assign(existing, payload, { contracts: [...draftProjectDocuments] });
  } else {
    state.projects.unshift({ ...payload, contracts: [...draftProjectDocuments] });
  }

  const nextProject = existing || state.projects[0];
  const projectIndex = state.projects.findIndex((project) => project.id === payload.id);
  const bridge = getSupabaseBridge();
  if (bridge?.isReady()) {
    const result = await bridge.upsertProject(
      serializeProjectForSupabase({ ...nextProject, ...payload, contracts: [...draftProjectDocuments] }, projectIndex),
    );
    if (result.error) {
      if (existing && previousProject) {
        Object.assign(existing, previousProject);
      } else {
        state.projects = state.projects.filter((project) => project.id !== payload.id);
      }
      const message = `프로젝트 저장 실패: ${result.error.message || "Supabase 오류"}`;
      openNoticeModal(message);
      toast(message);
      return;
    }
    const syncedProject = deserializeProjectFromSupabase(result.data);
    const syncedIndex = state.projects.findIndex((project) => project.id === syncedProject.id);
    if (syncedIndex >= 0) state.projects[syncedIndex] = syncedProject;
    else state.projects.unshift(syncedProject);
  }

  state.selectedProjectId = payload.id;
  saveState();
  closeProjectModal();
  openNoticeModal("저장이 완료되었어요!");
  render();
}

function openMemberModal(memberId = null) {
  if (!canManageMembers()) return;
  currentMemberId = memberId;
  const member = memberId ? state.users.find((item) => item.id === memberId) : null;
  const viewer = currentUser();
  const ownerView = Boolean(viewer?.isOwner);
  els.memberModalTitle.textContent = member ? "멤버 수정" : "새 멤버";
  els.memberForm.reset();
  els.memberForm.elements.id.value = member?.id || "";
  els.memberForm.elements.name.value = member?.name || "";
  els.memberForm.elements.roleLabel.value = member?.roleLabel || "";
  els.memberForm.elements.phone.value = member?.phone || "";
  els.memberForm.elements.email.value = member?.email || "";
  els.memberForm.elements.notes.value = member?.notes || "";
  els.memberForm.elements.approved.checked = Boolean(member?.approved ?? true);
  els.memberForm.elements.canManageMembers.checked = Boolean(member?.canManageMembers);
  els.memberManagerField.classList.toggle("hidden", !ownerView);
  els.memberForm.elements.canManageMembers.disabled = !ownerView;
  els.memberModal.classList.remove("hidden");
  setModalSnapshot("member", captureMemberModalState());
}

function closeMemberModal() {
  currentMemberId = null;
  els.memberModal.classList.add("hidden");
}

function setArchiveNoteEditing(editable) {
  archiveNoteEditing = editable;
  const fields = els.archiveNoteForm?.querySelectorAll('input[name="title"], textarea[name="content"]') || [];
  fields.forEach((field) => {
    field.readOnly = !editable;
    field.disabled = false;
  });
  els.archiveNoteColorPalette?.classList.toggle("is-readonly", !editable);
  els.archiveNoteEditBtn?.classList.toggle("hidden", editable || !currentArchiveNoteId);
  els.archiveNoteSaveBtn?.classList.toggle("hidden", !editable);
}

function setArchiveCodeEditing(editable) {
  archiveCodeEditing = editable;
  const fields = els.archiveCodeForm?.querySelectorAll('input[name="title"], textarea[name="description"], textarea[name="content"], select[name="categoryId"]') || [];
  fields.forEach((field) => {
    if (field.tagName === "SELECT") {
      field.disabled = !editable ? true : false;
      return;
    }
    field.readOnly = !editable;
    field.disabled = false;
  });
  els.archiveCodeInput?.classList.toggle("is-readonly", !editable);
  els.archiveCodeEditBtn?.classList.toggle("hidden", editable || !currentArchiveCodeId);
  els.archiveCodeSaveBtn?.classList.toggle("hidden", !editable);
  syncArchiveCodeHighlight();
}

function openArchiveCategoryModal(categoryId = null) {
  currentArchiveCategoryId = categoryId;
  const category = categoryId ? state.archiveCodeCategories.find((item) => item.id === categoryId) : null;
  els.archiveCategoryForm?.reset();
  els.archiveCategoryForm?.elements?.id && (els.archiveCategoryForm.elements.id.value = category?.id || "");
  els.archiveCategoryForm?.elements?.name && (els.archiveCategoryForm.elements.name.value = category?.name || "");
  els.archiveCategoryForm?.elements?.color && (els.archiveCategoryForm.elements.color.value = category?.color || "gray");
  renderArchiveCategoryColorPalette(category?.color || "gray");
  els.archiveCategoryModalTitle.textContent = category ? "카테고리 상세" : "새 카테고리";
  els.archiveCategoryDeleteBtn?.classList.toggle("hidden", !category);
  els.archiveCategoryModal?.classList.remove("hidden");
  setModalSnapshot("archiveCategory", captureArchiveCategoryModalState());
}

function closeArchiveCategoryModal() {
  currentArchiveCategoryId = null;
  els.archiveCategoryModal?.classList.add("hidden");
}

function openArchiveNoteModal(noteId = null) {
  currentArchiveNoteId = noteId;
  const note = noteId ? state.archiveNotes.find((item) => item.id === noteId) : null;
  els.archiveNoteForm?.reset();
  els.archiveNoteForm.elements.id.value = note?.id || "";
  els.archiveNoteForm.elements.title.value = note?.title || "";
  els.archiveNoteForm.elements.color.value = note?.color || "gray";
  els.archiveNoteForm.elements.content.value = note?.content || "";
  els.archiveNoteModalTitle.textContent = note ? "메모 상세" : "새 메모";
  els.archiveNoteDeleteBtn?.classList.toggle("hidden", !note);
  setArchiveNoteEditing(!note);
  renderArchiveNoteColorPalette(note?.color || "gray");
  els.archiveNoteModal.classList.remove("hidden");
  setModalSnapshot("archiveNote", captureArchiveNoteModalState());
}

function closeArchiveNoteModal() {
  currentArchiveNoteId = null;
  archiveNoteEditing = false;
  els.archiveNoteModal.classList.add("hidden");
}

function handleArchiveNoteSave(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const now = new Date().toISOString();
  const payload = {
    id: String(formData.get("id") || crypto.randomUUID()),
    title: String(formData.get("title") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    color: String(formData.get("color") || "gray"),
    createdAt: now,
    updatedAt: now,
  };
  const existing = state.archiveNotes.find((item) => item.id === payload.id);
  if (existing) {
    payload.createdAt = existing.createdAt || now;
    Object.assign(existing, payload);
  } else {
    state.archiveNotes.unshift(payload);
  }
  saveState();
  renderArchiveNotes();
  closeArchiveNoteModal();
  openNoticeModal("저장이 완료되었어요!");
}

function deleteCurrentArchiveNote() {
  if (!currentArchiveNoteId) return;
  const note = state.archiveNotes.find((item) => item.id === currentArchiveNoteId);
  openConfirmModal(() => {
    state.archiveNotes = state.archiveNotes.filter((item) => item.id !== currentArchiveNoteId);
    saveState();
    renderArchiveNotes();
    closeArchiveNoteModal();
  }, note ? `[${note.title}] 메모를 삭제할까요?` : "메모를 삭제할까요?");
}

function openArchiveCodeModal(codeId = null) {
  currentArchiveCodeId = codeId;
  const code = codeId ? state.archiveCodes.find((item) => item.id === codeId) : null;
  els.archiveCodeForm?.reset();
  els.archiveCodeForm.elements.id.value = code?.id || "";
  els.archiveCodeForm.elements.title.value = code?.title || "";
  els.archiveCodeForm.elements.description.value = code?.description || "";
  populateArchiveCodeCategorySelect(code?.categoryId || "");
  els.archiveCodeForm.elements.content.value = code?.content || "";
  els.archiveCodeModalTitle.textContent = code ? "코드 상세" : "새 코드";
  els.archiveCodeDeleteBtn?.classList.toggle("hidden", !code);
  setArchiveCodeEditing(!code);
  els.archiveCodeModal.classList.remove("hidden");
  syncArchiveCodeHighlight();
  setModalSnapshot("archiveCode", captureArchiveCodeModalState());
}

function closeArchiveCodeModal() {
  currentArchiveCodeId = null;
  archiveCodeEditing = false;
  els.archiveCodeModal.classList.add("hidden");
}

function handleArchiveCodeSave(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const now = new Date().toISOString();
  const payload = {
    id: String(formData.get("id") || crypto.randomUUID()),
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    categoryId: String(formData.get("categoryId") || state.archiveCodeCategories[0]?.id || ""),
    content: String(formData.get("content") || "").trim(),
    createdAt: now,
    updatedAt: now,
  };
  const existing = state.archiveCodes.find((item) => item.id === payload.id);
  if (existing) {
    payload.createdAt = existing.createdAt || now;
    Object.assign(existing, payload);
  } else {
    state.archiveCodes.unshift(payload);
  }
  saveState();
  renderArchiveCodes();
  closeArchiveCodeModal();
  openNoticeModal("저장이 완료되었어요!");
}

function deleteCurrentArchiveCode() {
  if (!currentArchiveCodeId) return;
  const code = state.archiveCodes.find((item) => item.id === currentArchiveCodeId);
  openConfirmModal(() => {
    state.archiveCodes = state.archiveCodes.filter((item) => item.id !== currentArchiveCodeId);
    saveState();
    renderArchiveCodes();
    closeArchiveCodeModal();
  }, code ? `[${code.title}] 코드를 삭제할까요?` : "코드를 삭제할까요?");
}

function handleArchiveCategorySave(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const id = String(formData.get("id") || crypto.randomUUID());
  const name = String(formData.get("name") || "").trim();
  const color = String(formData.get("color") || "gray");
  if (!name) return;
  const existing = state.archiveCodeCategories.find((item) => item.id === id);
  if (existing) {
    existing.name = name;
    existing.color = color;
  } else {
    state.archiveCodeCategories.push({ id, name, color });
  }
  saveState();
  renderArchiveCodeCategories();
  renderArchiveCodes();
  closeArchiveCategoryModal();
  openNoticeModal("저장이 완료되었어요!");
}

function deleteCurrentArchiveCategory() {
  if (!currentArchiveCategoryId) return;
  const category = state.archiveCodeCategories.find((item) => item.id === currentArchiveCategoryId);
  if (!category) return;
  if (state.archiveCodeCategories.length <= 1) {
    openNoticeModal("카테고리는 최소 1개 이상 필요해요.");
    return;
  }
  openConfirmModal(() => {
    const fallbackCategoryId = state.archiveCodeCategories.find((item) => item.id !== currentArchiveCategoryId)?.id || state.archiveCodeCategories[0].id;
    state.archiveCodes = state.archiveCodes.map((item) => item.categoryId === currentArchiveCategoryId ? { ...item, categoryId: fallbackCategoryId } : item);
    state.archiveCodeCategories = state.archiveCodeCategories.filter((item) => item.id !== currentArchiveCategoryId);
    saveState();
    renderArchiveCodeCategories();
    renderArchiveCodes();
    closeArchiveCategoryModal();
  }, category ? `[${category.name}] 카테고리를 삭제할까요?` : "카테고리를 삭제할까요?");
}

function highlightArchiveCode(value) {
  const source = String(value || "");
  const tokenRegex = /(<!--[\s\S]*?-->|\/\/[^\n]*|\/\*[\s\S]*?\*\/|<\/?[A-Za-z][\w:-]*\s*\/?>|\b[A-Za-z_:-][\w:.-]*(?=\=)|\b[a-z-]+(?=\s*:)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|new|import|export|from|default|async|await|try|catch|finally|throw|true|false|null|undefined)\b|\b[A-Za-z_$][\w$]*(?=\s*\()|[=+\-*/%<>!&|?:]+)/g;
  let result = "";
  let lastIndex = 0;
  for (const token of source.matchAll(tokenRegex)) {
    const match = token[0];
    const offset = token.index ?? 0;
    result += escapeHtml(source.slice(lastIndex, offset));
    let className = "archive-code-token-operator";
    if (/^(<!--|\/\/|\/\*)/.test(match)) className = "archive-code-token-comment";
    else if (/^<\/?[A-Za-z]/.test(match)) className = "archive-code-token-tag";
    else if (/^[A-Za-z_:-][\w:.-]*$/.test(match) && /=$/.test(source.slice(offset + match.length, offset + match.length + 1))) className = "archive-code-token-attr";
    else if (/^[a-z-]+$/.test(match) && /^\s*:/.test(source.slice(offset + match.length))) className = "archive-code-token-property";
    else if (/^["'`]/.test(match)) className = "archive-code-token-string";
    else if (/^\d/.test(match)) className = "archive-code-token-number";
    else if (/^(const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|new|import|export|from|default|async|await|try|catch|finally|throw|true|false|null|undefined)$/.test(match)) className = "archive-code-token-keyword";
    else if (/^[A-Za-z_$]/.test(match)) className = "archive-code-token-function";
    result += `<span class="${className}">${escapeHtml(match)}</span>`;
    lastIndex = offset + match.length;
  }
  result += escapeHtml(source.slice(lastIndex));
  return result || "&ZeroWidthSpace;";
}

function syncArchiveCodeHighlight() {
  if (!els.archiveCodeInput || !els.archiveCodeHighlight) return;
  els.archiveCodeHighlight.innerHTML = highlightArchiveCode(els.archiveCodeInput.value);
  syncArchiveCodeScroll();
}

function syncArchiveCodeScroll() {
  if (!els.archiveCodeInput || !els.archiveCodeHighlight) return;
  els.archiveCodeHighlight.scrollTop = els.archiveCodeInput.scrollTop;
  els.archiveCodeHighlight.scrollLeft = els.archiveCodeInput.scrollLeft;
}

function handleMemberSave(event) {
  event.preventDefault();
  if (!canManageMembers()) return;
  const formData = new FormData(event.currentTarget);
  const payload = {
    id: String(formData.get("id") || crypto.randomUUID()),
    name: String(formData.get("name") || "").trim(),
    roleLabel: String(formData.get("roleLabel") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    lastLoginAt: "",
    lastLoginIp: "",
    canManageMembers: Boolean(formData.get("canManageMembers")),
    approved: Boolean(formData.get("approved")),
    isOwner: false,
    createdAt: new Date().toISOString(),
  };

  const existing = state.users.find((user) => user.id === payload.id);
  if (!existing) {
    toast("새 멤버는 회원가입으로 추가해주세요.");
    return;
  }

  const bridge = getSupabaseBridge();
  if (existing) {
    const fallbackUsername = existing.username || existing.email?.split("@")[0] || payload.email.split("@")[0] || "";
    Object.assign(existing, payload, {
      username: fallbackUsername,
      password: "",
      createdAt: existing.createdAt || payload.createdAt,
      lastLoginAt: existing.lastLoginAt || "",
      lastLoginIp: existing.lastLoginIp || "",
      canManageMembers: existing.isOwner ? true : currentUser()?.isOwner ? payload.canManageMembers : existing.canManageMembers,
    });
    if (state.pendingApproval?.username === existing.username && existing.approved) state.pendingApproval = null;
    existing.rejected = Boolean(existing.rejected);
  }

  if (bridge?.isReady()) {
    bridge.upsertProfile({
      id: existing.id,
      username: existing.username,
      name: existing.name,
      role_label: existing.roleLabel,
      phone: existing.phone,
      email: existing.email,
      notes: existing.notes,
      can_manage_members: existing.canManageMembers,
      is_owner: existing.isOwner,
      approved: existing.approved,
      rejected: existing.rejected,
      last_login_at: existing.lastLoginAt || null,
      last_login_ip: existing.lastLoginIp || "",
      created_at: existing.createdAt,
      updated_at: new Date().toISOString(),
    }).then(async ({ error }) => {
      if (error) {
        toast("Supabase에 멤버 정보를 저장하지 못했습니다.");
        return;
      }
      await syncProfilesFromSupabase();
      renderMembers();
      closeMemberModal();
      openNoticeModal("저장이 완료되었어요!");
    });
    return;
  }

  saveState();
  closeMemberModal();
  renderMembers();
  openNoticeModal("저장이 완료되었어요!");
}

function deleteCurrentProject() {
  const project = selectedProject();
  if (!project) return;
  openConfirmModal(async () => {
    const bridge = getSupabaseBridge();
    if (bridge?.isReady()) {
      const result = await bridge.deleteProject(project.id);
      if (result.error) {
        toast("Supabase에서 프로젝트를 삭제하지 못했습니다.");
        return;
      }
    }
    state.projects = state.projects.filter((item) => item.id !== project.id);
    state.schedules = state.schedules.filter((item) => item.projectId !== project.id);
    state.selectedProjectId = null;
    saveState();
    closeProjectModal();
    render();
    toast("프로젝트가 삭제되었습니다.");
  }, `[${project.title}] 프로젝트를 삭제할까요? 연결된 일정도 함께 삭제됩니다.`);
}

async function handleDocumentUpload() {
  const [file] = els.contractFile.files;
  if (!file) return toast("업로드할 문서를 선택해주세요.");

  const dataUrl = await readFileAsDataUrl(file);
  const documentType = els.documentTypeSelect.value || "contract";
  draftProjectDocuments.unshift({
    id: crypto.randomUUID(),
    type: documentType,
    name: file.name,
    mimeType: file.type || guessMimeType(file.name),
    size: file.size,
    uploadedAt: new Date().toISOString(),
    dataUrl,
  });

  els.contractFile.value = "";
  renderDocuments();
  toast("문서가 업로드되었습니다.");
}

function renderDocuments() {
  els.contractGuide.classList.add("hidden");
  els.contractFile.disabled = false;
  els.documentTypeSelect.disabled = false;
  els.uploadContractBtn.disabled = false;
  refreshCustomSelect(els.documentTypeSelect);

  const documents = draftProjectDocuments || [];
  if (!documents.length) {
    els.contractList.innerHTML = '<li class="muted small">업로드한 문서가 없습니다.</li>';
    return;
  }

  els.contractList.innerHTML = documents.map((file) => `
    <li class="file-item">
      <div class="file-item-label">
        <strong>${formatDocumentType(file.type)}</strong>
        <p class="muted small">업로드 ${formatDateTime(file.uploadedAt)}</p>
      </div>
      <div class="inline-actions file-actions-row">
        <button type="button" class="ghost" data-preview-document="${file.id}">바로 보기</button>
        <button type="button" class="ghost" data-download-document="${file.id}">다운로드</button>
        <button type="button" class="danger" data-remove-document="${file.id}">삭제</button>
      </div>
    </li>
  `).join("");

  els.contractList.querySelectorAll("[data-preview-document]").forEach((button) => {
    button.addEventListener("click", () => previewDocument(button.dataset.previewDocument));
  });
  els.contractList.querySelectorAll("[data-download-document]").forEach((button) => {
    button.addEventListener("click", () => downloadDocument(button.dataset.downloadDocument));
  });
  els.contractList.querySelectorAll("[data-remove-document]").forEach((button) => {
    button.addEventListener("click", () => removeDocument(button.dataset.removeDocument));
  });
}
function downloadDocument(documentId) {
  const file = draftProjectDocuments.find((item) => item.id === documentId);
  if (!file) return;
  const link = document.createElement("a");
  link.href = file.dataUrl;
  link.download = file.name;
  link.click();
}

function previewDocument(documentId) {
  const file = draftProjectDocuments.find((item) => item.id === documentId);
  if (!file) return;

  currentPreviewDocumentId = documentId;
  els.documentPreviewTitle.textContent = file.name;
  els.documentPreviewBody.innerHTML = "";
  revokePreviewObjectUrl();

  if (file.mimeType.startsWith("image/")) {
    els.documentPreviewBody.innerHTML = `<img class="document-preview-image" src="${file.dataUrl}" alt="${escapeHtml(file.name)}">`;
  } else if (file.mimeType === "application/pdf") {
    currentPreviewObjectUrl = createObjectUrlFromDataUrl(file.dataUrl);
    const previewSrc = currentPreviewObjectUrl || file.dataUrl;
    els.documentPreviewBody.innerHTML = `
      <object class="document-preview-frame" data="${previewSrc}" type="application/pdf">
        <iframe class="document-preview-frame" src="${previewSrc}" title="${escapeHtml(file.name)}"></iframe>
      </object>
    `;
  } else if (file.mimeType.startsWith("text/")) {
    const text = decodeTextDataUrl(file.dataUrl);
    els.documentPreviewBody.innerHTML = `<pre class="document-preview-text">${escapeHtml(text || "미리볼 수 있는 텍스트 내용을 찾지 못했습니다.")}</pre>`;
  } else {
    els.documentPreviewBody.innerHTML = `
      <div class="document-preview-empty">
        <strong>브라우저에서 바로 볼 수 없는 형식입니다.</strong>
        <p>DOC, DOCX, HWP 파일은 앱 안에서 렌더링이 어려워서 다운로드 후 확인해주세요.</p>
      </div>
    `;
  }

  els.documentPreviewModal.classList.remove("hidden");
}

function closeDocumentPreviewModal() {
  currentPreviewDocumentId = null;
  els.documentPreviewBody.innerHTML = "";
  revokePreviewObjectUrl();
  els.documentPreviewModal.classList.add("hidden");
}

function openNoticeModal(message = "저장이 완료되었어요!") {
  els.noticeMessage.textContent = message;
  els.noticeModal.classList.remove("hidden");
}

function closeNoticeModal() {
  els.noticeModal.classList.add("hidden");
}

function removeDocument(documentId) {
  const file = draftProjectDocuments.find((item) => item.id === documentId);
  openConfirmModal(() => {
    draftProjectDocuments = draftProjectDocuments.filter((item) => item.id !== documentId);
    renderDocuments();
  }, file ? `[${file.name}] 문서를 삭제할까요?` : "문서를 삭제할까요?");
}

function updateApproval(userId) {
  if (!canManageMembers()) return;
  const user = state.users.find((item) => item.id === userId);
  if (!user) return;
  user.approved = true;
  user.rejected = false;
  if (state.pendingApproval?.username === user.username) state.pendingApproval = null;
  const bridge = getSupabaseBridge();
  if (bridge?.isReady()) {
    bridge.upsertProfile({
      id: user.id,
      username: user.username,
      name: user.name,
      role_label: user.roleLabel,
      phone: user.phone,
      email: user.email,
      notes: user.notes,
      can_manage_members: user.canManageMembers,
      is_owner: user.isOwner,
      approved: true,
      rejected: false,
      last_login_at: user.lastLoginAt || null,
      last_login_ip: user.lastLoginIp || "",
      created_at: user.createdAt,
      updated_at: new Date().toISOString(),
    }).then(async ({ error }) => {
      if (error) {
        toast("Supabase에 승인 상태를 저장하지 못했습니다.");
        return;
      }
      await syncProfilesFromSupabase();
      render();
      toast("가입 요청을 승인했습니다.");
    });
    return;
  }
  saveState();
  render();
  toast("가입 요청을 승인했습니다.");
}

function rejectUser(userId) {
  if (!canManageMembers()) return;
  const user = state.users.find((item) => item.id === userId);
  openConfirmModal(() => {
    if (!user) return;
    user.rejected = true;
    user.approved = false;
    if (state.pendingApproval?.username === user?.username) state.pendingApproval = null;
    const bridge = getSupabaseBridge();
    if (bridge?.isReady()) {
      bridge.upsertProfile({
        id: user.id,
        username: user.username,
        name: user.name,
        role_label: user.roleLabel,
        phone: user.phone,
        email: user.email,
        notes: user.notes,
        can_manage_members: user.canManageMembers,
        is_owner: user.isOwner,
        approved: false,
        rejected: true,
        last_login_at: user.lastLoginAt || null,
        last_login_ip: user.lastLoginIp || "",
        created_at: user.createdAt,
        updated_at: new Date().toISOString(),
      }).then(async ({ error }) => {
        if (error) {
          toast("Supabase에 거절 상태를 저장하지 못했습니다.");
          return;
        }
        await syncProfilesFromSupabase();
        render();
        toast("가입 요청을 거절했습니다.");
      });
      return;
    }
    saveState();
    render();
    toast("가입 요청을 거절했습니다.");
  }, user ? `[${user.name}] 가입 요청을 삭제할까요?` : "가입 요청을 삭제할까요?");
}

function resetScheduleModalForm(date = "") {
  els.scheduleModalForm.reset();
  els.scheduleModalForm.elements.id.value = "";
  els.scheduleModalForm.elements.date.value = date;
}

function openScheduleEditorModal(scheduleId = null, presetDate = "") {
  const schedule = scheduleId ? state.schedules.find((item) => item.id === scheduleId) : null;
  els.scheduleEditorTitle.textContent = schedule ? "일정 수정" : "일정 등록";
  els.scheduleEditorSubmitBtn.textContent = schedule ? "일정 수정" : "일정 저장";
  resetScheduleModalForm(presetDate);

  if (schedule) {
    els.scheduleModalForm.elements.id.value = schedule.id;
    els.scheduleModalForm.elements.title.value = schedule.title || "";
    els.scheduleModalForm.elements.date.value = schedule.date || presetDate || "";
    els.scheduleModalForm.elements.notes.value = schedule.notes || "";
  }
  els.scheduleEditorModal.classList.remove("hidden");
  setModalSnapshot("schedule", captureScheduleModalState());
}

function renderSchedules() {
  const todayKey = formatDateKey(new Date());
  const schedules = [...state.schedules]
    .filter((schedule) => schedule.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!schedules.length) {
    els.scheduleList.innerHTML = '<li class="muted small">대시보드에 표시할 예정 일정이 없습니다.</li>';
    return;
  }

  els.scheduleList.innerHTML = schedules.map((schedule) => {
    return `
      <li class="schedule-item">
        <div>
          <strong>${escapeHtml(schedule.title)}</strong>
          <p class="muted small">${schedule.date}</p>
          <p class="muted small">${escapeHtml(schedule.notes || "메모 없음")}</p>
        </div>
        <div class="inline-actions">
          <button type="button" class="ghost" data-edit-schedule="${schedule.id}">수정</button>
          <button type="button" class="danger" data-delete-schedule="${schedule.id}">삭제</button>
        </div>
      </li>
    `;
  }).join("");

  els.scheduleList.querySelectorAll("[data-edit-schedule]").forEach((button) => {
    button.addEventListener("click", () => openScheduleEditorModal(button.dataset.editSchedule));
  });
  els.scheduleList.querySelectorAll("[data-delete-schedule]").forEach((button) => {
    button.addEventListener("click", () => deleteSchedule(button.dataset.deleteSchedule));
  });
}

function deleteSchedule(scheduleId) {
  const schedule = state.schedules.find((item) => item.id === scheduleId);
  openConfirmModal(async () => {
    const bridge = getSupabaseBridge();
    if (bridge?.isReady()) {
      const result = await bridge.deleteSchedule(scheduleId);
      if (result.error) {
        toast("Supabase에서 일정을 삭제하지 못했습니다.");
        return;
      }
    }
    state.schedules = state.schedules.filter((item) => item.id !== scheduleId);
    removeScheduleFromWorklog(scheduleId, schedule?.date || "");
    saveState();
    renderSchedules();
    renderCalendar();
  }, schedule ? `[${schedule.title}] 일정을 삭제할까요?` : "일정을 삭제할까요?");
}

function getAnnualGoalPeriod(date = new Date()) {
  const month = date.getMonth() + 1;
  return {
    year: date.getFullYear(),
    half: month <= 6 ? "first" : "second",
  };
}

function getAnnualGoalPeriodOrder(period) {
  return Number(period.year) * 2 + (period.half === "second" ? 1 : 0);
}

function getAnnualGoalPeriodLabel(period) {
  return `${period.year}년 ${period.half === "first" ? "상반기" : "하반기"} 목표`;
}

function isSameAnnualGoalPeriod(goal, period) {
  return Number(goal.year) === Number(period.year) && goal.half === period.half;
}

function normalizeGoalText(value) {
  return String(value || "").trim();
}

function renderAnnualGoals() {
  if (!els.annualGoalBoard) return;
  const currentPeriod = getAnnualGoalPeriod();
  const goals = state.yearGoals
    .filter((goal) => isSameAnnualGoalPeriod(goal, currentPeriod))
    .sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
  const list = goals.length
    ? goals.map((goal) => `
        <li class="annual-goal-item ${goal.done ? "is-done" : ""}">
          <span>${escapeHtml(goal.text || "목표 없음")}</span>
          <div class="annual-goal-item-actions">
            <button type="button" class="ghost" data-annual-goal-toggle="${goal.id}">
              ${goal.done ? "완료 취소" : "달성"}
            </button>
            <button type="button" class="danger" data-annual-goal-delete="${goal.id}">삭제</button>
          </div>
        </li>
      `).join("")
    : '<li class="annual-goal-empty muted small">등록된 목표가 없습니다.</li>';

  els.annualGoalBoard.innerHTML = `
    <article class="annual-goal-column is-current" data-annual-period="${currentPeriod.year}-${currentPeriod.half}">
      <div class="annual-goal-column-head">
        <div>
          <span>현재 목표</span>
          <h4>${getAnnualGoalPeriodLabel(currentPeriod)}</h4>
        </div>
      </div>
      <ul class="annual-goal-list">${list}</ul>
    </article>
  `;

  els.annualGoalBoard.querySelectorAll("[data-annual-goal-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleAnnualGoal(button.dataset.annualGoalToggle));
  });
  els.annualGoalBoard.querySelectorAll("[data-annual-goal-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteAnnualGoal(button.dataset.annualGoalDelete));
  });
}

function openAnnualGoalAddModal() {
  if (!els.annualGoalAddModal || !els.annualGoalAddForm) return;
  const period = getAnnualGoalPeriod();
  els.annualGoalAddForm.reset();
  els.annualGoalAddForm.elements.year.value = period.year;
  els.annualGoalAddForm.elements.half.value = period.half;
  if (els.annualGoalAddTitle) els.annualGoalAddTitle.textContent = `${getAnnualGoalPeriodLabel(period)} 추가`;
  els.annualGoalAddModal.classList.remove("hidden");
  requestAnimationFrame(() => els.annualGoalAddForm.elements.goal?.focus());
}

function closeAnnualGoalAddModal() {
  els.annualGoalAddModal?.classList.add("hidden");
}

function handleAnnualGoalAdd(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const text = normalizeGoalText(new FormData(form).get("goal"));
  if (!text) return;
  state.yearGoals.push({
    id: crypto.randomUUID(),
    year: Number(form.elements.year.value),
    half: form.elements.half.value === "second" ? "second" : "first",
    text,
    done: false,
    createdAt: new Date().toISOString(),
    completedAt: "",
  });
  saveState();
  renderAnnualGoals();
  renderAnnualGoalArchiveLists();
  closeAnnualGoalAddModal();
  openNoticeModal("저장이 완료되었어요!");
}

function toggleAnnualGoal(goalId) {
  const goal = state.yearGoals.find((item) => item.id === goalId);
  if (!goal) return;
  goal.done = !goal.done;
  goal.completedAt = goal.done ? new Date().toISOString() : "";
  saveState();
  renderAnnualGoals();
  renderAnnualGoalArchiveLists();
}

function deleteAnnualGoal(goalId) {
  const goal = state.yearGoals.find((item) => item.id === goalId);
  if (!goal) return;
  openConfirmModal(() => {
    state.yearGoals = state.yearGoals.filter((item) => item.id !== goalId);
    saveState();
    renderAnnualGoals();
    renderAnnualGoalArchiveLists();
  }, "선택한 연간 목표를 삭제할까요?");
}

function getHistorySnapshotSummary(snapshotJson) {
  try {
    const snapshot = JSON.parse(snapshotJson || "{}");
    return [
      `프로젝트 ${snapshot.projects?.length || 0}건`,
      `일정 ${snapshot.schedules?.length || 0}건`,
      `메모 ${snapshot.archiveNotes?.length || 0}건`,
      `코드 ${snapshot.archiveCodes?.length || 0}건`,
    ].join(" · ");
  } catch (error) {
    return "스냅샷 정보를 읽을 수 없습니다.";
  }
}

function renderChangeHistoryList() {
  if (!els.changeHistoryList) return;
  const items = state.changeHistory || [];
  if (!items.length) {
    els.changeHistoryList.innerHTML = '<div class="change-history-empty muted small">아직 복원할 변경 이력이 없습니다.</div>';
    return;
  }
  els.changeHistoryList.innerHTML = items.map((item, index) => `
    <article class="change-history-item">
      <div>
        <strong>${index + 1}. ${formatDateTime(item.createdAt)}</strong>
        <p>${getHistorySnapshotSummary(item.snapshot)}</p>
      </div>
      <button type="button" class="ghost" data-restore-history="${item.id}">이 시점으로 복원</button>
    </article>
  `).join("");
  els.changeHistoryList.querySelectorAll("[data-restore-history]").forEach((button) => {
    button.addEventListener("click", () => restoreChangeHistory(button.dataset.restoreHistory));
  });
}

function openChangeHistoryModal() {
  renderChangeHistoryList();
  els.changeHistoryModal?.classList.remove("hidden");
}

function closeChangeHistoryModal() {
  els.changeHistoryModal?.classList.add("hidden");
}

function restoreChangeHistory(historyId) {
  const entry = (state.changeHistory || []).find((item) => item.id === historyId);
  if (!entry) return;
  openConfirmModal(() => {
    const snapshot = JSON.parse(entry.snapshot || "{}");
    const currentDocumentData = new Map();
    (state.projects || []).forEach((project) => {
      (project.documents || []).forEach((document) => {
        if (document.id && document.dataUrl) currentDocumentData.set(document.id, document.dataUrl);
      });
    });
    snapshot.projects = (snapshot.projects || []).map((project) => ({
      ...project,
      documents: (project.documents || []).map((document) => ({
        ...document,
        dataUrl: document.dataUrl || currentDocumentData.get(document.id) || "",
      })),
    }));
    snapshot.siteSettings = {
      ...(snapshot.siteSettings || {}),
      faviconDataUrl: snapshot.siteSettings?.faviconDataUrl || state.siteSettings?.faviconDataUrl || "",
      thumbnailDataUrl: snapshot.siteSettings?.thumbnailDataUrl || state.siteSettings?.thumbnailDataUrl || "",
    };
    const preserved = {
      sessionUserId: state.sessionUserId,
      currentView: state.currentView,
      sidebarCollapsed: state.sidebarCollapsed,
      archiveMenuOpen: state.archiveMenuOpen,
      rememberedLogin: state.rememberedLogin,
      pendingApproval: state.pendingApproval,
      changeHistory: (state.changeHistory || []).filter((item) => item.id !== historyId),
    };
    state = normalizeState({ ...snapshot, ...preserved });
    lastHistorySnapshotJson = serializeStateForHistory(state);
    saveState({ history: false });
    closeChangeHistoryModal();
    render();
    openNoticeModal("선택한 시점으로 복원했어요!");
  }, "선택한 변경 이력으로 복원하시겠습니까?", { okText: "복원하기", okClass: "primary" });
}

function openAnnualGoalArchiveModal() {
  if (!els.annualGoalModal) return;
  if (els.annualGoalSearchInput) els.annualGoalSearchInput.value = "";
  renderAnnualGoalArchiveLists();
  els.annualGoalModal.classList.remove("hidden");
}

function closeAnnualGoalArchiveModal() {
  els.annualGoalModal?.classList.add("hidden");
}

function getAnnualGoalArchiveItems(done) {
  const keyword = String(els.annualGoalSearchInput?.value || "").trim().toLowerCase();
  return [...state.yearGoals]
    .filter((goal) => Boolean(goal.done) === done)
    .filter((goal) => {
      if (!keyword) return true;
      const haystack = `${goal.text} ${goal.year} ${goal.half === "first" ? "상반기" : "하반기"}`.toLowerCase();
      return haystack.includes(keyword);
    })
    .sort((a, b) => {
      const periodDiff = getAnnualGoalPeriodOrder({ year: b.year, half: b.half }) - getAnnualGoalPeriodOrder({ year: a.year, half: a.half });
      if (periodDiff) return periodDiff;
      return String(b.completedAt || b.createdAt || "").localeCompare(String(a.completedAt || a.createdAt || ""));
    });
}

function renderAnnualGoalArchiveLists() {
  if (!els.annualGoalActiveList || !els.annualGoalDoneList) return;
  const renderList = (items, emptyText) => {
    if (!items.length) return `<li class="annual-goal-empty muted small">${emptyText}</li>`;
    return items.map((goal) => `
      <li class="annual-goal-archive-item ${goal.done ? "is-done" : ""}">
        <div>
          <strong>${escapeHtml(goal.text || "목표 없음")}</strong>
          <span>${getAnnualGoalPeriodLabel(goal)}</span>
        </div>
        <button type="button" class="${goal.done ? "ghost" : "secondary"}" data-annual-goal-archive-toggle="${goal.id}">
          ${goal.done ? "완료 취소" : "달성"}
        </button>
      </li>
    `).join("");
  };

  els.annualGoalActiveList.innerHTML = renderList(getAnnualGoalArchiveItems(false), "진행중인 목표가 없습니다.");
  els.annualGoalDoneList.innerHTML = renderList(getAnnualGoalArchiveItems(true), "완료한 목표가 없습니다.");
  [els.annualGoalActiveList, els.annualGoalDoneList].forEach((list) => {
    list.querySelectorAll("[data-annual-goal-archive-toggle]").forEach((button) => {
      button.addEventListener("click", () => toggleAnnualGoal(button.dataset.annualGoalArchiveToggle));
    });
  });
}

function renderCalendar() {
  const base = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const todayKey = formatDateKey(new Date());
  const cells = [];

  els.calendarTitle.textContent = `${year}년 ${month + 1}월`;
  els.calendarWeekdays.innerHTML = CALENDAR_WEEKDAYS
    .map((label, index) => `<div class="calendar-weekday ${index === 0 ? "is-holiday" : ""}">${label}</div>`)
    .join("");

  for (let i = 0; i < startOffset; i += 1) cells.push(renderCalendarCell(new Date(year, month, -(startOffset - 1 - i)), true, todayKey));
  for (let day = 1; day <= lastDay.getDate(); day += 1) cells.push(renderCalendarCell(new Date(year, month, day), false, todayKey));
  const remainder = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let day = 1; day <= remainder; day += 1) cells.push(renderCalendarCell(new Date(year, month + 1, day), true, todayKey));

  els.calendarGrid.innerHTML = cells.join("");
  els.calendarGrid.querySelectorAll("[data-calendar-cell-date]").forEach((cell) => {
    cell.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openScheduleEditorModal(null, cell.dataset.calendarCellDate);
    });
  });
  els.calendarGrid.querySelectorAll("[data-calendar-date]").forEach((button) => {
    button.addEventListener("click", () => openScheduleEditorModal(null, button.dataset.calendarDate));
  });
  els.calendarGrid.querySelectorAll("[data-calendar-schedule]").forEach((button) => {
    button.addEventListener("click", () => openScheduleModal(button.dataset.calendarSchedule));
  });
  els.calendarGrid.querySelectorAll("[data-worklog-date]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openWorklogModal(button.dataset.worklogDate);
    });
  });
  els.calendarGrid.querySelectorAll("[data-project-marker]").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.projectMarker));
  });
}

function renderCalendarCell(date, muted, todayKey) {
  const key = formatDateKey(date);
  const holidayName = getHolidayName(key);
  const isHoliday = Boolean(holidayName);
  const worklogProgress = getWorklogProgress(key);
  const markers = getProjectMarkersForDate(key)
    .map((marker) => `<button type="button" class="calendar-range ${marker.type}" data-project-marker="${marker.projectId}">${escapeHtml(marker.label)}</button>`)
    .join("");
  const daySchedules = state.schedules.filter((schedule) => schedule.date === key);
  const events = daySchedules
    .map((schedule) => `<button type="button" class="calendar-event" data-calendar-schedule="${schedule.id}">${escapeHtml(schedule.title)}</button>`)
    .join("");

  return `
    <article class="calendar-cell ${muted ? "muted-day" : ""} ${key === todayKey ? "today" : ""}" data-calendar-cell-date="${key}">
      <div class="calendar-cell-top">
        <button type="button" class="calendar-day-trigger ${isHoliday ? "is-holiday" : ""}" data-calendar-date="${key}" title="${holidayName || ""}">${date.getDate()}</button>
        <button type="button" class="calendar-worklog-trigger ${worklogProgress >= 50 ? "is-active" : ""}" data-worklog-date="${key}" title="업무일지 ${worklogProgress}%">
          <span class="calendar-worklog-indicator" aria-hidden="true"></span>
        </button>
      </div>
      ${markers}
      <div class="calendar-events">${events}</div>
    </article>
  `;
}

function moveMonth(offset) {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
  renderCalendar();
}
function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.add("hidden"), 2200);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function formatDateTime(value) {
  return new Date(value).toLocaleString("ko-KR");
}

function formatDateOnly(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ko-KR");
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}

function getHolidayName(dateKey) {
  return HOLIDAY_MAP[dateKey] || "";
}

function createWorklogTask(task = {}) {
  return {
    id: task.id || crypto.randomUUID(),
    text: task.text || "",
    done: Boolean(task.done),
    scheduleId: task.scheduleId || "",
    auto: Boolean(task.auto),
  };
}

function getScheduleWorklogText(schedule) {
  return String(schedule?.title || "").trim();
}

function removeScheduleFromWorklog(scheduleId, dateKey = "") {
  if (!scheduleId || !state.worklogs) return;
  const targetDates = dateKey ? [dateKey] : Object.keys(state.worklogs);
  targetDates.forEach((key) => {
    const worklog = state.worklogs[key];
    if (!worklog?.tasks?.length) return;
    worklog.tasks = worklog.tasks.filter((task) => task.scheduleId !== scheduleId);
    if (!worklog.tasks.length && !String(worklog.notes || "").trim()) {
      delete state.worklogs[key];
    }
  });
}

function syncScheduleToWorklog(schedule, previousSchedule = null) {
  if (!schedule?.id || !schedule.date) return;
  state.worklogs = state.worklogs || {};
  if (previousSchedule?.date && previousSchedule.date !== schedule.date) {
    removeScheduleFromWorklog(schedule.id, previousSchedule.date);
  }

  const text = getScheduleWorklogText(schedule);
  if (!text) return;

  const worklog = state.worklogs[schedule.date] || { date: schedule.date, tasks: [], notes: "" };
  worklog.tasks = Array.isArray(worklog.tasks) ? worklog.tasks : [];
  const linkedTask = worklog.tasks.find((task) => task.scheduleId === schedule.id);
  if (linkedTask) {
    linkedTask.text = text;
    linkedTask.auto = true;
  } else if (!worklog.tasks.some((task) => String(task.text || "").trim() === text)) {
    worklog.tasks.push(createWorklogTask({ text, done: false, scheduleId: schedule.id, auto: true }));
  }
  state.worklogs[schedule.date] = worklog;
}

function syncSchedulesForDateToWorklog(dateKey) {
  state.schedules
    .filter((schedule) => schedule.date === dateKey)
    .forEach((schedule) => syncScheduleToWorklog(schedule));
}

function getWorklogProgress(dateKey) {
  const worklog = state.worklogs?.[dateKey];
  if (!worklog?.tasks?.length) return 0;
  const actionableTasks = worklog.tasks.filter((task) => String(task.text || "").trim());
  if (!actionableTasks.length) return 0;
  const doneCount = actionableTasks.filter((task) => task.done).length;
  return Math.round((doneCount / actionableTasks.length) * 100);
}

function formatWorklogTitle(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  const weekday = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][date.getDay()];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekday}`;
}

function ensureWorklogDraft(dateKey = currentWorklogDate) {
  if (!currentWorklogDraft) {
    const existing = state.worklogs?.[dateKey];
    currentWorklogDraft = {
      date: dateKey,
      tasks: existing?.tasks?.length ? existing.tasks.map((task) => createWorklogTask(task)) : [createWorklogTask()],
      notes: existing?.notes || "",
    };
  }
}

function openWorklogModal(dateKey) {
  currentWorklogDate = dateKey;
  currentWorklogDraft = null;
  syncSchedulesForDateToWorklog(dateKey);
  saveState();
  ensureWorklogDraft(dateKey);
  els.worklogTitle.textContent = formatWorklogTitle(dateKey);
  els.worklogForm.elements.date.value = dateKey;
  els.worklogForm.elements.notes.value = currentWorklogDraft.notes || "";
  renderWorklogTasks();
  els.worklogModal.classList.remove("hidden");
  setModalSnapshot("worklog", captureWorklogModalState());
}

function closeWorklogModal() {
  currentWorklogDate = "";
  currentWorklogDraft = null;
  draggedWorklogTaskId = null;
  els.worklogModal.classList.add("hidden");
}

function renderWorklogTasks() {
  ensureWorklogDraft();
  const tasks = currentWorklogDraft.tasks;
  els.worklogTasks.innerHTML = tasks.map((task, index) => `
    <div class="worklog-task ${task.done ? "is-done" : ""}" data-worklog-task="${task.id}" draggable="true">
      <button type="button" class="worklog-drag-handle" aria-label="순서 이동">⋮⋮</button>
      <span class="worklog-order">${index + 1}</span>
      <input type="text" class="worklog-task-input" data-worklog-input="${task.id}" value="${escapeHtml(task.text)}">
      <div class="inline-actions worklog-actions">
        <button type="button" class="ghost ${task.done ? "is-active" : ""}" data-worklog-complete="${task.id}">처리완료</button>
        <button type="button" class="ghost ${!task.done ? "is-active" : ""}" data-worklog-cancel="${task.id}">취소</button>
        <button type="button" class="danger" data-worklog-remove="${task.id}">삭제</button>
      </div>
    </div>
  `).join("");

  els.worklogTasks.querySelectorAll("[data-worklog-input]").forEach((input) => {
    input.addEventListener("input", () => {
      const task = currentWorklogDraft.tasks.find((item) => item.id === input.dataset.worklogInput);
      if (task) task.text = input.value;
    });
  });
  els.worklogTasks.querySelectorAll("[data-worklog-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      const task = currentWorklogDraft.tasks.find((item) => item.id === button.dataset.worklogComplete);
      if (!task) return;
      task.done = true;
      renderWorklogTasks();
    });
  });
  els.worklogTasks.querySelectorAll("[data-worklog-cancel]").forEach((button) => {
    button.addEventListener("click", () => {
      const task = currentWorklogDraft.tasks.find((item) => item.id === button.dataset.worklogCancel);
      if (!task) return;
      task.done = false;
      renderWorklogTasks();
    });
  });
  els.worklogTasks.querySelectorAll("[data-worklog-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      currentWorklogDraft.tasks = currentWorklogDraft.tasks.filter((item) => item.id !== button.dataset.worklogRemove);
      if (!currentWorklogDraft.tasks.length) currentWorklogDraft.tasks.push(createWorklogTask());
      renderWorklogTasks();
    });
  });
  els.worklogTasks.querySelectorAll("[data-worklog-task]").forEach((item) => {
    item.addEventListener("dragstart", () => {
      draggedWorklogTaskId = item.dataset.worklogTask;
      item.classList.add("is-dragging");
    });
    item.addEventListener("dragend", () => {
      draggedWorklogTaskId = null;
      item.classList.remove("is-dragging");
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      item.classList.add("drag-over");
    });
    item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("drag-over");
      if (!draggedWorklogTaskId || draggedWorklogTaskId === item.dataset.worklogTask) return;
      const fromIndex = currentWorklogDraft.tasks.findIndex((task) => task.id === draggedWorklogTaskId);
      const toIndex = currentWorklogDraft.tasks.findIndex((task) => task.id === item.dataset.worklogTask);
      if (fromIndex < 0 || toIndex < 0) return;
      const [moved] = currentWorklogDraft.tasks.splice(fromIndex, 1);
      currentWorklogDraft.tasks.splice(toIndex, 0, moved);
      renderWorklogTasks();
    });
  });

  const actionableTasks = tasks.filter((task) => task.text.trim());
  const doneCount = actionableTasks.filter((task) => task.done).length;
  const totalCount = actionableTasks.length;
  const progress = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  els.worklogProgressText.textContent = `${progress}%`;
  els.worklogProgressSummary.textContent = `${doneCount} / ${totalCount} 완료`;
  els.worklogProgressFill.style.width = `${progress}%`;
}

function handleWorklogSave(event) {
  event.preventDefault();
  ensureWorklogDraft();
  currentWorklogDraft.notes = String(els.worklogForm.elements.notes.value || "").trim();
  state.worklogs[currentWorklogDate] = {
    date: currentWorklogDate,
    tasks: currentWorklogDraft.tasks.map((task) => ({
      id: task.id,
      text: task.text.trim(),
      done: Boolean(task.done),
      scheduleId: task.scheduleId || "",
      auto: Boolean(task.auto),
    })),
    notes: currentWorklogDraft.notes,
  };
  saveState();
  renderCalendar();
  closeWorklogModal();
  openNoticeModal("저장이 완료되었어요!");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function openConfirmModal(action, message = "삭제할까요?", options = {}) {
  pendingConfirmAction = action;
  els.confirmMessage.textContent = message;
  els.confirmOkBtn.textContent = options.okText || "삭제하기";
  els.confirmOkBtn.className = options.okClass || "danger";
  els.confirmModal.classList.remove("hidden");
}

function closeConfirmModal() {
  pendingConfirmAction = null;
  els.confirmModal.classList.add("hidden");
}

async function runConfirmedAction() {
  if (pendingConfirmAction) await pendingConfirmAction();
  closeConfirmModal();
}

function openScheduleModal(scheduleId) {
  const schedule = state.schedules.find((item) => item.id === scheduleId);
  if (!schedule) return;
  currentScheduleDetailId = scheduleId;
  els.scheduleDetailTitle.textContent = schedule.title;
  els.scheduleDetailDate.textContent = schedule.date || "-";
  els.scheduleDetailNotes.textContent = schedule.notes || "메모가 없습니다.";
  els.scheduleDetailModal.classList.remove("hidden");
}

function closeScheduleModal() {
  currentScheduleDetailId = null;
  els.scheduleDetailModal.classList.add("hidden");
}

function editScheduleFromDetailModal() {
  if (!currentScheduleDetailId) return;
  const scheduleId = currentScheduleDetailId;
  closeScheduleModal();
  openScheduleEditorModal(scheduleId);
}

function deleteScheduleFromDetailModal() {
  if (!currentScheduleDetailId) return;
  const scheduleId = currentScheduleDetailId;
  closeScheduleModal();
  deleteSchedule(scheduleId);
}

async function handleScheduleSave(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const payload = {
    id: String(formData.get("id") || crypto.randomUUID()),
    title: String(formData.get("title")).trim(),
    date: String(formData.get("date")),
    projectId: "",
    notes: String(formData.get("notes")).trim(),
  };

  const existing = state.schedules.find((schedule) => schedule.id === payload.id);
  const previousSchedule = existing ? { ...existing } : null;
  if (existing) Object.assign(existing, payload);
  else state.schedules.push(payload);

  const bridge = getSupabaseBridge();
  if (bridge?.isReady()) {
    const result = await bridge.upsertSchedule(serializeScheduleForSupabase(existing || payload));
    if (result.error) {
      if (existing && previousSchedule) {
        Object.assign(existing, previousSchedule);
      } else {
        state.schedules = state.schedules.filter((schedule) => schedule.id !== payload.id);
      }
      const message = `일정 저장 실패: ${result.error.message || "Supabase 오류"}`;
      openNoticeModal(message);
      toast(message);
      return;
    }
    const syncedSchedule = deserializeScheduleFromSupabase(result.data);
    const syncedIndex = state.schedules.findIndex((schedule) => schedule.id === syncedSchedule.id);
    if (syncedIndex >= 0) state.schedules[syncedIndex] = syncedSchedule;
    else state.schedules.push(syncedSchedule);
  }
  syncScheduleToWorklog(payload, previousSchedule);

  saveState();
  closeScheduleEditorModal();
  renderSchedules();
  renderCalendar();
  openNoticeModal("저장이 완료되었어요!");
}

function closeScheduleEditorModal() {
  els.scheduleEditorModal.classList.add("hidden");
}

function openCalendarDayModal(dateKey) {
  currentCalendarDayKey = dateKey;
  const schedules = state.schedules
    .filter((schedule) => schedule.date === dateKey)
    .sort((a, b) => a.title.localeCompare(b.title, "ko"));

  els.calendarDayTitle.textContent = `${dateKey} 일정`;
  if (!schedules.length) {
    els.calendarDayList.innerHTML = '<li class="muted small">등록된 일정이 없습니다.</li>';
  } else {
    els.calendarDayList.innerHTML = schedules.map((schedule) => {
      return `
        <li class="schedule-item">
          <div>
            <strong>${escapeHtml(schedule.title)}</strong>
            <p class="muted small">${escapeHtml(schedule.notes || "메모 없음")}</p>
          </div>
          <div class="inline-actions">
            <button type="button" class="ghost" data-day-schedule="${schedule.id}">상세 보기</button>
          </div>
        </li>
      `;
    }).join("");
    els.calendarDayList.querySelectorAll("[data-day-schedule]").forEach((button) => {
      button.addEventListener("click", () => {
        closeCalendarDayModal();
        openScheduleModal(button.dataset.daySchedule);
      });
    });
  }

  els.calendarDayModal.classList.remove("hidden");
}

function closeCalendarDayModal() {
  currentCalendarDayKey = "";
  els.calendarDayModal.classList.add("hidden");
}

function getProjectMarkersForDate(dateKey) {
  return state.projects.flatMap((project) => {
    const markers = [];
    const customerLabel = project.client || project.title || "고객사";
    if (project.startDate === dateKey) markers.push({ type: "start", label: `${customerLabel} 계약`, projectId: project.id });
    if (project.dueDate === dateKey) markers.push({ type: "deadline", label: `${customerLabel} 1차 마감`, projectId: project.id });
    return markers;
  });
}

function setupDatePickerInput(input) {
  input.addEventListener("focus", () => { if (typeof input.showPicker === "function") input.showPicker(); });
  input.addEventListener("click", () => { if (typeof input.showPicker === "function") input.showPicker(); });
  input.addEventListener("keydown", (event) => {
    const allowed = ["Tab", "Shift", "ArrowLeft", "ArrowRight"];
    if (!allowed.includes(event.key)) event.preventDefault();
  });
}

function handleContractAmountInput(event) {
  event.target.value = formatAmount(event.target.value);
}

function formatAmount(value) {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("ko-KR");
}

function parseAmount(value) {
  const digits = Number(String(value || "").replace(/\D/g, ""));
  return Number.isFinite(digits) ? digits : 0;
}

function getProjectNetAmount(project) {
  const contractAmount = parseAmount(project?.contractAmount);
  const paybackAmount = project?.paybackStatus === "enabled" ? parseAmount(project?.paybackAmount) : 0;
  const kmongFee = project?.paymentMethod === "kmong" ? parseAmount(project?.kmongFee) : 0;
  return Math.max(0, contractAmount - paybackAmount - kmongFee);
}

function formatProjectStatus(project) {
  if (project.status === "inProgress") {
    return PROGRESS_STAGE_META[project.progressStage] || STATUS_META.inProgress.title;
  }
  return STATUS_META[project.status]?.title || "-";
}

function formatProgressStage(value) {
  return PROGRESS_STAGE_META[value] || "세부 단계 미설정";
}

function formatDocumentType(value) {
  return value === "businessLicense" ? "사업자등록증" : "계약서";
}

function guessMimeType(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".txt")) return "text/plain";
  return "application/octet-stream";
}

function initializeCustomSelects() {
  document.querySelectorAll("select").forEach((select) => {
    if (!select.dataset.customSelectReady) {
      select.dataset.customSelectReady = "true";
      select.classList.add("native-select-hidden");
      const ui = document.createElement("div");
      ui.className = "custom-select";
      ui.innerHTML = '<button type="button" class="custom-select-trigger"></button><div class="custom-select-menu"></div>';
      select.insertAdjacentElement("afterend", ui);
      select._customSelectUi = ui;
      ui.querySelector(".custom-select-trigger").addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllCustomSelects(select);
        ui.classList.toggle("open");
      });
      ui.querySelector(".custom-select-menu").addEventListener("click", (event) => {
        const option = event.target.closest("[data-value]");
        if (!option) return;
        select.value = option.dataset.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        refreshCustomSelect(select);
        closeAllCustomSelects();
      });
      select.addEventListener("change", () => refreshCustomSelect(select));
    }
    refreshCustomSelect(select);
  });
  document.addEventListener("click", closeAllCustomSelects);
}

function refreshCustomSelect(select) {
  if (!select || !select._customSelectUi) return;
  const ui = select._customSelectUi;
  const trigger = ui.querySelector(".custom-select-trigger");
  const menu = ui.querySelector(".custom-select-menu");
  const selectedOption = select.options[select.selectedIndex];
  ui.classList.toggle("disabled", select.disabled);
  trigger.disabled = select.disabled;
  trigger.textContent = selectedOption ? selectedOption.textContent : "선택";
  menu.innerHTML = Array.from(select.options).map((option) => `
    <button type="button" class="custom-select-option ${option.selected ? "selected" : ""}" data-value="${escapeHtml(option.value)}">
      <span class="custom-select-option-label">${escapeHtml(option.textContent)}</span>
      <span class="custom-select-option-check">${option.selected ? "선택됨" : ""}</span>
    </button>
  `).join("");
}

function syncAllCustomSelects() {
  document.querySelectorAll("select").forEach((select) => refreshCustomSelect(select));
}

function closeAllCustomSelects(exceptSelect = null) {
  document.querySelectorAll(".custom-select.open").forEach((node) => {
    if (exceptSelect && exceptSelect._customSelectUi === node) return;
    node.classList.remove("open");
  });
}

function createObjectUrlFromDataUrl(dataUrl) {
  try {
    const [header, payload] = dataUrl.split(",");
    if (!header || !payload) return null;
    const mimeMatch = header.match(/data:(.*?)(;base64)?$/);
    const mimeType = mimeMatch?.[1] || "application/octet-stream";
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
  } catch (error) {
    return null;
  }
}

function revokePreviewObjectUrl() {
  if (!currentPreviewObjectUrl) return;
  URL.revokeObjectURL(currentPreviewObjectUrl);
  currentPreviewObjectUrl = null;
}

function decodeTextDataUrl(dataUrl) {
  try {
    const [header, payload] = dataUrl.split(",");
    if (!header || !payload) return "";
    if (header.includes(";base64")) {
      return decodeURIComponent(escape(atob(payload)));
    }
    return decodeURIComponent(payload);
  } catch (error) {
    return "";
  }
}
