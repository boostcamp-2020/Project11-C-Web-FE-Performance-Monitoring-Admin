import axios from 'axios';

const getLoginUserAlertList = async () => {
  const res = await axios.get(`${process.env.API_URL}/alert`, {
    withCredentials: true,
  });
  return res.data;
};

export default { getLoginUserAlertList };
