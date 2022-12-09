import './login.css';
import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../context/AuthContext';

function LoginView() {
  const idRef = useRef();
  const passwordRef = useRef();
  const { loginUser, LoginError, setLoginError } = useContext(AuthContext);

  const submitData = () => {
    let staffID = idRef.current.value;
    let password = passwordRef.current.value;
    if (staffID == '' || password == '') {
      setLoginError(() => 'No field shall be left empty');
      return;
    }
    loginUser(staffID, password);
  };

  /*Return function*/
  return (
    <div className='container'>
      <div className='holder'>
        <div className='login'>
          <div className='login-box'>
            <h1>Sign in</h1>
            <form id='login-form' onSubmit={submitData}>
              <div className='user-box'>
                <input type='text' name='' required='' ref={idRef} />
                <label>StaffID</label>
              </div>
              <div className='user-box'>
                <input type='password' name='' required='' ref={passwordRef} />
                <label>Password</label>
              </div>
              {LoginError !== '' ? (
                <div className='alert alert-danger mb-3'>{LoginError}</div>
              ) : null}
              <p style={{ marginTop: '0em', color: 'white' }}>
                Don't have an account ?{' '}
                <a
                  href='/register'
                  style={{ color: '#03e9f4', cursor: 'pointer' }}
                >
                  Sign up
                </a>
              </p>

              <div onClick={submitData}>
                <a className='btn'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='image'>
          <div className='holder'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png' />
          </div>
        </div>
      </div>
      <div className='decoration'>
        <div className='decor0'></div>
        <div className='decor1'></div>
        <div className='decor2'></div>
      </div>
    </div>
  );
}
export default LoginView;
