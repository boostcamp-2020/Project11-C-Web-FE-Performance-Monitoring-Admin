import React, { useState, useEffect, createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return [action.content, action.projectId];
    case 'update':
      const data = [action.content, action.projectId];
      return data;
    case 'setPosition':
      const newPosition = [action.content, state[1]];
      return newPosition;
    case 'setUser':
      const newData = [state[0], action.projectId];
      return newData;
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
