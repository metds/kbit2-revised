import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResultsOutput from "./components/ResultsOutput";

function App() {
  const [age, setAge] = useState("18");
  const [verbalKnowledge, setVerbalKnowledge] = useState("25");
  const [verbalRiddles, setVerbalRiddles] = useState("23");
  const [nonverbalRaw, setNonverbalRaw] = useState("32");

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
