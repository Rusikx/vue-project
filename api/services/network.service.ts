import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/network/";

class NetworkService {
    create(data) {
        return axios.post(API_URL + "create", data);
    }
    all() {
        return axios.post(API_URL + "all");
    }
}

export default new NetworkService();