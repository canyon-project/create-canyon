"use client"

// import React, {useState} from "react"
import {Avatar, Button, Divider, message, Popover, Segmented, Select} from "antd"
import {LogoutOutlined, MoonOutlined, SettingOutlined, SunOutlined} from "@ant-design/icons"

import languages from "../../../languages.json";
import i18n from "@/i18n.ts";
import {useMutation} from "@apollo/client";
import {UpdateUserSettingsDocument} from "@/graphql/gen/graphql.ts";

export default function UserPopover() {


  // console

  const [
    updateUserSettings,
    { loading: updateUserSettingsLoading },
  ] = useMutation(UpdateUserSettingsDocument)


  const content = (
    <div className="w-[280px]">
      {/* 用户信息 */}
      <div className="">
        <div className="text-gray-500 text-sm mb-2">wr_zhang25@163.com</div>
        <div className="flex items-center gap-3">
          <Avatar src="/placeholder.svg?height=40&width=40" size={40} />
          <div>
            <div className="font-medium">zhangtao25</div>
            {/*<div className="text-emerald-600 text-sm">Premium</div>*/}
          </div>
        </div>
      </div>

      <Divider style={{margin:'6px 0'}} />

      {/* 菜单选项 */}
      <div className="">
        <Button
          type="text"
          block
          className=" !flex !items-center !justify-start"
          icon={<SettingOutlined className="text-gray-500" />}
        >
          <span className="ml-2">Settings</span>
        </Button>
        <Button
          type="text"
          block
          className=" !flex !items-center !justify-start"
          icon={<LogoutOutlined className="text-gray-500" />}
        >
          <span className="ml-2">Sign Out</span>
        </Button>
      </div>

      <Divider style={{margin:'6px 0'}} />

      {/* 偏好设置 */}
      <div className="px-4">
        <div className="text-gray-500 mb-3">Preferences</div>



        <div className="flex justify-between items-center mb-4">
          <span>Theme</span>
          <Segmented
            size={'small'}
            shape="round"
            options={[
              { value: 'sys', icon: <img src={'/svgexport.svg'}/> },
              { value: 'light', icon: <SunOutlined /> },
              { value: 'dark', icon: <MoonOutlined /> },
            ]}
            value={localStorage.getItem("theme") || "light"}
            onChange={(value) => {
              // localStorage.setItem("theme", value);
              // window.location.reload();

              updateUserSettings({
                variables:{
                  theme:value
                }
              }).then(r=>{
                message.success("Theme changed")
              })


            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Language</span>
          <Select
            size={'small'}
            value={localStorage.getItem("language") || "cn"}
            onChange={(value) => {
              // 使用 changeLanguage 方法切换语言
              i18n.changeLanguage(value)
            }}
            options={languages.map((item) => {
              return {
                label: item.name,
                value: item.code,
              };
            })}
            className={"w-[100px]"}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className={''}>
      <Popover
        content={content}
        placement="topLeft"
        trigger="hover"
      >
        <div className="flex items-center gap-3 p-2 m-1   cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Avatar src="/placeholder.svg?height=32&width=32" size={32} />
          <div style={{flex:1}}>
            <div className="text-[14px]">zhangtao25</div>
            {/*<div className="text-emerald-600 text-sm">Premium</div>*/}
          </div>
          <img src="/shangxia.svg" alt=""/>
        </div>
      </Popover>
    </div>
  )
}
