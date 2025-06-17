import React, { useState, useEffect } from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";
import useAuthStore from "../User/UseAuthStore";

export default function WithdrawalModal({
  onClose,
  setWithdrawal,
  totalReturn,
}) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { user_token } = useAuthStore();

  // API result
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState("");

  const [wdValue, setWdValue] = useState();

  const [errors, setErrors] = useState(false);

  const isNumber = (value) => {
    return !isNaN(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setWdValue(value);

    const newErrors = [];

    if (value > totalReturn) {
      newErrors.push("⚠ 출금 가능한 금액을 초과하였습니다.");
    }

    if (value < 5000) {
      newErrors.push("⚠ 출금은 5000원부터 가능합니다.");
    }

    if (value % 1000 != 0) {
      newErrors.push("⚠ 출금은 1000원 단위로 가능합니다.");
    }

    if (!isNumber(value)) {
      newErrors.push(
        "⚠ 옳지 않은 입력입니다. 출금할 금액을 숫자로 입력해주세요."
      );
    }

    setErrors(newErrors);
  };

  const handleChange = async () => {
    setWithdrawal((prev) => prev + wdValue);

    try {
      const res = await fetch(`${API_BASE_URL}/user/withdrawal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({ amount: wdValue }),
      });

      const data = await res.json();
      console.log("withdrawal check", data.isSuccess, data.message);

      if (data.isSuccess) {
        setSuccess(true);
        setResult(data.result);
      } else {
        setWdValue();
        setErrors((prev) => [
          "출금에 실패하였습니다. 다시 시도해주세요.",
          ...prev,
        ]);
      }
    } catch (error) {
      console.error("출금 오류:", error);
    }
  };

  if (success) {
    return (
      <>
        <div className="inner-backdrop" onClick={onClose}></div>
        <div className="inner-modal">
          <div className="modal-sq w-full h-full">
            {/* Title */}
            <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
              출금하기
            </h2>

            {/* Close Button */}
            <button
              className="close-btn"
              onClick={() => {
                onClose(false);
              }}
            >
              <IoMdClose
                className="text-[#6e6053] w-[25px] h-[25px]"
                color="#6e6053"
              />
            </button>

            <div className="flex flex-col gap-2 my-[10px] px-[5px] pt-[12px] text-center ">
              <p className="text-[16px] text-[red] font-semibold">
                출금이 완료되었습니다.
              </p>
              <p className="text-[14px] text-[#6e6053]  font-medium">
                ({result})
              </p>
            </div>

            {/* 변경 버튼 */}
            <div className="w-full grid items-center">
              <button
                className={`mx-auto w-[192px] h-[38px] mt-[15px] mb-[5px] py-1 rounded-md 
                            text-white font-medium text-[15px] text-center items-center bg-[#FFC421] cursor-pointer`}
                onClick={() => {
                  onClose(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="inner-backdrop" onClick={onClose}></div>
      <div className="inner-modal">
        <div className="modal-sq w-full h-full">
          {/* Title */}
          <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
            출금하기
          </h2>

          {/* Close Button */}
          <button
            className="close-btn"
            onClick={() => {
              onClose(false);
            }}
          >
            <IoMdClose
              className="text-[#6e6053] w-[25px] h-[25px]"
              color="#6e6053"
            />
          </button>

          {/* 출금액 입력 */}
          <div className="mx-auto mt-[18px] flex flex-col justify-between gap-2">
            <label
              htmlFor="withdrawal"
              className="ml-[2px] mt-[2.5px] flex-none text-[#6e6053]"
            >
              <span className={`text-[#6E6053] font-bold text-[15px]`}>
                출금할 금액
              </span>
            </label>
            <input
              id="withdrawal"
              className="text-[13px] h-[20px] flex-1 rounded-md text-[#6e6053] px-[12px] py-[9px] align-middle
                            appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min="5000"
              step="1000"
              value={wdValue}
              onChange={(e) => handleInputChange(e)}
            />
            <span
              className={`text-right mr-[3px] text-[#6E6053] font-medium text-[14.5px]`}
            >
              출금 가능한 금액 : {totalReturn}
            </span>
          </div>

          {/* 출금 금액 에러 */}
          {errors.length > 0 && (
            <ul className="mt-[6px] px-[5px] text-[12px] text-left text-[red]">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          <div className="mt-[6px] px-[5px] text-[12px] text-left text-[red]">
            ※ 출금은 5000원 이상 1000원 단위로 가능합니다.
          </div>

          {/* 변경 버튼 */}
          <div className="w-full grid items-center">
            <button
              className={`mx-auto w-[192px] h-[38px] mt-[15px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${
                      !wdValue || errors.length > 0
                        ? "bg-[#D9D9D9] cursor-not-allowed"
                        : "bg-[#FFC421] cursor-pointer"
                    }`}
              onClick={handleChange}
              disabled={!wdValue || errors.length > 0 ? true : false}
            >
              출금
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
