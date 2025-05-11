import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SUFooter({nickname, email, pw, checkPW, name, phoneNumber, cn, errors, step, setStep,
     emailIsExisted, nicknameIsExisted, setErrors, setEmail, setNickname}){

    const navigate = useNavigate();

    const handleStep = ()=>{
        const newErrors = []

        if(step == 1){
            if (emailIsExisted){
                newErrors.push("⚠ 이미 존재하는 이메일입니다");
                setEmail("");
            }
            else if(email.length > 0 && errors.length == 0){
                setStep(2);
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
            if (nicknameIsExisted){
                newErrors.push("⚠ 이미 존재하는 이메일입니다");
                setNickname("");
            }
            else if(nickname.length > 0 && errors.length == 0){
                // api post - 회원가입 (정보 전체 전달)
                navigate("/login");
            }
        }

        setErrors(newErrors);
    }
    
    return(
        <footer className={`absolute w-full h-[70px] bottom-0 left-0 text-[16px] font-semibold
            grid items-center text-center
            ${email.length == 0 || errors.length > 0 ? "bg-[#d9d9d9] text-[#838687] cursor-default" : "bg-[#FAB809] text-white cursor-pointer"}`}
            onClick={()=>{handleStep();}}>
            <div className="">
                다음 <span>{step}</span> / 4
            </div>
        </footer>
    )
}