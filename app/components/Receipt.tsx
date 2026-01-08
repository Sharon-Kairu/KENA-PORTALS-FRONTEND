import React from 'react'
import { FaReceipt } from 'react-icons/fa6'
import { receiptData } from '../data/receiptData'

const Receipt = () => {
  const receipts = receiptData

  // Function to download receipt as text file (simple approach)
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
    <div className="p-4 space-y-6">
      {receipts.map((receipt) => (
        <div
          key={receipt.receiptNumber}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200 max-w-md mx-auto"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-full bg-gray-100 p-3">
              <FaReceipt size={32} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Receipt</h2>
          </div>

          <div className="space-y-2 text-gray-700">
            <div>
              <span className="font-semibold">Receipt Number:</span> {receipt.receiptNumber}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {receipt.date}
            </div>
            <div>
              <span className="font-semibold">Amount Paid:</span> ${receipt.amount.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Balance:</span> ${receipt.balance.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => downloadReceipt(receipt)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
          >
            Download Receipt
          </button>
        </div>
      ))}
    </div>
  )
}

export default Receipt
