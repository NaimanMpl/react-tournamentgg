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

export const createPost = async (formData) => {
  const response = await fetch(
    '/api/report/create',
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

export const fetchEventMatchs = async (id) => {
  const response = await fetch(
    `/api/event/${id}/matchs`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  if (response.status !== 200) return new Promise(resolve => resolve([]));
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

export const fetchUsers = async () => {
  const response = await fetch(
    '/api/user/all',
    {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    }
  );
  return response.json();
}

export const fetchReports = async () => {
  const resposne = await fetch(
    '/api/report/all',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return resposne.json();
}

export const deleteReport = async (id) => {
  const response = await fetch(
    `/api/report/${id}`,
    {
      method: 'DELETE'
    }
  );

  return response.json();
}

export const updateReport = async (id, status) => {
  const statusMap = {
    'En cours' : 1,
    'Traité' : 2,
    'Refusé' : 3
  }
  const response = await fetch(
    `/api/report/status`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id, status: statusMap[status]})
    }
  );
  return response.json();
}

export const updateAccount = async (id, status) => {
  const statusMap = {
    'Joueur' : 1,
    'Administrateur' : 2,
  }
  console.log(id, status, statusMap[status])
  const response = await fetch(
    `/api/user/status`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id, status: statusMap[status]})
    }
  );
  return response.json();
}