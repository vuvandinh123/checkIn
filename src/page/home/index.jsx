import {  useState } from "react";
import * as Yup from "yup";
import {Formik } from "formik";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import base64ToBlob from "../../ulits/base64";
import { useAddress } from "../../hook";
import Loading from "../../components/Loading";
import FormCheckIn from "./FormCheckIn";

const Home = () => {
  const [image, setImage] = useState("");
  const colRef = collection(db, "students");
  const [loading, setLoading] = useState(false);
  const { address, userPosition } = useAddress();
  const handleSubmit = async (value, resetForm, setSubmitting) => {
    if (!image) {
      toast.error("Vui lòng chụp ảnh");
      setSubmitting(false);
      return;
    }
    setLoading(true);
    const img = base64ToBlob(image);
    const imageName = Math.random().toString(36).substring(2);
    const storageRef = ref(storage, `images/${imageName}`);
    let url = "";
    try {
      await uploadBytes(storageRef, img);
      url = await getDownloadURL(storageRef);
      await addDoc(colRef, {
        magv: value.magv,
        group: value.group,
        image: url,
        address: address || "No address",
        position: JSON.stringify(userPosition || "No address"),
        created_at: new Date(),
      })
        .then(() => {
          toast.success("Điểm danh thành công");
          resetForm();
          setImage("");
          setSubmitting(false);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Điểm danh không thành công");
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      alert(JSON.stringify(error));
      toast.error("Lỗi upload");
      setLoading(false);
    }
  };
  return (
    <div className="bg-white pb-20">
      {loading && <Loading />}
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
                      magv: "",
                      group: "",
                    }}
                    validationSchema={Yup.object({
                      magv: Yup.string()
                        .length(6, "Mã giáo viên không đúng")
                        .required("Vui lòng nhập"),
                      group: Yup.string().required("vui lòng chọn công đoàn"),
                    })}
                    onSubmit={(value, { resetForm, setSubmitting }) =>
                      handleSubmit(value, resetForm, setSubmitting)
                    }
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      errors,
                      touched,
                    }) => (
                      <FormCheckIn
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isSubmitting={isSubmitting}
                        errors={errors}
                        touched={touched}
                        setImage={setImage}
                        image={image}
                      />
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
