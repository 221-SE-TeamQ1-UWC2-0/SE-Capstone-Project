import "./authenticate.css";
import React from "react";



function RegisterView(){


    /*Return function*/    
    return (
        <div className="container">
            <div className="holder" style={{height:'50em', marginTop:'0'}}>
                <div className="login">
                    <div className="login-box" style={{ height:'45em',marginTop:'23em', width:'27em',marginLeft:'16em'}}>
                        <h1 style={{marginTop:'-.8em', marginBottom:'1em'}}>Create an account</h1>
                        <form method="POST" action="" id="register-form">
                            <div className="user-box">
                                <input type="text" name="" required=""/>
                                <label>Fullname</label>
                            </div>
                            <div className="user-box">
                                <input type="text" name="" required=""/>
                                <label>Username</label>
                            </div>
                            <div className="user-box">
                                <input type="date" name="" required="" style={{color:'darkgray'}}/>
                                <label>DOB</label>
                            </div>
                            <div className="user-box">
                                <input type="text" name="" required=""/>
                                <label>Residential ID</label>
                            </div>
                            <div className="user-box">
                                <select name="languages" id="lang" style={{color:"darkgray"}}>
                                    <option value="javascript">Male</option>
                                    <option value="php">Female</option>
                                    <option value="java">Other</option>
                                </select>
                                <label>Gender</label>
                            </div>
                            <div className="user-box">
                                <input type="password" name="" required=""/>
                                <label>Password</label>
                            </div>
                            <div className="user-box">
                                <input type="password" name="" required=""/>
                                <label>Confirm password</label>
                            </div>
                            <div className="user-box">
                                <select name="languages" id="lang" style={{color:"darkgray"}}>
                                    <option value="javascript">Back officer</option>
                                    <option value="php">Collector</option>
                                    <option value="java">Janitor</option>
                                </select>
                                <label>Sign up as</label>
                            </div>
                            <p style={{marginTop:'-1em',color:'white'}}>Already have an account ? <a href="#" style={{color:'#03e9f4', cursor:'pointer'}}>Sign in</a></p>
                            <a href="#" className="btn" style={{marginTop:'0em'}}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Sign up
                            </a>
                        </form>
                    </div>
                </div>
                <div className="image">
                    <div className="holder"> 
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
                    </div>
                    <p style={{marginTop:'35em',color:'rgba(0,0,0,.5)'}}>By signing up, you agree with the <br></br><br></br>
                        <a href="#" style={{color:'#03e9f4', cursor:'pointer'}}> Terms of Use </a> & 
                        <a href="#" style={{color:'#03e9f4', cursor:'pointer'}}> Privacy Policy </a>
                    </p>
                </div>
            </div>
            <div className="decoration">
                <div className="decor0"></div>
                <div className="decor1"></div>
                <div className="decor2"></div>
            </div>
        </div>
        
    );
}
export default RegisterView;
