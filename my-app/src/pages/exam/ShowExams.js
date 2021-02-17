import React from "react";
import { Row, Col, Table, Space, Input, Button, Pagination } from "antd";
import Title from "antd/lib/typography/Title";
import { getExams } from "../../service/UserService";
import { successMessage , url} from "../../service/UserService";
import Axios from "axios";
const { Search } = Input;

class ShowExams extends React.Component {
    state = {
        exams: [],
        isLoading: true,
        error: null
    };

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Url',
            dataIndex: 'url',

        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',

        },
        {
            title: 'End Date',
            dataIndex: 'endDate',

        },

    ]



    componentDidMount() {
        getExams()
            .then((exams) => {
                let data = [];

                exams.map((exam, index) => {
                    data.push({
                        key: exam.url,
                        url: url + "/api/exams/startExam/"+exam.url,
                        id: exam.id,
                        name: exam.name,
                        startDate: exam.startDate,
                        endDate: exam.endDate,
                    });
                    return data;
                });

                this.setState({
                    exams: data,
                    isLoading: false
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, exams, error } = this.state;

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
                                            Current Exams
                                        </Title>
                                    </Col>
                                </Row>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Table columns={this.columns} dataSource={exams} />
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
}

export default ShowExams;

