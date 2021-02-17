import React from 'react';
import { Row, Col, Table, Space, Input, Button, Pagination } from 'antd';
import Title from "antd/lib/typography/Title";
import { getResults, url } from "../../service/ResultService";
import { successMessage } from "../../service/ResultService";
import Axios from "axios";
const { Search } = Input;

class leaderBoard extends React.Component {
    state = {
        results: [],
        isLoading: true,
        error: null
    };
    columns = [
        {
            title: 'Student',
            dataIndex: 'student',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
        },
    ]
    componentDidMount() {
        getResults()
            .then((results) => {
                let data = [];
                results.map((result, index) => {
                    data.push({
                        student: result.student,
                        grade: result.grade,
                    });
                    return data;
                });

                this.setState({
                    results: data,
                    isLoading: false
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }
    render() {
        const { isLoading, results, error } = this.state;

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
                                            Leaderboard
                                        </Title>
                                    </Col>
                                </Row>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Table columns={this.columns} dataSource={results} />
                                    </Col>
                                </Row>

                            </>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>
        );
    }

};
export default leaderBoard;