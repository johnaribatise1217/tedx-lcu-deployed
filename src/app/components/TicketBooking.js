'use client'
import React, { useEffect, useState } from 'react'
import { ChevronRight, Check, AlertCircle, Info, X } from 'lucide-react'
import { TicketsService } from 'service/TicketApi';
// import { PaymentService } from 'service/PaymentApi';

export default function TicketBooking() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedTickets, setSelectedTickets] = useState({})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        institution: '',
        gender: '',
        faculty: '',
        courseOfStudy: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const [showValidation, setShowValidation] = useState(false)
    const [showMobileSummary, setShowMobileSummary] = useState(false)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

        fetchTickets()
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
            return total + (ticket?.price || 0) * quantity
        }, 0)
    }

    const getticketQty = () => {
        return Object.values(selectedTickets).reduce((total, qty) => total + qty, 0)
    }

    const getSelectedTicketsDisplay = () => {
        return Object.entries(selectedTickets).map(([ticketId, quantity]) => {
            const ticket = tickets.find(t => t.id === ticketId)
            return { ...ticket, quantity }
        })
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
            const bookingData = {
                email: formData.email,
                ticketId: Object.keys(selectedTickets)[0],
                quantity: ticketQty,
            }

            try {
                const response = await TicketsService.initiateTicket(bookingData);

                console.log("Raw payment response:", response);  // 👈 check full structure
                const authorizationUrl = response.data;
                console.log("Authorization URL extracted:", authorizationUrl);

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

    // Mobile Summary Component
    const MobileSummary = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${showMobileSummary ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl transform transition-transform duration-300 ${showMobileSummary ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Order Summary</h3>
                        <button
                            onClick={() => setShowMobileSummary(false)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        {getSelectedTicketsDisplay().length > 0 ? (
                            getSelectedTicketsDisplay().map((ticket) => (
                                <div key={ticket.id} className='bg-gray-50 p-4 rounded-lg'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h4 className='font-semibold text-gray-900 text-sm leading-tight'>
                                            {ticket.name}
                                        </h4>
                                        <span className='text-xs bg-gray-200 px-2 py-1 rounded-full font-medium'>
                                            ×{ticket.quantity}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm text-gray-600'>
                                            ₦{ticket.price.toLocaleString()} each
                                        </span>
                                        <span className='text-base font-semibold text-gray-900'>
                                            ₦{(ticket.price * ticket.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-center py-8 text-gray-500'>
                                <Info size={32} className="mx-auto mb-3 text-gray-300" />
                                <p className="text-base">No tickets selected yet</p>
                            </div>
                        )}
                    </div>

                    {ticketPriceTotal > 0 && (
                        <div className='pt-4 border-t border-gray-200'>
                            <div className='space-y-3'>
                                <div className='flex justify-between text-base'>
                                    <span className='text-gray-600'>ticketPriceTotal</span>
                                    <span className='font-medium'>₦{ticketPriceTotal.toLocaleString()}</span>
                                </div>

                                <div className='flex justify-between text-lg font-bold pt-3 border-t border-gray-200'>
                                    <span>Total</span>
                                    <span>₦{total.toLocaleString()}</span>
                                </div>
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
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                                Choose Your Tickets
                            </h2>
                            <p className="text-gray-600 text-base sm:text-lg">
                                Select the number of tickets for the TEDx event
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-red-600" size={20} />
                                    <span className="text-red-800">{error}</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {ticketQty > 0 && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Check className="text-green-600 flex-shrink-0" size={20} />
                                            <span className="text-green-800 font-medium">
                                                {ticketQty} ticket{ticketQty > 1 ? 's' : ''} selected
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Info className="text-blue-600 flex-shrink-0" size={20} />
                                        <span className="text-blue-800">
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
                                                <div className={`relative flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${quantity > 0
                                                    ? 'border-black bg-gray-50'
                                                    : isDisabled
                                                        ? 'border-gray-200 bg-gray-100 opacity-60'
                                                        : 'border-gray-200'
                                                    }`}>

                                                    {isDisabled && (
                                                        <div className="absolute top-4 right-4">
                                                            <span className="text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full">
                                                                Another ticket type selected
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
                                                                {ticket.name}
                                                            </h3>
                                                            <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-3'>
                                                                {ticket.ticketDescription}
                                                            </p>

                                                            {/* Features - Hidden on mobile, shown on larger screens */}
                                                            <div className="hidden sm:block space-y-1">
                                                                {ticket.benefits && ticket.benefits.map((benefit, index) => (
                                                                    <div key={index} className="flex items-center gap-2">
                                                                        <Check size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                                        <span className="text-sm text-gray-700">{benefit}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Features - Mobile accordion style */}
                                                            <div className="sm:hidden">
                                                                <button
                                                                    className="text-blue-600 text-sm font-medium"
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
                                                                            <span className="text-xs text-gray-700">{benefit}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-center sm:text-right">
                                                            <div className="flex flex-col items-center sm:items-end">
                                                                <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                                                                    ₦{ticket.price.toLocaleString()}
                                                                </p>
                                                                {ticket.availableQuantity && (
                                                                    <span className="text-sm text-gray-500 mt-1">
                                                                        {ticket.availableQuantity} available
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                                                        <div className='flex items-center gap-3 sm:gap-4'>
                                                            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Quantity:</span>
                                                            <div className="flex items-center gap-3 sm:gap-4">
                                                                <button
                                                                    onClick={() => updateTicketQuantity(ticket.id, -1)}
                                                                    disabled={quantity === 0}
                                                                    className='bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-lg sm:text-base font-semibold transition-colors touch-manipulation'
                                                                >
                                                                    -
                                                                </button>
                                                                <span className='w-8 text-center text-lg font-semibold'>
                                                                    {quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateTicketQuantity(ticket.id, 1)}
                                                                    disabled={isDisabled || (ticket.availableQuantity && quantity >= ticket.availableQuantity)}
                                                                    className={`rounded-full w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-lg sm:text-base font-semibold transition-colors touch-manipulation ${isDisabled
                                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                        : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
                                                                        }`}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {quantity > 0 && (
                                                            <div className="text-right">
                                                                <span className="text-base sm:text-lg font-semibold text-gray-900">
                                                                    ₦{(ticket.price * quantity).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>


                            </>
                        )}
                    </div>
                )

            case 2:
                return (
                    <div className='px-4 sm:px-6 lg:px-12 py-6 lg:py-16'>
                        <div className="mb-6 lg:mb-8">
                            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                                Your Information
                            </h2>
                            <p className="text-gray-600 text-base sm:text-lg">
                                Please provide your details for ticket registration
                            </p>
                        </div>

                        <div className='w-full space-y-4 sm:space-y-6'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        First Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        className={`w-full px-4 py-3 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base ${showValidation && formErrors.firstName
                                            ? 'border-red-400 bg-red-50'
                                            : formData.firstName
                                                ? 'border-green-400'
                                                : 'border-gray-300'
                                            }`}
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
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Last Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                        className={`w-full px-4 py-3 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base ${showValidation && formErrors.lastName
                                            ? 'border-red-400 bg-red-50'
                                            : formData.lastName
                                                ? 'border-green-400'
                                                : 'border-gray-300'
                                            }`}
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
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Email Address *
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base ${showValidation && formErrors.email
                                        ? 'border-red-400 bg-red-50'
                                        : formData.email
                                            ? 'border-green-400'
                                            : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email address"
                                />
                                {showValidation && formErrors.email && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {formErrors.email}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Your ticket confirmation will be sent to this email
                                </p>
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Phone Number *
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base ${showValidation && formErrors.phone
                                        ? 'border-red-400 bg-red-50'
                                        : formData.phone
                                            ? 'border-green-400'
                                            : 'border-gray-300'
                                        }`}
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
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Gender
                                    </label>
                                    <select
                                        name='gender'
                                        value={formData.gender}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white text-base'
                                    >
                                        <option value=''>Select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Institution/Organization
                                    </label>
                                    <input
                                        type='text'
                                        name='institution'
                                        value={formData.institution}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-base'
                                        placeholder="E.g Leadcity University"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Faculty
                                    </label>
                                    <input
                                        type='text'
                                        name='faculty'
                                        value={formData.faculty}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-base'
                                        placeholder="E.g Facultty of Science"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Course of Study
                                    </label>
                                    <input
                                        type='text'
                                        name='courseOfStudy'
                                        value={formData.courseOfStudy}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-base'
                                        placeholder="E.g Computer Science"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-6 sm:mt-8'>
                            <button
                                onClick={handleBack}
                                className='w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium mb-4 sm:mb-0 touch-manipulation'
                            >
                                ← Back to Tickets
                            </button>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className='px-4 sm:px-6 lg:px-12 py-6 lg:py-16'>
                        <div className="mb-6 lg:mb-8">
                            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                                Complete Your Purchase
                            </h2>
                            <p className="text-gray-600 text-base sm:text-lg">
                                Review your order and proceed with payment
                            </p>
                        </div>

                        <div className='w-full'>
                            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-xl">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h3>
                                <div className="space-y-3">
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
                                    className='w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium touch-manipulation'
                                >
                                    ← Edit Details
                                </button>
                                <button
                                    onClick={handleProceed}
                                    className='w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl cursor-pointer font-medium'
                                    disabled={!canProceed()}
                                >
                                    Complete Purchase
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
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Summary Modal */}
            <MobileSummary />

            {/* Mobile Header with Summary Button */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">TEDx Booking</h1>
                        <p className="text-sm text-gray-600">
                            Step {currentStep} of 3
                        </p>
                    </div>
                    {ticketQty > 0 && (
                        <button
                            onClick={() => setShowMobileSummary(true)}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium text-sm"
                        >
                            <span>₦{total.toLocaleString()}</span>
                            <span className="bg-white text-black px-2 py-1 rounded text-xs">
                                {ticketQty}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-1/3 bg-white border-r border-gray-200 px-8 py-12 h-screen flex flex-col justify-between fixed top-0 left-0 overflow-y-auto">
                    <div>
                        <div className="text-center mb-8">
                            <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                                Order Summary
                            </h3>
                            <p className='text-base text-gray-600'>
                                Review your ticket selection
                            </p>
                        </div>

                        <div className='space-y-4'>
                            {getSelectedTicketsDisplay().length > 0 ? (
                                getSelectedTicketsDisplay().map((ticket) => (
                                    <div key={ticket.id} className='bg-gray-50 p-4 rounded-lg'>
                                        <div className='flex justify-between items-start mb-2'>
                                            <h4 className='font-semibold text-gray-900 text-sm leading-tight'>
                                                {ticket.name}
                                            </h4>
                                            <span className='text-xs bg-gray-200 px-2 py-1 rounded-full font-medium'>
                                                ×{ticket.quantity}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm text-gray-600'>
                                                ₦{ticket.price.toLocaleString()} each
                                            </span>
                                            <span className='text-base font-semibold text-gray-900'>
                                                ₦{(ticket.price * ticket.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center py-8 text-gray-500'>
                                    <Info size={32} className="mx-auto mb-3 text-gray-300" />
                                    <p className="text-base">No tickets selected yet</p>
                                    <p className="text-sm">Choose your tickets to see them here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {ticketPriceTotal > 0 && (
                        <div className='mt-8 pt-6 border-t border-gray-200'>
                            <div className='space-y-3'>
                                <div className='flex justify-between text-base'>
                                    <span className='text-gray-600'>ticketPriceTotal</span>
                                    <span className='font-medium'>₦{ticketPriceTotal.toLocaleString()}</span>
                                </div>

                                <div className='flex justify-between text-lg font-bold pt-3 border-t border-gray-200'>
                                    <span>Total</span>
                                    <span>₦{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleProceed}
                                disabled={!canProceed()}
                                className={`w-full px-6 py-4 rounded-xl mt-6 font-semibold transition-all duration-200 ${canProceed()
                                    ? 'bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {currentStep === 1 ? `Continue with ${ticketQty} ticket${ticketQty !== 1 ? 's' : ''}` :
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
                    <div className='hidden lg:block w-full px-12 py-8 bg-white border-b border-gray-200'>
                        <div className='flex items-center justify-start gap-8 flex-wrap'>
                            {[1, 2, 3].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className={`flex gap-3 items-center transition-all duration-200 ${currentStep === step
                                        ? 'scale-105'
                                        : currentStep > step
                                            ? 'opacity-80'
                                            : 'opacity-60'
                                        }`}>
                                        <div className={`${currentStep === step
                                            ? 'bg-black text-white shadow-md'
                                            : currentStep > step
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            } rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold transition-colors`}>
                                            {currentStep > step ? <Check size={16} /> : step}
                                        </div>
                                        <span className={`font-semibold text-base ${currentStep === step ? 'text-black' : 'text-gray-600'
                                            }`}>
                                            {step === 1 ? 'Select Tickets' : step === 2 ? 'Your Details' : 'Payment'}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <ChevronRight className={`text-gray-400 ${currentStep > step + 1 ? 'text-green-600' : ''}`} size={20} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Step Navigation */}
                    <div className='lg:hidden bg-white px-4 py-4 border-b border-gray-200'>
                        <div className='flex items-center justify-center gap-2'>
                            {[1, 2, 3].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className={`flex items-center gap-2 ${currentStep >= step ? 'text-black' : 'text-gray-400'
                                        }`}>
                                        <div className={`${currentStep === step
                                            ? 'bg-black text-white'
                                            : currentStep > step
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            } rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold`}>
                                            {currentStep > step ? <Check size={12} /> : step}
                                        </div>
                                        <span className={`text-xs font-medium hidden sm:inline ${currentStep === step ? 'text-black' : 'text-gray-600'
                                            }`}>
                                            {step === 1 ? 'Tickets' : step === 2 ? 'Details' : 'Payment'}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <ChevronRight className={`text-gray-300 ${currentStep > step + 1 ? 'text-green-600' : ''}`} size={16} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white lg:bg-gray-50 min-h-screen">
                        {renderStepContent()}
                    </div>

                    {/* Mobile Bottom Action Bar */}
                    {ticketPriceTotal > 0 && (
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-30">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <button
                                        onClick={() => setShowMobileSummary(true)}
                                        className="text-sm text-gray-600 font-medium"
                                    >
                                        View Summary
                                    </button>
                                    <div className="text-lg font-bold text-gray-900">
                                        ₦{total.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={handleProceed}
                                    disabled={!canProceed()}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 touch-manipulation ${canProceed()
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {currentStep === 1 ? 'Continue' :
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