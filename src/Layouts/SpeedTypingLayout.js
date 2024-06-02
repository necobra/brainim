import React from "react";
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { MenuItemType } from "antd/es/menu/interface";
import { Header } from "antd/es/layout/layout";
import './HomeLayout.css'; // Імпортуйте CSS-файл
import SpeedTyping from "../SpeedTyping/SpeedTyping";

function SpeedTypingLayout() {
    return (
        <Layout>
            <SpeedTyping/>
        </Layout>
    )
}

export default SpeedTypingLayout;
