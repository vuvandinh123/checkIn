import {
  collection,
  getDocs,
  query,
  orderBy,
  limitToLast,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import formathTime from "../../ulits/formathTime";
const Dashboard = () => {
  const colRef = collection(db, "students");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [group, setGroup] = useState("");
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, group]);
  async function fetchData() {
    try {
      setLoading(true);
      await fetchTotalItems();
      const items = [];
      const startIndex = (currentPage - 1) * itemsPerPage;
      if (group) {
        const snapshot = await getDocs(
          query(
            colRef,
            where("group", "==", group),
            orderBy("created_at", "desc"),
            limitToLast(startIndex + itemsPerPage)
          )
        );
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.id,
            ...childSnapshot.data(),
          });
        });
      } else {
        const snapshot = await getDocs(
          query(
            colRef,
            orderBy("created_at", "desc"),
            limitToLast(startIndex + itemsPerPage)
          )
        );
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.id,
            ...childSnapshot.data(),
          });
        });
      }

      const serializedData = items
        .slice(0, itemsPerPage)
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((item) => ({
          ...item,
        }));

      setItems(serializedData);
    } catch (error) {
      console.log("fetchData error: ", error);
    } finally {
      setLoading(false);
    }
  }
  const hanldeClickLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };
  const fetchTotalItems = async () => {
    try {
      const snapshot = await getDocs(colRef);
      const totalCount = snapshot?.size || 0;
      setTotalItems(totalCount);
    } catch (error) {
      console.log("fetchTotalItems error: ", error);
    }
  };
  const handleClickNextPage = () => {
    if (currentPage >= Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(Number(currentPage + 1));
  };
  const handleClickPrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
          </div>
          <div className="my-2 flex sm:flex-row justify-between flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  onChange={handlePerPageChange}
                  className="appearance-none h-full rounded-l border block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={100}>100</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  onChange={(e) => setGroup(e.target.value)}
                  className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value="">Chọn công đoàn</option>
                  <option value="CĐ Công Nghệ">CĐ Công Nghệ</option>
                  <option value="CĐ  Kỹ Thuật">CĐ Kỹ Thuật</option>
                  <option value="CĐ  Kinh Tế">CĐ Kinh Tế</option>
                  <option value="CĐ  Phòng Ban">CĐ Phòng Ban</option>
                  <option value="CĐ  Đào Tạo">CĐ Đào Tạo</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>

            <span
              onClick={hanldeClickLogout}
              className="cursor-pointer  text-red-500  underline"
            >
              Đăng xuất
            </span>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal min-h-[100px]">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Công đoàn
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 text-center uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Địa chỉ
                    </th>
                  </tr>
                </thead>
                <tbody className="relative ">
                  {!loading && items?.length === 0 && (
                    <tr className=" w-full mt-2 ml-5 text-xl text-gray-500">
                      <td>Không tồn tại dữ liệu</td>
                    </tr>
                  )}
                  {!loading &&
                    items?.length > 0 &&
                    items?.map((item) => {
                      const date = formathTime({
                        seconds: item.created_at.seconds,
                        nanoseconds: item.created_at.nanoseconds,
                      });
                      return (
                        <tr key={item.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={item.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.group}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {date.dayOfWeek + " " + date.formattedDate}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.address}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  {loading && (
                    <>
                      <div className="absolute bg-white inset-0 bottom-0 flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                      </div>
                    </>
                  )}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Hiển thị 1 đến {items?.length} của {totalItems} người dùng
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    onClick={handleClickPrevPage}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleClickNextPage}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
