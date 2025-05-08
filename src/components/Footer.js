import React from "react";
import "../styles/Header.css";
import "../styles/Footer.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiTrophy, HiOutlineTrophy } from "react-icons/hi2";
import { PiUserCircleDashed, PiUserCircleDuotone, PiTriangleDashedFill, PiTriangleDashed } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Footer({ page }) {
  const navigate = useNavigate();

  const navigationItems = [
    {
      icon: page === "home" ? <GoHomeFill className="icon" /> : <GoHome className="icon" />,
      label: "홈",
      route: "/",
    },
    {
      icon: page === "ranking" ? <HiTrophy className="icon" /> : <HiOutlineTrophy className="icon" />,
      label: "랭킹",
      route: "/rank",
    },
    {
      icon: page === "myChallenge" ? <PiTriangleDashedFill className="icon" /> : <PiTriangleDashed className="icon" />,
      label: "마이챌린지",
      route: "/mychallenge",
    },
    {
      icon: page === "myPage" ? <PiUserCircleDuotone className="icon" /> : <PiUserCircleDashed className="icon" />,
      label: "마이페이지",
      route: "/mypage",
    },
  ];

  return(
    <footer className="footer">
      <div className="footer-content">
        {navigationItems.map((item, index) => (
          <div key={index} className="footer-item" onClick={()=>{navigate(item.route);}}>
            <div className="icon-wrapper">{item.icon}</div>
            <span className="footer-label">{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
);
}