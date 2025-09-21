// Updated Speakerservice.js
import { apiClient } from './apiClient';
import { successNotify, failureNotify } from '../utils/toaster'

export const SpeakerService = {
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
}