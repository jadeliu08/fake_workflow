import { createContext } from 'react';

const authContext = createContext({ logged: localStorage.getItem('logged') === 'true' });
authContext.displayName = 'AuthContext';
export { authContext };