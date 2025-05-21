import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user_token: "",
  isLoggedIn: false,
  login: (token) => set({ isLoggedIn: true, user_token: token }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;