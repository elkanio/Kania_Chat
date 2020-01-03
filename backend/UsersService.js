import axios from 'axios';

export default {
  getAll: async () => {
    console.log("Chci všechny zprávy!");
    let res = await axios.get(`/users`);  
    return res.data || [];
  }
}


