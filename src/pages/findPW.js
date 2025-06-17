import React, { useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import ChangePWModal from "../components/User/ChangePWModal";

export default function FindPW() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const { prevPage } = location.state || {};

  const [email, setEmail] = useState("");
  const [tempPW, setTempPW] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const validateEmail = (value) => {
    // 간단한 이메일 정규표현식
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value.trim());
    setIsValid(validateEmail(e.target.value.trim()));
    const newErrors = [];

    if (!isValid) {
      newErrors.push("⚠ 이메일 형식이 올바르지 않습니다.");
    }

    setErrors(newErrors);
  };

  const handleClick = async () => {
    const newErrors = [];

    try {
      const res = await fetch(`${API_BASE_URL}/user/checkEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();
      console.log("email check", data.isSuccess, data.message);

      if (!data.isSuccess) {
        if (email.length <= 0) {
          newErrors.push("⚠ 이메일을 입력해주세요.");
          setEmail("");
        } else if (email.length > 0 && errors.length == 0) {
          // 비밀번호 재설정 api
          try {
            const res = await fetch(`${API_BASE_URL}/user/resetPassword`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email }),
            });

            const data = await res.json();
            console.log("set new password check", data.isSuccess, data.message);

            if (data.isSuccess) {
              setTempPW(data.result);
              setMessage(data.message);
              setOpenModal(true);
            } else {
              newErrors.push(data.message);
              setEmail("");
            }
          } catch (error) {
            console.error("비밀번호 변경 확인 오류:", error);
          }
        }
      } else {
        newErrors.push(
          `⚠ 비밀번호를 변경할 수 없습니다. 다시 시도해주십시오.\n`
        );
        newErrors.push(
          `\u00A0\u00A0\u00A0\u00A0(변경 불가 사유 : 사용자를 찾을 수 없습니다.)`
        );
        setEmail("");
      }
    } catch (error) {
      console.error("임시 비밀번호 이메일 전달 오류:", error);
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <Header title={"비밀번호 재설정"} />

      <div className="mx-[34px]">
        <div className="flex flex-col gap-[9px] mt-[20px]">
          <div className="flex flex-col gap-1">
            <label
              className="pl-[3px] mb-[5px] text-[#838687] font-bold text-[14px]"
              htmlFor="email"
            >
              이메일 주소
            </label>
            <input
              id="email"
              className="input text-[#838687] placeholder-[#d9d9d9]"
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={(e) => {
                changeEmail(e);
              }}
            />
          </div>

          {/* 에러 메세지 */}
          {errors.length > 0 && (
            <ul className="flex flex-col gap-1 mt-[4px] px-[5px] text-[12px] text-left text-[red]">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full grid items-center mt-[10px]">
          <button
            className={`mx-auto w-full h-[38px] mt-[5px] mb-[5px] py-[6px] rounded-md 
                    font-bold text-[15px] text-center items-center 
                    ${
                      errors.length > 0 || email.length <= 0 || !isValid
                        ? "bg-[#D9D9D9] text-[#838687] cursor-default"
                        : "bg-[#FFC421] text-white cursor-pointer"
                    }`}
            onClick={handleClick}
            disabled={
              errors.length > 0 || email.length <= 0 || !isValid ? true : false
            }
          >
            비밀번호 변경요청
          </button>
        </div>
      </div>

      {openModal ? (
        <ChangePWModal
          onClose={setOpenModal}
          tempPW={tempPW}
          setTempPw={setTempPW}
          setEmail={setEmail}
          message={message}
          email={email}
          prevPage={prevPage}
        />
      ) : (
        ""
      )}
    </div>
  );
}
