import axios from "axios";
import { message} from 'antd';

export const url = "http://localhost:8080";

export const successMessage = (aMessage) => {
   return message.success(aMessage);
};

export const getUsers = () => {
    return axios.get(url + "/api/users", { withCredentials: true }).then((response) => {
        return response.data.content.map((user) => ({
            username: `${user.username}`,
            id: `${user.id}`,
            active: user.active
        }));
    });
};

export const getExams = () => {
    return axios.get(url + "/api/exams", { withCredentials: true }).then((response) => {
        return response.data.content.map((exam) => ({
            url: `${exam.url}`,
            id: `${exam.id}`,
            name: `${exam.name}`,
            startDate: `${exam.startDate}`,
            endDate: `${exam.endDate}`,
        }));
    });
};

export const getOwnersExams = () => {
    return axios.get(url + "/api/exams/ownersexams", { withCredentials: true }).then((response) => {
        return response.data.map((examresults) => ({
            examName: examresults.examName,
            results: examresults.results
        }));
    });
};