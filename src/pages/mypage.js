import Header from "../components/Header";
import BeforeLoginMP from "../components/MyPage/BeforeLoginMP.js";
import AfterLoginMP from "../components/MyPage/AfterLoginMP.js";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MyPage() {

  const location = useLocation();

  const {success} = location.state || {};

  // Login State (로그인 x : 0, 로그인 o : 1)
  const [login, setLogin] = useState(success == undefined ? 0 : success);

  console.log(login, "login");

  const page = "myPage";

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={"마이페이지"}/>
        <hr className="m-0"/>
      
        {/* Main Content */}
        {login === 0 ? 
          <BeforeLoginMP setLogin={setLogin}/>
          :<AfterLoginMP setLogin={setLogin}/>}
        

        {/* Footer Navigation */}
        <Footer page={page}/>
        
      </div>
    </div>
  );
}
