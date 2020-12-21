import React, { createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return [action.content, action.projectId];
    case 'setPosition':
      return [action.content, state[1]];
    case 'setProjectId':
      return [state[0], action.projectId];
    default:
      break;
  }
};

export const PositionStateContext = createContext(null);
export const PositionDispatchContext = createContext(null);

const PositionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <PositionStateContext.Provider value={state}>
      <PositionDispatchContext.Provider value={dispatch}>
        {children}
      </PositionDispatchContext.Provider>
    </PositionStateContext.Provider>
  );
};

export default PositionProvider;
