import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [needRefresh, callRefresh]=useState(false)
  return (
    <AuthContext.Provider 
        value={{ loggedInUser, setLoggedInUser,needRefresh,callRefresh }}>
          {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;