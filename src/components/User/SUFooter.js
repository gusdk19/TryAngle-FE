import React from 'react';
import { useNavigate } from 'react-router-dom';

import bpi_1 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_1.png";

export default function SUFooter({nickname, email, pw, checkPW, name, phoneNumber, cn, errors, step, setStep,
     emailIsExisted, nicknameIsExisted, setErrors, setEmail, setNickname, setSuccess, setOpenModal}){

    const navigate = useNavigate();

    const handleStep = async ()=>{
        const newErrors = []

        if(step == 1){
             try {
                const res = await fetch('http://localhost:8080/user/checkEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                const data = await res.json();
                console.log("email check", data.isSuccess, data.message);

                if(data.isSuccess){
                    if (email.length <= 0){
                        newErrors.push("⚠ 이메일을 입력해주세요.");
                        setEmail("");
                    } else if(email.length > 0 && errors.length == 0){
                        setStep(2);
                    }
                } else{
                    newErrors.push(`⚠ ${data.message}`);
                    setEmail("");
                }
            } catch (error) {
                console.error('이메일 확인 오류:', error);
            }

        }
        else if(step == 2){
            if(pw.length > 0 && checkPW.length > 0 && errors.length == 0){
                setStep(3);
            }
        }
        else if(step == 3){
            if(name.length > 0 && phoneNumber.length > 0  && cn.length > 0 && errors.length == 0){
                setStep(4);
            }
        }
        else if(step == 4){
            
            try {
                const res = await fetch('http://localhost:8080/user/checkNickname', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nickname: nickname }),
                });

                const data = await res.json();
                console.log("nickname check", data.isSuccess)
                if(data.isSuccess){
                    if(nickname.length > 0 && errors.length == 0){
                        try {
                            const res = await fetch('http://localhost:8080/user/signup', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ 
                                    email: email.trim(),
                                    name: name.trim(),
                                    nickname: nickname.trim(),
                                    phone: phoneNumber.trim(),
                                    password: pw.trim(),
                                    description: "오늘의 한 마디",
                                    profileImage: bpi_1
                            })});

                            const data = await res.json();
                            console.log("signup check", data.isSuccess)
                            if(data.isSuccess){
                                setSuccess(true);
                            } else{
                                setSuccess(false)
                            }
                            setOpenModal(true);
                        } catch (error) {
                            console.error('signup 확인 오류:', error);
                        }
                    }
                } else{
                    newErrors.push(`⚠ ${data.message}`);
                    setNickname("");
                }
            } catch (error) {
                console.error('닉네임 확인 오류:', error);
            }
            
        }
        
        setErrors(newErrors);
    }
    
    return(
        <footer className={`absolute w-full h-[70px] bottom-0 left-0 text-[16px] font-semibold
            grid items-center text-center
            ${(step == 4 && nickname.length == 0) || (step == 3 && name.length == 0 && phoneNumber.length == 0) || email.length == 0 || errors.length > 0 ? "bg-[#d9d9d9] text-[#838687] cursor-default" : "bg-[#FAB809] text-white cursor-pointer"}`}
            onClick={()=>{handleStep();}}>
            <div className="">
                다음 <span>{step}</span> / 4
            </div>
        </footer>
    )
}