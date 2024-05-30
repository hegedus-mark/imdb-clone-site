//THIS WILL BE MOVED TO A CONTEXT!!!!

//endpoint can be either login or register
/**
 * 
 * @param {string} endpoint - can be either "login" or "register"
 * @returns an object with a status
 */

export const authoriseUser = async (endpoint, formFields) => {

  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields)
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
  }
};