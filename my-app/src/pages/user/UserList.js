import React from "react";
import { Row, Col, Table, Space, Input, Button, Pagination } from "antd";
import Title from "antd/lib/typography/Title";
import { getUsers } from "../../service/UserService";
import {successMessage, url } from "../../service/UserService";
import Axios from "axios";
const { Search } = Input;

class UserList extends React.Component {
    state = {
        users: [],
        isLoading: true,
        error: null
    };

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',

        },
        {
            title: 'IsActive',
            key: 'active',
            render: (user) => (
                user.active ? 'true' : 'false'
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (user) => (
                <Space size="middle">
                    {user.active ?
                        (
                            <a onClick={(e) => {
                                e.preventDefault();
                                Axios.delete(`http://localhost:8080/api/users/${user.id}`,
                                    { withCredentials: true }).then((deletedUser) => ({ user: deletedUser.data }))
                                    .then(()=> (successMessage('User Deactivated!')))
                            }}>Deactivate</a>
                        ) :

                        (
                            <a onClick={(e) => {
                                e.preventDefault();
                                Axios.post(`http://localhost:8080/api/users/activate/${user.id}`, null,
                                    { withCredentials: true }).then(()=> (successMessage('User Activated!')))
                            }}>Activate</a>
                        )

                    }


                </Space>
            ),
        }
    ]



    componentDidMount() {
        getUsers()
            .then((users) => {
                let data = [];
                users.map((user, index) => {
                    data.push({
                        key: user.username,
                        username: user.username,
                        id: user.id,
                        active: user.active,
                    });
                    return data;
                });

                this.setState({
                    users: data,
                    isLoading: false
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, users, error } = this.state;

        return (
            <React.Fragment>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                            <>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Title level={2}>
                                            UserList
                                        </Title>
                                    </Col>
                                </Row>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Table columns={this.columns} dataSource={users} />
                                    </Col>
                                </Row>
                                <Search

                                    placeholder="input search text"
                                    onSearch={(value) => (
                                        Axios.get(`${url}/api/users/search?username=${value}`, { withCredentials: true })
                                            .then((userList) =>
                                                (this.setState({ users: userList.data })))
                                    )}
                                    style={{ width: 200 }}
                                />
                                <Pagination defaultCurrent={1} total={50} />

                            </>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>
        );
    }
}

export default UserList;

