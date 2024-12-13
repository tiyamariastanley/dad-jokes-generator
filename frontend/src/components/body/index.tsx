import React, { useContext, useState } from "react";
import VoiceInput from "./VoiceInput";
import Joke from "./Joke";
import { AppContext } from "../../App";

interface BodyProps {}

const Body: React.FC<BodyProps> = ({}) => {
  const { transcript, joke, jokeError } = useContext(AppContext)!;
  return (
    <div
      className={`flex flex-col gap-10 mt-10 md:gap-20 justify-center items-center md:${
        transcript || joke || jokeError
          ? "justify-center mt-0"
          : "justify-start mt-[10%]"
      } `}
    >
      <div className="flex flex-col items-center">
        <p className="font-Inter font-semibold md:text-3xl text-center mb-10">
          Speak a query and get dad jokes in response !!!
        </p>

        <VoiceInput />
      </div>
      {(transcript || joke || jokeError) && (
        <Joke joke={joke} jokeError={jokeError} />
      )}
    </div>
  );
};

export default Body;
