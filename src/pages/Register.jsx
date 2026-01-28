import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import register from '../assets/register.webp'
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../i18n';
import { useTranslation } from 'react-i18next';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();

useEffect(() => {
  if (user) {
    alert("Registracija uspješna! Prijavite se da nastavite.");
    navigate("/login");
  }
}, [user, navigate]);
console.log("Redux user:", user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Registred', { name, email, password });
        dispatch(registerUser({ name, email, password }));
        setName('');
        setEmail('');
        setPassword('');
        alert("Registracija uspješna! Prijavite se da nastavite.");
        navigate("/login");
    }

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12' style={{width:"100%", height:"100vh"}}>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">Register</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Hey there! 👋
                    </h2>
                    <p className="text-center mb-6">
                        Entrer your username and password to Login
                    </p>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            {t("name")}
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your Name'
                        />
                    </div>

                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder={t("enterEmail")}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Password
                            </label>
                            <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='w-full p-2 border rounded'
                          placeholder={t("enterPassword")}
                            />
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transiton'
              >
                  Sign Up
              </button>
              <p className="mt-6 text-center text-sm">
                  Do you have account? {" "}
                  <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                  
              </p>
                </form>
                </div>
          {/*<div className="hidden md:block w-1/2 bg-gray-800">
              <div className="h-full flex flex-col justify-center items-center">
                  <img
                      src={register}
                      alt="register to Account"
                      className='h-[750px] w-full object-cover'
                  />
              </div>
          
            </div>*/}
            </div>
  )
}

export default Register

/*import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/register", formData);
      alert("Registracija uspješna!");
    } catch (err) {
      alert("Greška: " + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Ime" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Lozinka" onChange={handleChange} />
      <button type="submit">Registruj se</button>
    </form>
  );
};

export default Register;*/