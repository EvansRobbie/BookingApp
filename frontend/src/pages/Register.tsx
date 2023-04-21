import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
  };
  return (
    <div className="relative top-0 left-0 flex grow flex-col items-center w-full justify-center h-screen -mt-16 ">
      <h2 className="py-10 font-bold text-4xl text-gray-600">Sign Up</h2>
      <form
        className="flex flex-col max-w-md mx-auto w-full  gap-4"
        onSubmit={onSubmit}
      >
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-1.5 outline-none border border-gray-800 rounded-full px-6"
          placeholder="John Doe"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-1.5 outline-none border border-gray-800 rounded-full px-6"
          placeholder="johndoe@gmail.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-1.5 outline-none border border-gray-800 rounded-full px-6"
          placeholder="password"
        />
        <button
          className="bg-secondary w-full py-2 text-white font-bold rounded-xl active:scale-105"
          type="submit"
        >
          {" "}
          Register
        </button>
      </form>
      <p className="py-6 text-gray-500">
        Already have an Account?
        <Link
          className="text-gray-950 font-bold underline underline-offset-2"
          to="/login"
        >
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
