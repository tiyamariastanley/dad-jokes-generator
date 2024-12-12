import axios from "axios";
import React, { useEffect, useState } from "react";

interface JokeProps {
  transcript: String;
}

const Joke: React.FC<JokeProps> = ({ transcript }) => {
  const [joke, setJoke] = useState<string | null>(null);

  useEffect(() => {
    if (transcript) {
      getDadJoke();
    }
  }, [transcript]);

  const getDadJoke = async () => {
    const res = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    console.log("res", res.data.joke);
    setJoke(res.data.joke);

    speakJoke(res.data.joke);
  };

  const speakJoke = (joke: any) => {
    if ("speechSynthesis" in window) {
      const utterance: any = new SpeechSynthesisUtterance(joke);
      utterance.lang = "en-US"; // Set the language, can be adjusted based on user preference
      utterance.pitch = 1; // Adjust pitch (0 is low, 2 is high)
      utterance.rate = 1; // Adjust rate of speech (0.1 is slow, 10 is fast)

      // Speak the joke
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech Synthesis API is not supported in this browser.");
    }
  };

  return <div>{joke}</div>;
};

export default Joke;
