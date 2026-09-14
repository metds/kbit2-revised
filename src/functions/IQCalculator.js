import kbit2iq from "../data/kbit2iq.json";

function IQCalculator({ age, totalStandardScore }) {
  function parseScoreRange(scoreString) {
    if (scoreString.includes("-")) {
      const [min, max] = scoreString.split("-").map(Number);
      return { min, max };
    } else {
      const value = Number(scoreString);
      return { min: value, max: value };
    }
  }

  const IQ = kbit2iq.find((item) => {
    const ageMatch = age >= item.min_age && age <= item.max_age;
    const { min, max } = parseScoreRange(item.sum_of_standard_scores);
    const sumMatch = totalStandardScore >= min && totalStandardScore <= max;
    return ageMatch && sumMatch;
  });
  if (IQ) {
    return {
      standardScore: IQ.standard_score,
      standardScoreCI: IQ.confidence_interval,
    };
  }
  return null;
}

export default IQCalculator;
