import React from "react";
import { Row, Col, Table, Space, Input, Button, Pagination, Popover, Tabs, Radio } from "antd";
import Title from "antd/lib/typography/Title";
import { getExams, getOwnersExams } from "../../service/UserService";
import { successMessage, url } from "../../service/UserService";
import Axios from "axios";
const { Search } = Input;

const { TabPane } = Tabs;

class MyExams extends React.Component {
    state = {
        exams: [],
        isLoading: true,
        error: null,
        mode: 'top',
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
    ]

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({ mode });
    };


    componentDidMount() {
        getOwnersExams()
            .then((exams) => {

                let data = [];


                exams.map((exam, index) => {

                    let results = [];
                    exam.results.map((result) => {

                        results.push({
                            key: result.id,
                            grade: result.grade,
                            studentName: result.student.username
                        })

                        return results;
                    })

                    data.push({
                        key: exam.examName,
                        examName: exam.examName,
                        results: results,
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
        const { isLoading, exams, error, mode } = this.state;

        return (
            <React.Fragment>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                            <div>
                                <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>

                                    {exams.map(exam => (
                                        <TabPane tab={exam.examName} key={exam.examName}>
                                            <ul>

                                                {exam.results.map((result) => {
                                                    return <li>
                                                        {"Student Name: " + result.studentName + "     Grade: " + result.grade}
                                                    </li>;
                                                })}
                                            </ul>
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </div>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>
        );
    }
}

export default MyExams;

