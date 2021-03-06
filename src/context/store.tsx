import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

// @ts-ignore
export const Context: any = createContext();

interface InitialContext {
  isLogged: boolean;
  version: string | null;
  token: string;
}

const initialContext: InitialContext = {
  isLogged: false,
  version: null,
  token: '',
};

const StoreProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(Reducer, initialContext);

  return (
    <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
  );
};

export default StoreProvider;
