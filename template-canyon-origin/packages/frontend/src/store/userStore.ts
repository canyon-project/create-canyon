import { create } from "zustand";

interface UserSettings {
  theme: string;
  language: string;
  defaultDimension: string
}

// 定义用户信息的类型
interface User {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatar: string;
  settings: UserSettings;
}

// 创建一个用户信息状态管理 store
const useUserStore = create<{
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}>((set) => ({
  user: null, // 初始值为空
  setUser: (user) => set({ user }), // 更新用户信息
  clearUser: () => set({ user: null }), // 清除用户信息
}));

export default useUserStore;
