import kbit2ae from "../data/kbit2r_ae.json" with { type: "json" };
import { findMatchAE } from "../functions/utils.js";

function ageEquivalentCalculator({ verbal_knowledge, riddles, matrices }) {
  const verbalKnowledge = kbit2ae.find((item) => {
    const verbalMatch = findMatchAE(verbal_knowledge, item.verbal_knowledge);
    return verbalMatch;
  });

  const verbalRiddles = kbit2ae.find((item) => {
    const verbalMatch = findMatchAE(riddles, item.riddles);
    return verbalMatch;
  });

  const nonverbalMatrices = kbit2ae.find((item) => {
    const nonverbalMatch = findMatchAE(matrices, item.matrices);
    return nonverbalMatch;
  });

  return {
    verbalKnowledgeAgeEquivalent: verbalKnowledge
      ? verbalKnowledge.age_equivalent
      : null,
    verbalRiddlesAgeEquivalent: verbalRiddles
      ? verbalRiddles.age_equivalent
      : null,
    nonverbalMatricesAgeEquivalent: nonverbalMatrices
      ? nonverbalMatrices.age_equivalent
      : null,
  };
}

export default ageEquivalentCalculator;
