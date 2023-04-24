import { useState } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const {user, setUser} =  useUserContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     const {data} =  await axios.post("/login", {
        email,
        password,
      });
      // alert("Logged in Successfully.");
      // console.log(data)
      setUser(data)
      navigate('/')
    } catch (e) {
      alert("Login Failed, Check you credentials");
    }
  };
  if (user){
    return <Navigate to= '/'/>
  }
  return (
    <div className="relative  flex grow flex-col items-center w-full justify-center h-screen opacity-100 ">
      {/* <div className=' w-full h-full text-center'> */}

      <h2 className="py-10 font-bold text-4xl text-gray-600">Login</h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col max-w-md mx-auto w-full items-center gap-4"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full py-1.5 outline-none border border-gray-800 rounded-full px-6"
          placeholder="johndoe@gmail.com"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full py-1.5 outline-none border border-gray-800 rounded-full px-6"
          placeholder="password"
        />
        <button
          className="bg-secondary w-full py-2 text-white font-bold rounded-xl active:scale-105"
          type="submit"
        >
          {" "}
          Log in
        </button>
      </form>
      <p className="py-6 text-gray-500">
        Don't have an Account?
        <Link
          className="text-gray-950 font-bold underline underline-offset-2"
          to="/register"
        >
          {" "}
          Register
        </Link>
      </p>
      {/* </div> */}
    </div>
  );
};

export default Login;
