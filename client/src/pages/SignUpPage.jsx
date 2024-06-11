import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import User from "../assets/User.png";
import Layout from "../components/Layout/Layout";

import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const SignUpPage = () => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const [auth, setAuth] = useAuth();

    const serverURI = import.meta.env.VITE_SERVER_URI;

    const [passwordEyeCrossed, setPasswordEyeCrossed] = useState(true);

    const handleInputChange = (event) => {
        setUser((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        })
    };

    const handlePasswordEyeClick = () => {
        setPasswordEyeCrossed(!passwordEyeCrossed);
    };

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(user);

        try {
            const response = await axios.post(`${serverURI}/api/v1/auth/register`, user);
            console.log(response.data);

            if (response.data.success) {
                toast.success("Successfully registered....");
                setAuth({ ...auth, user: response.data.user });
                localStorage.setItem("auth", JSON.stringify(response.data));
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
            else {
                toast.error(`${response.data.message}`);
                setAuth({ ...auth, user: null });
                localStorage.removeItem("auth");
                setTimeout(() => {
                    navigate("/sign-up");
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            toast.error(`${error.message}`);
            setAuth({ ...auth, user: null });
            localStorage.removeItem("auth");
            setTimeout(() => {
                navigate("/sign-up");
            }, 2000);
        }
    };

    return <>
        <Layout>
            <div className="sign-up-container my-16 flex flex-col md:flex-row p-4 md:py-0">
                <div className="text-container md:w-1/2 flex flex-col p-4">
                    <div className="heading-container flex flex-col gap-y-4 py-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Sign Up</h2>
                        <p className="text-2xl font-semibold">Can't wait to see your recipes with us...</p>
                    </div>

                    <div className="sign-in-option-image-container flex">
                        <div className="option-text-container pt-4 text-base font-semibold">
                            <p>
                                If you have an account
                            </p>
                            <p>
                                You can <span className="text-[#4D47C3]">
                                    <Link to={"/sign-in"}>
                                        Login Here !
                                    </Link>
                                </span>
                            </p>
                        </div>

                        <div className="image-container hidden md:block">
                            <img src={User} alt="user-image-using-phone" className="w-72" />
                        </div>
                    </div>
                </div>
                <div className="sign-up-form-container md:w-1/4 flex flex-col mt-4 p-4">

                    <h2 className="text-2xl font-semibold hidden md:block">
                        Sign Up
                    </h2>
                    <p className="text-gray-500 font-semibold pb-4">
                        To test use Credentials <br />
                        email: test@yumrecipe.com <br />
                        password: password
                    </p>

                    <form className="flex flex-col gap-y-4 md:gap-y-2" onSubmit={handleFormSubmit}>

                        <input value={user.email} onChange={handleInputChange} type="email" name="email" id="email" className="outline-0 bg-[#F0EFFF] rounded-lg p-4 md:py-3 placeholder:text-[#A7A3FF]" placeholder="Enter email" />

                        <input value={user.name} onChange={handleInputChange} type="text" name="name" id="name" className="outline-0 bg-[#F0EFFF] rounded-lg p-4 md:py-3 placeholder:text-[#A7A3FF]" placeholder="Create user name" />

                        <div className="password-field flex justify-between bg-[#F0EFFF] rounded-lg items-center pe-4">
                            <input value={user.password} onChange={handleInputChange} type={`${passwordEyeCrossed ? "text" : "password"}`} name="password" id="password" className="outline-0 bg-[#F0EFFF] rounded-lg p-4 md:py-3 placeholder:text-[#A7A3FF]" placeholder="Password" />
                            <i className={`fas ${passwordEyeCrossed ? "fa-eye-slash" : "fa-eye"}  text-[#A7A3FF]`} onClick={handlePasswordEyeClick}></i>
                        </div>

                        <div className="password-field flex justify-between bg-[#F0EFFF] rounded-lg items-center pe-4">
                            <input value={user.confirmPassword} onChange={handleInputChange} type={`${passwordEyeCrossed ? "text" : "password"}`} name="confirmPassword" id="confirmPassword" className="outline-0 bg-[#F0EFFF] rounded-lg p-4 md:py-3 placeholder:text-[#A7A3FF]" placeholder="Confirm password" />
                            <i className={`fas ${passwordEyeCrossed ? "fa-eye-slash" : "fa-eye"}  text-[#A7A3FF]`} onClick={handlePasswordEyeClick}></i>
                        </div>

                        <button type="submit" className="bg-[#4D47C3] rounded-lg p-4 md:py-3 my-4 md:mt-0 text-[#FFFFFF]">
                            Register
                        </button>

                    </form>
                </div>
            </div>
        </Layout>

    </>;
};

export default SignUpPage;