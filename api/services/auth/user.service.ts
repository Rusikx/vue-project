import axios from "axios"
import authHeader from "./../../helpers/auth-header"

const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/test/"

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all")
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() })
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() })
  }
}

export default new UserService()