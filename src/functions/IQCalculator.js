import kbit2iq from "../data/kbit2r_iq.json" with { type: "json" };
import { parseScoreRange } from "../functions/utils.js";

function IQCalculator({ totalStandardScore }) {
  const IQ = kbit2iq.find((item) => {
    const { min, max } = parseScoreRange(item.sum_of_standard_scores);
    const sumMatch = totalStandardScore >= min && totalStandardScore <= max;
    return sumMatch;
  });
  if (IQ) {
    return {
      standardScore: IQ.standard_score,
      standardScoreCI: IQ.confidence_interval,
    };
  }
}

export default IQCalculator;
