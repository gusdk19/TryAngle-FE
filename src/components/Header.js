import React from "react";
import "../styles/Header.css"
import { FaRegBell } from "react-icons/fa";

export default function Header({title}){

    return(
        <div className="header flex flex-unwrap grow w-full">
            <div className="title flex-1 text-center align-middle">
                <p className="title-text font-['Roboto-Black',Helvetica] font-black text-[#4A483F] text-lg tracking-[0] leading-normal">{title}</p>
            </div>
            <div className="bell flex-none align-middle">
                <FaRegBell className="bell-icon text-[#4A483F]" />
            </div>
        </div>
    );
}