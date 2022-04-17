/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-03 22:05:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-17 23:27:41
 */
import React, { useState, FC } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
import { Outlet, useNavigate } from 'react-router-dom'
import './index.less'
const LayoutCom: FC = () => {
    let navigate = useNavigate();
    const handleClick = (e) => {
        console.log(e, '333');
        navigate('/testB')
    }
    
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu mode="inline" onClick={handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="测试">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="测试2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <Outlet></Outlet>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            ,
        </>
    )
}

export default LayoutCom
