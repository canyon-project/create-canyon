"use client"

import React, { useState } from "react"
import { Avatar, Popover, Button, Radio, Select, Divider } from "antd"
import { CreditCardOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"

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
        <Button block className="mt-2 h-9">
          Switch Team
        </Button>
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
          <Radio.Group
            value={'light'}
            onChange={(e) => setTheme(e.target.value)}
            buttonStyle="solid"
            className="flex"
          >
            <Radio.Button value="light" className="flex items-center justify-center px-2">
              <span className="material-icons text-sm">light</span>
            </Radio.Button>
            <Radio.Button value="dark" className="flex items-center justify-center px-2">
              <span className="material-icons text-sm">dark</span>
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex justify-between items-center">
          <span>Language</span>
          <Select
            defaultValue="english"
            style={{ width: 120 }}
            options={[
              { value: 'english', label: 'English' },
              { value: 'chinese', label: '中文' },
            ]}
          />
        </div>
      </div>

      <Divider className="my-2" />

      {/* 底部按钮 */}
      <div className="px-4 pb-2">
        <Button type="primary" block className="bg-gray-800 h-9">
          Start Team Plan
        </Button>
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
