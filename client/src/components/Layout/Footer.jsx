import React from "react";

import githubIcon from "../../assets/github-icon.png";
import linkedinIcon from "../../assets/linkedin-icon.png";

const Footer = () => {
    return <>
        <footer>
            <div className="bg-gray-100">
                <div className="footer-copyright-info-container border-t-2 border-gray-400 p-4 flex flex-col md:flex-row justify-between items-center text-gray-600" >
                    <p>
                        &copy; {new Date().getFullYear()} Yum Recipe. All rights reserved
                    </p>
                    <div className="total-shots-count-container flex gap-x-2">
                        <a href="https://github.com/harshkumar123456" className="w-8">
                            <img src={githubIcon} alt="github-icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/harsh-kumar-158634233/" className="w-8">
                            <img src={linkedinIcon} alt="github-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </>;
}

export default Footer;