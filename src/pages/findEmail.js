import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/user/user.css";
import useAuthStore from "../components/User/UseAuthStore";

export default function FindEmail() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { user_token } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const { prevPage } = location.state || {};

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cn, setCN] = useState("");
  const [randomCN, setRandomCN] = useState("123456");
  const [errors, setErrors] = useState([]);

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 900000) + 100000; // 100000 ~ 999999
    setRandomCN(random);
  };

  const [isPNValid, setIsPNValid] = useState(true);
  const [isCNValid, setIsCNValid] = useState(true);

  const [sendCN, setSendCN] = useState(false);

  const changePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    const str = String(value);
    const hasDash = str.includes("-");
    const isElevenDigits = str.length === 11;

    setIsPNValid(!hasDash && isElevenDigits);

    const newErrors = isCNValid ? [] : ["⚠ 인증번호가 올바르지 않습니다"];

    if (!isPNValid) {
      setSendCN(false);
      setCN("");
      newErrors.push("⚠ 전화번호 형식이 올바르지 않습니다.");
    }

    setErrors(newErrors);
  };

  const changeCN = (e) => {
    const value = e.target.value;
    setCN(value);
    setIsCNValid(randomCN === value);

    const newErrors = isPNValid ? [] : ["⚠ 전화번호 형식이 올바르지 않습니다."];

    if (randomCN !== value) {
      newErrors.push("⚠ 인증번호가 올바르지 않습니다");
    }

    setErrors(newErrors);
  };

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

  // 이메일 찾기
  const [findEmailSuccess, setFindEmailSuccess] = useState(false);
  const [findEmail, setFindEmail] = useState("");

  const handleClick = async () => {
    // 이메일 찾기 api
    try {
      const res = await fetch(`${API_BASE_URL}/user/findId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({ name: name, phone: phoneNumber }),
      });

      const data = await res.json();
      console.log("find Email check", data.isSuccess, data.message);

      if (data.isSuccess) {
        setFindEmail(data.result.email);
        setFindEmailSuccess(true);
      } else {
        setFindEmail("fail");
        setFindEmailSuccess(false);
      }
    } catch (error) {
      console.error("이메일 찾기 오류:", error);
    }
    // 있으면
    // const getEmail = "example@gmail.com";
    // setFindEmail(getEmail);
    // setFindEmailSuccess(true);

    // 없으면
    // const getEmail = "none";
    // setFindEmail(getEmail);
    // setFindEmailSuccess(false);
  };

  return (
    <div>
      <Header title={"이메일 찾기"} />

      {findEmail.length == 0 ? (
        <div className="mx-[34px] flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px] mt-[25px] mb-[5px]">
            <label
              className="pl-[3px] text-[#838687] text-[14px] font-bold"
              for="phoneNumber"
            >
              이름
            </label>
            <div className="flex flex-col gap-1">
              <input
                id="email"
                className="input text-[#838687] placeholder-[#d9d9d9]"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[9px] mt-[10px]">
            <div className="flex flex-col gap-[10px]">
              <label
                className="pl-[3px] text-[#838687] text-[14px] font-bold"
                for="phoneNumber"
              >
                휴대전화 인증
              </label>
              <div className="flex gap-2">
                <input
                  id="phoneNumber"
                  className="flex-1 phone-input text-[#838687] placeholder-[#d9d9d9] pr-[10px] 
                                                appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  placeholder="'-'없이 11자리 번호를 입력해주세요"
                  value={phoneNumber}
                  onChange={(e) => {
                    changePhoneNumber(e);
                  }}
                />
                <button
                  className={`flex-none py-[8px] px-[10px] text-[14px] rounded-lg
                                    ${
                                      !isPNValid || phoneNumber.length == 0
                                        ? "bg-[#d9d9d9] text-[#838687] cursor-default"
                                        : "bg-[#FAB809] text-white cursor-pointer"
                                    }`}
                  onClick={() => {
                    setSendCN(true);
                    startTimer();
                    // generateRandomNumber();
                  }}
                >
                  {sendCN && isPNValid ? "재요청" : "인증요청"}
                </button>
              </div>
            </div>

            {/* 에러 메세지 */}
            {!isPNValid ? (
              <ul className="mt-[0px] px-[5px] text-[12px] text-left text-[red]">
                <li>⚠ 전화번호 형식이 올바르지 않습니다.</li>
              </ul>
            ) : (
              sendCN && (
                <div>
                  <div className="relative">
                    <input
                      id="phoneNumber"
                      className="input text-[#838687] placeholder-[#d9d9d9]"
                      type="text"
                      placeholder="인증번호 6자리를 입력해주세요"
                      value={cn}
                      onChange={(e) => {
                        changeCN(e);
                      }}
                    />
                    <span className="absolute right-[10px] top-[7px] text-[16px] text-[#838687]">
                      {timeLeft > 0
                        ? formatTime(timeLeft)
                        : isRunning
                        ? "타이머 종료"
                        : "00:00"}
                    </span>
                  </div>
                  {!isCNValid && (
                    <ul className="mt-[6px] px-[5px] text-[12px] text-left text-[red]">
                      <li>⚠ 인증번호가 올바르지 않습니다.</li>
                    </ul>
                  )}
                </div>
              )
            )}
          </div>

          <div className="w-full grid items-center mt-[5px]">
            <button
              className={`mx-auto w-full h-[38px] mt-[0px] mb-[5px] py-[6px] rounded-md 
                        font-bold text-[15px] text-center items-center 
                        ${
                          errors.length > 0 ||
                          name.length <= 0 ||
                          phoneNumber.length <= 0 ||
                          cn.length <= 0 ||
                          !isCNValid ||
                          !isPNValid
                            ? "bg-[#D9D9D9] text-[#838687] cursor-default"
                            : "bg-[#FFC421] text-white cursor-pointer"
                        }`}
              onClick={handleClick}
              disabled={
                errors.length > 0 ||
                name.length <= 0 ||
                phoneNumber.length <= 0 ||
                cn.length <= 0 ||
                !isCNValid ||
                !isPNValid
                  ? true
                  : false
              }
            >
              이메일 찾기
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-[34px] flex flex-col gap-[10px] mt-[20px]">
          {findEmailSuccess ? (
            <div className="pl-1">
              이메일은 <span className="font-bold">{findEmail}</span>입니다.
            </div>
          ) : (
            <div className="text-[red] font-bold pl-1">
              ⚠ 계정이 존재하지 않습니다.
            </div>
          )}
          <div className="w-full grid items-center mt-[10px]">
            <button
              className={`mx-auto w-full h-[38px] mt-[0px] mb-[5px] py-[6px] rounded-md 
                        font-bold text-[15px] text-center items-center 
                        ${
                          errors.length > 0 ||
                          name.length <= 0 ||
                          phoneNumber.length <= 0 ||
                          cn.length <= 0 ||
                          !isCNValid ||
                          !isPNValid
                            ? "bg-[#D9D9D9] text-[#838687] cursor-default"
                            : "bg-[#FFC421] text-white cursor-pointer"
                        }`}
              onClick={() => {
                navigate("/login", { state: { prevPage: prevPage } });
              }}
              disabled={
                errors.length > 0 ||
                name.length <= 0 ||
                phoneNumber.length <= 0 ||
                cn.length <= 0 ||
                !isCNValid ||
                !isPNValid
                  ? true
                  : false
              }
            >
              로그인 페이지로 이동하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
