import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { successMessage, url } from "../../service/UserService";
import Axios from 'axios';


const AddNewUser = () => {
    const history = useHistory();

    const addUser = (values) => {
        // Axios.post("http://localhost:8080/login");
        Axios.post(url + '/api/users', values, { withCredentials: true })
            .then(() => {
                //if
                history.push("/users");
            })


        //history.push("/users");
    };



    return (
        <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
            <Col>
                <Form name="login-form" style={{ maxWidth: 300 }} onFinish={addUser}>
                    <Form.Item name="username" rules={[{ required: true, message: "Enter username!" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Add User
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

};

export default AddNewUser;