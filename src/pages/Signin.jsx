/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "../assets/images/ncaa_logo.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../utils/toastPopUps";
import { useLogin } from "../service/api/login";
import useCurrentUser from "../hooks/useCurrentUser";
import Button from "../components/shared/ui/Button";
const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const { mutate, isPending } = useLogin();

  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const payload = {
      username: values?.username,
      password: values?.password,
    };

    mutate(payload, {
      onError: (error) => {
        const errMsg = error?.response?.data?.message || error?.message;
        errorToast(errMsg);
      },
      onSuccess: (response) => {
        const resData = response?.data;

        setCurrentUser(resData);
        navigate("/dashboard");
      },
    });
  };

  //password visible function
  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <main
        className={`relative w-full bg-gray-300 flex flex-col space-y-5 items-center justify-center h-screen px-3`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "center",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            filter: "blur(10px)", // Blurs the background image
          }}
        ></div>

        <section className="absolute form_section w-[90%] lg:w-[45vw] xl:w-[30vw] md:w-[55vw] rounded-md bg-white shadow-lg md:p-10 p-5">
          <div className="form_header flex flex-col items-center gap-y-4 text-center pb-3">
            <div className="flex items-center gap-x-1">
              <img
                src={logo}
                alt="communeety logo"
                width={40}
                className="cursor-pointer"
              />
              <span className="font-bold leading-3 text-lg text-[#2c3679]">
                EDAP
              </span>
            </div>
            <div>
              <h4 className="text-gray-700 text-xl font-medium">Login</h4>
              <p className="text-gray-400 font-medium text-xs mb-6">
                Access to our dashboard
              </p>
            </div>
          </div>
          <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="email_address flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="font-medium text-gray-600 text-sm"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("username", { required: true })}
                placeholder="Email address or ID"
                className="mt-1 w-full border border-gray-300 bg-white py-3 lg:py-[0.6rem] px-3 focus:outline-none text-gray-800 rounded-lg text-[13px]"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="password flex flex-col space-y-1 ">
              <div className="password_label flex justify-between">
                <label
                  htmlFor="Password"
                  className="font-medium text-gray-600  text-sm"
                >
                  Password
                </label>
                <label
                  htmlFor="Forgot_password"
                  className="font-medium text-[#8e8e8e] text-xs cursor-pointer"
                >
                  Forgot Password?
                </label>
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="Password"
                  name="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="mt-1 w-full border border-gray-300 bg-white py-3 lg:py-[0.6rem] px-3 focus:outline-none text-gray-800 rounded-lg text-[13px]"
                />
                <span
                  className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-600  cursor-pointer"
                  onClick={handlePasswordVisibleChange}
                >
                  {passwordVisible ? (
                    <FaEye size={"18px"} />
                  ) : (
                    <FaEyeSlash size={"18px"} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="lg"
              radius="sm"
              isLoading={isPending}
            >
              Login
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Signin;
