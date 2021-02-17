import React, { useState } from 'react';
import { useHistory } from "react-router";
import { Layout } from "antd";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { Row, Col, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from 'axios';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {successMessage, url} from '../../service/UserService';

const NormalLoginForm = () => {
const [collapse, setCollapse] = useState(false);
    const history = useHistory();
const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    };
    const login = (values) => {
        var formBody = [];
        for (var property in values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            credentials: 'include',
            body: formBody
        }).then(()=>{
            history.push("/newexam");
        })
    };



    return (
        <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
            <Col>
                <Form name="login-form" style={{ maxWidth: 300 }} onFinish={login}>
                    <Form.Item name="username" rules={[{ required: true, message: "Enter mail!" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mail" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default NormalLoginForm;