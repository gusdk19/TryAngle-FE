import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user_token: "",
  user_nickName: "",
  isLoggedIn: false,
  login: (token, nickName) => set({ isLoggedIn: true, user_token: token, user_nickName: nickName }),
  logout: () => set({ isLoggedIn: false, user_token: "", user_nickName: "" }),
  setUserNickName: (nickName)=> set({user_nickName : nickName}),
}));

export default useAuthStore;