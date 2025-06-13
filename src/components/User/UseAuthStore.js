import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user_token: "",
  user_nickName: "",
  user_id: "",
  isLoggedIn: false,
  login: (token, nickName, id) => set({ isLoggedIn: true, user_token: token, user_nickName: nickName, user_id: id }),
  logout: () => set({ isLoggedIn: false, user_token: "", user_nickName: "", user_id: ""}),
  setUserNickName: (nickName)=> set({user_nickName : nickName}),
}));

export default useAuthStore;