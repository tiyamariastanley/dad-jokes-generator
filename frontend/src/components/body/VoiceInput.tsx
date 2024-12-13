import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import { Bars, ThreeDots } from "react-loader-spinner";
import { AppContext } from "../../App";
import { JOKE_API_URL, TRANSCRIBE_API_URL } from "../../utils/constants";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface VoiceInputProps {}

const VoiceInput: React.FC<VoiceInputProps> = ({}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setJokeAPIUrl, transcript, setAudioTranscript } =
    useContext(AppContext)!;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (transcript) {
      setLoading(false);
      setJokeAPIUrl(JOKE_API_URL + "Any?type=single");
    }
  }, [transcript]);

  const handleStartRecording = async () => {
    try {
      //TODO: Auto stop recording when user stops speaking

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/mp4",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp4",
        });
        const file: any = new File([audioBlob], "audio.m4a", {
          type: "audio/mp4",
        });

        handleUpload(file);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setLoading(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUpload = async (audioFile: any) => {
    if (!audioFile) {
      return;
    }
    console.log("audioFile", audioFile);

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const data: any = await axios.post(TRANSCRIBE_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Transcribed data", data);

      setAudioTranscript(data.data.transcription);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <div
      className={`w-[60vw] h-fit rounded-lg p-7 flex flex-col gap-5 md:flex-row items-center bg-white border border-[#155eef] shadow-md shadow-[#c4d4fa] ${
        isRecording || loading || transcript
          ? "justify-around"
          : "justify-center"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-center gap-6 ${
          isRecording ? "justify-around" : "justify-center"
        }`}
      >
        <div
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`w-12 h-12 rounded-full border border-gray-500 flex justify-center items-center shadow-lg cursor-pointer ${
            isRecording ? "animate-pulse scale-150 bg-red-600 border-none" : ""
          }`}
        >
          <MicIcon
            className={`text-red-600 ${isRecording ? "text-white" : ""}`}
          ></MicIcon>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="">{isRecording ? "Listening..." : "Speak a query"} </p>
          <Tooltip title="Click the mic to start/ stop listening">
            <InfoOutlinedIcon className="!text-[1rem]" />
          </Tooltip>
        </div>
      </div>
      <div>
        {isRecording ? (
          <Bars
            height="50"
            width="50"
            color="#155eef"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : loading ? (
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
        ) : (
          <p className="text-lg">{transcript ? `"${transcript}"` : null}</p>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
