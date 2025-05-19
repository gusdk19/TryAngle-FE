import Header from "../components/Header";
import BeforeLoginMP from "../components/MyPage/BeforeLoginMP.js";
import AfterLoginMP from "../components/MyPage/AfterLoginMP.js";
import useAuthStore from "../components/User/UseAuthStore.js";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MyPage() {

  const location = useLocation();

  const { isLoggedIn, login, logout } = useAuthStore();
  // const {success} = location.state || {};

  console.log(isLoggedIn, "isLoggedIn");

  const page = "myPage";

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={"마이페이지"}/>
        <hr className="m-0"/>
      
        {/* Main Content */}
        {!isLoggedIn ? 
          <BeforeLoginMP />
          :<AfterLoginMP logout={logout}/>}
        

        {/* Footer Navigation */}
        <Footer page={page}/>
        
      </div>
    </div>
  );
}
