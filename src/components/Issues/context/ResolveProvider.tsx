import React, { useState, useEffect, createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state.concat(action.issueId);
    case 'remove':
      const result: string[] = state.filter(item => item !== action.issueId);
      return result;
    case 'removeAll':
      return [];
    default:
      break;
  }
};

export const ResolveStateContext = createContext([]);
export const ResolveDispatchContext = createContext(null);

const ResolveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ResolveStateContext.Provider value={state}>
      <ResolveDispatchContext.Provider value={dispatch}>
        {children}
      </ResolveDispatchContext.Provider>
    </ResolveStateContext.Provider>
  );
};

export default ResolveProvider;
