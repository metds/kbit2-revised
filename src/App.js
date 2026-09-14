import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResultsOutput from "./components/ResultsOutput";

function App() {
  const [age, setAge] = useState("");
  const [verbalTotal, setVerbalTotal] = useState("");
  const [nonverbalRaw, setNonverbalRaw] = useState("");
  return (
    <div>
      <Header />
      <div className="container">
        <InputForm
          age={age}
          setAge={setAge}
          verbalTotal={verbalTotal}
          setVerbalTotal={setVerbalTotal}
          nonverbalRaw={nonverbalRaw}
          setNonverbalRaw={setNonverbalRaw}
        />
        <ResultsOutput
          age={age}
          nonverbalRaw={nonverbalRaw}
          verbalTotal={verbalTotal}
        />
      </div>
    </div>
  );
}

export default App;
