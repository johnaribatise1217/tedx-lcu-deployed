import { apiClient } from "./apiClient";
import { successNotify, failureNotify } from "../utils/toaster";

export const BlogService = {

    // Get all blog posts
    getAllBlogs: async () => {
        try {
            const response = await apiClient.get('/blogs/all');
            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            failureNotify(error.response?.data?.message || "Failed to fetch blog posts");
        }
    },

    // Get a specific blog post by ID
    getBlogById: async (id, token) => {
        try {
            const response = await apiClient.get(`/blogs/view/${id}`);
            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            failureNotify(error.response?.data?.message || "Failed to fetch blog post");
        }
    },

}