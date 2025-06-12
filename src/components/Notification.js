import React from 'react';
import { FaRegBell } from 'react-icons/fa';

export default function NotificationItem({ notification, onClick }) {
  const isRead = notification.isRead;
  const bgColor = isRead ? 'bg-[#F8F8F8]' : 'bg-[#FDF8ED]';

  return (
    <div
      onClick={() => onClick(notification.notificationId)}
      className={`relative flex items-start rounded-lg cursor-pointer min-h-[90px] ${bgColor}`}
    >
      {/* 아이콘 영역 */}
      <div className="relative ml-[13px] mt-[12px] overflow-visible">
        <FaRegBell className="w-[30px] h-[30px] text-[#6B6B6B]" />
        {!isRead && (
          <span className="absolute top-[-2px] w-[6px] h-[6px] bg-[#FFC421] rounded-full" />
        )}
      </div>

      {/* 텍스트 영역 */}
      {/*API 추가 시 닉네임, 챌린지 이름에 디폴트 값 제거하기*/}
      <div className="flex flex-col justify-center ml-[12px] mt-[14px] leading-[24px] text-[14px] text-[#4A483F]">
        {notification.notificationType === 'FOLLOW' && (
          <>
            <p className="text-[18px] font-bold">우리 친구해요!</p>
            <p>
              <span className="font-bold">{notification.senderNickname || '다연'}</span> 
              님이 친구신청을 보냈습니다. 
            </p>
          </>
        )}
        {notification.notificationType === 'CHALLENGE_INVITE' && (
          <>
            <p className="text-[18px] font-bold">챌린지 참여하실래요?</p>
            <p>
              <span className="font-bold">{notification.senderNickname || '다연'}</span>
              님이{' '}
              <span className="font-bold">{notification.challenge_name || '하루 물 한 잔 마시기'}</span>
              에 초대했습니다.
              < br />
              (초대코드: {notification.challengeId})
            </p>
          </>
        )}
      </div>
    </div>
  );
}