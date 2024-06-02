import React from "react";
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { MenuItemType } from "antd/es/menu/interface";
import { Header } from "antd/es/layout/layout";
import './HomeLayout.css';
import MainPage from "../FlashCards/MainPage"; // Імпортуйте CSS-файл

const items: Array<MenuItemType> = [
    { key: 1, label: "Home" },
    { key: 2, label: "Flash Cards"},
    { key: 3, label: "Speed Typing"},
    { key: 4, label: "About us"}
];

function FlashcardsLayout() {
    return (
        <Layout>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0}}
                />
            </Header>
            <MainPage/>
        </Layout>
    )
}

export default FlashcardsLayout
