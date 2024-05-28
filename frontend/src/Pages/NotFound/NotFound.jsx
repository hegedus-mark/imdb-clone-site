import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/");
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return <div>404 NOT FOUND. Redirecting ({counter})</div>;
};
