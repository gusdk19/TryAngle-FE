import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/user/user.css";

import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

export default function SUStepTwo({pw, setPW, checkPW, setCheckPW, errors, setErrors}){

    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [showPW, setShowPW] = useState(false);
    const [showCheckPW, setShowCheckPW] = useState(false);

    const validatePassword = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(value);
    };

    const changePW = (e)=>{
        setPW((e.target.value).trim()); 
        setIsValid(validatePassword((e.target.value).trim()));
        const newErrors = pw == checkPW ? [] : ["⚠ 비밀번호가 동일하지 않습니다"];

        if (!isValid) {
            newErrors.push("⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요");
        }
    
        setErrors(newErrors);
    }

    const changeCheckPW = (e)=>{
        setCheckPW((e.target.value).trim()); 
        const newErrors = isValid ? [] : ["⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요"];

        if (pw !== (e.target.value).trim()) {
            newErrors.push("⚠ 비밀번호가 동일하지 않습니다");
        }
    
        setErrors(newErrors);
    }    

    return(
        <div className="mx-[34px]">
            {/* SignUp Two */}
            <h1 className="mt-[30px] text-[25px] font-bold">비밀번호 입력</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="relative flex flex-col gap-1">
                    <input 
                        id="pw" 
                        className="password-input text-[#838687] placeholder-[#d9d9d9]" 
                        // type={showPW ? "text" : "password"} 
                        type="password"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={pw}
                        onChange={(e)=>{changePW(e)}}/>
                    {/* {showPW ? <RiEyeLine className='absolute text-[#838687] w-[20px] h-[20px] top-[10px] right-[10px] cursor-pointer' 
                        onClick={()=>{setShowPW((prev)=>(!prev))}}/> 
                        : <RiEyeCloseLine className='absolute text-[#838687] w-[20px] h-[20px] top-[10px] right-[10px] cursor-pointer' 
                        onClick={()=>{setShowPW((prev)=>(!prev))}}/>} */}
                </div>
                

                {/* 에러 메세지 */}
                {!isValid ? <ul className="mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                    <li>
                        ⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요
                    </li>
                </ul> : <></>}

            </div>
            
            <h1 className="mt-[30px] text-[25px] font-bold">비밀번호 확인</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="relative flex flex-col gap-1">
                    <input 
                        id="checkPW" 
                        className="password-input text-[#838687] placeholder-[#d9d9d9]" 
                        // type={showCheckPW ? "text" : "password"}
                        type='password'
                        placeholder="다시 한 번 비밀번호를 입력해주세요"
                        value={checkPW}
                        onChange={(e)=>{changeCheckPW(e)}}/>
                    {/* {showCheckPW ? <RiEyeLine className='absolute text-[#838687] w-[20px] h-[20px] top-[10px] right-[10px] cursor-pointer' 
                        onClick={()=>{setShowCheckPW((prev)=>(!prev))}}/> 
                        : <RiEyeCloseLine className='absolute text-[#838687] w-[20px] h-[20px] top-[10px] right-[10px] cursor-pointer' 
                        onClick={()=>{setShowCheckPW((prev)=>(!prev))}}/>} */}
                </div>
                

                {/* 에러 메세지 */}
                {pw !== checkPW ? <ul className="mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                    <li>
                        ⚠ 비밀번호가 동일하지 않습니다
                    </li>
                </ul> : <></>}

            </div>
            
        </div>
    )
}