import { useEffect, useState } from "react";

export const useFetchData = (runOnLoad, url, options) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = (url, options) => {
    setLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("recieved:", jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    if (runOnLoad) {
      fetchData(url, options);
    } else {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};
