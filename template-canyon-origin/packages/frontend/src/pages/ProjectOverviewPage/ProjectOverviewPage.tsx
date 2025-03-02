// import { useQuery } from '@apollo/client';
// import { GetProjectsDocument } from '@/graphql/gen/graphql.ts';
import {Breadcrumb, Button, Space, Tabs} from 'antd';
import CommitsTab from './CommitsTab';
import {SettingOutlined} from "@ant-design/icons";

// 核心代码

const ProjectOverviewPage = () => {
  return (
    <div>
      <div className={'border-b border-gray-200  h-[48px] flex items-center justify-between px-[16px]'}>
        <Breadcrumb
          items={[
            {
              title: 'Project',
              href: '/projects',
            },
            {
              title: 'xtaro-hotel-search',
            },
          ]}
        />

        <Space>
          <SettingOutlined/>
          <Button type={'primary'} size={'small'}>New Project</Button>
        </Space>
      </div>
      <Tabs
        defaultActiveKey="commits"
        items={[
          {
            key: 'coverage',
            label: 'Coverage',
            children: <div>co</div>,
          },
          {
            key: 'commits',
            label: 'Commits',
            children: <CommitsTab />,
          },
        ]}
      />
    </div>
  );
};

export default ProjectOverviewPage;
