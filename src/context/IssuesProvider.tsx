import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { PositionDispatchContext } from './PositionProvider';
import { UserStateContext } from './UserProvider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.issues;
    case 'reverse':
      const issues = [];
      const newIssues = issues.concat(state);
      return newIssues.reverse();
    case 'removeAll':
      return [];
    default:
      break;
  }
};

export const IssuesStateContext = createContext([]);
export const IssuesDispatchContext = createContext(null);

const IssuesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const positionDispatch = useContext(PositionDispatchContext);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    const getData = async () => {
      if (userState.length > 0) {
        if (userState[0]) {
          positionDispatch({
            type: 'set',
            content: 'Issues',
            projectId: userState[0],
          });
        } else {
          positionDispatch({
            type: 'set',
            content: 'Projects',
          });
        }

        const response: any = await axios.get(
          `${process.env.API_URL}/issue/project/${userState[0]}/${1}`,
          {
            withCredentials: true,
          }
        );

        dispatch({ type: 'set', issues: response.data.reverse() });
      }
    };

    getData();
  }, [userState]);

  return (
    <IssuesStateContext.Provider value={state}>
      <IssuesDispatchContext.Provider value={dispatch}>
        {children}
      </IssuesDispatchContext.Provider>
    </IssuesStateContext.Provider>
  );
};

export default IssuesProvider;
