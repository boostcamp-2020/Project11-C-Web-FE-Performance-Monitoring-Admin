import React, { useState, useEffect, createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return [
        action.content,
        action.projectId,
        action.userName,
        action.userEmail,
        action.imgUrl,
      ];
    case 'update':
      const data = [
        action.content,
        action.projectId,
        state[2],
        state[3],
        state[4],
      ];

      return data;
    case 'setPosition':
      const newPosition = [
        action.content,
        state[1],
        state[2],
        state[3],
        state[4],
      ];
      return newPosition;
    case 'setUser':
      const newData = [
        state[0],
        state[1],
        action.userName,
        action.userEmail,
        action.imgUrl,
      ];
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
