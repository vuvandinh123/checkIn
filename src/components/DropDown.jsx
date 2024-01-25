import { checkPropTypes } from "prop-types";
import { useRef } from "react";
import { GoTrash } from "react-icons/go";
import { VscEye } from "react-icons/vsc";
import { useDropDown } from "../hook";
const DropDown = ({ data, handleDelete, handleDetail }) => {
  const iconRef = useRef(null);
  const dropdowRef = useRef(null);
  const {dropdow, setDropdow} = useDropDown(false, dropdowRef, iconRef);
  return (
    <div>
      <div className="relative inline-block text-left">
        <button
          ref={iconRef}
          onClick={() => setDropdow(!dropdow)}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>

        <div
          ref={dropdowRef}
          id="dropdown-menu"
          className={
            dropdow
              ? "absolute z-10 right-0  mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "hidden"
          }
        >
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <a
              onClick={() => handleDetail(data)}
              className="flex block items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 hover:text-blue-500 cursor-pointer"
              role="menuitem"
            >
              <VscEye />
              Chi tiết
            </a>
            <a
              onClick={() => handleDelete(data.id)}
              className="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 items-center gap-3 cursor-pointer hover:text-red-500"
              role="menuitem"
            >
              <GoTrash />
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
DropDown.propTypes = {
  data: checkPropTypes.object,
  handleDelete: checkPropTypes.func,
  handleDetail: checkPropTypes.func
};
export default DropDown;
