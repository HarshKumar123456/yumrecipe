import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";


function Header() {
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (auth.user) {
            navigate("/my-recipes");
        } else {
            navigate("/sign-in");
        }
    };

    const handleHamburgerClick = () => {
        setSideBarVisible(true);
    }

    const handleCrossClick = () => {
        setSideBarVisible(false);
    }

    const handleSearchInputChange = (e) => {
        console.log("Hello search input");
        console.log(searchInput);
        setSearchInput(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchInput}`);
    }

    useEffect(() => {
        console.log("Auth state in Header:", auth.user);
    }, [auth]);

    return (
        <>
            <header>

                {sideBarVisible ?
                    <>
                        {/* SideBar Starts here */}
                        <nav className="h-fit bg-white flex flex-col p-4 pb-64 border border-e-2">
                            {/* Logo and Links container Starts here  */}
                            <div className="logo-container p-4 flex flex-col gap-x-4">
                                <div className="flex justify-between items-center">
                                    <Link to={"/"} className="cursor-pointer text-4xl text-gray-400 tracking-tighter">
                                        Yum Recipe
                                    </Link>
                                    <h2 className="text-2xl cursor-pointer" onClick={handleCrossClick}>
                                        X
                                    </h2>
                                </div>

                                {/* Button container for Mobile (Small screen size devices) Starts here  */}
                                <div className="button-container flex flex-wrap mt-4 pt-4 gap-x-4 gap-y-4 justify-end">
                                    <form className="flex items-center bg-slate-100 p-2 rounded-lg text-slate-400 w-full" onSubmit={handleFormSubmit}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={17}
                                            height={17}
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            role="img"
                                        >
                                            <path
                                                d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12.814 12.8132L15.5 15.4999"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <input
                                            className="bg-slate-100 outline-none mx-2"
                                            type="text"
                                            name="searchInput"
                                            value={searchInput}
                                            onChange={handleSearchInputChange}
                                            placeholder="Search for recipes mobile"
                                        />
                                    </form>

                                    <button onClick={handleButtonClick} className="px-4 py-2 rounded-md bg-red-500 text-white font-bold">
                                        {auth.user ?
                                            (
                                                <>
                                                    {`${auth.user.name}`}
                                                </>
                                            ) :
                                            (
                                                <>
                                                    Login
                                                </>
                                            )
                                        }
                                    </button>
                                    <Link to={"/recipe/1/create"} className="px-4 py-2 rounded-md bg-green-500 text-white font-bold">
                                        Upload
                                    </Link>
                                </div>
                                {/* Button container for Mobile (Small screen size devices) Ends here  */}


                            </div>
                            {/* Logo and Links container Ends here  */}


                        </nav>
                        {/* SideBar Ends here */}
                    </>

                    :
                    <>
                        <nav className="flex justify-between items-center p-4 border-b-2">
                            {/* Logo and Links container Starts here  */}
                            <div className="logo-container flex items-center gap-x-4">
                                <Link to={"/"} className="cursor-pointer text-4xl text-gray-400 tracking-tighter">
                                    Yum Recipe
                                </Link>

                            </div>
                            {/* Logo and Links container Ends here  */}

                            {/* Button container for Tablet (Middle screen size devices) Starts here  */}
                            <div className="button-container hidden md:flex gap-x-5" onSubmit={handleFormSubmit}>
                                <form className="flex items-center bg-slate-100 p-2 rounded-lg text-slate-400 w-fit" onSubmit={handleFormSubmit}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={17}
                                        height={17}
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        role="img"
                                    >
                                        <path
                                            d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.814 12.8132L15.5 15.4999"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <input
                                        className="bg-slate-100 outline-none mx-2"
                                        type="text"
                                        name="searchInput"
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                        placeholder="Search for recipes..."
                                    />
                                </form>


                                <button onClick={handleButtonClick} className="px-4 py-2 rounded-md bg-violet-500 text-white font-bold">
                                    {auth.user ?
                                        (
                                            <>
                                                {`${auth.user.name}`}
                                            </>
                                        ) :
                                        (
                                            <>
                                                Login
                                            </>
                                        )
                                    }
                                </button>
                                <Link to={"/recipe/1/create"} className="px-4 py-2 rounded-md bg-green-500 text-white font-bold">
                                    Upload
                                </Link>
                            </div>
                            {/* Button container for Tablet (Middle screen size devices) Ends here  */}

                            {/* Hamburger Menu for Mobiles (Smaller screen size devices) Starts here */}
                            <div className="hamburger-container cursor-pointer md:hidden" onClick={handleHamburgerClick}>
                                <svg
                                    className="block h-4 w-4 fill-current"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </div>
                            {/* Hamburger Menu for Mobiles (Smaller screen size devices) Ends here */}
                        </nav>
                    </>}



            </header>
        </>
    );
};

export default Header;