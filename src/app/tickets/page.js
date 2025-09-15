import React from 'react'
import TicketBooking from '../components/TicketBooking'

export const metadata = {
    title: "Buy Tickets | TEDx Lead City University",
    description: "Get your tickets for TEDx Lead City University event. Join us for inspiring talks, innovative ideas, and networking opportunities. Secure your spot today!",
    keywords: [
        "TEDx tickets",
        "TEDx LCU tickets",
        "buy tickets",
        "event tickets",
        "conference tickets",
        "TEDx Lead City University tickets",
        "Ibadan event tickets"
    ],
    openGraph: {
        title: "Buy Tickets | TEDx Lead City University",
        description: "Get your tickets for TEDx Lead City University event. Join us for inspiring talks, innovative ideas, and networking opportunities.",
        url: 'https://tedxlcu.com/tickets',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Buy Tickets | TEDx Lead City University",
        description: "Get your tickets for TEDx Lead City University event. Join us for inspiring talks, innovative ideas, and networking opportunities.",
    },
    alternates: {
        canonical: '/tickets',
    },
}

export default function page() {
    return (
        <div>
            <TicketBooking />
        </div>
    )
}
