import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function NotificationItem({ notification, onClick }) {
  const isRead = notification.isRead;
  const bgColor = isRead ? 'bg-[#F8F8F8]' : 'bg-[#FDF8ED]';

  const navigate = useNavigate();

  return (
    <div
      onClick={() => onClick(notification.notificationId)}
      className={`relative flex items-start rounded-lg cursor-pointer min-h-[90px] ${bgColor} pr-4 pb-2`}
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
              <span className="font-bold">{notification.challengeName || '하루 물 한 잔 마시기'}</span>
              에 초대했습니다.
              < br />
              <div className='flex flex-row justify-between'>
                <span>(초대코드: {notification.challengeId})</span>
                <button className='text-sm hover:font-bold'
                  onClick={(e)=>{
                    e.preventDefault();
                    if(notification.inviteCode){
                      navigate(`/`, {state: {challID : notification.challengeId, inviteCode: notification.inviteCode, IVModal: true}});
                    }else{
                      navigate(`/challenge/${notification.challengeId}`, {state : {prevPage: "alarm"}});
                    }
                  }}>
                  챌린지로 이동 ▷
                </button>
              </div>
            </p>
          </>
        )}
      </div>
    </div>
  );
}