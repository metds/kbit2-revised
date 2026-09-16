import { useEffect, useState } from "react";
import classes from "./ResultsOutput.module.css";
import scaledScoreCalculator from "../functions/scaledScoreCalculator";
import standardScoreCalculator from "../functions/standardScoreCalculator";
import IQCalculator from "../functions/IQCalculator";
import ageEquivalentCalculator from "../functions/ageEquivalentCalculator";

function ResultsOutput({ age, verbalKnowledge, verbalRiddles, nonverbalRaw }) {
  const [showResults, setShowResults] = useState(false);
  const [verbalKnowledgeScaled, setVerbalKnowledgeScaled] = useState([]);
  const [verbalRiddlesScaled, setVerbalRiddlesScaled] = useState([]);
  const [totalScaledScore, setTotalScaledScore] = useState(0);
  const [verbalStandard, setVerbalStandard] = useState([]);
  const [nonverbalStandard, setNonverbalStandard] = useState([]);
  const [totalStandardScore, setTotalStandardScore] = useState(0);
  const [IQ, setIQ] = useState([]);
  const [ageEquivalent, setAgeEquivalent] = useState([]);
  const [verbalTotalRaw, setVerbalTotalRaw] = useState("");

  useEffect(() => {
    if ((verbalKnowledge !== "") | (verbalRiddles !== "")) {
      setVerbalTotalRaw(Number(verbalKnowledge) + Number(verbalRiddles));
    } else {
      setVerbalTotalRaw("");
    }
  }, [verbalKnowledge, verbalRiddles]);

  useEffect(() => {
    if (
      (age > 0) &
      (verbalKnowledge !== "") &
      (verbalRiddles !== "") &
      (nonverbalRaw !== "")
    ) {
      setShowResults(true);

      // Verbal Knowledge Scaled Score Calculation
      const KnowledgeScaled = scaledScoreCalculator({
        age: age,
        rawScore: Number(verbalKnowledge),
        testType: "verbal",
      });

      // Verbal Riddles Scaled Score Calculation
      const RiddlesScaled = scaledScoreCalculator({
        age: age,
        rawScore: Number(verbalRiddles),
        testType: "riddles",
      });

      const totalScaled =
        KnowledgeScaled.scaledScore + RiddlesScaled.scaledScore;

      setVerbalKnowledgeScaled(KnowledgeScaled.scaledScore);
      setVerbalRiddlesScaled(RiddlesScaled.scaledScore);
      setTotalScaledScore(totalScaled);

      // Verbal Knowledge Standard Score Calculation
      const verbalStandardResult = standardScoreCalculator({
        age: age,
        score: Number(totalScaled),
        testType: "verbal",
      });

      // Nonverbal Standard Score Calculation
      const nonverbalStandardResult = standardScoreCalculator({
        age,
        score: Number(nonverbalRaw),
        testType: "nonverbal",
      });

      setVerbalStandard(verbalStandardResult);
      setNonverbalStandard(nonverbalStandardResult);

      setTotalStandardScore(
        verbalStandardResult.standardScore +
          nonverbalStandardResult.standardScore,
      );

      setAgeEquivalent(
        ageEquivalentCalculator({
          verbal_knowledge: verbalKnowledge,
          riddles: verbalRiddles,
          matrices: nonverbalRaw,
        }),
      );
    } else {
      setShowResults(false);
    }
  }, [age, verbalKnowledge, verbalRiddles, nonverbalRaw]);

  useEffect(() => {
    if (totalStandardScore > 0) {
      const IQResult = IQCalculator({ age, totalStandardScore });
      setIQ(IQResult);
    }
  }, [age, totalStandardScore]);

  return (
    <div className={classes.container}>
      <h2 className={classes.mainPanelTitle}>
        Calculated Standard and Age Equivalent Scores
      </h2>
      {showResults && (
        <div className={classes.resultsContainer}>
          <p className={classes.summaryText}>
            The KBIT-2 Results for a {age} year old with a verbal score of{" "}
            <b>{verbalTotalRaw}</b> and a nonverbal score of{" "}
            <b>{nonverbalRaw}</b>.
          </p>
          {(verbalKnowledgeScaled || verbalRiddlesScaled) && (
            <section className={classes.resultGroup}>
              <h3 className={classes.resultGroupTitle}>Scaled Scores</h3>
              <div className={classes.scoreGrid}>
                {verbalKnowledgeScaled && (
                  <div className={classes.scoreCard}>
                    <span className={classes.scoreLabel}>Knowledge</span>
                    <span className={classes.scoreValue}>
                      {verbalKnowledgeScaled}
                    </span>
                  </div>
                )}
                {verbalRiddlesScaled && (
                  <div className={classes.scoreCard}>
                    <span className={classes.scoreLabel}>Riddles</span>
                    <span className={classes.scoreValue}>
                      {verbalRiddlesScaled}
                    </span>
                  </div>
                )}

                {totalScaledScore && (
                  <div className={classes.scoreCard}>
                    <span className={classes.scoreLabel}>Total</span>
                    <span className={classes.scoreValue}>
                      {totalScaledScore}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {(verbalStandard || nonverbalStandard || IQ) && (
            <section className={classes.resultGroup}>
              <h3 className={classes.resultGroupTitle}>Standard Scores</h3>
              <div className={classes.scoreGrid}>
                {verbalStandard && (
                  <div className={classes.scoreCard}>
                    <span className={classes.scoreLabel}>Verbal</span>
                    <span className={classes.scoreValue}>
                      {verbalStandard.standardScore}
                    </span>
                    <span className={classes.scoreCI}>
                      90% CI: {verbalStandard.standardScoreCI}
                    </span>
                    <span className={classes.scoreCI}>
                      Percentile Rank: {verbalStandard.percentileRank}
                    </span>
                    <span className={classes.scoreCI}>
                      Category: {verbalStandard.descriptiveCategory}
                    </span>
                  </div>
                )}
                {nonverbalStandard && (
                  <div className={classes.scoreCard}>
                    <span className={classes.scoreLabel}>Nonverbal</span>
                    <span className={classes.scoreValue}>
                      {nonverbalStandard.standardScore}
                    </span>
                    <span className={classes.scoreCI}>
                      90% CI: {nonverbalStandard.standardScoreCI}
                    </span>
                    <span className={classes.scoreCI}>
                      Percentile Rank: {nonverbalStandard.percentileRank}
                    </span>
                    <span className={classes.scoreCI}>
                      Category: {nonverbalStandard.descriptiveCategory}
                    </span>
                  </div>
                )}
                {IQ && (
                  <div
                    className={`${classes.scoreCard} ${classes.scoreCardHighlight}`}
                  >
                    <span className={classes.scoreLabel}>IQ</span>
                    <span className={classes.scoreValue}>
                      {IQ.standardScore}
                    </span>
                    <span className={classes.scoreCI}>
                      90% CI: {IQ.standardScoreCI}
                    </span>
                    <span className={classes.scoreCI}>
                      Percentile Rank: {IQ.standardScorePercentileRank}
                    </span>
                    <span className={classes.scoreCI}>
                      Category: {IQ.descriptiveCategory}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {ageEquivalent && (
            <section className={classes.resultGroup}>
              <h3 className={classes.resultGroupTitle}>Age Equivalents</h3>
              <div className={classes.ageEquivGrid}>
                <div className={classes.ageEquivRow}>
                  <span className={classes.ageEquivLabel}>
                    Verbal <b>Knowledge</b>
                  </span>
                  <span className={classes.ageEquivValue}>
                    {ageEquivalent.verbalKnowledgeAgeEquivalent}
                  </span>
                </div>
                <div className={classes.ageEquivRow}>
                  <span className={classes.ageEquivLabel}>
                    Verbal <b>Riddles</b>
                  </span>
                  <span className={classes.ageEquivValue}>
                    {ageEquivalent.verbalRiddlesAgeEquivalent}
                  </span>
                </div>
                <div className={classes.ageEquivRow}>
                  <span className={classes.ageEquivLabel}>
                    Nonverbal <b>Matrices</b>
                  </span>
                  <span className={classes.ageEquivValue}>
                    {ageEquivalent.nonverbalMatricesAgeEquivalent}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsOutput;
