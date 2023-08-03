import React, { createContext } from 'react';

export const AuthContext = createContext('');
const MyContext = ({ children }) => {
  const authInfo = "authinfo user";
  return (
    <AuthContext.Provider value={authInfo}> {/* Use authInfo variable as the value */}
      {children}
    </AuthContext.Provider>
  );
};

export default MyContext;
