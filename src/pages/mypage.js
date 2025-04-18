// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Bell, Home, SmileIcon, Trophy, User, Users } from "lucide-react";
import Header from "../components/Header";
import BeforeLoginMP from "../components/MyPage/BeforeLoginMP.js";
import AfterLoginMP from "../components/MyPage/AfterLoginMP.js";
import Footer from "../components/Footer";
import React, { useState } from "react";

export default function MyPage() {
  // Login State (로그인 x : 0, 로그인 o : 1)
  const [login, setLogin] = useState(1);

  const page = "myPage";

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={"마이페이지"}/>
        <hr className="m-0"/>
      
        {/* Main Content */}
        {login === 0 ? 
          <BeforeLoginMP/>
          :<AfterLoginMP/>}
        

        {/* Footer Navigation */}
        <Footer page={page}/>
        
      </div>
    </div>
  );
}
