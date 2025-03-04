import {Breadcrumb, Tabs} from "antd";
import UserSettings from "@/pages/SettingsPage/UserSettings.tsx";
import useUserStore from "@/store/userStore.ts";
import {useEffect} from "react";

const SettingsPage = () => {
  const {setUser} = useUserStore()
  useEffect(() => {
    setUser({
      username:'1'
    })
  }, []);
  return <div>
    <div className={'border-b border-gray-200  h-[48px] flex items-center px-[16px]'}>
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: 'An Application',
          },
        ]}
      />
    </div>
    <Tabs items={[{
      label: 'General',
      key: 'general',
      children: <div>
        <UserSettings/>
      </div>,
    },
      {
        label: 'Billing',
        key: 'billing',
        children: <div>Billing</div>,
      }
    ]}/>
  </div>
}

export default SettingsPage;
