import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Toaster } from "react-hot-toast";

function Layout(props) {
    return (
        <>
            <Header />
            
            <Toaster
                position="bottom-right"
                reverseOrder={true}
            />

            {props.children}

            <Footer />
        </>
    );
};

export default Layout;