import React, {useEffect} from 'react';
import {FolderOutlined, SettingOutlined} from '@ant-design/icons';
import {Menu, MenuProps} from 'antd';
import Logo from '@/layouts/BaseLayout/Logo.tsx';
import UserDropdown from "@/layouts/BaseLayout/user-profile-popover.tsx";
import {useLocation, useNavigate} from "@tanstack/react-router";
import {useTranslation} from 'react-i18next';
import StructureLayout from "@/layouts/BaseLayout/StructureLayout.tsx";
import {useQuery} from "@apollo/client";
import {MeDocument} from "@/graphql/gen/graphql.ts";

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
    getItem(t('menus.projects'), '', <FolderOutlined />),
    getItem(t('menus.settings'), 'settings', <SettingOutlined />),
  ];

  const {data:meData} = useQuery(MeDocument)

  const notNeedStructureLayoutList = ['/login']

  return (<div>
      {(meData&&!notNeedStructureLayoutList.includes(pathname)&&<StructureLayout
          sidebar={
            <>
              <Logo />
              <Menu
                onSelect={(item) => {
                  setPathname(item.key)
                }}
                style={{
                  background: '#FAFAFA',
                  flex:1
                }}
                selectedKeys={[
                  pathname
                ]} mode="inline" items={items} />
              <UserDropdown/>
            </>
          }
        >
          {children}
        </StructureLayout>)
      }
      {notNeedStructureLayoutList.includes(pathname)&&children}
    </div>
  );
};

export default App;
