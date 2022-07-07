class AuthService {
    user = "dambola";
    userId = 1;
    email = "danielnreboucas@hotmail.com";
    
    static myInstance = null;

    static getInstance() {
        if (AuthService.myInstance == null) {
            AuthService.myInstance = new AuthService();
        }
        return this.myInstance;
    }
}

export default AuthService;