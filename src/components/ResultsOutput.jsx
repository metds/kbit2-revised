import { useEffect, useState } from "react";
import classes from "./ResultsOutput.module.css";
import standardScoreCalculator from "../functions/standardScoreCalculator";
import IQCalculator from "../functions/IQCalculator";
import ageEquivalentCalculator from "../functions/ageEquivalentCalculator";

function ResultsOutput({ age, verbalTotal, nonverbalRaw }) {
  const [showResults, setShowResults] = useState(false);
  const [verbstd, setVerbstd] = useState([]);
  const [nonvbstd, setNonvbstd] = useState([]);
  const [totalStandardScore, setTotalStandardScore] = useState(0);
  const [IQ, setIQ] = useState([]);
  const [ageEquivalent, setAgeEquivalent] = useState([]);

  useEffect(() => {
    if ((age > 0) & (verbalTotal !== "") & (nonverbalRaw !== "")) {
      setShowResults(true);
      // Verbal standard score calculation
      const verbstd = standardScoreCalculator({
        age,
        rawScore: Number(verbalTotal),
        testType: "verbal",
      });
      setVerbstd(verbstd);
      // Nonverbal standard score calculation
      const nonvbstd = standardScoreCalculator({
        age,
        rawScore: Number(nonverbalRaw),
        testType: "nonverbal",
      });
      setNonvbstd(nonvbstd);
      setTotalStandardScore(verbstd.standardScore + nonvbstd.standardScore);
      setAgeEquivalent(ageEquivalentCalculator({ verbalTotal, nonverbalRaw }));
    } else {
      setShowResults(false);
    }
  }, [
    age,
    verbalTotal,
    nonverbalRaw,
    setShowResults,
    setTotalStandardScore,
    setAgeEquivalent,
  ]);

  useEffect(() => {
    if (verbstd && nonvbstd && totalStandardScore > 0) {
      const IQ = IQCalculator({ age, totalStandardScore });
      setIQ(IQ);
    }
  }, [age, verbstd, nonvbstd, totalStandardScore]);

  return (
    <div className={classes.container}>
      <h2 className={classes.mainPanelTitle}>
        Calculated Standard and Age Equivalent Scores
      </h2>
      {showResults && (
        <div className={classes.textContainer}>
          <p>
            The KBIT-2 Revised Results for a {age} year old with a verbal score
            of {verbalTotal} and a nonverbal score of {nonverbalRaw}
          </p>
          {verbstd && (
            <p>
              Verbal Standard Score: {verbstd.standardScore} (90% CI:{" "}
              {verbstd.standardScoreCI})
            </p>
          )}
          {nonvbstd && (
            <p>
              Nonverbal Standard Score: {nonvbstd.standardScore} (90% CI:{" "}
              {nonvbstd.standardScoreCI})
            </p>
          )}
          {IQ && (
            <p>
              Intelligent Quotient: {IQ.standardScore} (90% CI:{" "}
              {IQ.standardScoreCI})
            </p>
          )}
          {ageEquivalent && (
            <>
              <p>Verbal Age Equivalent: {ageEquivalent.verbalAgeEquivalent}</p>
              <p>
                Nonverbal Age Equivalent: {ageEquivalent.nonverbalAgeEquivalent}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsOutput;
