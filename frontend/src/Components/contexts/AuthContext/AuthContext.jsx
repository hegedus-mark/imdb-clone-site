import { createContext, useEffect, useState } from "react";
//Everything related to authentication and the authentication state management is found here!

export const AuthContext = createContext({
  user: null,
  token: null,
  authoriseUser: async () => null,
  logout: () => null,
  isItLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isItLoggedIn, setIsItLoggedIn] = useState(false);

  useEffect(() => {
    //For testing
    /*     localStorage.removeItem("user");
    localStorage.removeItem("token"); */

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log("token", storedToken);
    console.log("user", storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsItLoggedIn(true);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsItLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsItLoggedIn(false);
  };

  const authoriseUser = async (endpoint, formFields) => {
    try {
      const authoriseFetch = fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      const response = await authoriseFetch;
      const data = await response.json();
      if (!response.ok) {
        console.error("Fail:", data.message);
        //we will send back an error, for example username is occupied!
        setError(data);
        return {
          ok: false,
          error: { message: data.message, formError: data.formError },
        };
      }

      console.log("data received", data);
      login(data.token, data.user);
      console.log("Success:", data.token);
      console.log("user", data.user);
      return { ok: true, message: "Great Success!!" };
    } catch (error) {
      console.error("Error:", error);
      return { ok: false, message: "Something went wrong..." };
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isItLoggedIn, error, logout, authoriseUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
