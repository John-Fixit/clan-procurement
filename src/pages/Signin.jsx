"use client";
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaFileAlt, FaLock } from "react-icons/fa";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { useLogin } from "../service/api/login";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../utils/toastPopUps";
import useCurrentUser from "../hooks/useCurrentUser";
import Button from "../components/shared/ui/Button";

const Signin = () => {
  const { mutate, isPending } = useLogin();

  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { remember: false } });

  const submit = async (values) => {
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

  return (
    <div className="flex flex-col w-full min-h-screen md:grid md:h-screen md:min-h-0 md:grid-cols-12 md:overflow-hidden">
      <div className="md:col-span-7">
        <div className="pattern-4 flex h-full flex-col justify-between overflow-hidden rounded-r-md md:rounded-r-md bg-[#161f42] px-8 py-12 text-white md:px-16 md:py-20 rounded-tr-2xl rounded-br-2xl">
          <div className="space-y-7">
            <p className="font-extrabold text-white text-xl md:text-[2.7rem]">
              INL-Procurement 1.0
            </p>
            <p className="text-xl leading-[1.2]! text-slate-50 md:text-[2.7rem] font-extrabold">
              INTEGRATED PROCUREMENT SYSTEM
            </p>
            <p className="text-base tracking-wide">
              A robust system designed to streamline case management, enhance
              legal workflows, and ensure the security, confidentiality, and
              availability of legal data.
            </p>
          </div>
          <div className="border-1 border-slate-600 rounded-small flex justify-evenly p-6">
            {[
              { name: "Efficiency", icon: FaFileAlt },
              { name: "Confidentiality", icon: FaLock },
              { name: "Case Integrity", icon: HiMiniDocumentCheck },
              { name: "Availability", icon: FaLock },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center flex-col gap-y-2 justify-center"
              >
                <item.icon />
                <p>{item?.name}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-medium text-[0.9rem] tracking-wide">
              Aviation House P.M.B. 21029 Ikeja Murtala Mohammed Airport Ikeja
              Lagos
            </p>
            <p className="font-medium text-[0.9rem] tracking-wide">
              +234-1-472-1521, +234-1-279-0421
            </p>
            <p className="font-medium text-[0.9rem] tracking-wide">
              cpd.gov.ng
            </p>
            <p className="font-medium text-[0.9rem] tracking-wide">
              www.ncaa.gov.ng
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto text-xl md:col-span-5">
        <div className="container my-auto">
          <div className="container py-20">
            <div className="w-full max-w-md mx-auto rounded-xl">
              <div className="mb-10">
                <h1 className="text-4xl font-semibold">Login</h1>
                <p className="mt-3 text-xl">
                  Enter your credentials below to sign in to your account
                </p>
              </div>
              <form onSubmit={handleSubmit(submit)}>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    variant="bordered"
                    autoComplete="true"
                    {...register("username", {
                      required: "username address is required",
                      // pattern: {
                      //   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]+$/,
                      //   message: 'email address is invalid',
                      // },
                    })}
                    errorMessage={errors?.username?.message}
                    classNames={{
                      inputWrapper: "px-4",
                    }}
                    isDisabled={isPending}
                  />
                  <Input
                    label="Password"
                    variant="bordered"
                    type="password"
                    autoComplete="true"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    errorMessage={errors?.password?.message}
                    classNames={{
                      inputWrapper: "px-4",
                    }}
                    isDisabled={isPending}
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  {/* <Controller
                    name="remember"
                    control={control}
                    disabled={isPending}
                    render={({ field }) => (
                      <Checkbox
                        isDisabled={field.disabled}
                        checked={field.value}
                        onChange={field.onChange}
                        className="text-[0.95rem]"
                      >
                        Remember me
                      </Checkbox>
                    )}
                  ></Controller> */}
                </div>
                <Button
                  // color="primary"
                  type="submit"
                  radius="sm"
                  size="lg"
                  className="mt-10 text-base w-full bg-[#161f42] text-white"
                  isLoading={isPending}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
