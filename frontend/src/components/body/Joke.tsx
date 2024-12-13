import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { isEmpty } from "lodash";
import VoiceOverOffIcon from "@mui/icons-material/VoiceOverOff";
import { Button, Tooltip } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ErrorIcon from "@mui/icons-material/Error";

interface JokeProps {
  joke: string[];
  jokeError: any;
}

const Joke: React.FC<JokeProps> = ({ joke, jokeError }) => {
  const [speakInstance, setSpeakInstance] = useState<any>(null);
  const [audio, setAudio] = useState<boolean>(true);
  const [disableAudio, setDisableAudio] = useState<boolean>(false);

  useEffect(() => {
    if (joke) {
      speakJoke(joke);
    }
  }, [joke]);

  const speakJoke = (joke: any) => {
    if ("speechSynthesis" in window) {
      setAudio(true);
      let utterance: any = null;
      joke.forEach((item: any) => {
        utterance = new SpeechSynthesisUtterance(item.joke);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 1;
        setSpeakInstance(utterance);
        window.speechSynthesis.speak(utterance);
      });

      utterance.onend = () => {
        setAudio(false);
      };
    } else {
      console.error("Speech Synthesis API is not supported in this browser.");
      setDisableAudio(true);
    }
  };

  const handleAudio = () => {
    setAudio(!audio);
    if (audio) {
      window.speechSynthesis.cancel();
    } else {
      window.speechSynthesis.speak(speakInstance);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[60vw] h-fit border border-gray-400 rounded-lg px-10 py-5 bg-white shadow-md">
      <Tooltip
        title="text-to-speech is not supported in this browser/ device"
        disableHoverListener={!disableAudio}
      >
        <span>
          <Button
            variant="outlined"
            size="medium"
            className="w-fit"
            disabled={isEmpty(joke) || disableAudio}
            onClick={handleAudio}
            startIcon={audio ? <VoiceOverOffIcon /> : <RecordVoiceOverIcon />}
            sx={{
              backgroundColor: "#155eef",
              color: "white",
              "&:hover": {
                backgroundColor: "#104db8",
              },
              "&:disabled": {
                color: "rgba(0, 0, 0, 0.26)",
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              },
              float: "right",
              textTransform: "capitalize",
            }}
          >
            {audio ? "Stop Audio" : "Start Audio"}
          </Button>
        </span>
      </Tooltip>

      <div className="mt-12">
        {!isEmpty(joke) ? (
          joke.map((item: any) => (
            <React.Fragment key={item.id}>
              <div className="font-sans text-lg">{item.joke}</div>
              <hr className="border border-gray-300 last:border-none my-3"></hr>
            </React.Fragment>
          ))
        ) : jokeError ? (
          <div className="font-sans text-lg flex flex-row items-center gap-2">
            <ErrorIcon className="text-red-600 text-2xl"></ErrorIcon>
            {"  "}
            <p>{jokeError}</p>
          </div>
        ) : (
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#001d92"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
    </div>
  );
};

export default Joke;
