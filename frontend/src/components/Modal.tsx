import { RefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useUserContext } from "../context/UserContext";

type modalProp = {
  modalRef: RefObject<HTMLDivElement>;
};
const Modal = ({ modalRef }: modalProp) => {
  const { handleModal } = useGlobalContext();
  const { user, handleLogout } = useUserContext();
  return (
    <div
      ref={modalRef}
      className="absolute top-20 right-9 bg-black/50 w-64 h-[28vh] opacity-100 z-20 bg-white rounded-xl shadow-md border border-gray-100/50 shadow-gray-300 flex items-center"
    >
      <div
        onClick={handleModal}
        className="flex flex-col items-start justify-around py-2 w-full h-full"
      >
        {user ? (
          <>
            <Link
              className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 px-4"
              to="/account"
            >
              Account
            </Link>
            <span
              className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 px-4"
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        ) : (
          <>
            <Link
              className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 px-4"
              to="/register"
            >
              Sign up
            </Link>

            <Link
              className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 text-gray-500 px-4"
              to="/login"
            >
              Log in
            </Link>
          </>
        )}

        <div className="border-b border w-full h-0 font-thin" />
        <Link
          className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 text-gray-500 px-4"
          to="/"
        >
          Airbnb your home
        </Link>

        <Link
          className="text-sm font-semibold hover:bg-gray-300/20 w-full py-2 text-gray-500 px-4"
          to="/"
        >
          Help
        </Link>
      </div>
    </div>
  );
};

export default Modal;
