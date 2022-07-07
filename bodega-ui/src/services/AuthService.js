import axios from "axios";

const baseUrl = "http://localhost:4000/user";

class AuthService {
    user = "";
    token = "";
    userEmail = "";
    userType = -1;
    userId = -1;
    authenticated = false;
    
    static myInstance = null;

    static getInstance() {
        if (AuthService.myInstance == null) {
            AuthService.myInstance = new AuthService();
        }
        if (!AuthService.myInstance.authenticated) {
            AuthService.myInstance.loadCache();
        }
        return this.myInstance;
    }

    static createUser(userData) {
        return axios.post(`${baseUrl}`, userData);
    }

    static doLogin(email, password) {
        return axios.post(`${baseUrl}/login`, {email: email, password: password}).then((res) => {
            const auth = AuthService.getInstance();
            const data = res.data;

            auth.token = data.token;
            auth.user = data.user.name;
            auth.userEmail = data.user.email;
            auth.userType = data.user.typeId;
            auth.userId = data.user.id;
            auth.authenticated = true;

            auth.saveCache();
        });
    }

    static doLogout() {
        const auth = AuthService.getInstance();
        auth.token = "";
        auth.user = "";
        auth.userEmail = "";
        auth.userType = -1;
        auth.userId = -1;
        auth.authenticated = false;
        auth.removeCache();
    }

    saveCache = () => {
        const data = {
            token: this.token,
            user: this.user,
            userEmail: this.userEmail,
            userType: this.userType,
            userId: this.userId,
            authenticated: this.authenticated,
        }

        localStorage.setItem('auth', JSON.stringify(data));
    }

    loadCache = () => {
        const content = localStorage.getItem('auth');
        console.log(content);
        if (content != null) {
            const data = JSON.parse(content);
            this.token = data.token;
            this.user = data.user;
            this.userEmail = data.userEmail;
            this.userType = data.userType;
            this.userId = data.userId;
            this.authenticated = data.authenticated;
        }
    }

    removeCache = () => {
        localStorage.removeItem('auth');
    }
}

export default AuthService;