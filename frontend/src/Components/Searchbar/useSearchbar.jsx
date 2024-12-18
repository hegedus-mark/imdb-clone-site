import { useEffect, useState } from "react";
import { useFetchData } from "../../Hooks";

export const useSearchbar = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data, fetchData } = useFetchData();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        fetchData(`/api/movies/search/${search}`, "GET");
      }
    }, 300);
    return () => {
      clearTimeout(delayDebounce);
    };
  }, [search]);

  const blurHandler = () => {
    setTimeout(() => {
      setFocus(false);
    }, 200);
  };

  return {
    blurHandler,
    search,
    setSearch,
    loading,
    error,
    data,
    focus,
    setFocus,
  };
};
