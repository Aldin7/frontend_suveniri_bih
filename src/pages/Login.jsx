import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import login from '../assets/login.webp'
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../i18n';
import { useTranslation } from 'react-i18next';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    /*const handleSubmit = async (e) => {
        e.preventDefault();*/
        /*console.log('User Login', { email, password });
        dispatch(loginUser({ email, password }));*/      
        /*const { user } = useSelector((state) => state.auth);

useEffect(() => {
  if (user) {
    alert("Prijava uspješna!");
    navigate("/profile"); // ili "/profile"
  }
}, [user, navigate]);

console.log("Login response:", user);*/
    /*const userData = {
      email: email,
      password: password
    };

try {
      const res = await axios.post("/api/users/login", userData);
      if (res.data) {
        // spremi korisnika u lokalnu memoriju
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/profile"); // navigacija nakon uspješne prijave
      }
    } catch (error) {
      console.error("Login greška:", error);
    }
  };*/
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    console.log("Email ili lozinka nisu uneseni.");
    return;
  }
  

  try {
    const res = await axios.post("http://localhost:3000/api/users/login", { email, password, });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    console.log("Login successful:", res.data);
    //navigate("/profile");
   const role = res.data.user.role;
if (res.data.user?.role === "admin") {
  navigate("/admin");
} else {
  navigate("/profile");
}
  } catch (error) {
    console.error("Login greška:", error);
  }
};
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12' style={{width:"100%", height:"100vh"}}>
                <form  onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">Log in</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {t("hey")}
                    </h2>
                    <p className="text-center mb-6">
                        {t("enteryour")}
                    </p>
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
              <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transiton'>
                  Sign In
              </button>
              <p className="mt-6 text-center text-sm">
                  {t('haveAccount')}{" "}
                  <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>                  
              </p>
              </form>
            </div>
          </div>
  )
}
export default Login
