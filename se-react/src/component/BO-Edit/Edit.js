import './Edit.css';
import React, { useState, Component, useEffect, useContext, useRef } from 'react';

import {
  MdOutlineMap,
  MdChatBubbleOutline,
  MdOutlineAddLocation,
} from 'react-icons/md';

import { RiUserLine, RiUserLocationLine, RiTruckLine } from 'react-icons/ri';
import { FaRegImage, FaUserCircle, FaRegIdCard } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/*-----------------------*/

const SideBarItem = ({ Item, page, href }) => {
  return (
    <a className='edit-sidebar_link' href={href}>
      <div className='edit-sidebar_item'>
        {<Item className='edit-sidebar_img' />}
        <h3>{page}</h3>
      </div>
    </a>
  );
};
const Logo = () => {
  return (
    <div className='edit-logo'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png' />
    </div>
  );
};

function Edit() {
  const { User } = useContext(AuthContext);
  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const dobRef = useRef()
  const genderRef = useRef()
  const resIDRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/user/${User.user_id}/`,
    );
    const data = res.data
    nameRef.current.value = data.fullname;
    emailRef.current.value = data.email;
    phoneRef.current.value = data.phone_number;
    dobRef.current.value = data.date_of_birth;
    genderRef.current.value = data.gender + '';
    resIDRef.current.value = data.residential_id;
  }

  const submitProfile = async () => {
    const name = nameRef.current.value
    const email = emailRef.current.value
    const phone = phoneRef.current.value
    const dob = dobRef.current.value
    const gender = genderRef.current.value
    const residential_id = resIDRef.current.value
    if (name == '' || email == '' || phone== '' || dob == '' || residential_id == '') {
        alert('No field shall be left empty')
        return
    }

    try {
        const response = await axios({
            url: `http://localhost:8000/api/user/${User.user_id}/`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                fullname: name,
                date_of_birth: dob,
                residential_id: residential_id,
                gender: parseInt(gender),
                phone_number: phone,
                email: email,
                role: User.role,
            }
        })
        const data = response.data
        nameRef.current.value = data.fullname
        emailRef.current.value = data.email
        phoneRef.current.value = data.phone_number
        dobRef.current.value = data.date_of_birth
        genderRef.current.value = data.gender+''
        resIDRef.current.value = data.residential_id
        alert('Success')
    } catch (err) { 
        alert(JSON.stringify(err.response.data))
    }
}

  /*Return function*/
  return (
    <div className='edit-container'>
      <div className='edit-sidebar'>
        <div className='edit-opt'>
          <a href='/dashboard'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0em',
              }}
            >
              <Logo />
              <div className='db-Logoname'>
                <h4>UWC 2.0</h4>
                <p>BO interface</p>
              </div>
            </div>
          </a>
          <SideBarItem Item={MdOutlineMap} page='Map' href='/map' />
          <SideBarItem
            Item={MdChatBubbleOutline}
            page='Inbox'
            href='https://www.messenger.com'
          />
          <SideBarItem
            Item={RiUserLine}
            page='Collector'
            href='/collector-info'
          />
          <SideBarItem
            Item={RiUserLocationLine}
            page='Janitor'
            href='/janitor-info'
          />
          <SideBarItem Item={RiTruckLine} page='Vehicle' href='/vehicle-info' />
          <SideBarItem
            Item={MdOutlineAddLocation}
            page='MCP'
            href='/mcp-info'
          />
        </div>
      </div>

      <div className='edit-content'>
        <div className='edit-header'>
          <div style={{ float: 'left' }}>
            <p>EDIT EMPLOYEE</p>
          </div>
          <div style={{ float: 'right' }}>
            <div className='edit-headerstuff'>
              <button className='edit-cancel' onClick={() => {
                navigate('/')
              }}>Cancel</button>
              <button className='edit-save' onClick={submitProfile}>SAVE</button>
            </div>
          </div>
        </div>
        <div className='edit-main'>
          <div className='edit-main-left'>
            <div className='edit-photo'>
              <div className='small-title'>
                <FaRegImage
                  style={{
                    marginTop: '0.15em',
                    fontSize: '25px',
                    marginRight: '1em',
                  }}
                />
                <p>Photo</p>
              </div>
              <h5 style={{ margin: '0.6em 1em' }}>
                <b>Avatar</b>
              </h5>
              <div className='edit-avatar'>
                <div className='avatar-img'></div>
                <span>
                  <strong></strong>
                </span>
                {/* <button> Change </button>
                                <button> Remove </button> */}
              </div>
            </div>
            <div className='edit-account'>
              <div className='small-title'>
                <FaUserCircle
                  style={{
                    marginTop: '0.15em',
                    fontSize: '25px',
                    marginRight: '1em',
                  }}
                />
                <p>Account</p>
                <button> Edit </button>
              </div>
              <div className='edit-info'>
                <div className='user-box'>
                  <label>Current Password</label>
                  <input
                    type='text'
                    name=''
                    required=''
                    placeholder='user name'
                  />
                </div>
                <div className='user-box'>
                  <label>New Password</label>
                  <input
                    type='password'
                    name=''
                    required=''
                    placeholder='user password'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='edit-main-right'>
            <div className='general-in4'>
              <div className='small-title'>
                <FaRegIdCard
                  style={{
                    marginTop: '0.15em',
                    fontSize: '25px',
                    marginRight: '1em',
                  }}
                />
                <p>Account</p>
              </div>
              <div className='cover'>
                <div className='user-box'>
                  <label>Fullname</label>
                  <input
                    type='text'
                    name=''
                    required=''
                    placeholder='full name'
                    ref={nameRef}
                  />
                </div>
                <div className='user-box'>
                  <label>Email</label>
                  <input
                    type='text'
                    name=''
                    required=''
                    placeholder='user email'
                    ref={emailRef}
                  />
                </div>
              </div>
              <div className='cover'>
                <div className='user-box'>
                  <label>Phone</label>
                  <input
                    type='text'
                    name=''
                    required=''
                    placeholder='phone number'
                    ref={phoneRef}
                  />
                </div>
                <div className='user-box'>
                  <label>DOB</label>
                  <input
                    type='date'
                    name=''
                    required=''
                    style={{ color: 'gray' }}
                    ref={dobRef}
                  />
                </div>
              </div>
              <div className='cover'>
                <div className='user-box'>
                  <label>Gender</label>
                  <select
                    name='languages'
                    id='lang'
                    placeholder='user gender'
                    style={{ color: 'gray' }}
                    ref={genderRef}
                  >
                    <option value='0'>Male</option>
                    <option value='1'>Female</option>
                    <option value='-1'>Other</option>
                  </select>
                </div>
                <div className='user-box'>
                  <label>Residential ID</label>
                  <input
                    type='text'
                    name=''
                    required=''
                    placeholder='user residential ID'
                    style={{ color: 'gray' }}
                    ref={resIDRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
