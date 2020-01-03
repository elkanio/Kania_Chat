import axios from 'axios';

const API_ROOT = process.env.REACT_APP_SERVER_URI

axios.defaults.baseURL = API_ROOT;

export const fetchUsers = async () => {
    let res = await axios.get(`/users`);
    return res.data || [];
}

export const newUser = async (id, name) => {
    console.log("frontend "+id+" "+name);
    axios.request({
      method: 'POST',
      url: `http://localhost:8002/users`,
      headers: {
          ContentType: 'application/x-www-form-urlencoded',
          Accept: 'application/json'
      },
      data: {
            id: id,
            name: name
      },
    })
}