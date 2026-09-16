import classes from "./InputForm.module.css";

function InputForm({
  age,
  setAge,
  verbalKnowledge,
  setVerbalKnowledge,
  verbalRiddles,
  setVerbalRiddles,
  nonverbalRaw,
  setNonverbalRaw,
}) {
  const createRangeValidator = (setter, min, max, defaultValue = "") => {
    return (e) => {
      const value = Number(e.target.value);
      const currentMax = typeof max === "function" ? max() : max; // Calculate max at runtime
      if (value >= min && value <= currentMax) {
        setter(e.target.value);
      } else {
        setter(defaultValue);
      }
    };
  };

  const verbalTotal = Number(verbalKnowledge) + Number(verbalRiddles);

  return (
    <div className={classes.content}>
      <h3 className={classes.sidePanelTitle}>
        Kaufman Brief Intelligence Test
      </h3>

      <fieldset className={classes.formGroup}>
        <legend className={classes.formGroupTitle}>Participant</legend>
        <div className={classes.construct}>
          <label className={classes.label} htmlFor="kbit-age">
            Age of the Participant
          </label>
          <input
            id="kbit-age"
            type="number"
            min={18}
            max={25}
            required
            onChange={createRangeValidator(setAge, 18, 25)}
            className={classes.input}
          />
        </div>
      </fieldset>

      <fieldset className={classes.formGroup}>
        <legend className={classes.formGroupTitle}>Verbal Subtests</legend>
        <div className={classes.construct}>
          <label className={classes.label} htmlFor="kbit-verbal-knowledge">
            Knowledge Raw Score
          </label>
          <input
            id="kbit-verbal-knowledge"
            type="number"
            required
            min={0}
            max={60}
            onChange={createRangeValidator(setVerbalKnowledge, 0, 60)}
            className={classes.input}
          />
        </div>
        <div className={classes.construct}>
          <label className={classes.label} htmlFor="kbit-riddles">
            Riddles Raw Score
          </label>
          <input
            id="kbit-riddles"
            type="number"
            required
            min={0}
            max={45}
            onChange={createRangeValidator(setVerbalRiddles, 0, 45)}
            className={classes.input}
          />
        </div>
        {(verbalKnowledge !== "") & (verbalRiddles !== "") ? (
          <div className={classes.groupTotal}>
            Verbal Total: <b>{verbalTotal}</b> / 105
          </div>
        ) : (
          <div></div>
        )}
      </fieldset>

      <fieldset className={classes.formGroup}>
        <legend className={classes.formGroupTitle}>Nonverbal Subtest</legend>
        <div className={classes.construct}>
          <label className={classes.label} htmlFor="kbit-nonverbal">
            Nonverbal Raw Score
          </label>
          <input
            id="kbit-nonverbal"
            type="number"
            required
            min={0}
            max={50}
            onChange={createRangeValidator(setNonverbalRaw, 0, 50)}
            className={classes.input}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default InputForm;
