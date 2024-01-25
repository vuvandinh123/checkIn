import { checkPropTypes } from "prop-types";
import { useRef } from "react";
import { IoExitOutline } from "react-icons/io5";
import { useDropDown } from "../hook";
const DropDownUser = ({ hanldeClickLogout }) => {
  const iconRef = useRef(null);
  const dropdowRef = useRef(null);
  const { dropdow, setDropdow } = useDropDown(false, dropdowRef, iconRef);
  return (
    <div>
      <div className="flex justify-center">
        <div className="relative inline-block">
          {/* Dropdown toggle button */}
          <button
            ref={iconRef}
            onClick={() => setDropdow(!dropdow)}
            className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
          >
            <span className="mx-1">Admin</span>
            <svg
              className="w-5 h-5 mx-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            ref={dropdowRef}
            className={
              dropdow
                ? "absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black py-3 ring-opacity-5 focus:outline-none"
                : "hidden"
            }
          >
            <a className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white">
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                alt="jane avatar"
              />
              <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  admin@gmail.com
                </p>
              </div>
            </a>
            <hr className="border-gray-200 dark:border-gray-700 " />
            <span
              onClick={() => hanldeClickLogout()}
              className="block hover:text-red-500 cursor-pointer px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 flex items-center justify-between gap-3 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Sign Out <IoExitOutline className="text-base" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
DropDownUser.propTypes = {
  hanldeClickLogout: checkPropTypes.func,
};
export default DropDownUser;
