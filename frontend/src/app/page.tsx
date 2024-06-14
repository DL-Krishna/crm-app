'use client'
import Digital_lync from "../assets/digital_lync.png"
import HomeLogo from "../assets/homelogo.png"
import Chart from "../assets/3dicons.png"
import Curved from "../assets/Curved.png"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { toast } from "react-toastify"
import { userLogin } from "@/assets/utils/auth.util"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { authLogin } from "@/lib/features/auth/authSlice"
import Loader from "./component/Loader"

export default function Page() {
  const [loginData, setLoginData] = useState<{ username?: string; password?: string }>({ username: 'admin', password: 'admin' });
  const [error, setError] = useState<{ username?: string; password?: string }>({});
  const [loader, setLoader] = useState<Boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { isLoader } = useAppSelector((state) => state?.auth);


  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const newError: { username?: string; password?: string } = {};

    if (!loginData?.username?.trim()) {
      formValid = false
      newError["username"] = "Please enter username"
    }
    //else if (!regex.test(loginData?.username)) {
    //  formValid = false;
    //  newError["username"] = "Please enter a valid username address";
    //}

    if (!loginData?.password?.trim()) {
      formValid = false
      newError["password"] = "Please enter password"
    }
    //else if (loginData?.password?.length < 8) {
    //  formValid = false;
    //  newError["password"] = "Password Must be Minimum of 8 characters";
    //} else if (!regexPassword.test(loginData?.password)) {
    //  formValid = false;
    //  newError["password"] = "Password Must be a number and uppercase and lowercase and unique characters";
    //}
    setError(newError);
    return formValid;
  };

  const handelOnSubmit = () => {
    if (vaidation()) {
      setLoader(true)
      const data = {
        username: loginData.username,
        password: loginData.password
      };

      userLogin(data)
      dispatch(authLogin(data)).unwrap()
        .then((res: any) => {
          if (res?.status === 200) {
            userLogin(res?.data)
            toast.success(res?.data?.message ? res?.data?.message : "Login Successfully");
            router.push('/home')
            setLoader(false)
          }
        })
        .catch((err) => {
          const error = JSON?.parse(err?.message)
          toast.error(error?.message ? error?.message : "Something went wrong");
          setLoader(false)
        });

    }
  }

  return <>
    <div className="flex justify-between">
      <div className=" md:flex justify-center mt-8 md:mt-32 w-[100%] md:w-1/2">
        <div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8">
          <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            <Image src={Digital_lync} alt="Digital Lync" />
          </div>
          <div className="mt-10 bg-[#FFF] self-center border border-[#D8DDE6] p-9 rounded-lg w-[24rem] lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem]">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-normal leading-6 text-gray-900">User Name</label>
              </div>
              <div className="mt-2">
                <input id="username" value={loginData?.username} name="username" type="text" onChange={(e) => handelOnChange(e)} required className="block w-full rounded-lg border border-[#969492] p-1.5 text-gray-900 hover:border h-12 hover:border-sky-500 focus:border-sky-500 focus-visible:border-0  sm:text-sm sm:leading-6" />
                <span className="text-sm text-red-600">{error["username"]}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mt-5">
                <label className="block text-sm font-normal leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input name="password" value={loginData?.password} type="password" onChange={(e) => handelOnChange(e)} required className="block w-full rounded-lg border border-[#969492] p-1.5 text-gray-900 hover:border h-12 hover:border-sky-500 forced-color-adjust-none sm:text-sm sm:leading-6" />
                <span className="text-sm text-red-600">{error["password"]}</span>
              </div>
            </div>
            <div>
              <button disabled={isLoader} type="submit" onClick={() => handelOnSubmit()} className="flex w-full mt-9 justify-center rounded-lg bg-[#0070D2] p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0070d2dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoader ? <Loader size={5} label="Login..." /> : "Login"}</button>
            </div>
            <div className="flex gap-2 mt-8">
              <input type="checkbox" className="h-5 w-5" />
              <span className="font-normal text-sm text-[#54698D]">Remember Me</span>
            </div>
            <div className="text-sm mt-11">
              {/* <a href="#" className="text-sky-600 text-sm font-medium">Forgot password?</a> */}
            </div>
          </div>
          <div className="text-sm mt-5 text-center">
            {/* <a href="#" className="text-sky-600 text-sm font-medium">Don’t have an account?</a> */}
          </div>
          <span className="text-slate-500 text-sm font-medium mt-20 text-center">©2024, All rights reserved</span>
        </div>
      </div>
      <div className="bg-[#FFF] w-1/2 hidden md:block">
        <div className="mt-24 px-14 2xl:px-24">
          <h1 className="text-[#042D60] font-bold text-[2.5rem] leading-[normal]">Manage all you customers
            data in one place</h1>
          <p className="text-[#042D60] font-normal text-lg">Centralize customer data effortlessly. Streamline communication,
            sales, and support for seamless growth.</p>
        </div>
        <div className="mt-24 relative">
          <Image src={Curved} alt="Curved" className="absolute h-[32.5rem] lg:h-[33rem] xl:h-[37.5rem] w-[100%]" />
          <div className="flex justify-center relative px-20">
            <Image src={HomeLogo} alt="HomeLogo" className="w-[25rem]" />
            <Image src={Chart} alt="Chart" className="absolute bottom-9 right-[17%] w-32 lg:right-[12%] xl:right-[16%] 2xl:right-[25%]" />
          </div>
        </div>
      </div>
    </div>
  </>
}