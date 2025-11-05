// services/userService.js
import httpClient from '../Utils/httpClient';

export const userService = {
    getAllUsers: async () => {
        const response = await httpClient.get("/users");
        return response.data;
    },

    updateUserStatus: async (userId, status) => {
        const response = await httpClient.put(`/users/${userId}/status`, { status });
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await httpClient.delete(`/users/${userId}`);
        return response.data;
    }
};
export const adminService = {
    createAdmin: async () => {
        const response = await httpClient.post("/admin/create");
        return response.data;
    },
    getAllUsers: async () => {
        const response = await httpClient.get("/admin/getAll");
        return response.data;
    },

    updateUser: async (userId) => {
        const response = await httpClient.get(`/admin/update/${userId}`);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await httpClient.delete(`/admin/delete/${userId}`);
        return response.data;
    }
};