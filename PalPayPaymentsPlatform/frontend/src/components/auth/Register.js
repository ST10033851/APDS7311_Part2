import { React, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {color2, account_circle, lock, mail, name_icon, account_number_icon, id_icon } from '../../assets'

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [IDNumber, setIDNumber] = useState('');
    const [accountNumber, setaccountNumber] = useState('');
    const [fullName, setfullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //This is used to post the username, email and password to the register end point
    //and redirects the user back to the home page after a successfull registration
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      //This will just check if all the fields have been filled
      if (!username || !email || !password || !fullName || !IDNumber || !accountNumber) {
          setError("Please fill in all the required fields.");
          return;
      }
  
      try {
          const response = await axios.post('/api/auth/register', {username, email, password, fullName, IDNumber, accountNumber});
  
          if (response.status === 201) {
              localStorage.setItem('token', response.data.token);
              navigate('/login');
          }
  
      } catch (err) {
          if (err.response) {
              setError(err.response.data.message);
          } else {
              setError("Something went wrong. Please try again.");
          }
      }
  };
  
    //This function will check if the id number entered is 13 digits long
    const handleIDNumberChange = (e) => {
      const value = e.target.value;
      setIDNumber(value);
  
      const idRegex = /^\d{13}$/;
      if (!idRegex.test(value)) {
        setError('ID number must be 13 digits.');
      } else {
        setError('');
      }
    };
  
    //This function will check if the account number will be between 10 to 12 digits long
    const handleAccountNumberChange = (e) => {
      const value = e.target.value;
      setaccountNumber(value);
  
      const accountRegex = /^\d{10,12}$/;
      if (!accountRegex.test(value)) {
        setError('Account number must be between 10 to 12 digits.');
      } else {
        setError('');
      }
    };

    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
  
      //This will check if the password has 8 characters and atleast 1 number
      const passwordRegex = /^(?=.*[0-9])(?=.{8,})/;
  
      if (!passwordRegex.test(newPassword)) {
          setError('Password must be at least 8 characters long and contain at least one number.');
      } else {
          setError('');
      }
  };
    
    return(
        <div className="bg-primary bg-cover h-screen flex justify-center items-center">
          <div className='absolute z-[0] w-[20%] h-[35%] top-0 pink__gradient'/>
          <div className='absolute z-[0] w-[20%] h-[50%] right-20 bottom-20 blue__gradient rounded'/>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[80vh] mt-[-15vh] flex">
            <div className="w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-semibold mb-8 text-center">Register</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-2">
                  <label htmlFor="fullName">
                    <img src={name_icon} alt="fullName" className="w-6 h-6"/>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                    autoComplete="true"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="username">
                    <img src={account_circle} alt="account" className="w-6 h-6"/>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="true"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="email">
                    <img src={mail} alt="email" className="w-6 h-6"/>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="true"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="IDNumber">
                    <img src={id_icon} alt="IDNumber" className="w-6 h-6"/>
                  </label>
                  <input
                    type="text"
                    id="IDNumber"
                    name="IDNumber"
                    placeholder="ID number"
                    value={IDNumber}
                    onChange={handleIDNumberChange}
                    autoComplete="true"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="accountNumber">
                    <img src={account_number_icon} alt="accountNumber" className="w-6 h-6"/>
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    autoComplete="true"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="password">
                    <img src={lock} alt="passwordImg" className="w-6 h-6"/>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
      
                {error && <p className="text-red-500">{error}</p>}
      
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                  Register
                </button>
              </form>
            </div>
      
            <div className="w-1/2 bg-cover bg-right rounded-r-lg" style={{ backgroundImage: `url(${color2})` }}>
            </div>
          </div>
        </div>
    )
}

export default Register;