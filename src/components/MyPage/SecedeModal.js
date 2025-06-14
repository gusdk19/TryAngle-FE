import React, { useState, useEffect } from "react";
import "../../styles/mypage/ProfileEditModal.css";

import useAuthStore from "../User/UseAuthStore";

import { IoMdClose } from "react-icons/io";

export default function SecedeModal({ onClose, user_token, logout }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/delete/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
      });

      const data = await res.json();
      console.log("delete user check", data.isSuccess, data.message);

      if (data.isSuccess) {
        setSuccess(true);
        setMessage(data.message);
      } else {
        setError("탈퇴에 실패했습니다. 재시도 해주십시오.");
      }
    } catch (error) {
      console.error("탈퇴 오류:", error);
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
              탈퇴하기
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

            <div className="flex flex-col gap-2 my-[10px] px-[5px] pt-[12px] text-center">
              <p className="text-[16px] text-[red] font-semibold">{message}</p>
            </div>

            {/* 변경 버튼 */}
            <div className="w-full grid items-center">
              <button
                className={`mx-auto w-[192px] h-[38px] mt-[15px] mb-[5px] py-1 rounded-md 
                                text-white font-medium text-[15px] text-center items-center bg-[#FFC421] cursor-pointer`}
                onClick={() => {
                  onClose(false);
                  logout();
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
            탈퇴하기
          </h2>

          {/* Close Button */}
          <button
            className="close-btn"
            onClick={() => {
              onClose(false);
              if (success) {
                logout();
              }
            }}
          >
            <IoMdClose
              className="text-[#6e6053] w-[25px] h-[25px]"
              color="#6e6053"
            />
          </button>

          {/* 의사 재확인 */}
          <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
            <span
              htmlFor="withdrawal"
              className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]"
            >
              <span>
                <span className="font-bold text-[red]">탈퇴</span>하시겠습니까?
              </span>
            </span>
          </div>

          {error && (
            <div className="mb-[18px] px-[5px] text-[12px] text-center text-[red]">
              ※ {error}
            </div>
          )}

          {/* 변경 버튼 */}
          <div className="w-full grid items-center">
            <button
              className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
              onClick={handleChange}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
