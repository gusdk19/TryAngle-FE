import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/myChallenge/myChallenge.css";


export default function MyChallenge(){

    const page = "myChallenge";

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
            {/* Header */}
            <Header title={"마이챌린지"}/>
            
            {/* Main Content */}
            
            
    
            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>
        </div>
    )
}