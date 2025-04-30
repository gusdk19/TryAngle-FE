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

export default function Footer({ page }) {
  const navigate = useNavigate();

  const navigationItems = [
    {
      icon: page === 'home' ? <GoHomeFill className="icon" /> : <GoHome className="icon" />,
      label: '홈',
      route: '/',
    },
    {
      icon: page === 'ranking' ? <HiTrophy className="icon" /> : <HiOutlineTrophy className="icon" />,
      label: '랭킹',
      route: '/rank',
    },
    {
      icon: page === 'myChallenge'
        ? <PiTriangleDashedFill className="icon" />
        : <PiTriangleDashed className="icon" />,
      label: '마이챌린지',
      route: '/mychallenge',
    },
    {
      icon: page === 'myPage'
        ? <PiUserCircleDuotone className="icon" />
        : <PiUserCircleDashed className="icon" />,
      label: '마이페이지',
      route: '/mypage',
    },
  ];

  return (
    <footer className="w-full h-[70px] bg-white px-4 pt-2">
      <div className="flex justify-evenly items-start">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <span className="text-[13px] font-bold text-black text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}