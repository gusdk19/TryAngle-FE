import React from "react";
import "../styles/Header.css"
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { HiTrophy } from "react-icons/hi2";
import { HiOutlineTrophy } from "react-icons/hi2";
import { PiUserCircleDashed } from "react-icons/pi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { PiUserCircleFill } from "react-icons/pi";
import { TbUser } from "react-icons/tb";
import { PiTriangle } from "react-icons/pi";
import { SiAlchemy } from "react-icons/si";
import { PiTriangleDashedFill } from "react-icons/pi";
import { PiTriangleDashed } from "react-icons/pi";
import { IoTriangleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Footer({page}){

    const navigate = useNavigate();

    // Navigation items data
      const navigationItems = [
        { icon: page == "home" ? <GoHomeFill className="w-[33px] h-[33px] font-semibold mb-[3px] mr-[50px]" />
          : <GoHome className="w-[33px] h-[33px] font-semibold mb-[3px] mr-[50px]" />, 
          label: <span className="font-['Roboto-Black',Helvetica] font-bold text-black text-[13px] text-center tracking-[0] leading-normal mr-[50px]">홈</span>,
          route: "/",
        },
        { icon: page == "ranking" ? <HiTrophy className="w-[31px] h-[33px] mb-[3px] mr-[43px]" />
          : <HiOutlineTrophy className="w-[31px] h-[33px] mb-[3px] mr-[43px]" />, 
          label: <span className="font-['Roboto-Black',Helvetica] font-bold text-black text-[13px] text-center tracking-[0] leading-normal mr-[43px]">랭킹</span>,
          route: "/rank",
        },
        { icon: page == "myChallenge" ? <PiTriangleDashedFill className="w-[33px] h-[33px] font-thin mb-[3px] mr-[35px]" />
          :<PiTriangleDashed className="w-[33px] h-[33px] font-thin mb-[3px] mr-[35px]" />, 
          label: <span className="font-['Roboto-Black',Helvetica] font-bold text-black text-[13px] text-center tracking-[0] leading-normal mr-[35px]">마이챌린지</span>,
          route: "/mychallenge",
        },
        { icon: page == "myPage" ?  <PiUserCircleDuotone className="w-[36px] h-[36px] mb-[1px] mt-[-2px]" />
          : <PiUserCircleDashed className="w-[36px] h-[36px] mb-[1px] mt-[-2px]" />,
          label: <span className="font-['Roboto-Black',Helvetica] font-bold text-black text-[13px] text-center tracking-[0] leading-normal ">마이페이지</span>,
          route: "/mypage",
        },
      ];
    

    return(
        <footer className="absolute w-full h-[70px] bottom-0 left-0 bg-white px-4 pt-2">
          <div className="flex justify-evenly items-start">
            {navigationItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer" onClick={()=>{navigate(item.route);}}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </footer>
    );
}