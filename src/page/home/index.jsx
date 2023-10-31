import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import CheckCamera from "./CheckCamera";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/api/students', {
      id: value.id+'',
      name: value.name,
      department: value.khoa,
      classId: value.class,
      image: image
    })
    .then(function (response) {
      console.log(response);
      toast.success("Điểm danh thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  return (
    <div className="bg-white">
      {/* component */}
      <div className="container max-w-full mx-auto py-5 px-6">
        <div className="font-sans">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="mt-6">
                  <div className="mb-5 pb-1border-b-2 text-center font-base text-blue-700">
                    <h1 className="text-4xl font-bold">Điểm danh</h1>
                  </div>
                  <div className="text-center font-semibold text-black">
                    Nhập đầy đủ thông tin
                  </div>
                  <Formik
                    initialValues={{
                      id: "",
                      name: "",
                      khoa: "",
                      class: "",
                    }}
                    validationSchema={Yup.object({
                      id: Yup.string().required("Trường không được để trống"),
                      name: Yup.string().required("Trường không được để trống"),
                      khoa: Yup.string().required("Trường không được để trống"),
                      class: Yup.string().required(
                        "Trường không được để trống"
                      ),
                    })}
                    onSubmit={(value) => handleSubmit(value)}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                    }) => (
                      <Form>
                        <div className="mx-auto max-w-lg mt-8">
                          <div className="py-2">
                            <label
                              htmlFor="name"
                              className="px-1 mb-2 capitalize text-sm text-gray-600"
                            >
                              Chọn Khoa
                            </label>
                            <select
                              name="khoa"
                              id=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="text-md capitalize block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none"
                            >
                              <option value="">Chọn nghành</option>
                              <option value="cntt">CNTT</option>
                              <option value="kt">kế toán</option>
                              <option value="nn">Ngoại ngữ</option>
                            </select>
                            <p className="text-[12px] h-5 text-red-600">
                              <ErrorMessage name="khoa" />
                            </p>
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor="name"
                              className="px-1 mb-2 capitalize text-sm text-gray-600"
                            >
                              Chọn lớp
                            </label>
                            <select
                              name="class"
                              id="class"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="text-md block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none"
                            >
                              <option value="">Chọn lớp</option>
                              <option value="CCQ2111A">CCQ2111A</option>
                              <option value="CCQ2111B">CCQ2111B</option>
                              <option value="CCQ2111C">CCQ2111C</option>
                              <option value="CCQ2111D">CCQ2111D</option>
                              <option value="CCQ2111E">CCQ2111E</option>
                            </select>
                            <p className="text-[12px] h-5 text-red-600">
                              <ErrorMessage name="class" />
                            </p>
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor="id"
                              className="px-1 mb-2 capitalize text-sm text-gray-600"
                            >
                              Mã số sinh viên
                            </label>
                            <Field
                              placeholder="Mã số sinh viên"
                              type="number"
                              id="id"
                              name="id"
                              className="text-md block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none"
                            />
                            <p className="text-[12px] h-5 text-red-600">
                              <ErrorMessage name="id" />
                            </p>
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor="name"
                              className="px-1 mb-2 capitalize text-sm text-gray-600"
                            >
                              Họ và tên
                            </label>
                            <Field
                              placeholder="Họ và tên"
                              type="text"
                              id="name"
                              name="name"
                              className="text-md block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none"
                            />
                            <p className="text-[12px] h-5 text-red-600">
                              <ErrorMessage name="name" />
                            </p>
                          </div>
                          <div className=" my-2">
                            <span
                              onClick={() => setIsOpen(true)}
                              className="w-full cursor-pointer flex items-center justify-center py-2 bg-red-500 text-white rounded-lg"
                            >
                              Mở máy ảnh <AiFillCamera />
                            </span>
                          </div>
                          {isOpen && (
                            <CheckCamera
                              setImage={setImage}
                              setIsOpen={setIsOpen}
                            />
                          )}
                          <div className="w-full">
                            <img src={image} className="w-full" alt="" />
                          </div>
                          <button
                            type="submit"
                            className="mt-3 text-lg font-semibold 
          bg-gray-800 w-full text-white rounded-lg
          px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                          >
                            Điểm danh
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
