"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { failureNotify } from "utils/toaster";
import { TicketsService } from "service/TicketApi";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

const SuccessPage = () => {
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const trxRef = searchParams.get('trxref');
  const ticketId = searchParams.get('ticketId');
  const printRef = useRef(null);

  useEffect(() => {
    // Retrieve stored booking data
    const storedData = localStorage.getItem("ticketBookingData");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);
    const user = parsedData.user;
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
        setLoading(false)
        setBookingData(null)
        setError(true)
        setErrorMsg(error.response?.data?.message)
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
        localStorage.clear();
      }
    };

    verifyPayment();
  }, [trxRef, ticketId]);

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;

    try {
      setDownloading(true);

      const canvas = await html2canvas(printRef.current, { scale: 3 });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

      const data = canvas.toDataURL("image/png");
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("TedxLcuTicket.pdf:"+ bookingData.transactionReference);
      setDownloaded(true)
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setDownloading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col p-2 sm:p-4">
      {/* Success Message - Outside of printable area */}
      {
        error && (
          <div className="text-red-600 items-center ">
            {errorMsg}
          </div>
        )
      }
      {loading ? (
      <div className="flex items-center justify-center min-h-screen w-full bg-red-600">
        <div className="text-center text-white px-4">
          <svg
            className="animate-spin h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold">Loading Ticket...</h2>
          <p className="mt-2 text-sm sm:text-base text-red-100">
            Please wait while we verify your payment.
          </p>
        </div>
      </div>
    ): 
    (
      <>
        <div className="mb-4 sm:mb-6 text-center px-2">
          <CheckCircle2 className="mx-auto text-red-500 w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Payment Successful 🎉
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Thank you for your purchase! Your ticket has been successfully generated.
          </p>
          <small className="text-sm sm:text-base text-gray-600 px-2">
            Click the DOWNLOAD TICKET and be patient.
          </small>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center mb-[1rem] justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            <button
              onClick={() => router.push("/")}
              className="bg-gray-500 hover:bg-gray-600 w-full sm:w-auto flex items-center justify-center gap-2 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer text-sm sm:text-base"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              Go to Homepage
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={!bookingData?.firstName || downloading || downloaded}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-lg shadow-lg text-sm sm:text-base transition-all duration-200 transform
                ${(!bookingData?.firstName || downloading)
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-red-500 hover:bg-red-600 text-white hover:scale-105"}
              `}
            >
              {downloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Downloading Ticket...
                </>
              ) : (
                <>
                  <Download size={18} className="sm:w-5 sm:h-5" />
                  Download Ticket
                </>
              )}
            </button>
          </div>
          <div
            ref={printRef}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full mx-2 sm:mx-0 overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #FF0000 0%, #000000 100%)",
            }}
          >
            {/* Ticket Header with Logo */}
            <div className="flex items-center justify-between p-4 sm:p-6 pb-0">
              {/* Event Title */}
              <div className="text-white mb-2 sm:mb-4 flex-1">
                <p className="text-white/80 text-xs sm:text-sm">Theme:</p>
                <h2 className="text-lg sm:text-2xl font-bold mb-1">THE COLLECTIVE</h2>
              </div>

              {/* TEDx Logo - Top Right */}
              <div className="flex-shrink-0 ml-2">
                <Image
                  src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                  alt="Tedx Logo"
                  width={180}
                  height={180}
                  className="w-24 sm:w-36 md:w-48"
                />
              </div>
            </div>

            {/* Decorative Perforation Line */}
            <div className="relative px-4 sm:px-6">
              <div
                className="border-t-2 border-dashed border-white/30 my-2 sm:my-4"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, white 10px, white 12px)',
                  height: '2px',
                  border: 'none'
                }}
              ></div>

              {/* Circular punch holes on sides */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gray-50 rounded-full"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gray-50 rounded-full"></div>
            </div>

            {/* Main Ticket Content */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-inner">
                {/* Attendee Information */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 border-b-2 border-red-500 pb-2">
                    ATTENDEE INFORMATION
                  </h3>

                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm">
                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Name:</span>
                      <p className="font-semibold text-gray-800">
                        {bookingData.firstName || 'Loading'} {bookingData.lastName}
                      </p>
                    </div>

                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Email:</span>
                      <p className="font-semibold text-gray-800 break-all">
                        {bookingData.email || 'Loading'}
                      </p>
                    </div>

                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Phone:</span>
                      <p className="font-semibold text-gray-800">
                        {bookingData.phone || 'Loading'}
                      </p>
                    </div>

                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Institution:</span>
                      <p className="font-semibold text-gray-800">
                        {bookingData.institution || 'Loading'}
                      </p>
                    </div>

                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Faculty:</span>
                      <p className="font-semibold text-gray-800">
                        {bookingData.faculty || 'Loading'}
                      </p>
                    </div>

                    <div className="mb-2 sm:mb-0">
                      <span className="text-gray-500 font-medium">Department:</span>
                      <p className="font-semibold text-gray-800">
                        {bookingData.courseOfStudy || 'Loading'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 border-b-2 border-red-500 pb-2">
                    TICKET DETAILS
                  </h3>

                  <div className="flex sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
                    <div className="flex-1">
                      <span className="text-gray-500 font-medium text-xs sm:text-sm">Ticket Type:</span>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">
                        {bookingData.ticketName || 'Loading'}
                      </p>
                    </div>
                    {bookingData.discount && 
                      <div className="flex-1">
                        <span className="text-gray-500 font-medium text-xs sm:text-sm">Discount Details:</span>
                        <p className="font-bold text-gray-800 text-base sm:text-lg">
                          {bookingData.discountPercentage || 'Loading'} %
                        </p>
                      </div>
                    }
                    <div className="text-left sm:text-right">
                      <span className="text-gray-500 font-medium text-xs sm:text-sm">Quantity:</span>
                      <p className="font-bold text-xl sm:text-2xl text-red-600">
                        {bookingData.ticketQuantity || 'Loading'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-2">
                    <div className="flex flex-col gap-3 w-full sm:flex-1">
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                        <span className="text-gray-500 font-medium text-xs sm:text-sm">Total Amount Paid</span>
                        <p className="font-black text-2xl sm:text-3xl text-red-600">
                          ₦{bookingData.amountPaid || 'Loading'}
                        </p>
                      </div>

                      <div className="pt-2 text-start bg-gray-50 rounded-lg p-3 sm:p-4">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Transaction Reference: <br className="sm:hidden" />
                          <span className="font-mono break-all">{bookingData.transactionReference}</span>
                        </span>
                      </div>
                    </div>

                    {/* QR CODE */}
                    <div className="flex justify-center w-full sm:w-auto">
                      {bookingData.qrCodeUrl ? (
                        <div className="bg-gray-300 p-2 sm:p-3 w-fit rounded-lg border-2 border-dashed border-red-500">
                          <QRCodeCanvas
                            value={bookingData.qrCodeUrl}
                            size={120}
                            className="sm:!w-[150px] sm:!h-[150px]"
                            bgColor="#DCDCDC"
                            fgColor="#000000"
                            level="H"
                          />
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm">QR Code not available</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event Date */}
                <div className="mt-4 sm:mt-6 text-center bg-gray-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg">
                  <span className="text-xs font-medium text-gray-300">EVENT DATE</span>
                  <p className="font-mono text-xs sm:text-sm font-bold tracking-wider">
                    FRIDAY, NOVEMBER 7TH 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-l-4 border-t-4 border-white/20 rounded-tl-xl sm:rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-r-4 border-t-4 border-white/20 rounded-tr-xl sm:rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-l-4 border-b-4 border-white/20 rounded-bl-xl sm:rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-r-4 border-b-4 border-white/20 rounded-br-xl sm:rounded-br-2xl"></div>
          </div>
      </>
    )}
    </div>
  );
};

export default SuccessPage;