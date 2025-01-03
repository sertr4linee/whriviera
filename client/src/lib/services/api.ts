import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Créer une instance axios avec la configuration de base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
    (config) => {
        // Ajouter le token à toutes les requêtes sauf login et register
        if (config.url?.includes('/auth/login') || config.url?.includes('/auth/register')) {
            return config;
        }
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les réponses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Si non autorisé, rediriger vers la page de connexion
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('API Error:', error.response?.data || error);
        return Promise.reject(error);
    }
);

// Types
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto extends LoginDto {}

export interface AuthResponse {
    success: boolean;
    token: string;
    message: string;
}

// Service d'authentification
export const authService = {
    clearStorage() {
        localStorage.clear();
    },

    async login(data: LoginDto): Promise<AuthResponse> {
        try {
            this.clearStorage();
            const response = await api.post<AuthResponse>('/auth/login', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error.response?.data || error);
            throw error;
        }
    },

    async register(data: RegisterDto): Promise<AuthResponse> {
        try {
            this.clearStorage();
            const response = await api.post<AuthResponse>('/auth/register', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    logout() {
        this.clearStorage();
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
};

// Service de gestion des rôles
export interface RoleDto {
    name: string;
}

export interface UserRoleDto {
    email: string;
    roleName: string;
}

export const roleService = {
    async getAllRoles(): Promise<string[]> {
        const response = await api.get<string[]>('/role/all-roles');
        return response.data;
    },

    async createRole(data: RoleDto) {
        const response = await api.post('/role', data);
        return response.data;
    },

    async assignRole(data: UserRoleDto) {
        const response = await api.post('/role/assign', data);
        return response.data;
    },

    async removeRole(data: UserRoleDto) {
        const response = await api.post('/role/remove', data);
        return response.data;
    },

    async getUsersWithRole(roleName: string): Promise<string[]> {
        const response = await api.get<string[]>(`/role/users/${roleName}`);
        return response.data;
    },

    async deleteRole(roleName: string) {
        const response = await api.delete(`/role/delete/${roleName}`);
        return response.data;
    }
};

// Service de gestion des utilisateurs
export interface User {
    email: string;
    roles: string[];
}

export const userService = {
    async getAllUsers(): Promise<User[]> {
        const response = await api.get<User[]>('/auth/users');
        return response.data;
    },

    async deleteUser(email: string): Promise<void> {
        await api.delete(`/auth/users/${email}`);
    },

    async assignRole(email: string, role: string): Promise<void> {
        await api.post(`/auth/users/${email}/roles/${role}`);
    },

    async removeRole(email: string, role: string): Promise<void> {
        await api.delete(`/auth/users/${email}/roles/${role}`);
    }
}; 