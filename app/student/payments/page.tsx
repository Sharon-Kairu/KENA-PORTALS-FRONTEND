'use client'

import React from 'react'
import { FaReceipt } from 'react-icons/fa6'
import { receiptData } from '../../data/receiptData'

const ReceiptsPage = () => {
  const receipts = receiptData

  // Function to download receipt as text file
  const downloadReceipt = (receipt: typeof receiptData[0]) => {
    const content = `
Receipt Number: ${receipt.receiptNumber}
Date: ${receipt.date}
Amount Paid: $${receipt.amount.toFixed(2)}
Balance: $${receipt.balance.toFixed(2)}
    `
    const blob = new Blob([content], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `Receipt-${receipt.receiptNumber}.txt`
    link.click()
  }

  return (
    <div className="ml-25 md:ml-64">
      {/* Header – fixed on top */}
      <div className="fixed top-0 left-0 right-0 left-20 md:left-64 bg-white z-50 p-4 md:p-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Receipts</h1>
        <p className="text-green-600 text-md md:text-lg mt-1">Welcome, Sharon Kairu</p>
      </div>
      {/* Content */}
      <div className="p-4 md:p-6 mt-24 md:mt-28 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Your Receipts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {receipts.map((receipt) => (
            <div
                key={receipt.receiptNumber}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full md:w-[480px] mx-auto"
            >
                <div className="flex items-center space-x-4 mb-6">
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center">
                        <FaReceipt size={36} className="text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Receipt</h2>
                    <div className='p-3 rounded-lg text-gray-600 bg-gray-200 ml-auto font-bold text-3xl'>
                        {receipt.receiptNumber}
                    </div>
                </div>

                <div className="space-y-3 text-gray-700">
                <div className='flex flex-row justify-between'>
                    <span className="font-semibold">Receipt Number:</span> <h1 className='font-bold'>{receipt.receiptNumber}</h1>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400" />

                <div className='flex flex-row justify-between'>
                    <span className="font-semibold">Date:</span> <h1 className='font-bold'>{receipt.date}</h1>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400" />
                <div className='flex flex-row justify-between'>
                    <span className="font-semibold">Payment Method:</span> <h1 className='font-bold'>{receipt.method}</h1>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400" />
                <div className='flex flex-row justify-between'>
                    <span className="font-semibold">Amount Paid:</span> <h1 className='font-bold'> KSH{receipt.amount.toFixed(2)}</h1>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400" />
                <div className='flex flex-row justify-between'>
                    <span className="font-semibold">Balance:</span> <h1 className='font-bold'>KSH {receipt.balance.toFixed(2)}</h1>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400" />
                </div>

                <button
                onClick={() => downloadReceipt(receipt)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                Download Receipt
                </button>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ReceiptsPage
