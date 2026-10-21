const assert = require("node:assert/strict");
const gamification = require("../gamification.js");

assert.deepEqual(gamification.getLevelState(0), {
  level: 1,
  totalXp: 0,
  xpIntoLevel: 0,
  requiredXp: 100,
  progressPercent: 0,
  isMaxLevel: false,
});

assert.equal(gamification.getLevelState(99).level, 1);
assert.equal(gamification.getLevelState(100).level, 2);
assert.equal(gamification.getLevelState(100).requiredXp, 110);
assert.equal(gamification.getLevelState(209).level, 2);
assert.equal(gamification.getLevelState(210).level, 3);
assert.equal(gamification.getRequiredXp(98), 1070);

const level99Total = gamification.getTotalXpForLevel(99);
assert.equal(level99Total, 57330);
assert.equal(gamification.getLevelState(level99Total).level, 99);
assert.equal(gamification.getLevelState(level99Total).isMaxLevel, true);
assert.equal(gamification.getRankForLevel(1).title, "🌱 견습 비서");
assert.equal(gamification.getRankForLevel(29).title, "📋 업무 비서");
assert.equal(gamification.getRankForLevel(30).title, "⭐ 선임 비서");
assert.equal(gamification.getRankForLevel(50).title, "🏅 수석 비서");
assert.equal(gamification.getRankForLevel(70).title, "👑 비서실장");
assert.equal(gamification.getRankForLevel(99).title, "✨ 전설의 김비서");
assert.equal(gamification.getRankForLevel(99).cosmeticStage, 5);

const newXpEvents = gamification.getNewXpEvents(
  ["worklog-task:a"],
  [
    { event_key: "worklog-task:a" },
    { event_key: "worklog-task:b" },
    { event_key: "worklog-task:b" },
    { event_key: "" },
  ],
);
assert.deepEqual(newXpEvents.map((event) => event.event_key), ["worklog-task:b"]);

console.log("gamification tests passed");
