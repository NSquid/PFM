import axios from 'axios';
import jwtDecode from 'jwt-decode';
const TOKEN_KEY = 'auth_token';

const AuthService = {
    isLoggedIn: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return token !== null;
    },

    getUserInfo: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken); 
            return decodedToken.userId; 
        }
        return null;
    },

    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { username, password });
            const { token } = response.data;
            localStorage.setItem(TOKEN_KEY, token);
            return response.data;
        } catch (error) {
            console.error("Login error", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    }
};

export default AuthService;