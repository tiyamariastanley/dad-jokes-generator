import { useState } from "react";
import "./App.css";
import Joke from "./components/Joke";
import VoiceInput from "./components/VoiceInput";

function App() {
  const [transcript, setTranscript] = useState<string>("");

  const setAudioTranscript = (data: string) => {
    setTranscript(data);
  };

  return (
    <div className="App">
      <VoiceInput setAudioTranscript={setAudioTranscript} />
      <p>{transcript}</p>
      <Joke transcript={transcript} />
    </div>
  );
}

export default App;
