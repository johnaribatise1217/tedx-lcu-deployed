import { apiClient } from "./apiClient";

export const PaymentService = {
    initializePayment: async (paymentData) => {
        try {
            const response = await apiClient.post(`/payment/initialize`, paymentData);
            return response.data;
        } catch (error) {
            console.error("Payment initialization failed:", error);
            throw error;
        }
    }
};
