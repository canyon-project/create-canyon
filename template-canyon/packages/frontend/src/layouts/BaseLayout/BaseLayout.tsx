import React from 'react';
import { FolderOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Logo from '@/layouts/BaseLayout/Logo.tsx';

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

const items: MenuItem[] = [
  getItem('Projects', '1', <FolderOutlined />),
  getItem('Settings', '2', <SettingOutlined />),
];

const App: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { token: token } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme={'light'}
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <Logo />
        <div
          className={'mb-1'}
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <div className={'w-full bg-[#fbfcfd] dark:bg-[#0c0d0e] min-h-[100vh]'}>
        <div className={'w-[1150px]  mx-auto'}>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
          {/*  <Breadcrumb.Item>User</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          <div>{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
