export const registerUser = async (formFields) => {
  //have to make sure that all the edge cases are handled, and the user gets back the proper feedback!
  const {username, email, password, displayName} = formFields;
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
      // Store the JWT token received from the server, for now I store it in localstorage but Cookies would be way better in the future!
      localStorage.setItem('token', data.token);
      console.log('User registered successfully:', data);
    } else {
      console.error('Registration failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};