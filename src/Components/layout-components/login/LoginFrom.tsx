import { useFormik } from "formik";
import * as Yup from "yup";
import { iLoginInfo } from "../../../interface/Types";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../Context/userContext";

type IProps = {
  loginInfo: iLoginInfo;
  setLoginInfo: (loginInfo: iLoginInfo) => void;
};

const LoginFrom = ({ loginInfo }: IProps) => {
  const { setUser } = useUserAuth();
  const Router = useNavigate();

  function generateToken(length: number) {
    const symbols = "!@#$%^&*()";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const characters = symbols + alphabets + numbers;
    let token = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  }

  const formik = useFormik({
    initialValues: {
      email: loginInfo.email || "",
      password: loginInfo.password || "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const user = localStorage.getItem("user_info");
      const userInfo = user ? JSON.parse(user) : null;

      if (
        userInfo?.email === values.email &&
        userInfo?.password === values.password
      ) {
        const token = generateToken(48);
        localStorage.setItem("token", token);
        setUser(userInfo);
        Router("/home");
      } else {
        alert("Unauthorized!\nUser not found!");
      }
    },
  });

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-pink-600">
      <main className="w-4/5 h-3/5 lg:h-3/4 md:w-2/3 lg:w-1/3 flex justify-center items-center flex-col bg-white">
        <h1 className="text-2xl font-semibold  text-pink-500">Welcome back!</h1>

        <h2 className="text-xl font-medium text-pink-500 mb-10">
          To log in, kindly provide your credentials.
        </h2>

        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col justify-between items-center w-full gap-y-7">
            <div className="flex flex-col w-full items-center">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className={`w-4/5 h-12 px-5 rounded-lg shadow-md outline-btncolor text-gray-600 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500">{formik.errors.email}</span>
              )}
            </div>
            <div className="flex flex-col w-full items-center">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className={`w-4/5 h-12 px-5 rounded-lg shadow-md outline-btncolor text-gray-600 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500">{formik.errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className={`w-4/5 h-12 mb-5 rounded-lg shadow-light-shadow outline-none bg-pink-500 text-white font-bold ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default LoginFrom;
