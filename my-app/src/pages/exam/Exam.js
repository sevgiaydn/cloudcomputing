import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space, Table, Radio, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


class Exam extends React.Component {
    state = {
        questions: [],
        possibleAnswers: [],
        answers: [],
        isLoading: true,
        error: null,
        visible: false,
        points: 0,
        trueanswers: 0,
        falseanswers: 0,
    };

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Text',
            dataIndex: 'questionText',
        },
        {
            title: 'Point',
            dataIndex: 'point',
        },

        {
            title: 'Answer',
            key: 'possibleAnswers',
            render: (question) => (
                <Radio.Group onChange={this.answered.bind(this)}>
                    {
                        question.possibleAnswers.map((element) => {
                            return (<Radio key={element.id} value={{ answerId: element.id, questionId: question.id }}>
                                {element.text}
                            </Radio>)
                        }
                        )}
                </Radio.Group >

            )

        },
    ]

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };


    onChange(date, dateString) {
        console.log(date, dateString);
    }

    answered(answer) {
        console.log("answerId " + answer.target.value.answerId);
        console.log("questionId " + answer.target.value.questionId);
        this.state.answers.push({ answerId: answer.target.value.answerId, questionId: answer.target.value.questionId });
        console.log(this.state.answers);
    }


    addPublishExam() {
        // Axios.post("http://localhost:8080/login");

        Axios.post(`${url}/api/exams/endExam`, this.state.answers, { withCredentials: true })//????????
            .then((response) => {
                successMessage('Exam pushed!');
                console.log(response.data);
                this.setState({

                    points: response.data.totalPoints,
                    trueanswers: response.data.correctAnswers,
                    falseanswers: response.data.wrongAnswers,
                })
                this.showModal();
            })


        console.log(this.state.answers)

    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions() {
        Axios.get(`${url}/api/exams/startExam/asd4`, { withCredentials: true }).then((exam) => {
            let data = [];
            let possibleAnswers = [];
            // console.log(exam.data.questions);

            exam.data.questions.map((question, index) => {

                question.possibleAnswers.map((asd, index) => {
                    possibleAnswers.push({
                        possibleAnswer: <Radio value={asd.text}>
                            {asd.text}
                        </Radio>
                    })
                })

                data.push({

                    key: question.id,
                    questionText: question.questionText,
                    id: question.id,
                    point: question.point,
                    possibleAnswers: question.possibleAnswers,

                }
                );
            });

            this.setState({
                questions: data,
                possibleAnswers: possibleAnswers,
                isLoading: false
            });
        }).catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, questions, possibleAnswers, error } = this.state;
        return (
            <React.Fragment>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                            <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
                                <Col>
                                    <Form name="login-form" style={{ maxWidth: 300 }} onFinish={this.addPublishExam.bind(this)}>
                                        <Form.Item>
                                            <Table columns={this.columns} dataSource={questions} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <Modal
                                        title="Your Result"
                                        visible={this.state.visible}
                                        onOk={this.hideModal}
                                        onCancel={this.hideModal}
                                        okText="Ok"
                                    >
                                        <p>Total Points: {this.state.points}</p>
                                        <p>True: {this.state.trueanswers}</p>
                                        <p>False: {this.state.falseanswers}</p>
                                    </Modal>
                                </Col>
                            </Row>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>

        );

    }

};

export default Exam;