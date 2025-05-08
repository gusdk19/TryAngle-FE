import React from "react";
import "../styles/Header.css";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo_name from "../assets/images/common/logo_name.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header flex flex-unwrap w-full pt-[4.5px]">
      {/* 로고 (왼쪽) */}
      <div className="logo-name my-auto flex-1 text-left align-middle cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo_name} alt="try-angle_logo_name" />
      </div>

      {/* 알림 아이콘 (오른쪽) */}
      <div className="bell flex-none align-middle cursor-pointer">
        <FaRegBell
          className="bell-icon2 mt-[2px] text-[#4A483F]"
          onClick={() => navigate("/alarm")}
        />
      </div>
    </div>
  );
}