import React, { createContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(
    localStorage.getItem('authToken')
    ? jwt_decode(JSON.parse(localStorage.getItem('authToken')).access) : null
  );
  const [AuthToken, setAuthToken] = useState(
    localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken'))
      : null,
  );
  const [LoginError, setLoginError] = useState('');
  const [RegisterError, setRegisterError] = useState('');

  const navigate = useNavigate()

  const loginUser = async (staff_id, password) => {
    axios({
      baseURL: 'http://127.0.0.1:8000/api/token/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        staff_id: staff_id,
        password: password,
      },
    })
      .then((response) => {
        setAuthToken(() => response.data);
        setUser(() => jwt_decode(response.data.access));
        localStorage.setItem('authToken', JSON.stringify(response.data));
        navigate('/');
      })
      .catch((error) => setLoginError(() => error.response.data.detail));
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const registerUser = async (fullname, date_of_birth, residential_id, gender, password, role) => {
    try {
      const response = await axios({
        url: 'http://localhost:8000/api/user/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          fullname: fullname,
          date_of_birth: date_of_birth,
          residential_id: residential_id,
          email: residential_id+'@email.com',
          phone_number: residential_id,
          gender: parseInt(gender),
          password: password,
          role: role,
        },
      });
      console.log('success')
      loginUser(response.data.staff_id, password)
    }
    catch(err) {
      setRegisterError(err.response.data.residential_id.join())
    }
  }

  const AuthData = {
    User: User,
    setUser: setUser,
    AuthToken: AuthToken,
    setAuthToken: setAuthToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    LoginError: LoginError,
    RegisterError: RegisterError,
    setRegisterError: setRegisterError,
    setLoginError: setLoginError,
  };
  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
};
