import type React from "react"
import styled from "@emotion/styled"
import {Divider} from "antd";
import AppFooter from "@/layouts/BaseLayout/Footer.tsx";

// Define the styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Sidebar = styled.div`
  width: 240px;
  background-color: #FAFAFA;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
`

const Content = styled.div`
  flex: 1;
  margin-left: 240px;
  //background-color: antiquewhite;
`

// Define the props interface
interface StructureLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

// Create the StructureLayout component
export default function StructureLayout({ sidebar, children }: StructureLayoutProps) {
  return (
    <Container>
      <Sidebar>{sidebar}</Sidebar>
      <Content>
        <div className={'min-h-[100vh]'}>{children}</div>
        <Divider style={{margin:'0'}}/>
        <AppFooter/>
      </Content>
    </Container>
  )
}
