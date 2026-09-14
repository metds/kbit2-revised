import kbit2VerbalScaled from "../data/kbit2r_verbal_scaled.json" with { type: "json" };
import kbit2RiddlesScaled from "../data/kbit2r_riddles_scaled.json" with { type: "json" };
import { parseScoreRange } from "../functions/utils.js";

function scaledScoreCalculator({ age, rawScore, testType }) {
  if (testType === "verbal") {
    const verbal = kbit2VerbalScaled.find((item) => {
      const ageMatch = age >= item.min_age && age <= item.max_age;
      const { min, max } = parseScoreRange(item.raw_score);
      const sumMatch = rawScore >= min && rawScore <= max;
      return ageMatch && sumMatch;
    });

    if (verbal) {
      return {
        scaledScore: verbal.scaled_score,
      };
    }
  }

  if (testType === "riddles") {
    const riddles = kbit2RiddlesScaled.find((item) => {
      const ageMatch = age >= item.min_age && age <= item.max_age;
      const { min, max } = parseScoreRange(item.raw_score);
      const sumMatch = rawScore >= min && rawScore <= max;
      return ageMatch && sumMatch;
    });

    if (riddles) {
      return {
        scaledScore: riddles.scaled_score,
      };
    }
  }
}

export default scaledScoreCalculator;
