(function initializeBlueworksExcelBackup(global) {
  const HEADER_FILL = "3D7CFF";
  const HEADER_TEXT = "FFFFFF";
  const TITLE_FILL = "111827";
  const SOFT_FILL = "F6F8FC";
  const ALT_FILL = "F9FBFF";
  const SENSITIVE_FILL = "FFF1F2";
  const INTERNAL_FILL = "F3F4F6";
  const BORDER_COLOR = "D9E1EC";
  const MAX_CELL_TEXT = 32700;

  const PROJECT_STATUS_LABELS = {
    ready: "작업 준비",
    inProgress: "작업 중",
    done: "작업 완료",
  };
  const PROGRESS_STAGE_LABELS = {
    firstDraft: "1차 시안 작업 중",
    firstDraftDone: "1차 시안 완료",
    firstRevisionDone: "1차 수정 완료",
    secondRevisionDone: "2차 수정 완료",
    thirdRevisionDone: "3차 수정 완료",
    mobileDone: "모바일 · SEO 작업 완료",
  };
  const PAYMENT_METHOD_LABELS = {
    cash: "현금",
    card: "카드",
    kmong: "크몽",
  };
  const TAX_INVOICE_LABELS = {
    issued: "발행",
    notIssued: "미발행",
  };
  const REVENUE_CATEGORY_LABELS = {
    imweb_points: "아임웹 포인트",
    ebook: "전자책",
    other: "기타",
  };

  function cleanString(value) {
    if (value === null || value === undefined) return "";
    const text = typeof value === "string" ? value : JSON.stringify(value);
    return String(text).slice(0, MAX_CELL_TEXT);
  }

  function htmlToText(value) {
    const html = String(value || "");
    if (!html) return "";
    try {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      parsed.querySelectorAll("br").forEach((node) => node.replaceWith("\n"));
      parsed.querySelectorAll("p,div,li,h1,h2,h3,h4,h5,h6,blockquote").forEach((node) => {
        node.appendChild(parsed.createTextNode("\n"));
      });
      return cleanString((parsed.body.textContent || "").replace(/\n{3,}/g, "\n\n").trim());
    } catch (error) {
      return cleanString(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    }
  }

  function yesNo(value) {
    return value ? "예" : "아니오";
  }

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return cleanString(value);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  }

  function getYear(value) {
    const match = String(value || "").match(/^(\d{4})/);
    return match ? Number(match[1]) : null;
  }

  function isInScope(value, scope, year) {
    if (scope !== "year") return true;
    return getYear(value) === Number(year);
  }

  function safeNumber(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number : 0;
  }

  function excelDate(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return "";
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  function jsonText(value) {
    if (value === null || value === undefined || value === "") return "";
    try {
      return cleanString(JSON.stringify(value, null, 2));
    } catch (error) {
      return cleanString(value);
    }
  }

  function styleSheet(worksheet, columns, dataStartRow = 5) {
    const lastColumn = Math.max(columns.length, 1);
    worksheet.mergeCells(1, 1, 1, lastColumn);
    worksheet.mergeCells(2, 1, 2, lastColumn);
    worksheet.getRow(1).height = 30;
    worksheet.getRow(2).height = 24;
    worksheet.getCell(1, 1).font = { name: "Pretendard", size: 16, bold: true, color: { argb: HEADER_TEXT } };
    worksheet.getCell(1, 1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: TITLE_FILL } };
    worksheet.getCell(1, 1).alignment = { vertical: "middle", horizontal: "left" };
    worksheet.getCell(2, 1).font = { name: "Pretendard", size: 10, color: { argb: "526176" } };
    worksheet.getCell(2, 1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SOFT_FILL } };
    worksheet.getCell(2, 1).alignment = { vertical: "middle", horizontal: "left" };

    const headerRow = worksheet.getRow(4);
    headerRow.height = 25;
    columns.forEach((column, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = column.header;
      cell.font = { name: "Pretendard", size: 10, bold: true, color: { argb: HEADER_TEXT } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: HEADER_FILL } };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: BORDER_COLOR } },
        left: { style: "thin", color: { argb: BORDER_COLOR } },
        bottom: { style: "thin", color: { argb: BORDER_COLOR } },
        right: { style: "thin", color: { argb: BORDER_COLOR } },
      };
      worksheet.getColumn(index + 1).width = column.width || 16;
    });

    worksheet.views = [{ state: "frozen", ySplit: 4 }];
    worksheet.autoFilter = {
      from: { row: 4, column: 1 },
      to: { row: Math.max(4, worksheet.rowCount), column: lastColumn },
    };
    worksheet.pageSetup = {
      orientation: columns.length > 7 ? "landscape" : "portrait",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: { left: 0.25, right: 0.25, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 },
    };

    for (let rowIndex = dataStartRow; rowIndex <= worksheet.rowCount; rowIndex += 1) {
      const row = worksheet.getRow(rowIndex);
      const estimatedLineCount = columns.reduce((maximum, definition, index) => {
        const value = String(row.getCell(index + 1).value || "");
        const explicitLines = value.split("\n").length;
        const wrappedLines = Math.ceil(value.length / Math.max(10, Number(definition.width || 16) * 1.7));
        return Math.max(maximum, explicitLines, wrappedLines);
      }, 1);
      row.height = Math.min(120, Math.max(20, estimatedLineCount * 15));
      row.eachCell({ includeEmpty: true }, (cell, columnIndex) => {
        const definition = columns[columnIndex - 1] || {};
        cell.font = { name: "Pretendard", size: 10, color: { argb: "172033" } };
        cell.alignment = {
          vertical: "top",
          horizontal: definition.kind === "money" || definition.kind === "number" ? "right" : "left",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin", color: { argb: BORDER_COLOR } },
          left: { style: "thin", color: { argb: BORDER_COLOR } },
          bottom: { style: "thin", color: { argb: BORDER_COLOR } },
          right: { style: "thin", color: { argb: BORDER_COLOR } },
        };
        const fillColor = definition.sensitive
          ? SENSITIVE_FILL
          : definition.internal
            ? INTERNAL_FILL
            : rowIndex % 2 === 0
              ? ALT_FILL
              : "FFFFFF";
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: fillColor } };
        if (definition.kind === "money") cell.numFmt = '#,##0"원"';
        if (definition.kind === "number") cell.numFmt = "#,##0";
        if (definition.kind === "date") {
          cell.numFmt = "yyyy-mm-dd";
          cell.alignment.horizontal = "center";
        }
      });
    }
  }

  function addDataSheet(workbook, definition) {
    const worksheet = workbook.addWorksheet(definition.name, {
      properties: { defaultRowHeight: 20 },
    });
    worksheet.addRow([definition.title || definition.name]);
    worksheet.addRow([definition.subtitle || ""]);
    worksheet.addRow([]);
    worksheet.addRow(definition.columns.map((column) => column.header));
    if (definition.rows.length) {
      definition.rows.forEach((item) => {
        worksheet.addRow(definition.columns.map((column) => {
          const value = item[column.key];
          if (column.kind === "money" || column.kind === "number") return safeNumber(value);
          if (column.kind === "date") return excelDate(value);
          return cleanString(value);
        }));
      });
    } else {
      worksheet.addRow(["해당 범위의 데이터가 없습니다."]);
    }
    styleSheet(worksheet, definition.columns);
    return worksheet;
  }

  function buildDefinitions(datasets, options) {
    const scope = options.scope === "year" ? "year" : "all";
    const year = Number(options.year || new Date().getFullYear());
    const projects = (datasets.projects || [])
      .filter((row) => isInScope(row.start_date, scope, year))
      .slice()
      .sort((a, b) => {
        const dateOrder = String(b.start_date || "").localeCompare(String(a.start_date || ""));
        if (dateOrder !== 0) return dateOrder;
        return String(b.created_at || "").localeCompare(String(a.created_at || ""));
      });
    const projectIds = new Set(projects.map((row) => row.id));
    const projectNames = new Map((datasets.projects || []).map((row) => [row.id, row.title || ""]));
    const schedules = (datasets.schedules || []).filter((row) => isInScope(row.date, scope, year));
    const worklogs = (datasets.worklogs || []).filter((row) => isInScope(row.worklog_date, scope, year));
    const worklogIds = new Set(worklogs.map((row) => row.id));
    const tasks = worklogs.flatMap((row) => (row.worklog_tasks || []).filter((task) => worklogIds.has(task.worklog_id)));
    const goals = (datasets.yearGoals || []).filter((row) => scope !== "year" || Number(row.year) === year);
    const revenues = (datasets.otherRevenues || []).filter((row) => isInScope(row.revenue_date, scope, year));
    const diaries = (datasets.archiveDiaries || []).filter((row) => isInScope(row.entry_date, scope, year));
    const quoteHistory = (datasets.quoteHistory || []).filter((row) => isInScope(row.quote_date || row.created_at, scope, year));
    const documents = (datasets.projectDocuments || []).filter((row) => scope !== "year" || projectIds.has(row.project_id));
    const categoryNames = new Map((datasets.archiveCodeCategories || []).map((row) => [row.id, row.name || ""]));

    const scopeLabel = scope === "year" ? `${year}년` : "전체 기간";
    const generatedAt = formatDateTime(options.generatedAt || new Date().toISOString());
    const commonSubtitle = `${scopeLabel} · 생성 ${generatedAt}`;

    const definitions = [];
    definitions.push({
      name: "안내",
      title: "BLUEWORKS 데이터 백업",
      subtitle: commonSubtitle,
      columns: [
        { header: "항목", key: "item", width: 25 },
        { header: "내용", key: "value", width: 78 },
      ],
      rows: [
        { item: "백업 범위", value: scopeLabel },
        { item: "생성 일시", value: generatedAt },
        { item: "보안 안내", value: "이 파일에는 고객 연락처, 매출 및 아임웹 비밀번호가 포함되어 있습니다. 외부에 공유하지 마세요." },
        { item: "제외 항목", value: "계약서·사업자등록증·견적 PDF·파비콘·섬네일 등 파일 원본" },
        { item: "프로젝트", value: `${projects.length}건` },
        { item: "부수입", value: `${revenues.length}건` },
        { item: "일정", value: `${schedules.length}건` },
        { item: "업무일지", value: `${worklogs.length}건` },
        { item: "업무항목", value: `${tasks.length}건` },
        { item: "연간 목표", value: `${goals.length}건` },
        { item: "메모·프롬프트", value: `${(datasets.archiveNotes || []).length}건` },
        { item: "코드", value: `${(datasets.archiveCodes || []).length}건` },
        { item: "다이어리", value: `${diaries.length}건` },
      ],
    });

    definitions.push({
      name: "프로젝트",
      title: "프로젝트",
      subtitle: commonSubtitle,
      columns: [
        { header: "프로젝트명", key: "title", width: 26 },
        { header: "고객사", key: "client", width: 20 },
        { header: "담당자", key: "managerName", width: 14 },
        { header: "연락처", key: "managerPhone", width: 17, sensitive: true },
        { header: "작업 유형", key: "projectType", width: 16 },
        { header: "웹사이트 URL", key: "websiteUrl", width: 30 },
        { header: "상태", key: "status", width: 13 },
        { header: "세부 단계", key: "progressStage", width: 20 },
        { header: "보류 여부", key: "holdStatus", width: 12 },
        { header: "보류 사유", key: "holdReason", width: 30 },
        { header: "보류 시작일", key: "holdStartedAt", width: 13, kind: "date" },
        { header: "다시 확인할 날짜", key: "holdReviewDate", width: 16, kind: "date" },
        { header: "계약일", key: "startDate", width: 13, kind: "date" },
        { header: "마감일", key: "dueDate", width: 13, kind: "date" },
        { header: "패키지", key: "packageType", width: 17 },
        { header: "사이트 유형", key: "siteType", width: 17 },
        { header: "언어 수", key: "languageCount", width: 10, kind: "number" },
        { header: "언어", key: "languages", width: 22 },
        { header: "계약금액", key: "contractAmount", width: 16, kind: "money" },
        { header: "결제 방식", key: "paymentMethod", width: 12 },
        { header: "크몽 수익", key: "kmongRevenue", width: 16, kind: "money" },
        { header: "페이백 상태", key: "paybackStatus", width: 13 },
        { header: "페이백 금액", key: "paybackAmount", width: 16, kind: "money" },
        { header: "페이백 메모", key: "paybackNote", width: 28 },
        { header: "세금계산서", key: "taxInvoice", width: 12 },
        { header: "아임웹 아이디", key: "imwebId", width: 20, sensitive: true },
        { header: "아임웹 비밀번호", key: "imwebPassword", width: 22, sensitive: true },
        { header: "메모", key: "notes", width: 42 },
        { header: "타임라인", key: "timeline", width: 42 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "프로젝트 ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
        { header: "정렬값", key: "progressOrder", width: 10, kind: "number", internal: true },
        { header: "상태 원본값", key: "statusRaw", width: 15, internal: true },
        { header: "단계 원본값", key: "progressStageRaw", width: 20, internal: true },
      ],
      rows: projects.map((row) => ({
        title: row.title,
        client: row.client,
        managerName: row.manager_name,
        managerPhone: row.manager_phone,
        projectType: row.project_type,
        websiteUrl: row.website_url,
        status: PROJECT_STATUS_LABELS[row.status] || row.status,
        progressStage: PROGRESS_STAGE_LABELS[row.progress_stage] || row.progress_stage,
        holdStatus: row.is_on_hold ? "보류" : "정상 진행",
        holdReason: row.hold_reason,
        holdStartedAt: row.hold_started_at,
        holdReviewDate: row.hold_review_date,
        startDate: row.start_date,
        dueDate: row.due_date,
        packageType: row.package_type,
        siteType: row.site_type,
        languageCount: row.language_count,
        languages: Array.isArray(row.languages) ? row.languages.join(", ") : jsonText(row.languages),
        contractAmount: row.contract_amount,
        paymentMethod: PAYMENT_METHOD_LABELS[row.payment_method] || row.payment_method,
        kmongRevenue: row.kmong_fee,
        paybackStatus: row.payback_status,
        paybackAmount: row.payback_amount,
        paybackNote: row.payback_note,
        taxInvoice: TAX_INVOICE_LABELS[row.tax_invoice] || row.tax_invoice,
        imwebId: row.imweb_id,
        imwebPassword: row.imweb_password,
        notes: htmlToText(row.notes),
        timeline: htmlToText(row.timeline),
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        createdBy: row.created_by,
        progressOrder: row.progress_order,
        statusRaw: row.status,
        progressStageRaw: row.progress_stage,
      })),
    });

    definitions.push({
      name: "부수입",
      title: "부수입",
      subtitle: commonSubtitle,
      columns: [
        { header: "발생일", key: "date", width: 13, kind: "date" },
        { header: "구분", key: "category", width: 17 },
        { header: "내용", key: "title", width: 30 },
        { header: "금액", key: "amount", width: 18, kind: "money" },
        { header: "메모", key: "notes", width: 42 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
        { header: "구분 원본값", key: "categoryRaw", width: 18, internal: true },
      ],
      rows: revenues.map((row) => ({
        date: row.revenue_date,
        category: REVENUE_CATEGORY_LABELS[row.category] || row.category,
        title: row.title,
        amount: row.amount,
        notes: row.notes,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        createdBy: row.created_by,
        categoryRaw: row.category,
      })),
    });

    definitions.push({
      name: "일정",
      title: "일정",
      subtitle: commonSubtitle,
      columns: [
        { header: "날짜", key: "date", width: 13, kind: "date" },
        { header: "일정명", key: "title", width: 28 },
        { header: "연결 프로젝트", key: "projectTitle", width: 26 },
        { header: "메모", key: "notes", width: 48 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "일정 ID", key: "id", width: 38, internal: true },
        { header: "프로젝트 ID", key: "projectId", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: schedules.map((row) => ({
        date: row.date,
        title: row.title,
        projectTitle: projectNames.get(row.project_id) || "",
        notes: row.notes,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        projectId: row.project_id,
        createdBy: row.created_by,
      })),
    });

    definitions.push({
      name: "업무일지",
      title: "업무일지",
      subtitle: commonSubtitle,
      columns: [
        { header: "날짜", key: "date", width: 13, kind: "date" },
        { header: "특이사항", key: "notes", width: 72 },
        { header: "업무 수", key: "taskCount", width: 11, kind: "number" },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "업무일지 ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: worklogs.map((row) => ({
        date: row.worklog_date,
        notes: row.notes,
        taskCount: (row.worklog_tasks || []).length,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        createdBy: row.created_by,
      })),
    });

    definitions.push({
      name: "업무항목",
      title: "업무일지 항목",
      subtitle: commonSubtitle,
      columns: [
        { header: "업무일지 날짜", key: "date", width: 15, kind: "date" },
        { header: "구분", key: "status", width: 14 },
        { header: "업무 내용", key: "text", width: 58 },
        { header: "처리완료", key: "done", width: 12 },
        { header: "자동 등록", key: "auto", width: 12 },
        { header: "이월 출처 날짜", key: "carriedFromDate", width: 16, kind: "date" },
        { header: "정렬 순서", key: "sortOrder", width: 12, kind: "number" },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "업무 ID", key: "id", width: 38, internal: true },
        { header: "업무일지 ID", key: "worklogId", width: 38, internal: true },
        { header: "일정 ID", key: "scheduleId", width: 38, internal: true },
        { header: "출처 업무 ID", key: "sourceTaskId", width: 38, internal: true },
        { header: "구분 원본값", key: "statusRaw", width: 15, internal: true },
      ],
      rows: tasks.map((task) => {
        const parent = worklogs.find((row) => row.id === task.worklog_id);
        return {
          date: parent?.worklog_date || "",
          status: task.task_status === "waiting" ? "업무 대기" : "오늘의 업무",
          text: task.task_text,
          done: yesNo(task.done),
          auto: yesNo(task.auto),
          carriedFromDate: task.carried_from_date,
          sortOrder: task.sort_order,
          createdAt: formatDateTime(task.created_at),
          id: task.id,
          worklogId: task.worklog_id,
          scheduleId: task.schedule_id,
          sourceTaskId: task.source_task_id,
          statusRaw: task.task_status,
        };
      }),
    });

    definitions.push({
      name: "연간목표",
      title: "연간 목표",
      subtitle: commonSubtitle,
      columns: [
        { header: "연도", key: "year", width: 10, kind: "number" },
        { header: "반기", key: "half", width: 11 },
        { header: "구분", key: "kind", width: 14 },
        { header: "내용", key: "text", width: 62 },
        { header: "달성", key: "done", width: 10 },
        { header: "달성일", key: "completedAt", width: 20 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
        { header: "반기 원본값", key: "halfRaw", width: 13, internal: true },
        { header: "구분 원본값", key: "kindRaw", width: 13, internal: true },
      ],
      rows: goals.map((row) => ({
        year: row.year,
        half: row.half === "second" ? "하반기" : "상반기",
        kind: row.kind === "planned" ? "작성 칼럼" : "목표",
        text: row.text,
        done: yesNo(row.done),
        completedAt: formatDateTime(row.completed_at),
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        createdBy: row.created_by,
        halfRaw: row.half,
        kindRaw: row.kind,
      })),
    });

    definitions.push({
      name: "메모·프롬프트",
      title: "메모 · 프롬프트",
      subtitle: `${commonSubtitle} · 기준 자료는 전체 포함`,
      columns: [
        { header: "구분", key: "kind", width: 13 },
        { header: "제목", key: "title", width: 28 },
        { header: "내용", key: "contentText", width: 62 },
        { header: "색상", key: "color", width: 12 },
        { header: "정렬 순서", key: "sortOrder", width: 12, kind: "number" },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "원본 HTML", key: "contentRaw", width: 62, internal: true },
        { header: "ID", key: "id", width: 38, internal: true },
        { header: "구분 원본값", key: "kindRaw", width: 14, internal: true },
      ],
      rows: (datasets.archiveNotes || []).map((row) => ({
        kind: row.kind === "prompt" ? "프롬프트" : "메모",
        title: row.title,
        contentText: htmlToText(row.content),
        color: row.color,
        sortOrder: row.sort_order,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        contentRaw: row.content,
        id: row.id,
        kindRaw: row.kind,
      })),
    });

    definitions.push({
      name: "코드카테고리",
      title: "코드 카테고리",
      subtitle: `${commonSubtitle} · 기준 자료는 전체 포함`,
      columns: [
        { header: "카테고리명", key: "name", width: 28 },
        { header: "색상", key: "color", width: 15 },
        { header: "정렬 순서", key: "sortOrder", width: 12, kind: "number" },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "카테고리 ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: (datasets.archiveCodeCategories || []).map((row) => ({
        name: row.name,
        color: row.color,
        sortOrder: row.sort_order,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        createdBy: row.created_by,
      })),
    });

    definitions.push({
      name: "코드",
      title: "코드 아카이브",
      subtitle: `${commonSubtitle} · 기준 자료는 전체 포함`,
      columns: [
        { header: "카테고리", key: "category", width: 18 },
        { header: "제목", key: "title", width: 28 },
        { header: "설명", key: "description", width: 42 },
        { header: "코드", key: "code", width: 78 },
        { header: "정렬 순서", key: "sortOrder", width: 12, kind: "number" },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "ID", key: "id", width: 38, internal: true },
        { header: "카테고리 ID", key: "categoryId", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: (datasets.archiveCodes || []).map((row) => ({
        category: categoryNames.get(row.category_id) || "",
        title: row.title,
        description: row.description,
        code: row.code,
        sortOrder: row.sort_order,
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
        categoryId: row.category_id,
        createdBy: row.created_by,
      })),
    });

    definitions.push({
      name: "다이어리",
      title: "다이어리",
      subtitle: commonSubtitle,
      columns: [
        { header: "날짜", key: "date", width: 13, kind: "date" },
        { header: "제목", key: "title", width: 30 },
        { header: "본문", key: "contentText", width: 72 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "원본 HTML", key: "contentRaw", width: 72, internal: true },
        { header: "ID", key: "id", width: 38, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: diaries.map((row) => ({
        date: row.entry_date,
        title: row.title,
        contentText: htmlToText(row.content),
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        contentRaw: row.content,
        id: row.id,
        createdBy: row.created_by,
      })),
    });

    const quoteSettings = datasets.quoteSettings || {};
    definitions.push({
      name: "견적설정",
      title: "견적 · 계약서 설정",
      subtitle: `${commonSubtitle} · 현재 설정 전체 포함`,
      columns: [
        { header: "약관동의서 내용", key: "agreementText", width: 78 },
        { header: "일반 결제 문구", key: "normalLines", width: 48 },
        { header: "크몽 결제 문구", key: "kmongLines", width: 48 },
        { header: "견적 항목 프리셋", key: "rowPreset", width: 58 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "약관 원본 HTML", key: "agreementRaw", width: 78, internal: true },
        { header: "설정 ID", key: "id", width: 18, internal: true },
      ],
      rows: quoteSettings && Object.keys(quoteSettings).length ? [{
        agreementText: htmlToText(quoteSettings.agreement_html),
        normalLines: jsonText(quoteSettings.payment_lines_normal),
        kmongLines: jsonText(quoteSettings.payment_lines_kmong),
        rowPreset: jsonText(quoteSettings.row_preset),
        updatedAt: formatDateTime(quoteSettings.updated_at),
        agreementRaw: quoteSettings.agreement_html,
        id: quoteSettings.id,
      }] : [],
    });

    definitions.push({
      name: "멤버",
      title: "멤버",
      subtitle: `${commonSubtitle} · 로그인 비밀번호 및 인증 토큰 제외`,
      columns: [
        { header: "이름", key: "name", width: 16 },
        { header: "이메일", key: "email", width: 30, sensitive: true },
        { header: "연락처", key: "phone", width: 18, sensitive: true },
        { header: "직책", key: "role", width: 18 },
        { header: "대표 계정", key: "owner", width: 12 },
        { header: "멤버 관리 권한", key: "memberPermission", width: 16 },
        { header: "승인", key: "approved", width: 10 },
        { header: "거절", key: "rejected", width: 10 },
        { header: "메모", key: "notes", width: 38 },
        { header: "마지막 로그인", key: "lastLoginAt", width: 20 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "사용자 ID", key: "id", width: 38, internal: true },
      ],
      rows: (datasets.profiles || []).map((row) => ({
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role_label,
        owner: yesNo(row.is_owner),
        memberPermission: yesNo(row.can_manage_members),
        approved: yesNo(row.approved),
        rejected: yesNo(row.rejected),
        notes: row.notes,
        lastLoginAt: formatDateTime(row.last_login_at),
        createdAt: formatDateTime(row.created_at),
        updatedAt: formatDateTime(row.updated_at),
        id: row.id,
      })),
    });

    const siteSettings = Array.isArray(datasets.siteSettings) ? datasets.siteSettings[0] : datasets.siteSettings;
    definitions.push({
      name: "환경설정",
      title: "환경설정",
      subtitle: `${commonSubtitle} · 이미지 파일 원본 제외`,
      columns: [
        { header: "사이트 타이틀", key: "title", width: 32 },
        { header: "디스크립션", key: "description", width: 58 },
        { header: "메타태그", key: "metaTags", width: 62 },
        { header: "크롤링 차단", key: "blockCrawling", width: 14 },
        { header: "파비콘 경로", key: "faviconPath", width: 46, internal: true },
        { header: "섬네일 경로", key: "thumbnailPath", width: 46, internal: true },
        { header: "수정일", key: "updatedAt", width: 20 },
        { header: "설정 ID", key: "id", width: 38, internal: true },
      ],
      rows: siteSettings ? [{
        title: siteSettings.title,
        description: siteSettings.description,
        metaTags: siteSettings.meta_tags,
        blockCrawling: yesNo(siteSettings.block_crawling),
        faviconPath: siteSettings.favicon_path,
        thumbnailPath: siteSettings.thumbnail_path,
        updatedAt: formatDateTime(siteSettings.updated_at),
        id: siteSettings.id,
      }] : [],
    });

    definitions.push({
      name: "문서목록",
      title: "프로젝트 문서 목록",
      subtitle: `${commonSubtitle} · 파일 원본은 백업에 포함하지 않음`,
      columns: [
        { header: "프로젝트", key: "projectTitle", width: 28 },
        { header: "문서 구분", key: "type", width: 16 },
        { header: "파일명", key: "fileName", width: 42 },
        { header: "파일 형식", key: "mimeType", width: 24 },
        { header: "파일 크기", key: "size", width: 14, kind: "number" },
        { header: "업로드일", key: "createdAt", width: 20 },
        { header: "문서 ID", key: "id", width: 38, internal: true },
        { header: "프로젝트 ID", key: "projectId", width: 38, internal: true },
        { header: "스토리지 경로", key: "storagePath", width: 52, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: documents.map((row) => ({
        projectTitle: projectNames.get(row.project_id) || "",
        type: row.document_type === "business" ? "사업자등록증" : "계약서",
        fileName: row.file_name,
        mimeType: row.mime_type,
        size: row.size_bytes,
        createdAt: formatDateTime(row.created_at),
        id: row.id,
        projectId: row.project_id,
        storagePath: row.storage_path,
        createdBy: row.created_by,
      })),
    });

    definitions.push({
      name: "견적기록",
      title: "지난 견적 · 계약서 기록",
      subtitle: `${commonSubtitle} · PDF 파일 원본은 백업에 포함하지 않음`,
      columns: [
        { header: "작성일", key: "date", width: 13, kind: "date" },
        { header: "문서 구분", key: "type", width: 16 },
        { header: "제목", key: "title", width: 30 },
        { header: "고객사", key: "company", width: 22 },
        { header: "담당자", key: "name", width: 16 },
        { header: "연락처", key: "phone", width: 18, sensitive: true },
        { header: "총액", key: "total", width: 18, kind: "money" },
        { header: "파일명", key: "filename", width: 42 },
        { header: "생성일", key: "createdAt", width: 20 },
        { header: "기록 ID", key: "id", width: 38, internal: true },
        { header: "스토리지 경로", key: "storagePath", width: 52, internal: true },
        { header: "작성자 ID", key: "createdBy", width: 38, internal: true },
      ],
      rows: quoteHistory.map((row) => ({
        date: row.quote_date,
        type: row.doc_type_label || row.doc_type,
        title: row.title,
        company: row.client_company,
        name: row.client_name,
        phone: row.client_phone,
        total: row.total,
        filename: row.filename,
        createdAt: formatDateTime(row.created_at),
        id: row.id,
        storagePath: row.storage_path,
        createdBy: row.created_by,
      })),
    });

    return definitions;
  }

  async function download(options = {}) {
    if (!global.ExcelJS) {
      throw new Error("엑셀 생성 모듈을 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해주세요.");
    }
    const workbook = new global.ExcelJS.Workbook();
    workbook.creator = "BLUEWORKS";
    workbook.lastModifiedBy = "BLUEWORKS";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.subject = "BLUEWORKS 데이터 백업";
    workbook.description = "BLUEWORKS 데이터 복구 및 확인용 엑셀 백업";
    workbook.calcProperties.fullCalcOnLoad = true;

    const definitions = buildDefinitions(options.datasets || {}, options);
    definitions.forEach((definition) => addDataSheet(workbook, definition));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const today = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const rangeLabel = options.scope === "year" ? `${Number(options.year)}년` : "전체백업";
    const filename = `블루웍스_${rangeLabel}_${today}.xlsx`;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    return { filename, size: blob.size };
  }

  global.BlueworksExcelBackup = { download };
})(window);
