import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user_token: "",
  user_nickName: "",
  isLoggedIn: false,
  login: (token) => set({ isLoggedIn: true, user_token: token }),
  logout: () => set({ isLoggedIn: false }),
  setUserNickName: (nickName)=> set({user_nickName : nickName}),
}));

export default useAuthStore;