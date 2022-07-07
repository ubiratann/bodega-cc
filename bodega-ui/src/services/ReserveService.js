import axios from "axios";

const baseUrl = "http://localhost:4000/reserve";

class ReserveService {
    static get = (userId) => {
        return axios.get(`${baseUrl}/${userId}`);
    }
}

export default ReserveService;