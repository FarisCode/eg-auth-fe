import React, { createContext, useEffect, useState } from 'react';
import axios from '../utils/axios';

export const MyContext = createContext<any>({});
const getToken = () => localStorage.getItem('x-token');

const MyContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<null | true | false>(null);
  const [formLoading, setFormLoading] = useState<any>(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
    } else {
      axios.get('/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      }).catch((err) => {
        setIsAuthenticated(false);
        localStorage.removeItem('x-token');
      })
    }
  }, [setIsAuthenticated]);

  const handleSignOut = () => {
    localStorage.removeItem('x-token');
    setIsAuthenticated(false);
  }

  const handleSignIn = async (data: any) => {
    setFormLoading(true);
    try {
      const res = await axios.post('/auth/signin', data)
      if (res.status === 201) {
        const { token } = res.data;
        localStorage.setItem('x-token', token);
        setIsAuthenticated(true);
        setFormLoading(false);
      }
      return res;
    } catch (error: any) {
      setFormLoading(false);
      return error?.response?.data;
    }
  }

  const handleSignUp = async (data: any) => {
    setFormLoading(true);
    try {
      const res = await axios.post('/auth/signup', data)
      if (res.status === 201) {
        const { token } = res.data;
        localStorage.setItem('x-token', token);
        setIsAuthenticated(true);
        setFormLoading(false);
      }
      return res;
    }
    catch (error: any) {
      setFormLoading(false);
      return error?.response?.data;
    }
  }

  return (
    <MyContext.Provider value={{ isAuthenticated, handleSignOut, handleSignIn, formLoading, handleSignUp }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;