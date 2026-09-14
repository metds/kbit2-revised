import kbit2verbal from "../data/kbit2verbal.json";
import kbit2nonverbal from "../data/kbit2nonverbal.json";

function standardScoreCalculator({ age, rawScore, testType }) {
  if (testType === "verbal") {
    const verbstd = kbit2verbal.find(
      (item) =>
        age >= item.min_age &&
        age <= item.max_age &&
        rawScore === item.raw_score
    );
    if (verbstd) {
      return {
        standardScore: verbstd.standard_score,
        standardScoreCI: verbstd.confidence_interval,
      };
    }
  }
  if (testType === "nonverbal") {
    const nonvbstd = kbit2nonverbal.find(
      (item) =>
        age >= item.min_age &&
        age <= item.max_age &&
        rawScore === item.raw_score
    );
    if (nonvbstd) {
      return {
        standardScore: nonvbstd.standard_score,
        standardScoreCI: nonvbstd.confidence_interval,
      };
    }
  }
  return null;
}

export default standardScoreCalculator;
