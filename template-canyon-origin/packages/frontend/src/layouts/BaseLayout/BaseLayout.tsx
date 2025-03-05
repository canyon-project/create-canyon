import React, { useEffect } from 'react';
import { FolderOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Logo from '@/layouts/BaseLayout/Logo.tsx';
import UserDropdown from '@/layouts/BaseLayout/user-profile-popover.tsx';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import StructureLayout from '@/layouts/BaseLayout/StructureLayout.tsx';
import { useQuery } from '@apollo/client';
import { MeDocument } from '@/graphql/gen/graphql.ts';
import useUserStore from '@/store/userStore.ts';

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
  const { user, setUser,setUserSettings } = useUserStore();
  const loc = useLocation();
  const [pathname, setPathname] = React.useState(loc.pathname);
  const nav = useNavigate();
  useEffect(() => {
    nav({
      to: `/${pathname}`,
    });
  }, [pathname]);

  const { t } = useTranslation();

  const items: MenuItem[] = [
    getItem(t('menus.projects'), '', <FolderOutlined />),
    getItem(t('menus.settings'), 'settings', <SettingOutlined />),
  ];

  console.log(user?.id, 'user?.id');

  const { data: meData, error } = useQuery(MeDocument, {
    fetchPolicy: 'no-cache',
    skip: Boolean(user?.id),
    onCompleted: (data) => {
      setUser({
        id: data.me?.id,
        username: data.me?.username,
        email: data.me?.email,
      });

      // let themeValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      //
      // if (data.me?.settings.theme !== 'auto') {
      //   themeValue = data.me?.settings.theme;
      // }

      setUserSettings({
        theme:data.me?.settings.theme,
        language:data.me?.settings.language
      });
      // set
    },
  });

  const notNeedStructureLayoutList = ['/login'];

  useEffect(() => {
    if (!notNeedStructureLayoutList.includes(pathname) && error) {
      nav({
        to: '/login',
      });
      setPathname('/login');
    }
  }, [error]);

  const [show, setShow] = React.useState(null);

  useEffect(() => {
    if (meData) {
      setShow(meData.me);
    }
  }, [meData]);

  return (
    <div>
      {show && !notNeedStructureLayoutList.includes(pathname) && (
        <StructureLayout
          sidebar={
            <>
              <Logo />
              <Menu
                className={'bg-[#FAFAFA]'}
                onSelect={(item) => {
                  setPathname(item.key);
                }}
                style={{
                  flex: 1,
                }}
                selectedKeys={[pathname]}
                mode="inline"
                items={items}
              />
              <UserDropdown />
            </>
          }
        >
          {children}
        </StructureLayout>
      )}
      {notNeedStructureLayoutList.includes(pathname) && children}
    </div>
  );
};

export default App;
