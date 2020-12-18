import axios from 'axios';
import {
  CreateProject,
  InviteMember,
  SignUpUser,
  SignInUser,
} from './Interface';

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

const getDailyError = async (projectId: string, day: string): Promise<any> => {
  try {
    return await axios.get(
      `${process.env.API_URL}/project/${projectId}/chart/dailyError?day=${day}`,
      { withCredentials: true }
    );
  } catch (err) {
    return err;
  }
};

const getChartIssue = async (projectId: string): Promise<any> => {
  try {
    return await axios.get(
      `${process.env.API_URL}/project/${projectId}/chart/issue`,
      { withCredentials: true }
    );
  } catch (err) {
    return err;
  }
};

const getChartTag = async (projectId: string): Promise<any> => {
  try {
    return await axios.get(
      `${process.env.API_URL}/project/${projectId}/chart/tag`,
      { withCredentials: true }
    );
  } catch (err) {
    return err;
  }
};

const getUserByEamil = async (email: string): Promise<any> => {
  try {
    return await axios.get(`${process.env.API_URL}/user/${email}`, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

const postInvite = async (
  projectId: string,
  data: InviteMember
): Promise<any> => {
  try {
    return await axios.post(
      `${process.env.API_URL}/project/${projectId}/invite`,
      data,
      { withCredentials: true }
    );
  } catch (err) {
    return err;
  }
};

const postSignUp = async (data: SignUpUser): Promise<any> => {
  try {
    return await axios.post(`${process.env.API_URL}/signUp`, data, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

const postSignIn = async (data: SignInUser): Promise<any> => {
  try {
    return await axios.post(`${process.env.API_URL}/signIn`, data, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

const getSignOut = async (): Promise<any> => {
  try {
    return await axios.get(`${process.env.API_URL}/signOut`, {
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

export default {
  getUser,
  getProject,
  getProjects,
  postProject,
  getDailyError,
  getChartIssue,
  getChartTag,
  getUserByEamil,
  postInvite,
  postSignUp,
  postSignIn,
  getSignOut,
};
