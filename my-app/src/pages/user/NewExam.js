import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class AddNewExam extends React.Component {
  state = {
    members: [],
    isLoading: true,
    error: null
  };

  onChange(date, dateString) {
    console.log(date, dateString);
  }


  addProjectPlan(values) {
    // Axios.post("http://localhost:8080/login");
    Axios.post(`${url}/api/exams`, values, { withCredentials: true })
      .then(() => {
        successMessage('Exam Created!')
      })
  }

  componentDidMount() {
    this.getMembers();
  }


  getMembers() {
    getUsers().then((users) => {
      let data = [];

      users.map((user, index) => {
        data.push(
          <Option key={user.name}>{user.name}</Option>
        );
        return data;
      });

      this.setState({
        members: data,
        isLoading: false
      });
    }).catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, members, error } = this.state;
    return (
      <React.Fragment>
        {!isLoading ? (
          error ? (
            `An error occured: ${error}`
          ) : (
                  <Form name="login-form" style={{ maxWidth: 300 }} onFinish={this.addProjectPlan}>
                    <Form.Item name="name" rules={[{ required: true, message: "Is required" }]}>
                      <Input prefix={<BookOutlined className="site-form-item-icon" />} placeholder="examname" />
                    </Form.Item>

                    <Form.Item name="startDate" direction="vertical">
                      <DatePicker onChange={this.onChange} placeholder="Start Date" />

                    </Form.Item>
                    <Form.Item name="endDate" direction="vertical">
                      <DatePicker onChange={this.onChange} placeholder="endDate" />
                    </Form.Item>

                    <Form.List name="questions">
                      {(fields, { add, remove }) => (
                        <div>
                          {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8, width: 600 }} align="baseline">
                              <Form.Item
                                {...field}
                                name={[field.name, 'questionText']}
                                fieldKey={[field.fieldKey, 'questionText']}
                                rules={[{ required: true, message: 'Missing task name' }]}
                              >
                                <Input placeholder="questionText" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'point']}
                                fieldKey={[field.fieldKey, 'point']}
                                rules={[{ required: true, message: 'Missing assigned to' }]}>
                                <Input placeholder="point" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'penaltyPoint']}
                                fieldKey={[field.fieldKey, 'penaltyPoint']}
                                rules={[{ required: true, message: 'Missing assigned to' }]}>

                                <Input placeholder="penaltyPoint" />
                              </Form.Item>

                                  <Form name="login-form" style={{ maxWidth: 300 }}>
                                    <Form.List name="answers">
                                      {(answers, { add, remove }) => (
                                        <>
                                          {answers.map(answer => (
                                            <Space key={answer.key} style={{ display: 'flex', width: 300 }} align="baseline">
                                              <Form.Item
                                                {...answer}
                                                name={[answer.name, 'answerText']}
                                                fieldKey={[answer.fieldKey, 'answerText']}
                                                rules={[{ required: true, message: 'Missing answer' }]}>
                                                <Input placeholder="answerText" />
                                              </Form.Item>

                                              <Form.Item
                                                {...answer}
                                                name={[answer.name, 'isAnswer']}
                                                fieldKey={[answer.fieldKey, 'isAnswer']}
                                                rules={[{ required: true, message: 'Missing answer' }]}>
                                                <Select defaultValue="false" style={{ width: 100 }} onChange={handleChange}>
                                                  <Option value={true}>True</Option>
                                                  <Option value={false}>False</Option>
                                                </Select>
                                              </Form.Item>

                                              <MinusCircleOutlined onClick={() => remove(answer.name)} />
                                            </Space>
                                          ))}
                                          <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                              Add Answer
                                </Button>
                                          </Form.Item>
                                        </>
                                      )}
                                    </Form.List>
                                  </Form>
                              <MinusCircleOutlined onClick={() => remove(field.name)} />

                            </Space>
                          ))}

                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add Exam
                </Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" onClick={this.addProjectPlan} style={{ width: 150 }}>
                        Create Exam
                          </Button>
                    </Form.Item>
                  </Form>
            )
        ) : (
            <p>Loading...</p>
          )}
      </React.Fragment>

    );

  }

};

export default AddNewExam;