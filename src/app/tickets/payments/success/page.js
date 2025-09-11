"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { TicketsService } from "service/TicketApi";


const SuccessPage = () => {
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const trxRef = searchParams.get('trxref');
  const ticketId = searchParams.get('ticketId');


  useEffect(() => {
    // Retrieve stored booking data
    const storedData = localStorage.getItem("ticketBookingData");
    if (!storedData) return;  // safety check

    const parsedData = JSON.parse(storedData);  // parse JSON string
    const user = parsedData.user;               // extract user object\
    const amount = parsedData.total;
    const quantity = parsedData.ticketQty;
    const body = { ...user, amount, quantity };

    const verifyPayment = async () => {
      setLoading(true);
      try {
        const response = await TicketsService.verifyPayment(trxRef, ticketId, body);
        if (response) {
          setBookingData(response);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
        localStorage.clear();
      }
    };

    verifyPayment();
  }, [trxRef, ticketId]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col">
      {bookingData ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl w-full">
          <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your ticket(s) have been successfully booked.
          </p>
          {/* Show booking data */}
          <div>
            <div className="text-left bg-gray-100 p-4 rounded-lg mb-6 space-y-2">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Booking Details:</h2>

              <p><strong>Name:</strong> {bookingData.firstName || 'Loading'} {bookingData.lastName}</p>
              <p><strong>Email:</strong> {bookingData.email || 'Loading'}</p>
              <p><strong>Phone:</strong> {bookingData.phone || 'Loading'}</p>
              <p><strong>Institution:</strong> {bookingData.institution || 'Loading'}</p>
              <p><strong>Faculty:</strong> {bookingData.faculty || 'Loading'}</p>
              <p><strong>Department:</strong> {bookingData.courseOfStudy || 'Loading'}</p>
              <p><strong>Gender:</strong> {bookingData.gender || 'Loading'}</p>
            </div>

            <div className="text-left bg-gray-100 p-4 rounded-lg mb-6 space-y-2">
              <h3 className="font-semibold text-gray-700">Ticket Info:</h3>

              <div className="">
                <p><strong>Ticket:</strong> {bookingData.ticketName || 'Loading'}</p>
                <p><strong>Price:</strong> ₦{bookingData.amountPaid || 'Loading'}</p>
              </div>


              <p className="mt-3"><strong>Quantity:</strong> {bookingData.ticketQuantity || 'Loading'}</p>
              <p className="text-lg font-bold"><strong>Total Paid:</strong> ₦{bookingData.amountPaid || 'Loading'}</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all"
          >
            Go to Homepage
          </button>

        </div>) : (
        <p className="text-gray-500 italic">No booking details found.</p>

      )}
    </div>
  );
};

export default SuccessPage;
