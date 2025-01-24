import axios from 'axios';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface AuthResponse {
    success: boolean;
    token: string;
    message: string;
}

interface LoginDto {
    Email: string;
    Password: string;
}

interface RegisterDto extends LoginDto {}

interface RoleDto {
    name: string;
}

interface UserRoleDto {
    email: string;
    roleName: string;
}

export interface ListingDto {
    id: string;
    type: string[];
    bedrooms: number;
    bathrooms: number;
    parking: number;
    size: number;
    price: number;
    description: string;
    name: string;
    isActive: boolean;
    address: string;
    latitude: number;
    longitude: number;
    images: ListingImageDto[];
    createdAt: string;
    updatedAt?: string;
}

interface CreateListingDto {
    type: string[];
    bedrooms: number;
    bathrooms: number;
    parking: number;
    size: number;
    price: number;
    description: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface UpdateListingDto {
    type?: string[];
    bedrooms?: number;
    bathrooms?: number;
    parking?: number;
    size?: number;
    price?: number;
    description?: string;
    name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
}

interface ListingImageDto {
    id: string;
    url: string;
    isHeader: boolean;
}

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // TODO: Change to production URL
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            console.log('Sending login request with:', { Email: email, Password: password })
            const response = await api.post<AuthResponse>('/Auth/login', { 
                Email: email, 
                Password: password 
            })
            console.log('Login response:', response.data)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }
            return response.data
        } catch (error) {
            console.error('Login error:', error)
            if (axios.isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data)
            }
            this.clearStorage()
            throw error
        }
    },

    async register(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/Auth/register', { 
                Email: email, 
                Password: password 
            })
            return response.data
        } catch (error) {
            this.clearStorage()
            throw error
        }
    },
    logout() {
        this.clearStorage()
    },
    isAuthenticated() {
        return !!localStorage.getItem('token')
    },
    clearStorage() {
        localStorage.removeItem('token')
        sessionStorage.clear()
    },
    getToken() {
        return localStorage.getItem('token')
    }
}

export const roleService = {
    async getAllRoles(): Promise<string[]> {
        const response = await api.get<string[]>('/role/all-roles')
        return response.data
    },

    async createRole(data: RoleDto): Promise<ApiResponse<void>> {
        const response = await api.post<ApiResponse<void>>('/role', data)
        return response.data
    },

    async assignRole(data: UserRoleDto): Promise<ApiResponse<void>> {
        const response = await api.post<ApiResponse<void>>('/role/assign', data)
        return response.data
    },

    async removeRole(data: UserRoleDto): Promise<ApiResponse<void>> {
        const response = await api.post<ApiResponse<void>>('/role/remove', data)
        return response.data
    },

    async getUsersWithRole(roleName: string): Promise<string[]> {
        const response = await api.get<string[]>(`/role/users/${roleName}`)
        return response.data
    },

    async deleteRole(roleName: string): Promise<ApiResponse<void>> {
        const response = await api.delete<ApiResponse<void>>(`/role/delete/${roleName}`)
        return response.data
    }
}

interface User {
    email: string;
    roles: string[];
}

export const userService = {
    async getAllUsers(): Promise<User[]> {
        const response = await api.get<User[]>('/auth/users')
        return response.data
    },

    async deleteUser(email: string): Promise<void> {
        await api.delete(`/auth/users/${email}`)
    },

    async assignRole(email: string, role: string): Promise<void> {
        await api.post(`/auth/users/${email}/roles/${role}`)
    },

    async removeRole(email: string, role: string): Promise<void> {
        await api.delete(`/auth/users/${email}/roles/${role}`)
    }
}

export const listingService = {
    async getAllListings(isActive?: boolean): Promise<ListingDto[]> {
        const params = isActive !== undefined ? `?isActive=${isActive}` : ''
        const response = await api.get<ListingDto[]>(`/listing${params}`)
        return response.data
    },

    async getListing(id: string): Promise<ListingDto> {
        const response = await api.get<ListingDto>(`/listing/${id}`)
        return response.data
    },

    async createListing(data: CreateListingDto): Promise<ListingDto> {
        const response = await api.post<ListingDto>('/listing', data)
        return response.data
    },

    async updateListing(id: string, data: UpdateListingDto): Promise<ListingDto> {
        const response = await api.put<ListingDto>(`/listing/${id}`, data)
        return response.data
    },

    async deleteListing(id: string): Promise<void> {
        await api.delete(`/listing/${id}`)
    },

    async toggleListingActive(id: string): Promise<ListingDto> {
        const response = await api.patch<ListingDto>(`/listing/${id}/toggle-active`)
        return response.data
    },

    async uploadImages(listingId: string, images: File[]): Promise<ListingDto> {
        try {
            const formData = new FormData()
            images.forEach(image => {
                formData.append('images', image)
            })
            
            const response = await api.post<ListingDto>(
                `/listing/${listingId}/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                }
            )
            return response.data
        } catch (error) {
            console.error('Upload error:', error)
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erreur lors de l\'upload des images')
            }
            throw error
        }
    },

    async setHeaderImage(listingId: string, imageId: string): Promise<ListingDto> {
        const response = await api.patch<ListingDto>(`/listing/${listingId}/images/${imageId}/set-header`)
        return response.data
    },

    async deleteImage(listingId: string, imageId: string): Promise<void> {
        await api.delete(`/listing/${listingId}/images/${imageId}`)
    }
} 