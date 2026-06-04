import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);

      setData(await response.json());
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, pending, error };
};
