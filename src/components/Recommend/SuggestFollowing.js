import React, { useState } from "react";
import "../../styles/friend/friend.css";
import "../../styles/friend/follower.css"; //follower와 사용하는 css 동일해서 따로 만들지 않고 재사용.

export default function SuggestFollowing({searchValue, followings, participant_list, 
    recommendList, setRecommendList
}){

    // const [followings, setFollowings] = useState([
    //     {
    //         "user_id": 2,
    //         "nickname": "고은츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
    //     },
    //     {
    //         "user_id": 3,
    //         "nickname": "혜원츄",
    //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
    //     }
    // ]);

    const filteredFollowings = followings.filter(following =>
        following.nickname.includes(searchValue)
    )

    const addRecommend = (targetId) => {
        if(!(recommendList.includes(targetId))){
            setRecommendList(prev=>[...prev, targetId]);
        }
    };


    return(
        <div className="main h-[612px] px-[20px] flex flex-col gap-[13px] overflow-scroll">
            {(searchValue != "" ? filteredFollowings:followings).map((following, index)=>{
                return(
                    <div key={following.user_id} className="flex flex-row gap-4 py-auto align-center">
                        <img className="flex-none w-[43px] h-[43px] rounded-full p-[1px] border-[0.5px] border-[#D9D9D9]" src={following.profileImage} alt={`${following.user_id}-profileImage`}/>
                        <span className="flex-1 my-auto text-[15px] text-[#6E6053] font-medium">{following.nickname}</span>
                        <button className={`add-recommend-btn flex-none h-fit px-5 py-[6px] my-auto text-[13px] font-medium  text-[#4A483F] ${!(participant_list.includes(following.user_id)) && !(recommendList.includes(following.user_id)) ? "bg-[#FAB809]" : "bg-[#F4F4F4] cursor-default"} rounded-lg`}
                          onClick={()=>{addRecommend(following.user_id)}}>
                            {participant_list.includes(following.user_id) ? "참여중" : recommendList.includes(following.user_id) ? "권유완료" : "권유하기"}
                        </button>
                    </div>
                );
            })}
        </div>
    )

}