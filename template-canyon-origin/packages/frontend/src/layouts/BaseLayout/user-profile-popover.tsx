"use client"

import React, { useState } from "react"
import { Avatar, Popover, Button, Radio, Select, Divider, Segmented } from "antd"
import {CreditCardOutlined, SettingOutlined, LogoutOutlined, SunOutlined, MoonOutlined} from "@ant-design/icons"

import languages from "../../../languages.json";

export default function UserPopover() {
  const [theme, setTheme] = useState("system")

  const content = (
    <div className="w-[280px]">
      {/* 用户信息 */}
      <div className="">
        <div className="text-gray-500 text-sm mb-2">wr_zhang25@163.com</div>
        <div className="flex items-center gap-3">
          <Avatar src="/placeholder.svg?height=40&width=40" size={40} />
          <div>
            <div className="font-medium">zhangtao25</div>
            <div className="text-emerald-600 text-sm">Premium</div>
          </div>
        </div>
      </div>

      <Divider style={{margin:'6px 0'}} />

      {/* 菜单选项 */}
      <div className="">
        <Button
          style={{textAlign:'left'}}
          type="text"
          block
          className=" !flex !items-center !justify-start"
          icon={<CreditCardOutlined className="text-gray-500" />}
        >
          <span className="ml-2">Billing</span>
        </Button>
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
              localStorage.setItem("theme", value);
              window.location.reload();
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Language</span>
          <Select
            size={'small'}
            value={localStorage.getItem("language") || "cn"}
            onChange={(value) => {
              localStorage.setItem("language", value);
              window.location.reload();
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
    <div className="fixed bottom-4 left-4">
      <Popover
        content={content}
        placement="topLeft"
        trigger="hover"
        overlayClassName="user-popover"
      >
        <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer hover:bg-gray-50">
          <Avatar src="/placeholder.svg?height=32&width=32" size={32} />
          <div>
            <div className="font-medium">zhangtao25</div>
            <div className="text-emerald-600 text-sm">Premium</div>
          </div>
        </div>
      </Popover>
    </div>
  )
}
