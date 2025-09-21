// Updated Speakerservice.js
import { apiClient } from './apiClient';
import { successNotify, failureNotify } from '../utils/toaster'

export const SpeakerService = {
    CreateSpeaker: async (data, token) => {
        try {
            const response = await apiClient.post(
                '/speakers/create',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (response.data?.success) {
                successNotify(response.data.statusMessage || 'Speaker created successfully');
                return response.data.data ?? response.data;
            } else {
                failureNotify(response.data?.statusMessage || 'Failed to create speaker');
                return null;
            }
        } catch (error) {
            console.error('Service error:', error.response?.data || error.message)
            throw error
        }
    },

    GetAllSpeakers: async (token) => {
        try {
            const response = await apiClient.get('/speakers/get-all')
            if (response.data?.success) {
                return response.data.data ?? response.data;
            } else {
                failureNotify(response.data?.statusMessage || 'Failed to fetch speakers');
                return [];
            }
        } catch (error) {
            console.error('Get speakers error:', error.response?.data || error.message)
            failureNotify('Failed to fetch speakers');
            return []; // Return empty array instead of throwing for better UX
        }
    },

    DeleteSpeaker: async (speakerId, token) => {
        try {
            const response = await apiClient.delete(
                `/speakers/delete/${speakerId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'application/json',
                    },
                }
            )
            if (response.data?.success) {
                successNotify(response.data.statusMessage || 'Speaker deleted successfully');
                return response.data.data ?? response.data;
            } else {
                failureNotify(response.data?.statusMessage || 'Failed to delete speaker');
                return null;
            }
        } catch (error) {
            console.error('Delete speaker error:', error.response?.data || error.message)
            failureNotify('Failed to delete speaker');
            throw error;
        }
    },

    UpdateSpeaker: async (speakerId, data, token) => {
        try {
            const response = await apiClient.put(
                `/speakers/update/${speakerId}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (response.data?.success) {
                successNotify(response.data.statusMessage || 'Speaker updated successfully');
                return response.data.data ?? response.data;
            } else {
                failureNotify(response.data?.statusMessage || 'Failed to update speaker');
                return null;
            }
        } catch (error) {
            console.error('Update speaker error:', error.response?.data || error.message)
            failureNotify('Failed to update speaker');
            throw error;
        }
    },

    GetSpeakerById: async (speakerId, token) => {
        try {
            const response = await apiClient.get(`/speakers/view/${speakerId}`)
            if (response.data?.success) {
                return response.data.data ?? response.data;
            } else {
                failureNotify(response.data?.statusMessage || 'Failed to fetch speaker details');
                return null;
            }
        } catch (error) {
            console.error('Get speaker by ID error:', error.response?.data || error.message)
            failureNotify('Failed to fetch speaker details');
            return null;
        }
    }
}