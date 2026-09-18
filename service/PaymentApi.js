import { apiClient } from "./apiClient";
import { failureNotify, successNotify } from "@/app/tickets/utils/toaster";

export const PaymentService = {
    initializePayment: async (paymentData) => {
        try {
            const response = await apiClient.post(`/payment/initialize`, paymentData);
            return response.data;
        } catch (error) {
            failureNotify(error.response?.data?.message || "Something went wrong with payment , try again")
            throw error;
        }
    }
};
