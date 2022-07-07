class AuthService {
    user = "dambola";
    
    static myInstance = null;

    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
        return this.myInstance;
    }
}

export default AuthService;