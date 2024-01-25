import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import formathTime from "../../ulits/formathTime";
import { useLocation } from "react-router-dom";
import { useDocumentTitle, useDropDown } from "../../hook";
import { DropDown, DropDownUser, Model, Pagination } from "../../components";
import Detail from "./Detail";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
const Dashboard = () => {
  useDocumentTitle("Quản lý");
  const colRef = collection(db, "students");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [group, setGroup] = useState("");
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page");
  const [isModel, setIsModel] = useState(false);
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page, loading]);
  useEffect(() => {
    const dataPage = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setData(dataPage);
  }, [items, currentPage, itemsPerPage]);
  useEffect(() => {
    fetchData();
  }, [group]);
  async function fetchData() {
    try {
      setLoading(true);
      const items = [];
      await fetchTotalItems();
      let q = query(colRef, where("group", "==", group));
      if (group === "") {
        q = query(colRef, orderBy("created_at", "desc"));
      }
      const snapshot = await getDocs(q);
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.id,
          ...childSnapshot.data(),
        });
      });
      setItems(items);
    } catch (error) {
      console.log("fetchData error: ", error);
    } finally {
      setLoading(false);
    }
  }
  const handleClickDetail = (data) => {
    setIsDetail(true);
    setDataDetail(data);
  };
  const hanldeClickLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };
  const handleDelete = async (id) => {
    const updatedObjectsArray = items.filter((obj) => obj.id !== id);
    const item = data.find((item) => item.id === id);
    try {
      const storageRef = ref(storage, item.image);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, "students", id));
      setItems(updatedObjectsArray);
      toast.success("Đã xóa " + item.magv);
    } catch (error) {
      console.log("handleDelete error: ", error);
    }
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

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleChangeSearch = (e) => {
    setLoading(true);
    setTimeout(() => {
      const searchTerm = e.target.value;
      const results = items.filter((item) =>
        String(item.magv).includes(searchTerm)
      );
      setData(results);
      setLoading(false);
    }, 1000);
  };
  const pagelimit = Math.ceil(items.length / itemsPerPage);
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Danh sách điểm danh
            </h2>
          </div>
          <div className="my-2 flex sm:flex-row justify-between flex-col">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-1 sm:mb-0">
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
                  className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none capitalize focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value="" >tất cả công đoàn</option>
                  <option value="CĐ Công Nghệ">CĐ Công Nghệ</option>
                  <option value="CĐ  Kỹ Thuật">CĐ Kỹ Thuật</option>
                  <option value="CĐ  Kinh Tế">CĐ Kinh Tế</option>
                  <option value="CĐ  Phòng Ban">CĐ Phòng Ban</option>
                  <option value="CĐ  Đào Tạo">CĐ Đào Tạo</option>
                  <option value="CĐ  Đại cương">CĐ Đại cương</option>
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
                  placeholder="Tìm kiến mã Giảng viên / Nhân viên"
                  type="number"
                  onChange={handleChangeSearch}
                  className="appearance-none focus:border-blue-500  sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setIsModel(true)}
                className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent  active:bg-blue-600 hover:bg-blue-700"
              >
                Thống kê chi tiết
              </button>
            </div>
            <DropDownUser hanldeClickLogout={hanldeClickLogout} />
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal overflow-x-auto shadow-md min-h-[100px]">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hình
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mã Giảng Viên/Nhân Viên
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

                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="relative ">
                  {!loading && data?.length === 0 && (
                    <tr className=" w-full mt-2 ml-5 text-xl text-gray-500">
                      <td>Không tồn tại dữ liệu</td>
                    </tr>
                  )}
                  {!loading &&
                    data?.length > 0 &&
                    data?.map((item) => {
                      const date = formathTime({
                        seconds: item.created_at.seconds,
                        nanoseconds: item.created_at.nanoseconds,
                      });
                      return (
                        <tr
                          className=" transition-all duration-300"
                          key={item.id}
                          // onClick={() => handleClickDetail(item)}
                        >
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div
                              onClick={() => handleClickDetail(item)}
                              className="flex cursor-pointer  items-center"
                            >
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={item?.image}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td
                            onClick={() => handleClickDetail(item)}
                            className="px-5 cursor-pointer py-5 border-b border-gray-200 bg-white text-sm"
                          >
                            <div className="ml-3">
                              <p className="text-gray-900 hover:text-blue-500 w-max capitalize whitespace-no-wrap">
                                {item?.magv}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 w-max py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 w-max whitespace-no-wrap">
                              {item?.group}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {date.dayOfWeek + " " + date.formattedDate}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900">{item?.address}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <DropDown
                              data={item}
                              handleDelete={handleDelete}
                              handleDetail={handleClickDetail}
                            />
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
              <Pagination
                numPage={pagelimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                totalCount={itemsPerPage}
              />
              {isDetail && (
                <Detail data={dataDetail} setIsDetail={setIsDetail} />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModel && <Model isModel={isModel} setIsModel={setIsModel} />}
    </div>
  );
};

export default Dashboard;
