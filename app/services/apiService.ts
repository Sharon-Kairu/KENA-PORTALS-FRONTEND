const apiService = {
  postWithoutToken: async function (url: string, data: any): Promise<any> {
    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'POST',
      credentials: 'include', // 🔥 REQUIRED FOR COOKIES
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        const err = await response.json()
        throw err
      }
      return response.json()
    })
  },
  postWithToken: async (url: string, data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    
    },
    credentials: 'include',
    body: JSON.stringify(data),
    });


    if (!res.ok) {
      const errData = await res.json();
      console.error('Server error:', errData); // 👈 see full response
      throw new Error(errData.detail || JSON.stringify(errData));
    }


    return res.json();
    },


    // Example GET with token
    getWithToken: async (url: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      credentials: 'include', // 🔥 cookies
      });


      if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || 'Unknown error');
      }


      return res.json();
    },
    patchWithToken: async (url: string, data: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Unknown error');
      }

      return res.json();
    },

    };
  

export default apiService