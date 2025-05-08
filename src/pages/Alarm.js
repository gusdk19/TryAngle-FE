import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaRegBell } from "react-icons/fa";
import NotificationItem from '../components/Notification'

//API 연결 전 mock data로 구성*
const mockNotification = [
    {
        notification_id:1,
        sender_id: 2002,
        nickname: '다연',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-08T12:00:00',
        message:"다연님이 친구신청을 보냈습니다.",
    },
    {
        notification_id: 2,
        sender_id: 2002,
        nickname: '다연',
        notification_type:"CHALLENGE_INVITE",
        challenge_id: 826173,
        challenge_name: '하루 물 한 잔 마시기',
        is_read: true,
        created_date: '2025-06-07T15:00:00',
        message: "다연님이 하루 물 한 잔 마시기 챌린지에 초대했습니다. (초대코드: 826173)",
    },
    {
        notification_id:3,
        sender_id: 2002,
        nickname: '정다연',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-09T12:00:00',
        message:"정다연님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:4,
        sender_id: 2003,
        nickname: '다연츄',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-10T12:00:00',
        message:"다연츄님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:5,
        sender_id: 2002,
        nickname: '현아',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-11T12:00:00',
        message:"현아님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:6,
        sender_id: 2002,
        nickname: '이현아',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-12T12:00:00',
        message:"이현아님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:7,
        sender_id: 2002,
        nickname: '효나츄',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-13T12:00:00',
        message:"효나츄님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:8,
        sender_id: 2002,
        nickname: '고은',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-14T12:00:00',
        message:"고은님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:9,
        sender_id: 2002,
        nickname: '박고은',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-15T12:00:00',
        message:"박고은님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:10,
        sender_id: 2002,
        nickname: '고은츄',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-16T12:00:00',
        message:"고은츄님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:11,
        sender_id: 2002,
        nickname: '혜원',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-17T12:00:00',
        message:"혜원님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:12,
        sender_id: 2002,
        nickname: '장혜원',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-18T12:00:00',
        message:"장혜원님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:13,
        sender_id: 2002,
        nickname: '혜원츄',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-19T12:00:00',
        message:"혜원츄님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:14,
        sender_id: 2002,
        nickname: '소재',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-20T12:00:00',
        message:"소재님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:15,
        sender_id: 2002,
        nickname: '고갈',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-21T12:00:00',
        message:"고갈님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:16,
        sender_id: 2002,
        nickname: '누가',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-22T12:00:00',
        message:"누가님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:17,
        sender_id: 2002,
        nickname: '있을까',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-23T12:00:00',
        message:"있을까님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:18,
        sender_id: 2002,
        nickname: '춘식이',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-24T12:00:00',
        message:"춘식이님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:19,
        sender_id: 2002,
        nickname: '교동이',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-25T12:00:00',
        message:"교동이님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:20,
        sender_id: 2002,
        nickname: '뽀로로',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-26T12:00:00',
        message:"뽀로로님이 친구신청을 보냈습니다.",
    },
    {
        notification_id:21,
        sender_id: 2002,
        nickname: '크롱',
        notification_type: 'FOLLOW',
        is_read:false,
        created_date:'2025-05-27T12:00:00',
        message:"크롱님이 친구신청을 보냈습니다.",
    }

]

function Alarm() {
    const [notifications, setNotifications] = React.useState(mockNotification)
  
    const handleRead = (id) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === id ? { ...n, is_read: true } : n
        )
      )
    }

    /*정렬 + slice로 20개까지만 표시*/
    const sortedNotifications = [...notifications]
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .slice(0, 20);
   
   //TODO: nickname, chanllenge name을 볼드체로 변경
    return (
      <div className="bg-white flex justify-center w-full">
        {/* 모바일 프레임 */}
        <div className="bg-white w-[393px] h-[852px] flex flex-col relative">
          <Header />
  
          {/* 알림 목록 */}
          <main className="flex-1 overflow-y-auto px-4 py-2 pb-[90px]">
            
            <p className="text-[#FB0B0B] text-sm mb-4">알림은 최대 20개까지 표시됩니다.</p>
  
            <div className="flex flex-col gap-4">
                {sortedNotifications.map((n) => (
                <NotificationItem
                    key={n.notification_id}
                    notification={n}
                    onClick={handleRead}
                />
                ))}
            </div>
          </main>
  
          <Footer />
        </div>
      </div>
    )
  }
  
  export default Alarm
