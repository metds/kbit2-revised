import categories from "../data/categories.json" with { type: "json" };

export function parseScoreRange(scoreString) {
  if (scoreString == null) {
    return null;
  }
  if (scoreString.includes("-")) {
    const [min, max] = scoreString.split("-").map(Number);
    return { min, max };
  } else {
    const value = Number(scoreString);
    return { min: value, max: value };
  }
}

export function findMatchAE(searchScore, scoreString) {
  const range = parseScoreRange(scoreString);

  if (!range) {
    return false;
  }

  const { min, max } = range;

  return searchScore >= min && searchScore <= max;
}

export function findCategory(score) {
  const categroy = categories.find(
    (item) => score >= item.min_score && score <= item.max_score,
  );
  return categroy.label;
}
