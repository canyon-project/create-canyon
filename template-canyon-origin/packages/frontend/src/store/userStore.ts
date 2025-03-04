import { create } from "zustand";

// 定义用户设置的类型
interface UserSettings {
  theme: string;
  language: string;
  defaultDimension: string;
}

// 定义用户信息的类型
interface User {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatar: string;
}

const defaultUserSettings: UserSettings = {
  theme: "light",
  language: "cn",
  defaultDimension: "2d",
}

// 创建一个用户信息和设置的状态管理 store
const useUserStore = create<{
  user: User | null;
  userSettings: UserSettings | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setUserSettings: (settings: UserSettings) => void;
  clearUserSettings: () => void;
}>((set) => ({
  user: null, // 用户信息初始值为空
  userSettings: defaultUserSettings, // 用户设置初始值为空
  setUser: (user) => set({ user }), // 更新用户信息
  clearUser: () => set({ user: null }), // 清除用户信息
  setUserSettings: (settings) => set({ userSettings: settings }), // 更新用户设置
  clearUserSettings: () => set({ userSettings: null }), // 清除用户设置
}));

export default useUserStore;
