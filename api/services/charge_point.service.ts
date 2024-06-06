import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/charge-point/";

class ChargePointService {
    create(data) {
        return axios.post(API_URL + "create", data);
    }
    all() {
        return axios.post(API_URL + "all");
    }
    allCascade() {
        return axios.post(API_URL + "all-cascade");
    }
    activate() {
        return axios.get(API_URL + "activate");
    }
    deactivate() {
        return axios.get(API_URL + "deactivate");
    }
}

export default new ChargePointService();