import React from "react";
import banner from "../../assets/images/challenge/banner.png"

export default function Banner({image}){
    return(
        <div className="w-full h-[160px] mb-3">
            <img className="max-h-[160px] mx-auto" src={image ? image : banner} alt="challenge_thumbnail"/>
        </div>
    )
}