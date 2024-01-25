import { checkPropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const Pagination = ({
  numPage,
  currentPage,
  totalItems,
  totalCount,
  itemsPerPage,
  setCurrentPage,
}) => {
  const navigate = useNavigate();

  const handleClickNextPage = () => {
    if (currentPage >= Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(Number(currentPage + 1));
    navigate(`?page=${currentPage + 1}`);
  };
  const handleClickPrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
    navigate(`?page=${currentPage - 1}`);
  };
  return (
    <div>
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
        <span className="text-xs xs:text-sm text-gray-900">
          Hiển thị {totalCount} của {totalItems} người dùng
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handleClickPrevPage}
            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          {numPage &&
            [...Array(numPage)].map((item, index) => {
              if (index < currentPage - 5) {
                return;
              } else if (index > currentPage + 3) {
                return;
              }
              return (
                <Link
                  className={`text-sm  hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 ${
                    currentPage === index + 1
                      ? "bg-blue-500 hover:!bg-blue-700 text-white"
                      : "bg-gray-300 hover:!bg-blue-700 hover:text-white"
                  }`}
                  to={`?page=${index + 1}`}
                  key={index}
                >
                  {index + 1}
                </Link>
              );
            })}
          <button
            onClick={handleClickNextPage}
            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
Pagination.propTypes = {
  numPage: checkPropTypes.number,
  currentPage: checkPropTypes.number,
  totalItems: checkPropTypes.number,
  totalCount: checkPropTypes.number,
  itemsPerPage: checkPropTypes.number,
  setCurrentPage: checkPropTypes.func,
};
export default Pagination;
