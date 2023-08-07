import React, { useEffect } from 'react';
import  { useState } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import DB from '../images/DB4.png';
import { TextField, Button, Typography, Container, Grid, Link } from '@mui/material';
import { SignIn } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
    
  useEffect(()=> {
    localStorage.setItem('jwtToken', null);
    
    
    if(localStorage.getItem('authenticated')=='true') {
      
      navigate("/home/bonds");
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Perform login/authentication logic here
        // For simplicity, let's just call the onLogin callback
        try {
            // const user = await loginUser(username, password);
           
            const jwtToken = await SignIn(username, password);
            if(localStorage.getItem('authenticated')=='true') {
              
              navigate("/home/bonds");
            }
            // onLogin(user.username);
          } catch (error) {
            setErrors({ login: 'Invalid username or password' });
          }
      }
    // Perform login/authentication logic here
    // For simplicity, let's just call the onLogin callback
   
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!username) {
      formIsValid = false;
      newErrors.username = 'Username is required';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
   <div className='center-container'>
        <div className='login-container'>
            <div className="logo" >
                <div style={{display: 'grid', placeItems:'center'}}>
                    
                    <Box
                        component="img"
                        sx={{
                        height: 44,
                        paddingRight: 1,
                        paddingBottom:2
                        }}
                        alt="Your logo."
                        src={DB}
                    />
                    <div style={{color: 'white', fontSize: 25, fontWeight:700}} >Bond Brigade</div>
                </div>
            </div>
            <div className="form">
            <Container maxWidth="xs">
                <div style={{color: '#162784', fontSize: 35, fontWeight:500, display:'flex', flexDirection: 'column',
                alignItems: 'center',}} >Welcome!</div>
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    />
                    <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    error={!!errors.password}
                    helperText={errors.password}
                    />
                    <Button style={{backgroundColor: '#162784', marginTop: '19px', height: '50px'}} type="submit" variant="contained" color="primary" fullWidth>
                    Login
                    </Button>
                    {errors.login && (
                        <Typography variant="body2" color="error" align="center">
                            {errors.login}
                        </Typography>
                    )}
                </form>
            </Container>
            </div>
        </div>
   </div>
  )
}


export default Login
