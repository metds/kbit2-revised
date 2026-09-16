import kbit2iq from "../data/kbit2r_iq.json" with { type: "json" };
import { parseScoreRange, findCategory } from "../functions/utils.js";

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
      standardScorePercentileRank: IQ.percentile_rank,
      descriptiveCategory: findCategory(IQ.standard_score),
    };
  }
}

export default IQCalculator;
