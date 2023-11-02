import { ErrorMessage, Field, Form } from "formik";
import { AiFillCamera } from "react-icons/ai";
import CheckCamera from "./CheckCamera";
import PropTypes from "prop-types";
import { useState } from "react";
import { imageToBase64 } from "../../ulits/imageToBase64";

const FormCheckIn = (props) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
    image,
    setImage,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const handleChangeCameraMobie = (e) => {
    const file = e.target.files[0];
    imageToBase64(file).then((res) => {
      setImage(res);
    });
  };
  return (
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
            className={`text-md capitalize block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none ${
            touched.group && errors.group && "border-red-500"
          }`}
          >
            <option value="">Chọn công đoàn</option>
            <option value="CĐ Công Nghệ">CĐ Công Nghệ</option>
            <option value="CĐ  Kỹ Thuật">CĐ Kỹ Thuật</option>
            <option value="CĐ  Kinh Tế">CĐ Kinh Tế</option>
            <option value="CĐ  Phòng Ban">CĐ Phòng Ban</option>
            <option value="CĐ  Đào Tạo">CĐ Đào Tạo</option>
          </select>
          <p className="text-[12px] h-5 text-red-600">
            <ErrorMessage name="group" />
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
            className={`text-md block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none ${
            touched.name && errors.name && "border-red-500"
          }`}
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
        {isOpen && <CheckCamera setImage={setImage} setIsOpen={setIsOpen} />}
        <div className="w-full">
          <img src={image} className="w-full" alt="" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 text-lg font-semibold 
bg-blue-500 w-full text-white rounded-lg
px-6 py-3 block shadow-xl hover:text-white hover:bg-blue-800"
        >
          {isSubmitting ? "Đang điểm danh" : "Điểm danh"}
        </button>
      </div>
    </Form>
  );
};
FormCheckIn.propTypes = {
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  image: PropTypes.string,
  setImage: PropTypes.func,
};
export default FormCheckIn;
