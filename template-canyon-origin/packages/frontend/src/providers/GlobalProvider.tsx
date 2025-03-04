import { ApolloClient, ApolloProvider, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
// import { message } from 'antd'; // 引入 Ant Design 的 message 组件
import enUS from 'antd/es/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';
import zhCN from 'antd/es/locale/zh_CN';
import {App, ConfigProvider, message, theme} from 'antd';
import { FC, useEffect, useState } from 'react';
import useUserStore from "@/store/userStore.ts";
import {useLocation} from "@tanstack/react-router";
const languages = {
  cn: zhCN,
  en: enUS,
  ja: jaJP,
};

const { darkAlgorithm } = theme;


// 创建一个http link来发送GraphQL请求
const httpLink = createHttpLink({
  uri: '/graphql', // 你的GraphQL API的URL
  headers: {
    Authorization: `Bearer ` + (localStorage.getItem('token') || ''),
  },
});


const GlobalProvider: FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const loc = useLocation()
  const [messageApi, contextHolder] = message.useMessage();
  // 创建一个错误拦截器
  const errorLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      return forward(operation).map((response) => {
        const { errors } = response;
        console.log(response)
        if (errors && errors.length > 0) {
          errors.forEach((error) => {

            setTimeout(()=>{
              if (!window.location.pathname.includes('/login')){
                messageApi.error(error.message); // 使用 Ant Design 的 message 组件显示错误信息
                console.log(error.message,loc.pathname); // 控制台打印错误信息
              }
            },100)

          });
        }
        return response;
      });
    }),
  ]);

// 将错误拦截器和 httpLink 组合起来
  const link = errorLink.concat(httpLink);

// 创建Apollo Client实例
  const client = new ApolloClient({
    link: link, // 将error link和http link组合起来
    cache: new InMemoryCache(),
  });



  const {userSettings} = useUserStore();


  useEffect(() => {
    setTimeout(() => {

      console.log(userSettings,'userSettings')

      // 打印浏览器默认语言

      // console.log(navigator.language);

      // 打印浏览器默认主题色
      // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);

      // setData({ theme: localStorage.getItem('theme'), language: localStorage.getItem('language') });

      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      document.documentElement.classList.toggle('dark', userSettings?.theme === 'dark');
    }, 100);
  }, [userSettings]);
  return (
    <>
      <ApolloProvider client={client}>
        {contextHolder}
        <ConfigProvider
          locale={languages[userSettings.language]}
          theme={{
            token: {
              colorPrimary: '#0071c2',
            },
            algorithm: userSettings.theme === 'dark' ? [darkAlgorithm] : [],
          }}
        >
          {children}
        </ConfigProvider>
      </ApolloProvider>
    </>
  );
};

export default GlobalProvider;
