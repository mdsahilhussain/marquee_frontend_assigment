import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useUserAuth } from "../../../Context/userContext";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Router = useNavigate();
  const { user, logoutHandler } = useUserAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logoutHandler();
    setShowModal(false);
    Router("/");
  };

  return (
    <div className="w-full h-16 fixed shadow-light-shadow bg-white">
      <div className="w-full h-full flex justify-between items-center px-5">
        <div className="flex items-center gap-x-4">
          <FaUserCircle size={24} />
          <div>
            <h1 className="hidden md:flex text-lg font-semibold">
              Welcome, {user?.name.split(" ")[0]}
            </h1>
            <h6 className="text-xs font-semibold text-gray-600">
              {user?.email}
            </h6>
          </div>
        </div>
        <div className="hidden md:flex justify-between items-center gap-x-5">
          <button
            className="bg-red-500 text-white px-4 py-2 shadow-lg rounded-md hover:scale-105 transition-all ease-out flex gap-x-2 items-center"
            onClick={() => setShowModal(true)}
          >
            <MdLogout size={24} />
            Logout
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white rounded-lg p-4 w-96 ">
            <h1 className="text-xl font-semibold mb-1">Logout Confirmation</h1>
            <p className="text-xs font-semibold text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end mt-8">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-200 flex gap-x-2 items-center text-white px-4 py-2 rounded-md hover:bg-red-500"
                onClick={handleLogout}
              >
                <MdLogout size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
