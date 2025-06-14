import React, { useState, useEffect } from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";
import useAuthStore from "../User/UseAuthStore";

export default function ReportModal({ onClose, onVoteUser }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { user_token } = useAuthStore();

  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState([]);

  // API 성공 여부
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setReason(value);

    setErrors([]);
  };

  const handleReport = async () => {
    // 신고 api
    try {
      const res = await fetch(`${API_BASE_URL}/user/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({
          targetNickname: onVoteUser.nickname,
          reason: reason,
        }),
      });

      const data = await res.json();
      console.log("report check", data.isSuccess, data.message);

      if (data.isSuccess) {
        setSuccess(true);
      } else {
        setReason("");
        setErrors((prev) => [
          ...prev,
          "신고에 실패했습니다. 다시 시도해주십시오.",
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
              <div className="flex-none text-[20px] pb-[5px]">🚨</div>
              <div className="flex-none my-auto">신고</div>
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
                신고가 완료되었습니다.
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
          <h2 className="flex justify-center text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
            <div className="flex-none text-[20px] pb-[5px]">🚨</div>
            <div className="flex-none my-auto">신고</div>
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

          {/* 의사 재재확인 */}
          <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
            <span
              htmlFor="withdrawal"
              className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]"
            >
              <span>
                <span className="font-bold">{onVoteUser.nickname}</span>를{" "}
                <span className="font-bold text-[red]">신고</span>하시겠습니까?
              </span>
            </span>
          </div>

          {/* 신고사유 입력 */}
          <div
            className={`mx-auto mt-[8px] ${
              errors.length > 0 ? "mb-[10px]" : "mb-[20px]"
            } flex flex-col justify-between gap-2`}
          >
            <label
              htmlFor="withdrawal"
              className="ml-[2px] mt-[2.5px] flex-none text-[#6e6053]"
            >
              <span className={`text-[#6E6053] font-bold text-[15px]`}>
                신고 이유
              </span>
            </label>
            <textarea
              id="withdrawal"
              className="text-[13px] h-[20px] flex-1 rounded-md text-[#6e6053] px-[12px] py-[9px] align-middle resize-none"
              rows={5}
              placeholder="신고 사유를 입력해주세요"
              value={reason}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* 신고 에러 */}
          {errors.length > 0 && (
            <ul className="mb-[18px] px-[5px] text-[12px] text-left text-[red]">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          {/* 변경 버튼 */}
          <div className="w-full grid items-center">
            <button
              className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${
                      reason.length > 0
                        ? "bg-[#FFC421] cursor-pointer"
                        : "bg-[#d9d9d9] cursor-default"
                    }`}
              onClick={handleReport}
            >
              신고하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
