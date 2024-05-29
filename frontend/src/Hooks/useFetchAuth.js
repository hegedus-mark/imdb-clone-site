import { useState } from 'react';

//endpoint can be either login or register
/**
 * 
 * @param {string} endpoint - can be either "login" or "register"
 * @returns authoriseUser function and a loading state
 */
export const useFetchAuth = (endpoint) => {
  const [loading, setLoading] = useState(false);

  const authoriseUser = async (formFields) => {
    setLoading(true);

    const { username, email, password, displayName } = formFields;

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, displayName })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Success:', data);
        console.log("token", data.token);
        return { ok: true }
      } else {
        console.error('Fail:', data.message);
        //we will send back an error, for example username is occupied!
        return { ok: false, message: data.message, errors: data.errors || {} }
      }
    } catch (error) {
      console.error('Error:', error);
      return { ok: false, message: 'Mehhh server error :/// ,', errors: {} }
    } finally {
      setLoading(false);
    }
  };

  return { authoriseUser, loading };
};

