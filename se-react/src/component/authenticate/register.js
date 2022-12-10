import './register.css';
import React, { useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext';

function RegisterView() {
  const { registerUser, RegisterError, setRegisterError } =
    useContext(AuthContext);
  const nameRef = useRef();
  const dobRef = useRef();
  const residential_idRef = useRef();
  const genderRef = useRef();
  const passRef = useRef();
  const confirm_passwordRef = useRef();
  const roleRef = useRef();

  const submitData = () => {
    let name = nameRef.current.value;
    let dob = dobRef.current.value;
    let resId = residential_idRef.current.value;
    let gender = genderRef.current.value;
    let password = passRef.current.value;
    let conPass = confirm_passwordRef.current.value;
    let role = roleRef.current.value;

    if (
      name == '' ||
      dob == '' ||
      resId == '' ||
      gender == '' ||
      password == '' ||
      conPass == '' ||
      role == ''
    ) {
      setRegisterError('No field shall be left empty');
      return;
    }

    if (password != conPass) {
      setRegisterError('Confirm password does not match');
      return;
    }

    registerUser(name, dob, resId, gender, password, role);
  };

  /*Return function*/
  return (
    <div className='container1'>
      <div className='holder1'>
        <div className='login'>
          <div className='register-box'>
            <h1>Create an account</h1>
            <form id='register-form' onSubmit={submitData}>
              <div className='user-box'>
                <input type='text' name='' required='' ref={nameRef} />
                <label>Fullname</label>
              </div>
              <div className='user-box'>
                <input
                  type='date'
                  name=''
                  required=''
                  style={{ color: 'darkgray' }}
                  ref={dobRef}
                />
                <label>DOB</label>
              </div>
              <div className='user-box'>
                <input
                  type='text'
                  name=''
                  required=''
                  ref={residential_idRef}
                />
                <label>Residential ID</label>
              </div>
              <div className='user-box'>
                <select
                  name='languages'
                  id='lang'
                  style={{ color: 'darkgray' }}
                  ref={genderRef}
                >
                  <option value='0'>Male</option>
                  <option value='1'>Female</option>
                  <option value='-1'>Other</option>
                </select>
                <label>Gender</label>
              </div>
              <div className='user-box'>
                <input type='password' name='' required='' ref={passRef} />
                <label>Password</label>
              </div>
              <div className='user-box'>
                <input
                  type='password'
                  name=''
                  required=''
                  ref={confirm_passwordRef}
                />
                <label>Confirm password</label>
              </div>
              <div className='user-box'>
                <select
                  name='languages'
                  id='lang'
                  style={{ color: 'darkgray' }}
                  ref={roleRef}
                >
                  <option value='BACKOFFICER'>Back officer</option>
                  <option value='COLLECTOR'>Collector</option>
                  <option value='JANITOR'>Janitor</option>
                </select>
                <label>Sign up as</label>
              </div>
              <p style={{ marginTop: '-1em', color: 'white' }}>
                Already have an account ?{' '}
                <a
                  href='/login'
                  style={{ color: '#03e9f4', cursor: 'pointer' }}
                >
                  Sign in
                </a>
              </p>
              {RegisterError !== '' ? (
                <div className='alert alert-danger'>{RegisterError}</div>
              ) : null}
              <div onClick={submitData}>
                <a href='#' className='btn'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='image'>
          <div className='holder'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png' />
          </div>
          <p>
            By signing up, you agree with the <br></br>
            <br></br>
            <a href='#'> Terms of Use </a> &<a href='#'> Privacy Policy </a>
          </p>
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
export default RegisterView;
