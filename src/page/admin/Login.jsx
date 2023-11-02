import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setCheckAuth, setUser }) => {
  const handleSubmit = async (values) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(res.user);
      localStorage.setItem("auth", res.user.accessToken);
      setUser(res);
      setCheckAuth(true);
      // Đăng nhập thành công, xử lý redirect hoặc hiển thị thông báo
      toast.success("Đăng nhập thành công");
    } catch (error) {
      // Xử lý lỗi đăng nhập
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px] overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="
                  max-w-[525px]
                  mx-auto
                  text-center
                  bg-white
                  rounded-lg
                  relative
                  overflow-hidden
                  py-16
                  px-10
                  sm:px-12
                  md:px-[60px]
                  "
              >
                <div className="mb-10 flex justify-center md:mb-16 text-center">
                  <img
                    src="https://sinhvien.hitu.edu.vn/Content/AConfig/images/sv_logo_dashboard.png"
                    alt=""
                  />
                 
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Email không hợp lệ")
                      .required("Trường này không được để trống"),
                    password: Yup.string().required(
                      "Trường này không được để trống"
                    ),
                  })}
                  onSubmit={(value, { resetForm, setSubmitting }) =>
                    handleSubmit(value, resetForm, setSubmitting)
                  }
                >
                  {({ values }) => (
                    <Form>
                      <div className="mb-6">
                        <Field
                          type="text"
                          placeholder="Email"
                          name="email"
                          className="
                           w-full
                           rounded-md
                           border
                           bordder-[#E9EDF4]
                           py-3
                           px-5
                           bg-[#FCFDFE]
                           text-base text-body-color
                           placeholder-[#ACB6BE]
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                        />
                        <p className="text-[12px] text-left h-5 text-red-600">
                          <ErrorMessage name="email" />
                        </p>
                      </div>
                      <div className="mb-6">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="
                           w-full
                           rounded-md
                           border
                           bordder-[#E9EDF4]
                           py-3
                           px-5
                           bg-[#FCFDFE]
                           text-base text-body-color
                           placeholder-[#ACB6BE]
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                        />
                        <p className="text-[12px] text-left h-5 text-red-600">
                          <ErrorMessage name="password" />
                        </p>
                      </div>
                      <div className="mb-10">
                        <button
                          className="
                           w-full
                           rounded-md
                           border
                           border-blue-800
                           py-3
                           px-5
                           bg-blue-500
                           text-base text-white
                           cursor-pointer
                           hover:bg-opacity-90
                           transition
                           "
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
