import { createContext, useState } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Body from "./components/body";
import "@fontsource/baloo-2/400.css"; // Regular weight
import "@fontsource/baloo-2/700.css";
import "@fontsource/roboto/400.css"; // Regular weight for Roboto
import "@fontsource/roboto/700.css";
import "@fontsource/inter/400.css";

import useFetchJokes from "./components/hooks/useFetchJokes";

interface AppContextType {
  transcript: string | null;
  joke: string[];
  setAudioTranscript: Function;
  setJokeAPIUrl: Function;
  jokeError: any;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  const [url, setUrl] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");

  const { data, loading, error } = useFetchJokes<any>({
    url: url,
    transcript,
  });

  const setAudioTranscript = (data: string) => {
    setTranscript(data);
  };

  const setJokeAPIUrl = (apiUrl: string) => {
    setUrl(apiUrl);
  };

  return (
    <AppContext.Provider
      value={{
        transcript,
        joke: data,
        jokeError: error,
        setAudioTranscript,
        setJokeAPIUrl,
      }}
    >
      <div className="flex flex-row w-screen gap-5 md:gap-32 pl-0 bg-[#f9fafb] font-inter md:p-5">
        <NavBar></NavBar>
        <Body></Body>
      </div>
    </AppContext.Provider>
  );
}

export default App;
