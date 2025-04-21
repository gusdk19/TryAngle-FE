import React, { useState } from "react";
import "../../styles/friend/follower.css"; //follower와 사용하는 css 동일해서 따로 만들지 않고 재사용.

export default function AddFriend({searchValue, setFollowings, allUsers, setAllUsers, setUserFollowing}){

    // const [allUsers, setAllUsers] = useState([
    //     {
    //         "user_id": 2,
    //         "nickname": "고은츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "following":true,
    //     },
    //     {
    //         "user_id": 3,
    //         "nickname": "혜원츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "following":true,
    //     },
    //     {
    //         "user_id": 4,
    //         "nickname": "다연츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    //         "following":false,
    //     },
    // ]);

    const filteredUsers = allUsers.filter(user =>
        user.nickname.includes(searchValue)
    )

    const handleFollow = (targetUser, following) => {
        if(following){
            setUserFollowing((prev)=>(prev-1))
        }
        else{
            setUserFollowing((prev)=>(prev+1))
        }

        setAllUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === targetUser.user_id
                ? { ...user, following: !user.following }
                : user
            )
        );   

        setFollowings((prevFollowings) => {
            const exists = prevFollowings.some((following) => following.user_id === targetUser.user_id);
            if (exists) {
              // 삭제
              return prevFollowings.filter((following) => following.user_id !== targetUser.user_id);
            } else {
              //추가
              const user={
                "user_id": targetUser.user_id,
                "nickname": targetUser.nickname,
                "profileImage": targetUser.profileImage,
                "following":true,
              }
              return [...prevFollowings, user];
            }
        });
        
    };


    return(
        <div className="px-[20px] flex flex-col gap-[13px]">
            {(searchValue != "" ? filteredUsers:allUsers).map((user, index)=>{
                return(
                    <div key={user.user_id} className="flex flex-row gap-4 py-auto align-center">
                        <img className="flex-none w-[43px] h-[43px] rounded-full p-[1px] border-[0.5px] border-[#D9D9D9]" src={user.profileImage} alt={`${user.user_id}-profileImage`}/>
                        <span className="flex-1 my-auto text-[15px] text-[#6E6053] font-medium">{user.nickname}</span>
                        <button className={`follow-cancel-btn flex-none h-fit px-8 py-[5px] my-auto text-[13px] font-medium  text-[#4A483F] ${user.following ? "bg-[#F4F4F4]":"bg-[#FAB809]"} rounded-lg`}
                          onClick={()=>{handleFollow(user, user.following)}}>
                            {user.following ? "팔로우 취소":"팔로우"}
                        </button>
                    </div>
                );
            })}
        </div>
    )

}