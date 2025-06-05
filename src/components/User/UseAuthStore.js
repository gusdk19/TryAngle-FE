import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user_token: "",
  user_name: "",
  isLoggedIn: false,
  login: (token) => set({ isLoggedIn: true, user_token: token }),
  logout: () => set({ isLoggedIn: false }),
  setUserName: (name)=> set({user_name : name}),
}));

export default useAuthStore;