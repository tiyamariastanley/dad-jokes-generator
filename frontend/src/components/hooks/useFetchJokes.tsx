import axios from "axios";
import React, { useEffect, useState } from "react";
import { JOKE_ERROR_MSG } from "../../utils/constants";

interface JokeProps {
  url: string;
  transcript?: string;
}

interface UseFetchJokesReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchJokes = <T,>({
  url,
  transcript,
}: JokeProps): UseFetchJokesReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transcript && !url) return;

    getDadJoke();
  }, [transcript, url]);

  const getDadJoke = async () => {
    try {
      const res = await axios.get(url);
      setData(
        res.data.joke ? [{ id: 1, joke: res.data.joke }] : res.data.jokes
      );
      setLoading(false);
    } catch (error: any | null) {
      console.log("error", error);
      setData(null);
      setError(JOKE_ERROR_MSG);
    }
  };
  return { data, loading, error };
};

export default useFetchJokes;
