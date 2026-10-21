(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.BlueworksGamification = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  const MAX_LEVEL = 99;
  const XP_PER_TASK = 10;
  const BASE_LEVEL_XP = 100;
  const LEVEL_XP_STEP = 10;
  const RANKS = Object.freeze([
    { minLevel: 1, key: "trainee", title: "견습 비서", cosmeticStage: 0 },
    { minLevel: 10, key: "assistant", title: "업무 비서", cosmeticStage: 1 },
    { minLevel: 30, key: "senior", title: "선임 비서", cosmeticStage: 2 },
    { minLevel: 50, key: "chief", title: "수석 비서", cosmeticStage: 3 },
    { minLevel: 70, key: "director", title: "비서실장", cosmeticStage: 4 },
    { minLevel: 99, key: "legend", title: "전설의 김비서", cosmeticStage: 5 },
  ]);

  function normalizeTotalXp(value) {
    const parsed = Math.floor(Number(value) || 0);
    return Math.max(0, parsed);
  }

  function getRequiredXp(level) {
    const normalizedLevel = Math.min(MAX_LEVEL, Math.max(1, Math.floor(Number(level) || 1)));
    if (normalizedLevel >= MAX_LEVEL) return 0;
    return BASE_LEVEL_XP + ((normalizedLevel - 1) * LEVEL_XP_STEP);
  }

  function getLevelState(totalXp) {
    const normalizedTotalXp = normalizeTotalXp(totalXp);
    let level = 1;
    let xpIntoLevel = normalizedTotalXp;

    while (level < MAX_LEVEL) {
      const requiredXp = getRequiredXp(level);
      if (xpIntoLevel < requiredXp) {
        return {
          level,
          totalXp: normalizedTotalXp,
          xpIntoLevel,
          requiredXp,
          progressPercent: Math.min(100, Math.round((xpIntoLevel / requiredXp) * 100)),
          isMaxLevel: false,
        };
      }
      xpIntoLevel -= requiredXp;
      level += 1;
    }

    return {
      level: MAX_LEVEL,
      totalXp: normalizedTotalXp,
      xpIntoLevel: 0,
      requiredXp: 0,
      progressPercent: 100,
      isMaxLevel: true,
    };
  }

  function getTotalXpForLevel(targetLevel) {
    const normalizedTarget = Math.min(MAX_LEVEL, Math.max(1, Math.floor(Number(targetLevel) || 1)));
    let total = 0;
    for (let level = 1; level < normalizedTarget; level += 1) total += getRequiredXp(level);
    return total;
  }

  function getRankForLevel(level) {
    const normalizedLevel = Math.min(MAX_LEVEL, Math.max(1, Math.floor(Number(level) || 1)));
    return RANKS.reduce((current, rank) => (
      normalizedLevel >= rank.minLevel ? rank : current
    ), RANKS[0]);
  }

  function getNewXpEvents(existingEventKeys, events) {
    const knownKeys = new Set(Array.isArray(existingEventKeys) ? existingEventKeys : []);
    const accepted = [];
    (Array.isArray(events) ? events : []).forEach((event) => {
      const eventKey = String(event?.event_key || "").trim();
      if (!eventKey || knownKeys.has(eventKey)) return;
      knownKeys.add(eventKey);
      accepted.push(event);
    });
    return accepted;
  }

  return {
    MAX_LEVEL,
    XP_PER_TASK,
    BASE_LEVEL_XP,
    LEVEL_XP_STEP,
    RANKS,
    getRequiredXp,
    getLevelState,
    getTotalXpForLevel,
    getRankForLevel,
    getNewXpEvents,
  };
});
