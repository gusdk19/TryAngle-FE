import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaRegBell } from "react-icons/fa";
import NotificationItem from '../components/Notification';
import "../styles/Alarm/alarm.css";

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
    }

]

function Alarm() {
    const page = "alarm";
    const [notifications, setNotifications] = useState([]);

    //챌린지 참여 권유 알림
    const sendInviteNotification = async ({ senderId, receiverId, challengeId, inviteCode }) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
        alert('🔒 로그인 후 다시 시도해주세요.');
        return;
        }

        try {
        const res = await fetch('http://localhost:8080/user/invite/notification', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ senderId, receiverId, challengeId, inviteCode }),
        });

        const data = await res.json();
        if (res.ok && data.isSuccess) {
            alert(data.message);
        } else {
            alert(`실패: ${data.message}`);
        }
        } catch (err) {
        console.error('알림 전송 실패:', err);
        alert('알림 전송 중 오류가 발생했습니다.');
        }
    };

    //알림 리스트 조회
    useEffect(() => {
    const fetchNotifications = async () => {
        const token = localStorage.getItem('accessToken');
        console.log('accessToken:', token);
        if (!token) {
        console.warn('🔒 accessToken이 없습니다. 로그인 후 시도해주세요.');
        return;
        }

        try {
        const res = await fetch('http://localhost:8080/user/notification', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text(); 
            console.error('서버 응답 오류:', errorText);
            return;
        }

        const data = await res.json();
        console.log('알림 목록:', data);
        setNotifications(data.result); 
        } catch (error) {
        console.error('알림 불러오기 실패:', error);
        }
    };

    fetchNotifications();
    }, []);
  
    //알림 읽음 처리
    const handleRead = async (id) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/user/notification/${id}/read`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            const data = await res.json();

            if (res.ok && data.isSuccess) {
            // 읽음 처리 성공 시 UI 상태도 변경
            setNotifications((prev) =>
                prev.map((n) =>
                n.notificationId === id ? { ...n, isRead: true } : n
                )
            );
            } else {
            console.error('읽음 처리 실패:', data.message);
            }
        } catch (err) {
            console.error('읽음 처리 중 오류 발생:', err);
        }
    };

    /*정렬 + slice로 20개까지만 표시*/
    const sortedNotifications = [...notifications]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 20);
   
   //TODO: nickname, chanllenge name을 볼드체로 변경
    return (
      <div className="bg-white flex flex-row justify-center w-full ">
        {/* 모바일 프레임 */}
        <div className="bg-white w-[393px] h-[852px] relative">
            <Header className="flex-none" title="알림"/>  
            {/* 알림 목록 */}
            <p className="text-[#FB0B0B] text-sm mb-[15px] px-4 pt-2">알림은 최대 20개까지 표시됩니다.</p>
            <main className="flex-1 max-h-[690px] main overflow-scroll px-4 pb-4">
                <div className="flex flex-col gap-4">
                    {sortedNotifications.map((n) => (
                    <NotificationItem
                        key={n.notificationId}
                        notification={n}
                        onClick={handleRead}
                    />
                    ))}
                </div>
            </main>
    
            <Footer page={page}/>
        </div>
      </div>
    )
  }
  
  export default Alarm
