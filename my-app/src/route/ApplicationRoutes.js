import React, { useState } from 'react';
import SideNavigation from "../layout/SideNavigation";
import { Layout } from "antd";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import UserList from "../pages/user/UserList";
import Login from "../pages/login/login";
import AddNewUser from "../pages/user/NewUser";
import AddExam from "../pages/user/NewExam";
import Global from "../pages/leaderboard/leaderBoard";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Exam from '../pages/exam/Exam';
import ShowExams from '../pages/exam/ShowExams';
import MyExams from '../pages/exam/MyExams';

const { Sider, Content } = Layout;

const ApplicationRoutes = () => {
    const [collapse, setCollapse] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    };

    return (
        <Router>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNavigation />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: "calc(100vh - 114px)",
                            background: "#fff",

                        }}
                    >
                        <Switch>
                            <Route path="/users" component={UserList} />
                            <Route path="/login" component={Login} />
                            <Route path="/adduser" component={AddNewUser} />
                            <Route path="/newexam" component={AddExam} />
                            <Route path="/exam" component={Exam} />
                            <Route path="/leaderboard" component={Global} />
                            <Route path="/showexams" component={ShowExams} />
                            <Route path="/myexams" component={MyExams} />
                            <Redirect to="/login" from="/" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );

};

export default ApplicationRoutes;
