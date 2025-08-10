import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router";
import { REFRESH_TOKEN, type User, type UserData } from "@/http/auth";
import { useMutation } from "@apollo/client";

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({children}: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(
    () => {
        const loggedUser = localStorage.getItem('user');
        return loggedUser ? JSON.parse(loggedUser) : null;
    }
  );
  const navigate = useNavigate();
  const [refreshToken] = useMutation(REFRESH_TOKEN, {
    onCompleted: (data) => {
      setSessionUser(data.refreshToken);
    },
    onError: (error) => {
			// Error handling (Toast)
		}
  });

  useEffect(() => {
    const refreshTokenAsync = async () => {
      if(!localStorage.getItem('accessToken') || !localStorage.getItem('user')){
        await refreshToken();
      }
    }

    refreshTokenAsync();
  }, [refreshToken])

  const setSessionUser = (userData: UserData) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('accessToken', userData.accessToken)
  }

  const removeSessionUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  const userValue = useMemo(
    () => {
        return {
            user,
            setSessionUser,
            removeSessionUser
        }
    }, [user]
  )

  return (
    <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>
  )
}
export default AuthProvider;