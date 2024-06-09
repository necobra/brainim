import React from "react";
import { Layout } from 'antd';
import './HomeLayout.css';
import MainPage from "../FlashCards/MainPage";

function FlashcardsLayout() {
    return (
        <Layout>
            <MainPage/>
        </Layout>
    )
}

export default FlashcardsLayout
