import { apiClient } from "./apiClient";
import { failureNotify, successNotify } from "@/app/tickets/utils/toaster";

export const TicketsService = {
  getTickets: async () => {
    try {
      const response = await apiClient.get("/tickets/get-all");
      return response.data.data
    } catch (error) {
      failureNotify("Something went wrong while fetching tickets");
    }
  },
  initiateTicket: async (request) => {
    try {
      const response = await apiClient.post("/payment/initialize", request);
      if (response.data.success) {
        window.location.href = response.data.data
      }
    } catch (error) {
      failureNotify(error.response?.data?.message || "Something went wrong while initiating payment");
    }
  },
  verifyPayment: async (trxref, ticketId, body) => {
    try {
      const response = await apiClient.post(`/payment/callback?trxref=${trxref}&ticketId=${ticketId}`, body);
      if (response.data.success) {
        successNotify(response.data.statusMessage)
        return response.data.data
      }
    } catch (error) {
      failureNotify(error.response?.data?.message || "Something went wrong while verifying payment");
    }
  }
}