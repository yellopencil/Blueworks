const assert = require("node:assert/strict");
const path = require("node:path");

global.window = global;
global.ExcelJS = require(path.join(__dirname, "..", "assets", "exceljs-4.4.0.min.js"));

class TestDOMParser {
  parseFromString(html) {
    return {
      body: {
        textContent: String(html || "")
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      },
      querySelectorAll() {
        return [];
      },
      createTextNode(value) {
        return { textContent: value };
      },
    };
  }
}

global.DOMParser = TestDOMParser;
let downloadedBlob = null;
global.URL = {
  createObjectURL(blob) {
    downloadedBlob = blob;
    return "blob:backup-test";
  },
  revokeObjectURL() {},
};
global.document = {
  body: {
    appendChild() {},
  },
  createElement() {
    return {
      click() {},
      remove() {},
      set href(value) { this._href = value; },
      set download(value) { this._download = value; },
    };
  },
};
global.window.setTimeout = (callback) => {
  callback();
  return 0;
};

require(path.join(__dirname, "..", "backup-export.js"));

function createDatasets() {
  const project = (id, year, password) => ({
    id,
    title: `${year} 프로젝트`,
    client: `${year} 고객사`,
    manager_name: "담당자",
    manager_phone: "010-1234-5678",
    status: "inProgress",
    progress_stage: "firstRevisionDone",
    start_date: `${year}-05-10`,
    due_date: `${year}-06-10`,
    timeline: "<p>타임라인</p>",
    notes: "<p>프로젝트 메모</p>",
    imweb_id: "imweb-owner",
    imweb_password: password,
    contract_amount: 2000000,
    payback_status: "none",
    payback_amount: 0,
    payback_note: "",
    kmong_fee: 1700000,
    payment_method: "kmong",
    tax_invoice: "",
    package_type: "premium",
    site_type: "business",
    language_count: 2,
    progress_order: 1,
    project_type: "website",
    website_url: "https://example.com",
    languages: ["한국어", "영어"],
    created_by: "user-1",
    created_at: `${year}-05-01T00:00:00Z`,
    updated_at: `${year}-05-02T00:00:00Z`,
  });

  return {
    projects: [project("project-2025", 2025, "secret-2025"), project("project-2026", 2026, "secret-2026")],
    projectDocuments: [{
      id: "document-1",
      project_id: "project-2025",
      document_type: "contract",
      file_name: "계약서.pdf",
      storage_path: "projects/project-2025/document.pdf",
      mime_type: "application/pdf",
      size_bytes: 1234,
      created_by: "user-1",
      created_at: "2025-05-10T00:00:00Z",
    }],
    schedules: [{ id: "schedule-1", title: "미팅", date: "2025-05-11", notes: "회의", project_id: "project-2025" }],
    worklogs: [{
      id: "worklog-1",
      worklog_date: "2025-05-12",
      notes: "특이사항",
      worklog_tasks: [{
        id: "task-1",
        worklog_id: "worklog-1",
        task_text: "시안 작업",
        done: false,
        task_status: "active",
        sort_order: 0,
      }],
    }],
    yearGoals: [{ id: "goal-1", year: 2025, half: "first", kind: "goal", text: "목표", done: false }],
    archiveNotes: [{ id: "note-1", kind: "memo", title: "메모", content: "<p>내용</p>", sort_order: 0 }],
    archiveCodeCategories: [{ id: "category-1", name: "기본", color: "gray", sort_order: 0 }],
    archiveCodes: [{ id: "code-1", category_id: "category-1", title: "코드", description: "설명", code: "const a = 1;" }],
    otherRevenues: [{ id: "revenue-1", revenue_date: "2025-05-13", category: "ebook", title: "전자책", amount: 30000 }],
    archiveDiaries: [{ id: "diary-1", entry_date: "2025-05-14", title: "일기", content: "<p>본문</p>" }],
    profiles: [{ id: "user-1", name: "대표", email: "owner@example.com", phone: "010-0000-0000", role_label: "대표", is_owner: true, approved: true }],
    siteSettings: [{ id: "settings-1", title: "BLUEWORKS", description: "설명", block_crawling: true }],
    quoteSettings: { id: "global", agreement_html: "<p>약관</p>", payment_lines_normal: ["현금"], payment_lines_kmong: ["크몽"], row_preset: [{ label: "기획" }] },
    quoteHistory: [{ id: "quote-1", quote_date: "2025-05-15", title: "견적", total: 1000000, filename: "견적.pdf" }],
  };
}

async function loadDownloadedWorkbook(options) {
  downloadedBlob = null;
  await global.BlueworksExcelBackup.download({ datasets: createDatasets(), ...options });
  assert.ok(downloadedBlob, "다운로드 Blob이 생성되어야 합니다.");
  const buffer = Buffer.from(await downloadedBlob.arrayBuffer());
  const workbook = new global.ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  return workbook;
}

(async () => {
  const fullWorkbook = await loadDownloadedWorkbook({ scope: "all", year: 2025 });
  assert.deepEqual(fullWorkbook.worksheets.map((sheet) => sheet.name), [
    "안내", "프로젝트", "부수입", "일정", "업무일지", "업무항목", "연간목표", "메모·프롬프트",
    "코드카테고리", "코드", "다이어리", "견적설정", "멤버", "환경설정", "문서목록", "견적기록",
  ]);
  const fullProjects = fullWorkbook.getWorksheet("프로젝트");
  assert.equal(fullProjects.rowCount, 6, "전체 백업에는 프로젝트 2건이 들어가야 합니다.");
  assert.equal(fullProjects.views[0].ySplit, 4, "제목 행을 고정해야 합니다.");
  assert.ok(fullProjects.autoFilter, "필터가 적용되어야 합니다.");
  const passwordColumn = fullProjects.getRow(4).values.findIndex((value) => value === "아임웹 비밀번호");
  assert.ok(passwordColumn > 0, "아임웹 비밀번호 열이 있어야 합니다.");
  assert.equal(fullProjects.getCell(5, passwordColumn).value, "secret-2025");

  const yearlyWorkbook = await loadDownloadedWorkbook({ scope: "year", year: 2025 });
  assert.equal(yearlyWorkbook.getWorksheet("프로젝트").rowCount, 5, "2025년 백업에는 2025년 프로젝트만 들어가야 합니다.");
  assert.equal(yearlyWorkbook.getWorksheet("부수입").rowCount, 5);
  assert.equal(yearlyWorkbook.getWorksheet("일정").rowCount, 5);
  assert.equal(yearlyWorkbook.getWorksheet("업무일지").rowCount, 5);
  assert.equal(yearlyWorkbook.getWorksheet("다이어리").rowCount, 5);
  assert.equal(yearlyWorkbook.getWorksheet("메모·프롬프트").rowCount, 5, "기준 자료는 연도별 백업에도 포함되어야 합니다.");
  assert.equal(yearlyWorkbook.getWorksheet("문서목록").rowCount, 5, "연도에 해당하는 프로젝트의 문서 목록만 포함해야 합니다.");
  console.log("backup-export tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
