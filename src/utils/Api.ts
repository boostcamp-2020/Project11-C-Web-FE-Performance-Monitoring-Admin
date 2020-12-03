import axios from 'axios';

const getUser = async () => {
  try {
    return await axios.get(`${process.env.API_URL}/user`, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

export default { getUser };
