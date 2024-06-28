import axios from 'axios'
import bcrypt from 'bcryptjs'

const API_URL = import.meta.env.VITE_SERVER_HOST + '/api/auth/'

class AuthService {
  login(user) {
    return axios.post(API_URL + 'signin', {
      username: user.username,
      password: user.password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
      // password: bcrypt.hashSync(user.password, 8)
    });
  }
}

export default new AuthService()