import type React from "react";
import styled from "@emotion/styled";
import { Divider } from "antd";
import AppFooter from "@/layouts/BaseLayout/Footer.tsx";

// Define the styled components
const Container = styled.div<{ darkMode: boolean }>`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }: { theme: any }) => theme.colors.sidebarBg};
`;

const Sidebar = styled.div<{ darkMode: boolean }>`
  width: 240px;
  background-color: ${props => (props.darkMode? "#222" : "#FAFAFA")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${props => (props.darkMode? "#333" : "#e8e8e8")};
`;

const Content = styled.div<{ darkMode: boolean }>`
  flex: 1;
  margin-left: 240px;
  background-color: ${props => (props.darkMode? "#111" : "transparent")};
`;

// Define the props interface
interface StructureLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

// Create the StructureLayout component
export default function StructureLayout({ sidebar, children, darkMode, onDarkModeToggle }: StructureLayoutProps) {
  return (
    <Container darkMode={darkMode}>
      <Sidebar darkMode={darkMode}>{sidebar}</Sidebar>
      <Content darkMode={darkMode}>
        <div className={'min-h-[100vh]'}>{children}</div>
        <Divider style={{ margin: '0' }} />
        <AppFooter />
      </Content>
    </Container>
  );
}
