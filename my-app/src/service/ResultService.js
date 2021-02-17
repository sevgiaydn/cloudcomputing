import axios from "axios";
import { message} from 'antd';

export const url = "http://localhost:8080";

export const successMessage = (aMessage) => {
   return message.success(aMessage);
};

export const getResults = () => {
    return axios.get(url + "/api/results", { withCredentials: true }).then((response) => {
        return response.data.content.map((result) => ({
            student: `${result.student.username}`,
            grade: `${result.grade}`,
        }));
    });
};