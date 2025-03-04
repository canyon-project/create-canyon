'use client';

import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import BaseLayout from '@/layouts/BaseLayout';
import GlobalProvider from '@/providers/GlobalProvider.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'antd';
import { useMemo } from 'react';

const { darkAlgorithm } = theme;

export const Route = createRootRoute({
  component: () => {
    const { token } = theme.useToken();

    // Create a separate dark theme token regardless of current mode
    const darkToken = useMemo(() => {
      // This creates a dark theme token using Ant Design's algorithm
      const darkTheme = theme.getDesignToken({
        algorithm: darkAlgorithm,
      });
      return darkTheme;
    }, []);

    console.log(token, 'current token');
    console.log(darkToken, 'dark token');

    return (
      <GlobalProvider>
        <ThemeProvider theme={darkToken}>
          <BaseLayout>
            <Outlet />
          </BaseLayout>
        </ThemeProvider>

        {/*<TanStackRouterDevtools />*/}
      </GlobalProvider>
    );
  },
});
