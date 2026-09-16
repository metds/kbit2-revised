import kbit2verbal from "../data/kbit2r_verbal_standard.json" with { type: "json" };
import kbit2nonverbal from "../data/kbit2r_nonverbal_standard.json" with { type: "json" };
import { parseScoreRange, findCategory } from "../functions/utils.js";

function standardScoreCalculator({ age, score, testType }) {
  if (testType === "verbal") {
    const verbstd = kbit2verbal.find(
      (item) =>
        age >= item.min_age &&
        age <= item.max_age &&
        score === item.sum_of_scaled_score,
    );

    if (verbstd) {
      return {
        standardScore: verbstd.standard_score,
        standardScoreCI: verbstd.confidence_interval,
        percentileRank: verbstd.percentile_rank,
        descriptiveCategory: findCategory(verbstd.standard_score),
      };
    }
  }
  if (testType === "nonverbal") {
    const nonvbstd = kbit2nonverbal.find((item) => {
      const ageMatch = age >= item.min_age && age <= item.max_age;
      const { min, max } = parseScoreRange(item.raw_score);
      const sumMatch = score >= min && score <= max;
      return ageMatch && sumMatch;
    });

    if (nonvbstd) {
      return {
        standardScore: nonvbstd.standard_score,
        standardScoreCI: nonvbstd.confidence_interval,
        percentileRank: nonvbstd.percentile_rank,
        descriptiveCategory: findCategory(nonvbstd.standard_score),
      };
    }
  }
}

export default standardScoreCalculator;
