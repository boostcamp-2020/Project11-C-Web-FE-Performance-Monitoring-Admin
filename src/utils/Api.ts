import axios from 'axios';
import { CreateProject } from './Interface';

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

const getProjects = async () => {
  try {
    return await axios.get(`${process.env.API_URL}/user/projects`, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

const postProject = async (data: CreateProject): Promise<any> => {
  try {
    return await axios.post(`${process.env.API_URL}/project`, data, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

export default { getUser, getProject, getProjects, postProject };
