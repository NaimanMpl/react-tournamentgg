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
    '/api/auth/login',
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

export const fetchEvents = async () => {
  const response = await fetch(
    `/api/event/all`,
    {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      }
    }
  );
  return response.json();
}

export const fetchEvent = async (id) => {
  const response = await fetch(
    `/api/event/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      }
    }
  );
  if (response.status !== 200) return null;
  return response.json();
}

export const joinTournament = async (id) => {
  const response = await fetch(
    `/api/user/join/${id}`,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  );

  return new Promise(resolve => resolve({ code: response.status, data: response.status === 401 ? null : response.json() }));
}

export const fetchCurrentUser = async () => {
  let response = await fetch(
    '/api/user/',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  );

  if (response.status === 401) {
    console.log('Access token invalide, rafraichissement !');
    const accessToken = await refreshAccessToken();
    
    if (accessToken === null) return null;
    
    response = await fetch(
      '/api/user/',
      {
        method: 'GET',
        headers: {
          'authorization' : `Bearer ${accessToken}`
        },
        credentials: 'same-origin'
      }
    );

  } else if (response.status !== 200) {
    return null;
  }
  
  return response.json();
}

const refreshAccessToken = async () => {
  const response = await fetch(
    '/api/auth/refresh',
    {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      },
      credentials: 'same-origin'
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response.json();
}