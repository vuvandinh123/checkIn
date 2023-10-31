import { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import CheckCamera from "./CheckCamera";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Home = () => {
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleChangeCameraMobie = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (value, resetForm, setSubmitting) => {
    const colRef = collection(db, "students");
    if (!image) {
      toast.error("Vui lòng chụp ảnh", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSubmitting(false);
      return;
    }
    addDoc(colRef, {
      Id_student: value.id + "",
      name: value.name,
      group: value.group,
      image: image,
    })
      .then(() => {
        toast.success("Điểm danh thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm();
        setImage("");
        setSubmitting(false);
      })
      .catch(() => {
        toast.error("Điểm danh không thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    // axios
    //   .post("http://localhost:8080/api/students", {
    //     id: value.id + "",
    //     name: value.name,
    //     department: value.khoa,
    //     classId: value.class,
    //     image: image,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     toast.success("Điểm danh thành công", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <div className="bg-white py-20">
      {/* component */}
      <div className="container max-w-full mx-auto py-5 px-6">
        <div className="font-sans">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="mt-6">
                  <div className="mb-5 pb-1border-b-2 text-center font-base text-blue-700">
                    <h2 className="text-xl mb-3 font-bold">{`Điểm Danh Cuộc Thi `}</h2>
                    <h1 className="text-2xl font-bold text-red-500">
                      VANG MÃI NHỮNG LỜI CA
                    </h1>
                  </div>
                  <div className="text-center text-[15px] font-semibold text-gray-500">
                    Nhập đầy đủ thông tin
                  </div>
                  <Formik
                    initialValues={{
                      id: "",
                      name: "",
                      group: "",
                    }}
                    validationSchema={Yup.object({
                      id: Yup.string().required("Trường không được để trống"),
                      name: Yup.string().required("Trường không được để trống"),
                      group: Yup.string().required(
                        "Trường không được để trống"
                      ),
                    })}
                    onSubmit={(value, { resetForm, setSubmitting }) =>
                      handleSubmit(value, resetForm, setSubmitting)
                    }
                  >
                    {({ values, handleChange, handleBlur, isSubmitting }) => (
                      <Form>
                        <div className="mx-auto max-w-lg mt-8">
                          <div className="py-2">
                            <label
                              htmlFor="name"
                              className="px-1 mb-2 capitalize text-sm text-gray-600"
                            >
                              Chọn công đoàn
                            </label>
                            <select
                              name="group"
                              id=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.group}
                              className="text-md capitalize block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none"
                            >
                              <option value="">Chọn công đoàn</option>
                              <option value="CĐ Công Nghệ">CĐ Công Nghệ</option>
                              <option value="CĐ  Kỹ Thuật">CĐ Kỹ Thuật</option>
                              <option value="CĐ  Kinh Tế">CĐ Kinh Tế</option>
                              <option value="CĐ  Phòng Ban">
                                CĐ Phòng Ban
                              </option>
                              <option value="CĐ  Đào Tạo">CĐ Đào Tạo</option>
                            </select>
                            <p className="text-[12px] h-5 text-red-600">
                              <ErrorMessage name="group" />
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
                            {!isMobile ? (
                              <span
                                onClick={() => setIsOpen(true)}
                                className="w-full cursor-pointer flex items-center justify-center py-2 bg-red-500 text-white rounded-lg"
                              >
                                Mở máy ảnh <AiFillCamera />
                              </span>
                            ) : (
                              <div>
                                <label htmlFor="file">
                                  <span className="w-full cursor-pointer flex items-center justify-center py-2 bg-red-500 text-white rounded-lg">
                                    Mở máy ảnh <AiFillCamera />
                                  </span>
                                  <input
                                    className="hidden"
                                    id="file"
                                    type="file"
                                    onChange={handleChangeCameraMobie}
                                    capture="environment"
                                  />
                                </label>
                              </div>
                            )}
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
                            disabled={isSubmitting}
                            className="mt-3 text-lg font-semibold 
          bg-gray-800 w-full text-white rounded-lg
          px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                          >
                            {isSubmitting ? "Đang điểm danh" : "Điểm danh"}
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
