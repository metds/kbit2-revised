import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResultsOutput from "./components/ResultsOutput";

function App() {
  const [age, setAge] = useState("");
  const [verbalKnowledge, setVerbalKnowledge] = useState("");
  const [verbalRiddles, setVerbalRiddles] = useState("");
  const [nonverbalRaw, setNonverbalRaw] = useState("");

  return (
    <div>
      <Header />
      <div className="container">
        <InputForm
          age={age}
          setAge={setAge}
          verbalKnowledge={verbalKnowledge}
          setVerbalKnowledge={setVerbalKnowledge}
          verbalRiddles={verbalRiddles}
          setVerbalRiddles={setVerbalRiddles}
          nonverbalRaw={nonverbalRaw}
          setNonverbalRaw={setNonverbalRaw}
        />
        <ResultsOutput
          age={age}
          nonverbalRaw={nonverbalRaw}
          verbalKnowledge={verbalKnowledge}
          verbalRiddles={verbalRiddles}
        />
      </div>
    </div>
  );
}

export default App;
