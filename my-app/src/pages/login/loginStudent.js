import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from 'axios';
import {successMessage, url} from '../../service/UserService';


const NormalLoginFormStudent = () => {
    const history = useHistory();

    const login = (values) => {
        var formBody = [];
        for (var property in values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url + '/loginStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            credentials: 'include',
            body: formBody
        }).then(()=>{
            history.push("/users");//değiştir
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

export default NormalLoginFormStudent;