import React, { useState } from "react";
import "../../styles/friend/friend.css";
import "../../styles/friend/follower.css"; //follower와 사용하는 css 동일해서 따로 만들지 않고 재사용.

export default function AddFriend({searchValue, setFollowings, allUsers, setAllUsers, setUserFollowing, user_token}){

    // const [allUsers, setAllUsers] = useState([
    //     {
    //         "userId": 2,
    //         "nickname": "고은츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "isFollowing":true,
    //     },
    //     {
    //         "userId": 3,
    //         "nickname": "혜원츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "isFollowing":true,
    //     },
    //     {
    //         "userId": 4,
    //         "nickname": "다연츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "isFollowing":false,
    //     },
    // ]);

    const filteredUsers = allUsers.filter(user =>
        user.nickname.includes(searchValue)
    )

    const handleFollow = (targetUser, following) => {
        console.log("targetUser", targetUser);

        if(following){
            setUserFollowing((prev)=>(prev-1))
        }
        else{
            setUserFollowing((prev)=>(prev+1))
        }

        setAllUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.userId === targetUser.userId
                ? { ...user, isFollowing: !(user.isFollowing) }
                : user
            )
        );   

        setFollowings((prevFollowings) => {
            const exists = prevFollowings.some((following) => following.userId === targetUser.userId);
            if (exists) {
              // 삭제
              return prevFollowings.filter((following) => following.userId !== targetUser.userId);
            } else {
              //추가
              const user={
                "userId": targetUser.userId,
                "nickname": targetUser.nickname,
                "profileImage": targetUser.profileImage,
                "isFollowing":true,
              }
              return [...prevFollowings, user];
            }
        });

        const follow = async ()=>{
            try {
                const res = await fetch('http://localhost:8080/user/follow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                    body: JSON.stringify({ nickname: targetUser.nickname }),
                });

                const data = await res.json();
                console.log("follow check", data.isSuccess, data.message)
            } catch (error) {
                console.error('팔로우 오류:', error);
            }
        }

        const unfollow = async ()=>{
            try {
                const res = await fetch('http://localhost:8080/user/unfollow', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                    body: JSON.stringify({ nickname: targetUser.nickname }),
                });

                const data = await res.json();
                console.log("unfollow check", data.isSuccess, data.message)
            } catch (error) {
                console.error('언팔로우 오류:', error);
            }
        }

        if(targetUser.isFollowing){
            unfollow();
        }else{
            follow();
        }
        
    };


    return(
        <div className="main h-[612px] px-[20px] flex flex-col gap-[13px] overflow-scroll">
            {(searchValue != "" ? filteredUsers:allUsers).map((user, index)=>{
                return(
                    <div key={user.userId} className="flex flex-row gap-4 py-auto align-center">
                        <img className="flex-none w-[43px] h-[43px] rounded-full p-[1px] border-[0.5px] border-[#D9D9D9]" src={user.profileImage} alt={`${user.userId}-profileImage`}/>
                        <span className="flex-1 my-auto text-[15px] text-[#6E6053] font-medium">{user.nickname}</span>
                        <button className={`follow-cancel-btn flex-none h-fit py-[5px] my-auto text-[13px] font-medium  text-[#4A483F] ${user.isFollowing ? "bg-[#F4F4F4] px-5":"bg-[#FAB809]  px-8"} rounded-lg`}
                          onClick={()=>{handleFollow(user, user.isFollowing)}}>
                            {user.isFollowing ? "팔로우 취소":"팔로우"}
                        </button>
                    </div>
                );
            })}
        </div>
    )

}