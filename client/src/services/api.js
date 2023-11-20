export const registerUser = async (formData) => {
  const response = await fetch(
    '/api/user/register',
    {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );

  const data = await response.json();

  return new Promise(resolve => resolve({ response: response, data: data }));
}

export const loginUser = async (formData) => {
  const response = await fetch(
    '/api/user/login',
    {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );

  if (response.status === 301) {
    return new Promise(resolve => resolve({ response: response }));
  } else {
    const data = await response.json();
    return new Promise(resolve => resolve({ response: response, data: data }));
  }

}

export const fetchUserByEmail = async (email) => {
  const response = await fetch(
    `/api/user/by-email?email=${email}`,
    {
      method: 'GET',
    }
  );
  return response.json();
}

export const fetchUserByLogin = async (login) => {
  const response = await fetch(
    `/api/user/by-login?login=${login}`,
    {
      method: 'GET',
    }
  );
  return response.json();
}