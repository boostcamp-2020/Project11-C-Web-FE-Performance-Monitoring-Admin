import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Api from '@utils/Api';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return [action.recent, action.name, action.email];
    case 'recent':
      return [action.recent, state[1], state[2]];
    case 'removeAll':
      return [];
    default:
      break;
  }
};

export const UserStateContext = createContext([]);
export const UserDispatchContext = createContext(null);

const UserProvider = ({ children }) => {
  const location = useLocation();

  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Api.getUser();

      dispatch({
        type: 'set',
        recent: data.recentProject,
        name: data.name,
        email: data.email,
      });
    };

    getData();
  }, [location]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
