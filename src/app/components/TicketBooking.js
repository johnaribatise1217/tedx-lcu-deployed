'use client'
import React, { useEffect, useState } from 'react'
import { Check, AlertCircle, Info, X, ArrowLeft, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import { TicketsService } from 'service/TicketApi';
import { apiClient } from 'service/apiClient';
import { successNotify, failureNotify } from '@/app/tickets/utils/toaster';
import Image from 'next/image';
import Link from 'next/link';
import { anton, spaceMono, outfit } from '../fonts';
import { QRCodeCanvas } from 'qrcode.react';
// import { PaymentService } from 'service/PaymentApi';

export default function TicketBooking() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedTickets, setSelectedTickets] = useState({})
     const [generateQRcodeInputs, setGenerateQRcodeInputs] = useState({
        email: '',
        trxref: ''
    })
    const [qrUrl, setQrUrl] = useState("");
    const [qrLoading, setQRLoading] = useState(false);

     const handleGenerate = async () => {
        const { email, trxref } = generateQRcodeInputs;
        if (!email || !trxref) {
        alert("Please enter both email and transaction reference");
            return;
        }

        try {
            setQRLoading(true);
            const response = await TicketsService.generateQRcode(email, trxref) // returns the URL from your backend
            if(response){
                setQrUrl(response);
            }
        } catch (error) {
        console.error(error);
        } finally {
            setQRLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        institution: '',
        gender: '',
        workshopInterest: '',
        faculty: '',
        courseOfStudy: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const [showValidation, setShowValidation] = useState(false)
    const [showMobileSummary, setShowMobileSummary] = useState(false)
    const [tickets, setTickets] = useState([])
    const [openDiscounts, setOpenDiscounts] = useState([])
    const [discountCodeInput, setDiscountCodeInput] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState(null)
    const [discountError, setDiscountError] = useState('')
    const [discountLoading, setDiscountLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    // Fetch tickets from API
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true)
                const response = await TicketsService.getTickets()
                setTickets(response || [])
            } catch (err) {
                setError('Failed to load tickets. Please try again later.')
                console.error('Error fetching tickets:', err)
            } finally {
                setLoading(false)
            }
        }

        // fetch tickets and open discounts in parallel
        const fetchDiscounts = async () => {
            try {
                setDiscountLoading(true)
                const res = await apiClient.get('/discounts/open-discount')
                const data = res.data?.data || []
                setOpenDiscounts(data)

                // if there's a saved discount code in localStorage, try to re-apply
                const saved = localStorage.getItem('discountCode')
                if (saved) {
                    const matched = data.find(d => d.code?.toLowerCase() === saved.toLowerCase())
                    if (matched) {
                        setAppliedDiscount(matched)
                        setDiscountCodeInput(matched.code)
                    } else {
                        // saved code no longer open - remove
                        localStorage.removeItem('discountCode')
                    }
                }
            } catch (err) {
                console.error('Failed to fetch discounts', err)
            } finally {
                setDiscountLoading(false)
            }
        }

        fetchTickets()
        fetchDiscounts()
    }, [])

    const updateTicketQuantity = (ticketId, change) => {
        setSelectedTickets(prev => {
            const currentQty = prev[ticketId] || 0
            const newQty = Math.max(0, currentQty + change)

            if (newQty === 0) {
                const { [ticketId]: removed, ...rest } = prev
                return rest
            }

            if (change > 0 && currentQty === 0) {
                return {
                    [ticketId]: newQty
                }
            }

            return {
                ...prev,
                [ticketId]: newQty
            }
        })
    }

    const calculateticketPriceTotal = () => {
        return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
            const ticket = tickets.find(t => t.id === ticketId)
            if (!ticket) return total
            const price = appliedDiscount ? Math.round(ticket.price * (1 - (appliedDiscount.percentage || 0) / 100)) : ticket.price
            return total + (price || 0) * quantity
        }, 0)
    }

    const getticketQty = () => {
        return Object.values(selectedTickets).reduce((total, qty) => total + qty, 0)
    }

    const getSelectedTicketsDisplay = () => {
        return Object.entries(selectedTickets).map(([ticketId, quantity]) => {
            const ticket = tickets.find(t => t.id === ticketId)
            const discountedPrice = ticket && appliedDiscount ? Math.round(ticket.price * (1 - (appliedDiscount.percentage || 0) / 100)) : ticket?.price
            return { ...ticket, quantity, discountedPrice }
        })
    }

    const applyDiscount = async () => {
        setDiscountError('')
        if (!discountCodeInput.trim()) {
            setDiscountError('Please enter a discount code')
            return
        }

        setDiscountLoading(true)
        try {
            // validate with server endpoint
            const code = discountCodeInput.trim()
            const res = await apiClient.get(`/discounts/validate/${encodeURIComponent(code)}`)
            if (res.data?.success && res.data?.data) {
                const matched = res.data.data
                setAppliedDiscount(matched)
                localStorage.setItem('discountCode', matched.code)
                successNotify(res.data.statusMessage || 'Discount applied')
            }
            // } else {
            //     const msg = res.data?.statusMessage || 'Invalid or expired discount code'
            //     setDiscountError(msg)
            //     failureNotify(msg)
            // }
        } catch (err) {
            console.error('Discount validation failed', err)
            const msg = err.response?.data?.message || 'Failed to validate discount code'
            setDiscountError(msg)
            failureNotify(msg)
        } finally {
            setDiscountLoading(false)
        }
    }

    const removeDiscount = () => {
        setAppliedDiscount(null)
        setDiscountCodeInput('')
        setDiscountError('')
        localStorage.removeItem('discountCode')
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required'
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required'
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required'
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
            errors.phone = 'Please enter a valid phone number'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleProceed = async () => {
        if (currentStep === 1) {
            if (Object.keys(selectedTickets).length === 0) {
                alert('Please select at least one ticket to proceed.')
                return
            }
            setCurrentStep(2)
        } else if (currentStep === 2) {
            setShowValidation(true)
            if (validateForm()) {
                // Build data object with form + ticket info
                const bookingData = {
                    user: { ...formData },
                    // tickets: getSelectedTicketsDisplay(),
                    total,
                    ticketQty
                }

                // Save to localStorage
                localStorage.setItem("ticketBookingData", JSON.stringify(bookingData))

                // Log for debugging
                console.log("Saved booking data:", bookingData)

                setCurrentStep(3)
                setShowValidation(false)
            }
        } else if (currentStep === 3) {
            const saved = localStorage.getItem('discountCode')
            const bookingData = {
                email: formData.email,
                ticketId: Object.keys(selectedTickets)[0],
                quantity: ticketQty,
                discountCode: saved
            }

            try {
                setIsProcessingPayment(true);
                const response = await TicketsService.initiateTicket(bookingData);

                console.log("Raw payment response:", response);  // 👈 check full structure
                const authorizationUrl = response.data;

                if (authorizationUrl) {
                    window.location.href = authorizationUrl;
                } else {
                    // setError("Failed to initialize payment. Please try again.");
                    console.log('Failed to initialize payment. Please try again.')
                }
            } catch (error) {
                console.log('Failed to initialize payment. Please try again.', error)
            }
            finally {
                setLoading(false);
                setIsProcessingPayment(false);
            }
        }
    }


    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
            setShowValidation(false)
        }
    }

    const canProceed = () => {
        if (currentStep === 1) {
            return Object.keys(selectedTickets).length > 0
        }
        if (currentStep === 2) {
            return formData.firstName && formData.lastName && formData.email && formData.phone
        }
        return true
    }

    const ticketPriceTotal = calculateticketPriceTotal()
    const total = ticketPriceTotal
    const ticketQty = getticketQty()

    const stepLabel = (step) => step === 1 ? 'Select Tickets' : step === 2 ? 'Your Details' : 'Payment'

    const inputClasses = (fieldName, required = true) => {
        const hasError = showValidation && formErrors[fieldName]
        const isFilled = formData[fieldName]
        return `${outfit.className} w-full px-4 py-3 sm:py-2.5 border-2 outline-none transition-colors text-base bg-white ${hasError
            ? 'border-red-500 bg-red-50'
            : required && isFilled
                ? 'border-black'
                : 'border-black/15 focus:border-black'
            }`
    }

    // Mobile Summary Component
    const MobileSummary = () => (
        <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${showMobileSummary ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute bottom-0 left-0 right-0 bg-white border-t-2 border-black transform transition-transform duration-300 ${showMobileSummary ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className={`${anton.className} uppercase text-xl`}>Order Summary</h3>
                        <button
                            onClick={() => setShowMobileSummary(false)}
                            className="p-2 hover:bg-black/5 border border-black/10"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="space-y-3 mb-6">
                        {getSelectedTicketsDisplay().length > 0 ? (
                            getSelectedTicketsDisplay().map((ticket) => (
                                <div key={ticket.id} className='border border-black/10 p-4'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h4 className={`${outfit.className} font-semibold text-gray-900 text-sm leading-tight`}>
                                            {ticket.name}
                                        </h4>
                                        <span className={`${spaceMono.className} text-xs bg-black text-white px-2 py-1`}>
                                            ×{ticket.quantity}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className={`${spaceMono.className} text-xs text-gray-600`}>
                                            ₦{(ticket.discountedPrice ?? ticket.price).toLocaleString()} each
                                        </span>
                                        <span className={`${anton.className} text-lg text-gray-900`}>
                                            ₦{(((ticket.discountedPrice ?? ticket.price) || 0) * ticket.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-center py-8 text-gray-500'>
                                <Info size={32} className="mx-auto mb-3 text-gray-300" />
                                <p className={`${outfit.className} text-base`}>No tickets selected yet</p>
                            </div>
                        )}
                    </div>

                    {ticketPriceTotal > 0 && (
                        <div className='pt-4 border-t-2 border-black'>
                            <div className='flex justify-between items-baseline'>
                                <span className={`${spaceMono.className} text-xs tracking-[0.2em] uppercase text-gray-600`}>Total</span>
                                <span className={`${anton.className} text-2xl`}>₦{total.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className='px-4 sm:px-6 lg:px-12 py-6 lg:py-16'>
                        <div className="mb-6 lg:mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`${spaceMono.className} text-red-600 text-xs tracking-[0.3em]`}>01</span>
                                <span className={`${spaceMono.className} text-gray-500 text-xs tracking-[0.3em] uppercase`}>Tickets</span>
                                <span className="flex-1 h-px bg-black/10" />
                            </div>
                            <h2 className={`${anton.className} uppercase text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2`}>
                                Choose Your Tickets
                            </h2>
                            <p className={`${outfit.className} text-gray-600 text-base sm:text-lg`}>
                                Select the number of tickets for the TEDx event
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-50 border-2 border-red-200">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-red-600" size={20} />
                                    <span className={`${outfit.className} text-red-800`}>{error}</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Discount Input (render above ticket list) */}
                                <div className="mb-6 p-4 sm:p-5 bg-red-600/5 border-2 border-red-600/20">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        <div className="flex-1">
                                            <label className={`${spaceMono.className} block text-xs tracking-[0.2em] uppercase font-semibold text-gray-700 mb-2`}>Have a discount code?</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type='text'
                                                    value={discountCodeInput}
                                                    onChange={(e) => setDiscountCodeInput(e.target.value)}
                                                    placeholder='Enter discount code'
                                                    className={`${outfit.className} w-full px-4 py-3 border-2 border-black/15 focus:border-black outline-none text-base bg-white`}
                                                />
                                                {!appliedDiscount ? (
                                                    <button
                                                        onClick={applyDiscount}
                                                        disabled={discountLoading}
                                                        className={`${spaceMono.className} px-5 py-3 bg-black hover:bg-red-600 text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer whitespace-nowrap`}
                                                    >
                                                        {discountLoading ? 'Checking...' : 'Apply'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={removeDiscount}
                                                        className={`${spaceMono.className} px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs tracking-[0.2em] uppercase font-medium cursor-pointer whitespace-nowrap`}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            {discountError && <p className={`${outfit.className} mt-2 text-sm text-red-600`}>{discountError}</p>}
                                            {appliedDiscount && <p className={`${outfit.className} mt-2 text-sm text-green-700`}>Applied: {appliedDiscount.code} — {appliedDiscount.percentage}% off until {new Date(appliedDiscount.endDate).toLocaleString()}</p>}
                                        </div>
                                    </div>
                                </div>
                                {ticketQty > 0 && (
                                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200">
                                        <div className="flex items-center gap-2">
                                            <Check className="text-green-600 flex-shrink-0" size={20} />
                                            <span className={`${outfit.className} text-green-800 font-medium`}>
                                                {ticketQty} ticket{ticketQty > 1 ? 's' : ''} selected
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200">
                                    <div className="flex items-center gap-2">
                                        <Info className="text-blue-600 flex-shrink-0" size={20} />
                                        <span className={`${outfit.className} text-blue-800`}>
                                            You can select only one ticket type per order. Choose the type that best suits your needs.
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 sm:space-y-6 lg:mb-0 mb-20">
                                    {tickets.map((ticket) => {
                                        const quantity = selectedTickets[ticket.id] || 0
                                        const isThisTicketSelected = quantity > 0
                                        const hasOtherTicketSelected = Object.keys(selectedTickets).length > 0 && !isThisTicketSelected
                                        const isDisabled = hasOtherTicketSelected

                                        return (
                                            <div key={ticket.id} className='w-full'>
                                                <div className={`relative flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 border-2 transition-all duration-200 ${quantity > 0
                                                    ? 'border-black bg-black/[0.02]'
                                                    : isDisabled
                                                        ? 'border-black/10 bg-black/[0.02] opacity-60'
                                                        : 'border-black/15'
                                                    }`}>

                                                    {isDisabled && (
                                                        <div className="absolute top-4 right-4">
                                                            <span className={`${spaceMono.className} text-[10px] bg-gray-200 text-gray-600 px-2 py-1 uppercase tracking-wide`}>
                                                                Another ticket type selected
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className={`${anton.className} uppercase text-lg sm:text-xl text-gray-900 mb-2`}>
                                                                {ticket.name}
                                                            </h3>
                                                            <p className={`${outfit.className} text-gray-600 text-sm sm:text-base leading-relaxed mb-3`}>
                                                                {ticket.ticketDescription}
                                                            </p>

                                                            {/* Features - Hidden on mobile, shown on larger screens */}
                                                            <div className="hidden sm:block space-y-1">
                                                                {ticket.benefits && ticket.benefits.map((benefit, index) => (
                                                                    <div key={index} className="flex items-center gap-2">
                                                                        <Check size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                                        <span className={`${outfit.className} text-sm text-gray-700`}>{benefit}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Features - Mobile accordion style */}
                                                            <div className="sm:hidden">
                                                                <button
                                                                    className={`${spaceMono.className} text-red-600 text-xs uppercase tracking-wide font-medium`}
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        const features = e.target.nextElementSibling
                                                                        features.classList.toggle('hidden')
                                                                        e.target.textContent = features.classList.contains('hidden')
                                                                            ? 'Show benefits'
                                                                            : 'Hide benefits'
                                                                    }}
                                                                >
                                                                    Show benefits
                                                                </button>
                                                                <div className="hidden mt-2 space-y-1">
                                                                    {ticket.benefits && ticket.benefits.map((benefit, index) => (
                                                                        <div key={index} className="flex items-center gap-2">
                                                                            <Check size={12} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                                            <span className={`${outfit.className} text-xs text-gray-700`}>{benefit}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-center sm:text-right">
                                                            <div className="flex flex-col items-center sm:items-end">
                                                                <div className='flex flex-col items-center sm:items-end'>
                                                                    {appliedDiscount ? (
                                                                        <>
                                                                            <p className={`${spaceMono.className} text-sm text-gray-500 line-through`}>₦{ticket.price.toLocaleString()}</p>
                                                                            <p className={`${anton.className} text-xl sm:text-2xl text-gray-900`}>₦{(Math.round(ticket.price * (1 - (appliedDiscount.percentage || 0) / 100))).toLocaleString()}</p>
                                                                        </>
                                                                    ) : (
                                                                        <p className={`${anton.className} text-xl sm:text-2xl text-gray-900`}>₦{ticket.price.toLocaleString()}</p>
                                                                    )}

                                                                    {/* Discount badge inside ticket box */}
                                                                    {appliedDiscount && (
                                                                        <div className={`${spaceMono.className} mt-2 inline-flex items-center gap-2 bg-red-600 text-white px-2 py-1 text-[11px] font-semibold`}>
                                                                            <span>{appliedDiscount.percentage}% OFF</span>
                                                                            <span className='opacity-80'>ends {new Date(appliedDiscount.endDate).toLocaleDateString()}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {ticket.availableQuantity && (
                                                                    <span className={`${spaceMono.className} text-xs text-gray-500 mt-1`}>
                                                                        {ticket.availableQuantity} available
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between pt-4 border-t border-black/10'>
                                                        <div className='flex items-center gap-3 sm:gap-4'>
                                                            <span className={`${spaceMono.className} text-xs tracking-[0.15em] uppercase font-medium text-gray-700 hidden sm:inline`}>Quantity</span>
                                                            <div className="flex items-center gap-3 sm:gap-4">
                                                                <button
                                                                    onClick={() => updateTicketQuantity(ticket.id, -1)}
                                                                    disabled={quantity === 0}
                                                                    className='border-2 border-black/15 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center transition-colors touch-manipulation cursor-pointer'
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className={`${anton.className} w-8 text-center text-xl`}>
                                                                    {quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateTicketQuantity(ticket.id, 1)}
                                                                    disabled={isDisabled || (ticket.availableQuantity && quantity >= ticket.availableQuantity)}
                                                                    className={`w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center transition-colors touch-manipulation border-2 ${isDisabled
                                                                        ? 'border-black/10 text-gray-400 cursor-not-allowed'
                                                                        : 'border-black/15 hover:border-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'
                                                                        }`}
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {quantity > 0 && (
                                                            <div className="text-right">
                                                                <span className={`${anton.className} text-base sm:text-lg text-gray-900`}>
                                                                    ₦{(((appliedDiscount ? Math.round(ticket.price * (1 - (appliedDiscount.percentage || 0) / 100)) : ticket.price) || 0) * quantity).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Merchandise Section */}
                                <div className="mt-8 p-6 bg-black text-white bg-grain">
                                    <div className="text-center mb-6">
                                        <span className={`${spaceMono.className} text-red-500 text-xs tracking-[0.3em] uppercase`}>Merch</span>
                                        <h3 className={`${anton.className} uppercase text-xl sm:text-2xl mt-2 mb-2`}>
                                            TEDxLeadCityUniversity Merch
                                        </h3>
                                        <p className={`${outfit.className} text-gray-400 text-sm sm:text-base`}>
                                            Get exclusive TEDx branded items to commemorate the event
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 dm:w-[70%] w-full mx-auto gap-4 mb-6">
                                        <div className="bg-white/5 border border-white/15 sm:p-4 p-2">
                                            <div className="aspect-square bg-white/5 mb-3 relative">
                                                <Image
                                                    src="/images/red-merch.jpeg"
                                                    alt="TEDx T-Shirt"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                />
                                            </div>

                                            <h4 className={`${outfit.className} font-semibold text-white text-sm`}>TEDx Red T-Shirt</h4>
                                            <p className={`${spaceMono.className} text-[11px] text-gray-400 mt-1`}>Premium cotton blend</p>
                                        </div>

                                        <div className="bg-white/5 border border-white/15 sm:p-4 p-2">
                                            <div className="aspect-square bg-white/5 mb-3 relative">
                                                <Image
                                                    src="/images/white-merch.jpeg"
                                                    alt="TEDx T-Shirt"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                />
                                            </div>

                                            <h4 className={`${outfit.className} font-semibold text-white text-sm`}>TEDx White T-shirt</h4>
                                            <p className={`${spaceMono.className} text-[11px] text-gray-400 mt-1`}>Premium cotton blend</p>
                                        </div>

                                         <div className="bg-white/5 border border-white/15 sm:p-4 p-2">
                                            <div className="aspect-square bg-white/5 mb-3 relative">
                                                <Image
                                                    src="/images/black-merch.jpeg"
                                                    alt="TEDx T-Shirt"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                />
                                            </div>

                                            <h4 className={`${outfit.className} font-semibold text-white text-sm`}>TEDx Black T-shirt</h4>
                                            <p className={`${spaceMono.className} text-[11px] text-gray-400 mt-1`}>Premium cotton blend</p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    "https://www.tachpae.com/events/tedx-leadcity-the-collective-2025",
                                                    "_blank"
                                                )
                                            }
                                            className={`${spaceMono.className} inline-flex cursor-pointer items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-colors duration-200 whitespace-nowrap`}
                                        >
                                            <ShoppingBag size={16} />
                                            Buy Merchandise
                                        </button>

                                        <p className={`${outfit.className} text-xs text-gray-500 mt-3`}>
                                            Available for pickup at the event or Delivery
                                        </p>
                                    </div>
                                </div>
                            <p className='mt-8'>Missing QR code?</p>
                              <div className='w-full mt-5 flex flex-col items-start lg:flex-row gap-[1.5rem] lg:gap-[3rem]'>
                                    <input value={generateQRcodeInputs.email}
                                     onChange={(e) => setGenerateQRcodeInputs((prev) => ({...prev, email: e.target.value}))} 
                                     placeholder='Enter Ticket Email' className='w-full border border-gray-300 rounded-[10px] lg:w-1/2 p-3'/>
                                    <input value={generateQRcodeInputs.trxref} onChange={(e) => setGenerateQRcodeInputs((prev) => ({...prev, trxref: e.target.value}))} 
                                    placeholder='Enter Ticket Reference' className='w-full p-3 border border-gray-300 rounded-[10px] lg:w-1/2'/>
                                </div>

                                 <button 
                                onClick={handleGenerate}
                                disabled={!generateQRcodeInputs.email || !generateQRcodeInputs.trxref || qrLoading}
                                className='mt-4 text-[15px] p-3 rounded-[12px] font-[600] bg-blue-100 cursor-pointer hover:bg-blue-200 text-blue-700'>
                                {qrLoading ? 'Generating QR Code...' : 'Generate QR Code' }
                                </button>
                                {/* Loading Spinner */}
                                {qrLoading && (
                                    <div className="flex justify-center items-center mt-5">
                                    <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
                                    <p className="ml-2 text-blue-600 font-medium">Fetching QR Code...</p>
                                    </div>
                                )}

                                  {/* QR Code Display */}
                                {qrUrl && !qrLoading && (
                                    <div className="mt-6 flex flex-col items-center">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-700">
                                            Your Ticket QR Code
                                        </h3>
                                        <QRCodeCanvas value={qrUrl} size={220} level="H" includeMargin={true} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )

            case 2:
                return (
                    <div className='px-4 sm:px-6 lg:px-12 py-6 lg:py-16'>
                        <div className="mb-6 lg:mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`${spaceMono.className} text-red-600 text-xs tracking-[0.3em]`}>02</span>
                                <span className={`${spaceMono.className} text-gray-500 text-xs tracking-[0.3em] uppercase`}>Details</span>
                                <span className="flex-1 h-px bg-black/10" />
                            </div>
                            <h2 className={`${anton.className} uppercase text-2xl sm:text-3xl text-gray-900 mb-2`}>
                                Your Information
                            </h2>
                            <p className={`${outfit.className} text-gray-600 text-base sm:text-lg`}>
                                Please provide your details for ticket registration
                            </p>
                        </div>

                        <div className='w-full space-y-4 sm:space-y-6'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        First Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        className={inputClasses('firstName')}
                                        placeholder="Enter your first name"
                                    />
                                    {showValidation && formErrors.firstName && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {formErrors.firstName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        Last Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                        className={inputClasses('lastName')}
                                        placeholder="Enter your last name"
                                    />
                                    {showValidation && formErrors.lastName && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {formErrors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                    Email Address *
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className={inputClasses('email')}
                                    placeholder="Enter your email address"
                                />
                                {showValidation && formErrors.email && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {formErrors.email}
                                    </p>
                                )}
                                <p className={`${outfit.className} mt-1 text-xs text-gray-500`}>
                                    Your ticket confirmation will be sent to this email
                                </p>
                            </div>

                            <div>
                                <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                    Phone Number *
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className={inputClasses('phone')}
                                    placeholder="Enter your phone number"
                                />
                                {showValidation && formErrors.phone && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {formErrors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        Gender
                                    </label>
                                    <select
                                        name='gender'
                                        value={formData.gender}
                                        onChange={handleFormChange}
                                        className={`${outfit.className} w-full px-4 py-3 sm:py-2.5 border-2 border-black/15 focus:border-black outline-none bg-white text-base`}
                                    >
                                        <option value=''>Select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        Institution/Organization
                                    </label>
                                    <input
                                        type='text'
                                        name='institution'
                                        value={formData.institution}
                                        onChange={handleFormChange}
                                        className={`${outfit.className} w-full px-4 py-3 sm:py-2.5 border-2 border-black/15 focus:border-black outline-none text-base`}
                                        placeholder="E.g Leadcity University"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        Faculty
                                    </label>
                                    <input
                                        type='text'
                                        name='faculty'
                                        value={formData.faculty}
                                        onChange={handleFormChange}
                                        className={`${outfit.className} w-full px-4 py-3 sm:py-2.5 border-2 border-black/15 focus:border-black outline-none text-base`}
                                        placeholder="E.g Facultty of Science"
                                    />
                                    <p className={`${outfit.className} mt-1 text-xs text-gray-500`}>
                                        Required for Students
                                    </p>
                                </div>

                                <div>
                                    <label className={`${spaceMono.className} block text-xs tracking-[0.15em] uppercase font-semibold text-gray-700 mb-2`}>
                                        Course of Study
                                    </label>
                                    <input
                                        type='text'
                                        name='courseOfStudy'
                                        value={formData.courseOfStudy}
                                        onChange={handleFormChange}
                                        className={`${outfit.className} w-full px-4 py-3 sm:py-2.5 border-2 border-black/15 focus:border-black outline-none text-base`}
                                        placeholder="E.g Computer Science"
                                    />
                                    <p className={`${outfit.className} mt-1 text-xs text-gray-500`}>
                                        Required for Students
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full mb-[4rem] mt-6 sm:mt-8 flex gap-3'>
                            <button
                                onClick={handleBack}
                                className={`${spaceMono.className} w-full sm:w-auto px-6 py-3 border-2 border-black/20 text-gray-700 hover:border-black transition-colors text-xs tracking-[0.2em] uppercase font-medium mb-4 sm:mb-0 touch-manipulation cursor-pointer`}
                            >
                                ← Back to Tickets
                            </button>

                            <button
                                onClick={handleProceed}
                                className={`${spaceMono.className} w-full cursor-pointer bg-black text-white hover:bg-red-600 sm:w-auto px-6 py-3 border-2 border-black hover:border-red-600 transition-colors text-xs tracking-[0.2em] uppercase font-medium mb-4 sm:mb-0 touch-manipulation`}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className='px-4 sm:px-6 lg:px-12 py-6 lg:py-3'>
                        <div className="mb-6 lg:mb-8">
                            <div className={`${spaceMono.className} border-2 sm:w-max w-full border-red-600 p-3 my-4 text-red-600 text-xs sm:text-sm tracking-[0.1em] uppercase font-semibold`}>Make sure to Download your Tedx Tickets at Success Page</div>
                            <div className="flex items-center gap-4 mb-4 mt-6">
                                <span className={`${spaceMono.className} text-red-600 text-xs tracking-[0.3em]`}>03</span>
                                <span className={`${spaceMono.className} text-gray-500 text-xs tracking-[0.3em] uppercase`}>Payment</span>
                                <span className="flex-1 h-px bg-black/10" />
                            </div>
                            <h2 className={`${anton.className} uppercase text-2xl sm:text-3xl text-gray-900 mb-2`}>
                                Complete Your Purchase
                            </h2>
                            <p className={`${outfit.className} text-gray-600 text-base sm:text-lg`}>
                                Review your order and proceed with payment
                            </p>
                        </div>

                        <div className='w-full'>
                            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-black/[0.02] border-2 border-black/10">
                                <h3 className={`${anton.className} uppercase text-lg mb-4 text-gray-900`}>Order Summary</h3>
                                <div className={`${outfit.className} space-y-3`}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-medium break-all">{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="font-medium">{formData.phone}</span>
                                    </div>
                                    {formData.institution && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Institution:</span>
                                            <span className="font-medium">{formData.institution}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <button
                                    onClick={handleBack}
                                    className={`${spaceMono.className} w-full sm:w-auto px-6 py-3 border-2 border-black/20 text-gray-700 hover:border-black transition-colors text-xs tracking-[0.2em] uppercase font-medium touch-manipulation cursor-pointer`}
                                >
                                    ← Edit Details
                                </button>
                                <button
                                    onClick={handleProceed}
                                    className={`${spaceMono.className} w-full sm:w-auto px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors border-2 ${isProcessingPayment || !canProceed()
                                        ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                        : 'bg-black border-black text-white hover:bg-red-600 hover:border-red-600 cursor-pointer'
                                        }`}
                                    disabled={!canProceed() || isProcessingPayment}
                                >
                                    {isProcessingPayment ? 'Processing...' : 'Complete Your Purchase'}
                                </button>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-[var(--paper)]">
            {/* Mobile Summary Modal */}
            <MobileSummary />

            {/* Top Bar — back to site + theme */}
            <div className="bg-black text-white px-4 sm:px-6 lg:px-14 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
                <Link href="/" className={`${spaceMono.className} flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/80 hover:text-red-500 transition-colors`}>
                    <ArrowLeft size={15} /> Home
                </Link>
                <span className={`${spaceMono.className} hidden sm:block text-xs tracking-[0.3em] uppercase text-red-500`}>
                    The Ripple Effect
                </span>
                <Image
                    src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                    alt="Tedx Logo"
                    width={100}
                    height={100}
                    className="w-20 sm:w-24"
                />
            </div>

            {/* Mobile Header with Summary Button */}
            <div className="lg:hidden bg-white border-b-2 border-black/10 px-4 py-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${anton.className} uppercase text-lg text-gray-900`}>TEDx Booking</h1>
                        <p className={`${spaceMono.className} text-xs text-gray-600`}>
                            Step {currentStep} of 3
                        </p>
                    </div>
                    {ticketQty > 0 && (
                        <button
                            onClick={() => setShowMobileSummary(true)}
                            className={`${spaceMono.className} flex items-center gap-2 bg-black text-white px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium cursor-pointer`}
                        >
                            <span>₦{total.toLocaleString()}</span>
                            <span className="bg-white text-black px-2 py-0.5">
                                {ticketQty}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex w-1/3 bg-white border-r-2 border-black/10 px-8 py-12 h-screen lg:flex-col justify-between fixed top-0 left-0 overflow-y-auto pt-24">
                    <div>
                        <div className="mb-8">
                            <span className={`${spaceMono.className} text-red-600 text-xs tracking-[0.3em] uppercase`}>Your Order</span>
                            <h3 className={`${anton.className} uppercase text-2xl text-gray-900 mt-2 mb-1`}>
                                Order Summary
                            </h3>
                            <p className={`${outfit.className} text-sm text-gray-600`}>
                                Review your ticket selection
                            </p>
                        </div>

                        <div className='space-y-3'>
                            {getSelectedTicketsDisplay().length > 0 ? (
                                getSelectedTicketsDisplay().map((ticket) => {
                                    const each = ticket.discountedPrice ?? ticket.price
                                    return (
                                        <div key={ticket.id} className='border border-black/10 p-4'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <h4 className={`${outfit.className} font-semibold text-gray-900 text-sm leading-tight`}>
                                                    {ticket.name}
                                                </h4>
                                                <span className={`${spaceMono.className} text-xs bg-black text-white px-2 py-1`}>
                                                    ×{ticket.quantity}
                                                </span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className={`${spaceMono.className} text-xs text-gray-600`}>
                                                    ₦{each.toLocaleString()} each
                                                </span>
                                                <span className={`${anton.className} text-lg text-gray-900`}>
                                                    ₦{(each * ticket.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='text-center py-8 text-gray-500'>
                                    <Info size={32} className="mx-auto mb-3 text-gray-300" />
                                    <p className={`${outfit.className} text-base`}>No tickets selected yet</p>
                                    <p className={`${outfit.className} text-sm`}>Choose your tickets to see them here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {ticketPriceTotal > 0 && (
                        <div className='mt-8 pt-6 border-t-2 border-black'>
                            <div className='flex justify-between items-baseline mb-6'>
                                <span className={`${spaceMono.className} text-xs tracking-[0.2em] uppercase text-gray-600`}>Total</span>
                                <span className={`${anton.className} text-3xl text-gray-900`}>₦{total.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleProceed}
                                disabled={!canProceed() || isProcessingPayment}
                                className={`${spaceMono.className} w-full px-6 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 border-2 ${isProcessingPayment || !canProceed()
                                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                    : 'bg-black border-black text-white hover:bg-red-600 hover:border-red-600 cursor-pointer'
                                    }`}
                            >
                                {isProcessingPayment ? 'Processing...' :
                                    currentStep === 1 ? `Continue with ${ticketQty} ticket${ticketQty !== 1 ? 's' : ''}` :
                                        currentStep === 2 ? 'Proceed to Payment' :
                                            'Complete Purchase'}
                            </button>

                            {!canProceed() && currentStep === 2 && (
                                <p className="text-xs text-center text-red-600 mt-2">
                                    Please fill in all required fields above
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-[33.333333%]">
                    {/* Desktop Step Navigation */}
                    <div className='hidden lg:block w-full px-12 py-8 bg-white border-b-2 border-black/10'>
                        <div className='flex items-center justify-start gap-2 flex-wrap'>
                            {[1, 2, 3].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className={`flex gap-3 items-center transition-all duration-200 ${currentStep === step
                                        ? ''
                                        : currentStep > step
                                            ? 'opacity-80'
                                            : 'opacity-40'
                                        }`}>
                                        <div className={`${spaceMono.className} ${currentStep === step
                                            ? 'bg-black text-white border-black'
                                            : currentStep > step
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'border-black/20 text-black'
                                            } border-2 w-9 h-9 flex items-center justify-center text-sm font-bold transition-colors`}>
                                            {currentStep > step ? <Check size={16} /> : `0${step}`}
                                        </div>
                                        <span className={`${spaceMono.className} font-semibold text-xs tracking-[0.15em] uppercase ${currentStep === step ? 'text-black' : 'text-gray-500'
                                            }`}>
                                            {stepLabel(step)}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <span className={`flex-1 h-px mx-3 ${currentStep > step + 1 ? 'bg-red-600' : 'bg-black/15'}`} style={{ minWidth: '2rem' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Step Navigation */}
                    <div className='lg:hidden bg-white px-4 py-4 border-b-2 border-black/10'>
                        <div className='flex items-center justify-center gap-2'>
                            {[1, 2, 3].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className={`flex items-center gap-2 ${currentStep >= step ? 'text-black' : 'text-gray-400'
                                        }`}>
                                        <div className={`${spaceMono.className} ${currentStep === step
                                            ? 'bg-black text-white border-black'
                                            : currentStep > step
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'border-black/20 text-gray-500'
                                            } border-2 w-7 h-7 flex items-center justify-center text-xs font-bold`}>
                                            {currentStep > step ? <Check size={12} /> : `0${step}`}
                                        </div>
                                        <span className={`${spaceMono.className} text-xs font-medium hidden sm:inline uppercase tracking-wide ${currentStep === step ? 'text-black' : 'text-gray-600'
                                            }`}>
                                            {step === 1 ? 'Tickets' : step === 2 ? 'Details' : 'Payment'}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <span className={`flex-1 h-px mx-2 ${currentStep > step + 1 ? 'bg-red-600' : 'bg-black/15'}`} style={{ minWidth: '1rem' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white lg:bg-[var(--paper)] min-h-screen">
                        {renderStepContent()}
                    </div>

                    {/* Mobile Bottom Action Bar */}
                    {ticketPriceTotal > 0 && (
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black/10 px-4 py-4 z-30">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <button
                                        onClick={() => setShowMobileSummary(true)}
                                        className={`${spaceMono.className} text-xs text-gray-600 uppercase tracking-wide font-medium`}
                                    >
                                        View Summary
                                    </button>
                                    <div className={`${anton.className} text-lg text-gray-900`}>
                                        ₦{total.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={handleProceed}
                                    disabled={!canProceed() || isProcessingPayment}
                                    className={`${spaceMono.className} px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 touch-manipulation border-2 ${isProcessingPayment || !canProceed()
                                        ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                        : 'bg-black border-black text-white hover:bg-red-600 hover:border-red-600'
                                        }`}
                                >
                                    {isProcessingPayment ? 'Processing...' :
                                        currentStep === 1 ? 'Continue' :
                                            currentStep === 2 ? 'Proceed' :
                                                'Purchase'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
