import React from "react";
import "../styles/Header.css"
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import logo_name  from "../assets/images/common/logo_name.png";
import useAuthStore from "./User/UseAuthStore";

export default function Header(props){

    const page = props.page ? props.page : "";
    const title = props.title ? props.title : "";
    const following = props.following ? props.following : "";
    const follower = props.follower ? props.follower : "";
    const userData = props.userData ? props.userData : {};
    const totalReturn = props.totalReturn ? props.totalReturn : "";
    const id = props.id ? props.id : "";

    const location = useLocation();

    const { isLoggedIn, login, logout } = useAuthStore();

    const {back} = location.state || {};

    // console.log(following, follower, totalReturn);
    const navigate = useNavigate();

    return(
        <div className="header flex flex-unwrap grow w-full pt-[4.5px]">
            {/* 로고 (왼쪽) */}
            {(title == "친구" || title == "챌린지 비용 및 보상" || page == "challengeDetail" || title == "권유하기" || title == "로그인" || title == "회원가입" || title == "이메일 찾기" || title == "비밀번호 재설정") 
            ? <div className="back flex-none align-middle cursor-pointer">
                <IoIosArrowBack className="back-icon text-[#4A483F]" 
                    onClick={()=>{
                        if(title == "친구"){
                            navigate("/mypage", {
                                state: {
                                  follower: follower,
                                  following: following,
                                  success:true,
                                  origUserData : userData,
                                },
                            });
                        } 
                        else if(title == "챌린지 비용 및 보상"){
                            navigate("/mypage", {
                                state: {
                                  totalReturn: totalReturn,
                                  success:true,
                                },
                            });
                        }
                        else if(title == "권유하기"){
                            navigate(`/challenge/${id}`, {
                                state: {
                                  tab: "info",
                                },
                            });
                        } 
                        else if(title == "로그인"){
                            if(back){
                                navigate(-1);
                            }else{
                                navigate('/mypage');
                            }
                        } 
                        else{
                            navigate(-1);
                        }
                    }} />
            </div> : ""}

            {(title == "친구" || title == "마이페이지" || title == "챌린지 비용 및 보상" || page == "challengeDetail" || title == "권유하기" || title == "로그인"  || title == "회원가입"  || title == "이메일 찾기" || title == "비밀번호 재설정")
             ? <div className="title flex-1 text-center align-middle">
                    <span className="title-text font-['Roboto-Black',Helvetica] font-black text-[#4A483F] text-lg tracking-[0] leading-normal">
                        {title}
                    </span>
                </div>
             : <div className="logo-name my-auto flex-1 text-left align-middle cursor-pointer" onClick={()=>{navigate("/");}}>
                    <img src={logo_name} alt="try-angle_logo_name"/>
                </div>
            }

            {/* 알림 아이콘 (오른쪽) */}
            {(!isLoggedIn || (title == "친구" || title == "챌린지 비용 및 보상" || page == "challengeDetail"  || title == "권유하기" || title == "로그인" || title == "회원가입"  || title == "이메일 찾기" || title == "비밀번호 재설정"))
             ? "" : <div className="bell flex-none align-middle cursor-pointer">
                <FaRegBell className={`${title == "마이페이지" ? "bell-icon" : "bell-icon2 mt-[2px]"} text-[#4A483F]`} 
                    onClick={()=>{navigate("/alarm");}}/>
            </div>}
        </div>
    );
}