import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import BaseLayout from '@/layouts/BaseLayout';
import GlobalProvider from '@/providers/GlobalProvider.tsx';
import {message} from "antd";


const ContextHolder: React.FC = () => {
  const [_, contextHolder] = message.useMessage();


  return (
    <>
      {contextHolder}
    </>
  );
};

export const Route = createRootRoute({
  component: () => (
    <GlobalProvider>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
      <ContextHolder/>
      {/*<TanStackRouterDevtools />*/}
    </GlobalProvider>
  ),
});
