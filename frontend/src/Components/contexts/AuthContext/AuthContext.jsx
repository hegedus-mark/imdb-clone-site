import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
//Everything related to authentication and the authentication state management is found here! 

export const AuthContext = createContext({
  user: null,
  token: null,
  authoriseUser: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    localStorage.removeItem("user");
    const storedUser = localStorage.getItem("user");
    console.log(storedToken);
    console.log(storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const authoriseUser = async (endpoint, formFields) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const decoded = jwtDecode(data.token);
        login(data.token, decoded);
        console.log("Success:", data);
        console.log("Decoded", decoded);
        return { ok: true };
      } else {
        console.error("Fail:", data.message);
        //we will send back an error, for example username is occupied!
        return { ok: false, message: data.message, errors: data.errors || {} };
      }
    } catch (error) {
      console.error("Error:", error);
      return { ok: false, message: "Mehhh server error :/// ,", errors: {} };
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, logout, authoriseUser }}>
      {children}
    </AuthContext.Provider>
  );
};
