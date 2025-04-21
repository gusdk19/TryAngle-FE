import React from "react";
import "../styles/Header.css"
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Header(props){

    const title = props.title ? props.title : "";
    const following = props.following ? props.following : "";
    const follower = props.follower ? props.follower : "";

    console.log(following, follower)
    const navigate = useNavigate();

    return(
        <div className="header flex flex-unwrap grow w-full">
            {title == "친구" ? <div className="back flex-none align-middle cursor-pointer">
                <IoIosArrowBack className="back-icon text-[#4A483F]" 
                    onClick={()=>{
                        if(title == "친구"){
                            navigate("/mypage", {
                                state: {
                                  follower: follower,
                                  following: following,
                                },
                            });
                        } else{
                            navigate(-1);
                        }
                    }} />
            </div> : ""}
            <div className="title flex-1 text-center align-middle">
                <p className="title-text font-['Roboto-Black',Helvetica] font-black text-[#4A483F] text-lg tracking-[0] leading-normal">{title}</p>
            </div>
            {title == "친구" ? "" : <div className="bell flex-none align-middle cursor-pointer">
                <FaRegBell className="bell-icon text-[#4A483F]" />
            </div>}
        </div>
    );
}