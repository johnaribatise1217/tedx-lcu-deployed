'use client'
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'

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

    })

    const Tickets = [
        {
            id: 1,
            name: "Regular Ticket (Early Bird)",
            price: 2500,
            description: "Secure your spot at a discounted rate with our Early Bird offer! This ticket grants you full access to all TEDx talks, networking sessions with like-minded innovators, and the complete event experience. Includes event materials and light refreshments.",
        },
        {
            id: 2,
            name: "Standard Ticket",
            price: 3500,
            description: "Experience the full TEDx journey with access to all keynote presentations, interactive breakout sessions, and networking opportunities. This standard ticket includes a welcome package, lunch, and refreshments throughout the event day"
        },
        {
            id: 3,
            name: "Premium Ticket",
            price: 5000,
            description: "Elevate your TEDx experience with premium benefits including priority seating in the first five rows, exclusive access to speaker meet-and-greet sessions, premium catering throughout the event, a dedicated concierge service, and a special TEDx gift package valued at ₦5,000."
        },
    ]

    const updateTicketQuantity = (ticketId, change) => {
        setSelectedTickets(prev => {
            const currentQty = prev[ticketId] || 0
            const newQty = Math.max(0, currentQty + change)

            if (newQty === 0) {
                const { [ticketId]: removed, ...rest } = prev
                return rest
            }

            return {
                ...prev,
                [ticketId]: newQty
            }
        })
    }

    const calculateSubtotal = () => {
        return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
            const ticket = Tickets.find(t => t.id === parseInt(ticketId))
            return total + (ticket?.price || 0) * quantity
        }, 0)
    }

    const getSelectedTicketsDisplay = () => {
        return Object.entries(selectedTickets).map(([ticketId, quantity]) => {
            const ticket = Tickets.find(t => t.id === parseInt(ticketId))
            return { ...ticket, quantity }
        })
    }

    const handleFormChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleProceed = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const subtotal = calculateSubtotal()
    const fee = subtotal > 0 ? 100 : 0
    const total = subtotal + fee

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className='col-span-2 mt-16 mb-10 mx-12'>
                        <h2 className='md:text-4xl text-xl font-semibold'>
                            Get Your Tickets
                        </h2>

                        {Tickets.map((ticket) => {
                            const quantity = selectedTickets[ticket.id] || 0
                            return (
                                <div key={ticket.id} className='w-[80%] mt-10'>
                                    <div className='flex flex-col gap-3 hover:bg-gray-100 p-6 rounded-lg border border-gray-300 cursor-pointer'>
                                        <span className='flex items-center justify-between'>
                                            <h3 className='text-xl font-normal'>
                                                {ticket.name}
                                            </h3>
                                            <p className='text-xl font-normal'>₦ {ticket.price.toLocaleString()}.00</p>
                                        </span>
                                        <span className='text-gray-700 text-lg'>
                                            {ticket.description}
                                        </span>

                                        <span className='flex items-center gap-4'>
                                            <button
                                                onClick={() => updateTicketQuantity(ticket.id, -1)}
                                                className='bg-gray-300 hover:bg-gray-400 rounded-full p-3 text-black flex items-center justify-center w-7 h-7 text-[15px] transition-colors'
                                            >
                                                -
                                            </button>
                                            <span className='p-3 text-black flex items-center justify-center w-7 h-7 text-[15px]'>
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => updateTicketQuantity(ticket.id, 1)}
                                                className='bg-gray-300 hover:bg-gray-400 rounded-full p-3 text-black flex items-center justify-center w-7 h-7 text-[15px] transition-colors'
                                            >
                                                +
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )

            case 2:
                return (
                    <div className='col-span-2 mt-16 mb-10 mx-12'>
                        <h2 className='md:text-3xl text-xl font-semibold mb-8'>
                            Tell Us About Yourself
                        </h2>

                        <div className='w-[70%] space-y-6'>
                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        First Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Last Name *
                                    </label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email Address *
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Phone Number *
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Gender
                                </label>
                                <select
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleFormChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white'
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>

                                </select>
                            </div>


                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Institution/Location
                                </label>
                                <input
                                    type='text'
                                    name='institution'
                                    value={formData.institution}
                                    onChange={handleFormChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                />
                            </div>


                        </div>

                        <div className='w-[80%] mt-8 flex gap-4'>
                            <button
                                onClick={handleBack}
                                className='px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors'
                            >
                                Back to Tickets
                            </button>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className='col-span-2 mt-16 mb-10 mx-12'>
                        <h2 className='md:text-4xl text-xl font-semibold mb-8'>
                            Payment
                        </h2>
                        <div className='w-[80%]'>
                            <div className='bg-gray-50 p-6 rounded-lg'>
                                <h3 className='text-lg font-semibold mb-4'>Payment methods coming soon!</h3>
                                <p className='text-gray-600'>
                                    {` We're setting up secure payment processing. You'll be able to pay with cards, bank transfers, and mobile money.`}
                                </p>
                            </div>

                            <div className='mt-8 flex gap-4'>
                                <button
                                    onClick={handleBack}
                                    className='px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors'
                                >
                                    Back to Details
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
        <div className='grid grid-cols-3'>
            {/* Step Navigation */}
            <div className='col-span-3 px-12 mt-10'>
                <div className='flex items-center gap-12'>
                    <div className={`flex gap-3 items-center hover:bg-gray-100 w-max rounded-full px-1 pe-3 py-1 cursor-pointer ${currentStep === 1 ? '' : 'opacity-60'}`}>
                        <span className={`${currentStep === 1 ? 'bg-black text-white' : 'bg-gray-300 text-black'} rounded-full p-3 flex items-center justify-center w-7 h-7 text-[15px]`}>1</span>
                        <span className='font-semibold text-[16px]'>Tickets</span>
                    </div>
                    <ChevronRight className='text-gray-700' size={20} />
                    <div className={`flex gap-3 items-center hover:bg-gray-100 w-max rounded-full px-1 pe-3 py-1 cursor-pointer ${currentStep === 2 ? '' : 'opacity-60'}`}>
                        <span className={`${currentStep === 2 ? 'bg-black text-white' : 'bg-gray-300 text-black'} rounded-full p-3 flex items-center justify-center w-7 h-7 text-[15px]`}>2</span>
                        <span className='font-semibold text-[16px]'>Details</span>
                    </div>
                    <ChevronRight className='text-gray-700' size={20} />
                    <div className={`flex gap-3 items-center hover:bg-gray-100 w-max rounded-full px-1 pe-3 py-1 cursor-pointer ${currentStep === 3 ? '' : 'opacity-60'}`}>
                        <span className={`${currentStep === 3 ? 'bg-black text-white' : 'bg-gray-300 text-black'} rounded-full p-3 flex items-center justify-center w-7 h-7 text-[15px]`}>3</span>
                        <span className='font-semibold text-[16px]'>Payment</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {renderStepContent()}

            {/* Sidebar Checkout */}
            <div className='border-l border-gray-400 px-10 py-14 h-screen fixed right-0 top-0 flex flex-col justify-between col-span-1'>
                <div>
                    <h3 className='text-2xl font-semibold text-center'>
                        Event Checkout
                    </h3>
                    <p className='text-lg font-normal text-center'>
                        Confirm your ticket and proceed to payment.
                    </p>

                    <div className='mt-10 space-y-3'>
                        {getSelectedTicketsDisplay().length > 0 ? (
                            getSelectedTicketsDisplay().map((ticket) => (
                                <span key={ticket.id} className='flex items-center justify-between'>
                                    <p className='text-lg font-normal'>
                                        {ticket.name} x{ticket.quantity}
                                    </p>
                                    <p className='text-lg font-normal'>
                                        ₦ {(ticket.price * ticket.quantity).toLocaleString()}.00
                                    </p>
                                </span>
                            ))
                        ) : (
                            <p className='text-gray-500 text-center'>No tickets selected</p>
                        )}
                    </div>
                </div>

                {subtotal > 0 && (
                    <div className='mt-auto pt-10'>
                        <span className='flex items-center justify-between'>
                            <p className='text-[15px] text-gray-700 font-normal'>
                                Subtotal
                            </p>
                            <p className='text-[15px] text-gray-700 font-normal'>
                                ₦ {subtotal.toLocaleString()}.00
                            </p>
                        </span>

                        <span className='flex items-center justify-between mt-5'>
                            <p className='text-[15px] text-gray-700 font-normal'>
                                Fee
                            </p>
                            <p className='text-[15px] text-gray-700 font-normal'>
                                ₦ {fee.toLocaleString()}.00
                            </p>
                        </span>

                        <span className='flex items-center justify-between mt-5'>
                            <p className='text-[18px] text-black font-normal'>
                                Total
                            </p>
                            <p className='text-[18px] text-black font-normal'>
                                ₦ {total.toLocaleString()}.00
                            </p>
                        </span>

                        <button
                            onClick={handleProceed}
                            disabled={Object.keys(selectedTickets).length === 0}
                            className='w-full bg-black text-white px-6 py-3 rounded-xl mt-10 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors'
                        >
                            {currentStep === 1 ? 'Proceed to Details' :
                                currentStep === 2 ? 'Proceed to Payment' :
                                    'Complete Purchase'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}