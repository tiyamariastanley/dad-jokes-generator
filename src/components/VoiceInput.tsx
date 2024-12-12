import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";

interface VoiceInputProps {
  setAudioTranscript: Function;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ setAudioTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
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

        setAudioUrl(URL.createObjectURL(audioBlob));

        handleUpload(file);
        audioChunksRef.current = [];
        console.log("Audio file created:", file);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
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

  //   const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     console.log("file", file);

  //     setAudioFile(file);
  //   };

  const handleUpload = async (audioFile: any) => {
    if (!audioFile) {
      alert("Please select an audio file first.");
      return;
    }
    console.log("audioFile", audioFile);

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const data: any = await axios.post(
        "http://localhost:5001/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("data", data);

      setAudioTranscript(data.data.transcription);
    } catch (error) {
      console.error("Error uploading audio file:", error);
    }
  };

  return (
    <div>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Stop Speech Recognition" : "Start Speech Recognition"}
      </button>

      <div
        className={`w-10 h-10 rounded-full bg-gray-300 ${
          isRecording ? "animate-pulse" : ""
        }`}
      >
        <MicIcon></MicIcon>
      </div>
      {/* <input type="file" accept="audio/*" onChange={handleFileChange} /> */}

      {audioUrl && (
        <div>
          <h3>Recorded Audio</h3>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
