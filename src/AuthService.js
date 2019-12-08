import axios from 'axios';

const USER_API_BASE_URL = 'https://aladinstudio.000webhostapp.com/wp-json/jwt-auth/v1/token';

class AuthService {

    login(credentials){
        let data = '{"username":"'+credentials.username+'","password":"'+credentials.password+'"}';
        console.log(data);
        return axios.post(USER_API_BASE_URL, data);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
       return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();