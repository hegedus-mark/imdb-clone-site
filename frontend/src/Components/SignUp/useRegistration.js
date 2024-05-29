import { useState } from 'react';

const useRegistration = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (formFields) => {
    setLoading(true);

    const { username, email, password, displayName } = formFields;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, displayName })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('User registered successfully:', data);
        console.log("token", data.token);
        return { ok: true }
      } else {
        console.error('Registration failed:', data.message);
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

  return { registerUser, loading };
};

export default useRegistration;