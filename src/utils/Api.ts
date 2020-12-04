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

const getProject = async (projectId: string) => {
  try {
    return await axios.get(`${process.env.API_URL}/project/${projectId}`, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

export default { getUser, getProject };
