import axios from 'axios';

const getDetailIssueByIssueId = async (issueId: string) => {
  const res = await axios.get(`${process.env.API_URL}/issue/${issueId}`, {
    withCredentials: true,
  });
  return res.data;
};

const getErrorEventByErrorEventId = async (errorEventid: string) => {
  const res = await axios.get(
    `${process.env.API_URL}/errorevent/${errorEventid}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export default { getDetailIssueByIssueId, getErrorEventByErrorEventId };
