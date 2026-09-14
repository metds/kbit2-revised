import kbit2ae from "../data/kbit2ae.json";

function ageEquivalentCalculator({ verbalTotal, nonverbalRaw }) {
  function parseScoreRange(scoreString) {
    if (scoreString.includes("-")) {
      const [min, max] = scoreString.split("-").map(Number);
      return { min, max };
    } else {
      const value = Number(scoreString);
      return { min: value, max: value };
    }
  }

  function findMatchAE(searchScore, scoreString) {
    const { min, max } = parseScoreRange(scoreString);
    const matches = searchScore >= min && searchScore <= max;
    return matches;
  }

  const verbalAE = kbit2ae.find((item) => {
    const verbalMatch = findMatchAE(verbalTotal, item.verbal_raw_score);
    return verbalMatch;
  });

  const nonverbalAE = kbit2ae.find((item) => {
    const nonverbalMatch = findMatchAE(nonverbalRaw, item.nonverbal_raw_score);
    return nonverbalMatch;
  });

  return {
    verbalAgeEquivalent: verbalAE ? verbalAE.age_equivalent : null,
    nonverbalAgeEquivalent: nonverbalAE ? nonverbalAE.age_equivalent : null,
  };
}

export default ageEquivalentCalculator;
