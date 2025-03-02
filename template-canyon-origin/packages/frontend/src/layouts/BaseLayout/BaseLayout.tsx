import React, {useEffect} from 'react';
import { FolderOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Logo from '@/layouts/BaseLayout/Logo.tsx';
import UserDropdown from "@/layouts/BaseLayout/user-profile-popover.tsx";
import {useLocation, useNavigate} from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



const App: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { token: token } = theme.useToken();
  const loc = useLocation()
  const [pathname, setPathname] = React.useState(loc.pathname)
  const nav= useNavigate()
  useEffect(()=>{
    nav({
      to:`/${pathname}`
    }).then(r=>{
      console.log(r)
    })
  },[pathname])

  const {t} = useTranslation()

  const items: MenuItem[] = [
    getItem(t('menus.projects'), 'projects', <FolderOutlined />),
    getItem(t('menus.settings'), 'settings', <SettingOutlined />),
  ];

  return (
    <div style={{ minHeight: '100vh' }} className={'flex'}>
      <div
        style={{
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          width:'275px',
          background:'#FAFAFA'
        }}
      >
        <Logo />
        <Menu
          onSelect={(item) => {
            console.log(item);
            setPathname(item.key)
          }}
          style={{
            background: '#FAFAFA',
          }}
          selectedKeys={[
            pathname
          ]} mode="inline" items={items} />
        <UserDropdown/>
      </div>
      <div className={'w-full bg-[#FFF] dark:bg-[#0c0d0e] min-h-[100vh]'}>
        <div>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
          {/*  <Breadcrumb.Item>User</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
