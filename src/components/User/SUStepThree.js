import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/user/user.css";

export default function SUStepThree({name, setName, phoneNumber, setPhoneNumber, cn, setCN, errors, setErrors}){

    const navigate = useNavigate();

    const [randomCN, setRandomCN] = useState("123456");

    const generateRandomNumber = () => {
        const random = Math.floor(Math.random() * 900000) + 100000; // 100000 ~ 999999
        setRandomCN(random);
    };

    const [isPNValid, setIsPNValid] = useState(true);
    const [isCNValid, setIsCNValid] = useState(true);

    const [sendCN, setSendCN] = useState(false);

    const changePhoneNumber = (e)=>{
        const value = e.target.value;
        setPhoneNumber(value); 

        const str = String(value);
        const hasDash = str.includes("-");
        const isElevenDigits = str.length === 11;

        setIsPNValid(!hasDash && isElevenDigits);

        const newErrors = isCNValid ? [] : ["⚠ 인증번호가 올바르지 않습니다"];

        if (!isPNValid) {
            newErrors.push("⚠ 전화번호 형식이 올바르지 않습니다.");
        }
    
        setErrors(newErrors);
    }

    const changeCN = (e)=>{
        const value = e.target.value;
        setCN(value); 
        setIsCNValid(randomCN === value);

        const newErrors = isPNValid ? [] : ["⚠ 전화번호 형식이 올바르지 않습니다."];

        if (randomCN !== value) {
            newErrors.push("⚠ 인증번호가 올바르지 않습니다");
        }
    
        setErrors(newErrors);
    }

    // Timer
    const [timeLeft, setTimeLeft] = useState(0); // 초 단위
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
        timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        }

        if (timeLeft === 0) {
        setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setTimeLeft(180); // 3분 = 180초
        setIsRunning(true);
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };


    return(
        <div className="mx-[34px]">
            {/* SignUp Three */}
            <h1 className="mt-[30px] text-[25px] font-bold">이름</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <input 
                        id="email" 
                        className="input text-[#838687] placeholder-[#d9d9d9]" 
                        type="text" 
                        placeholder="이름을 입력해주세요"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
            </div>

            <h1 className="mt-[30px] text-[25px] font-bold">휴대폰 번호를 인증해주세요</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <label className="pl-[3px] mb-[10px] text-[#838687] text-[12px]" for="phoneNumber">
                        챌린지 안내 및 상품 수령 등을 위해 이용될 예정입니다.
                    </label>
                    <div className="flex gap-2">
                        <input 
                            id="phoneNumber" 
                            className="flex-1 phone-input text-[#838687] placeholder-[#d9d9d9]
                                appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                            type="number" 
                            placeholder="'-'없이 11자리 번호를 입력해주세요"
                            value={phoneNumber}
                            onChange={(e)=>{changePhoneNumber(e)}}/>
                        <button className={`flex-none py-[8px] px-[10px] text-[14px] rounded-lg
                            ${!isPNValid || phoneNumber.length == 0 ? "bg-[#d9d9d9] text-[#838687] cursor-default" : "bg-[#FAB809] text-white cursor-pointer"}`}
                            onClick={()=>{
                                setSendCN(true); 
                                startTimer();
                                // generateRandomNumber();
                                }}>
                            {sendCN ? "재요청" : "인증요청"}
                        </button>
                    </div>
                </div>

                {/* 에러 메세지 */}
                {!isPNValid ? (
                    <ul className="mt-[0px] px-[5px] text-[12px] text-left text-[red]">
                        <li>⚠ 전화번호 형식이 올바르지 않습니다.</li>
                    </ul>
                ): sendCN && <div>
                    <div className="relative">
                        <input 
                            id="phoneNumber" 
                            className="input text-[#838687] placeholder-[#d9d9d9]" 
                            type="text" 
                            placeholder="인증번호 6자리를 입력해주세요"
                            value={cn}
                            onChange={(e)=>{changeCN(e)}}/>
                        <span className="absolute right-[10px] top-[7px] text-[16px] text-[#838687]">
                            {timeLeft > 0 ? formatTime(timeLeft) : isRunning ? "타이머 종료" : "00:00"}
                        </span>
                    </div>
                    {!isCNValid && <ul className="mt-[6px] px-[5px] text-[12px] text-left text-[red]">
                        <li>⚠ 인증번호가 올바르지 않습니다.</li>
                    </ul>}
                </div>}

            </div>
        </div>
    )
}