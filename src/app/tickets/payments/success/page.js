import React from 'react'

//this the redirect page from the payment gateway , 
//you are to treat this page as a server rendered page that will capture the query params -> trxref and ticketId
//when you get the params , pass them into the verifyPayment component you will create
//the verifyPaymentComponent will call the verifyPayment function from TicketApi.js
//the verifyPayment function will return the ticket details and you can then display the ticket details on this page


const page = () => {
  return (
    <div>page</div>
  )
}

export default page