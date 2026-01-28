import jsPDF from 'jspdf'

interface ReceiptData {
  receipt_number: string
  payment_date: string
  amount: string
  payment_method: string
  transaction_code: string | null
  student: {
    student_id: string
    name: string
    email: string
    phone: string
  }
  payments_summary: {
    total_fees: string
    total_paid: string
    balance: string
  }
}

// Utility to safely convert any value to a string
const safeText = (value: any, fallback = 'N/A') =>
  value === null || value === undefined ? fallback : String(value)

export const generateReceipt = (data: ReceiptData) => {
  const doc = new jsPDF()

  // Modern Color Palette - Blue theme with minimal accent colors
  const brandBlue = [37, 99, 235] // #2563eb
  const darkGray = [31, 41, 55] // #1f2937
  const lightGray = [243, 244, 246] // #f3f4f6
  const textGray = [107, 114, 128] // #6b7280
  const white = [255, 255, 255]
  const successGreen = [34, 197, 94] // #22c55e
  const warningRed = [239, 68, 68] // #ef4444

  let yPosition = 20

  // ==================== MODERN HEADER ====================
  
  // Top accent line
  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2])
  doc.rect(0, 0, 210, 3, 'F')

  // Logo placeholder with modern styling
  try {
    doc.addImage('/logo.png', 'PNG', 20, 15, 35, 35)
  } catch {
    // Modern logo placeholder
    doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2])
    doc.circle(37.5, 32.5, 17.5, 'F')
    doc.setTextColor(white[0], white[1], white[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('KDS', 37.5, 35, { align: 'center' })
  }

  // Company name and details
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('KENA DRIVING SCHOOL', 65, 25)
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('& COMPUTER COLLEGE', 65, 32)

  doc.setTextColor(textGray[0], textGray[1], textGray[2])
  doc.setFontSize(8)
  doc.text('Thika, Kenya', 65, 40)
  doc.text('+254 713 449 911', 65, 45)
  doc.text('kenadrivingschool13@gmail.com', 65, 50)

  // Receipt badge (top right)
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(145, 20, 50, 20, 2, 2, 'F')
  doc.setTextColor(textGray[0], textGray[1], textGray[2])
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('RECEIPT', 170, 27, { align: 'center' })
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(safeText(data.receipt_number), 170, 35, { align: 'center' })

  yPosition = 65

  // Divider line
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
  doc.setLineWidth(0.5)
  doc.line(20, yPosition, 190, yPosition)

  yPosition = 75

  // ==================== RECEIPT DETAILS - CLEAN GRID ====================
  
  // Date and Payment Method in a clean 2-column layout
  doc.setFontSize(8)
  doc.setTextColor(textGray[0], textGray[1], textGray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('DATE', 20, yPosition)
  doc.text('PAYMENT METHOD', 105, yPosition)
  if (data.transaction_code) {
    doc.text('TRANSACTION CODE', 145, yPosition)
  }

  yPosition += 5
  doc.setFontSize(10)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  doc.text(
    safeText(
      new Date(data.payment_date).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    ),
    20,
    yPosition
  )
  doc.text(safeText(data.payment_method).toUpperCase(), 105, yPosition)
  if (data.transaction_code) {
    doc.text(safeText(data.transaction_code), 145, yPosition)
  }

  yPosition += 15

  const cardStartY = yPosition
const cardHeight = 42

// Card background
doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
doc.roundedRect(20, cardStartY, 170, cardHeight, 2, 2, "F")

yPosition = cardStartY + 8
doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2])
doc.setFontSize(9)
doc.setFont("helvetica", "bold")
doc.text("STUDENT DETAILS", 25, yPosition)

yPosition += 8

// Labels row 1
doc.setFontSize(7)
doc.setTextColor(textGray[0], textGray[1], textGray[2])
doc.setFont("helvetica", "normal")
doc.text("Name", 25, yPosition)
doc.text("Student ID", 105, yPosition)

yPosition += 4

// Values row 1
doc.setFontSize(9)
doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
doc.setFont("helvetica", "bold")
doc.text(safeText(data.student.name), 25, yPosition)
doc.text(safeText(data.student.student_id), 105, yPosition)

yPosition += 7

// Labels row 2
doc.setFontSize(7)
doc.setTextColor(textGray[0], textGray[1], textGray[2])
doc.setFont("helvetica", "normal")
doc.text("Email", 25, yPosition)
doc.text("Phone", 105, yPosition)

yPosition += 4

// Values row 2
doc.setFontSize(9)
doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
doc.setFont("helvetica", "bold")
doc.text(safeText(data.student.email), 25, yPosition)
doc.text(safeText(data.student.phone), 105, yPosition)

// Move cursor below card nicely
yPosition = cardStartY + cardHeight + 10

  // ==================== PAYMENT BREAKDOWN - MODERN TABLE ====================
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENT BREAKDOWN', 20, yPosition)

  yPosition += 8

  // Table header
  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2])
  doc.rect(20, yPosition, 170, 8, 'F')
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DESCRIPTION', 25, yPosition + 5.5)
  doc.text('AMOUNT (KSh)', 175, yPosition + 5.5, { align: 'right' })

  yPosition += 8

  // Table rows with modern styling
  const rows = [
    { 
      label: 'Amount Paid', 
      value: parseFloat(data.amount), 
      bold: true,
      highlight: true
    },
    {
      label: 'Previous Payments',
      value: parseFloat(data.payments_summary.total_paid) - parseFloat(data.amount),
      bold: false,
    },
    { 
      label: 'Total Paid to Date', 
      value: parseFloat(data.payments_summary.total_paid), 
      bold: true 
    },
    { 
      label: 'Total Course Fees', 
      value: parseFloat(data.payments_summary.total_fees), 
      bold: false 
    },
  ]

  rows.forEach((row, index) => {
    // Alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(white[0], white[1], white[2])
    } else {
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
    }
    doc.rect(20, yPosition, 170, 7, 'F')

    // Text styling
    if (row.highlight) {
      doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2])
    } else {
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    }
    
    doc.setFont('helvetica', row.bold ? 'bold' : 'normal')
    doc.setFontSize(9)
    doc.text(safeText(row.label), 25, yPosition + 5)
    doc.text(
      row.value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      185,
      yPosition + 5,
      { align: 'right' }
    )

    yPosition += 7
  })

  // Balance row with special styling
  const balance = parseFloat(data.payments_summary.balance)
  const isFullyPaid = balance === 0
  
  if (isFullyPaid) {
    doc.setFillColor(successGreen[0], successGreen[1], successGreen[2])
  } else {
    doc.setFillColor(warningRed[0], warningRed[1], warningRed[2])
  }
  doc.rect(20, yPosition, 170, 9, 'F')
  
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('BALANCE REMAINING', 25, yPosition + 6)
  doc.text(
    balance.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    185,
    yPosition + 6,
    { align: 'right' }
  )

  yPosition += 9

  // Table border
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
  doc.setLineWidth(0.5)
  doc.rect(20, yPosition - (rows.length * 7 + 9 + 8), 170, rows.length * 7 + 9 + 8)

  yPosition += 12

  // ==================== STATUS MESSAGE ====================
  
  if (isFullyPaid) {
    doc.setFillColor(240, 253, 244) // Very light green
    doc.roundedRect(20, yPosition, 170, 12, 2, 2, 'F')
    doc.setTextColor(successGreen[0], successGreen[1], successGreen[2])
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('✓ Payment Complete - Fully Paid', 105, yPosition + 8, { align: 'center' })
  } else {
    doc.setFillColor(254, 242, 242) // Very light red
    doc.roundedRect(20, yPosition, 170, 12, 2, 2, 'F')
    doc.setTextColor(warningRed[0], warningRed[1], warningRed[2])
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Balance Pending', 105, yPosition + 8, { align: 'center' })
  }

  yPosition += 20

  // ==================== FOOTER ====================
  
  doc.setTextColor(textGray[0], textGray[1], textGray[2])
  doc.setFontSize(7)
  doc.setFont('helvetica', 'italic')
  doc.text(
    'This is a computer-generated receipt and does not require a signature.',
    105,
    yPosition,
    { align: 'center' }
  )
  doc.text(
    'For inquiries: kenadrivingschool13@gmail.com | +254 713 449 911',
    105,
    yPosition + 4,
    { align: 'center' }
  )

  // Bottom accent line
  yPosition = 285
  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2])
  doc.rect(0, yPosition, 210, 3, 'F')

  doc.setFontSize(7)
  doc.setTextColor(textGray[0], textGray[1], textGray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('© 2026 KENA Driving School & Computer College. All rights reserved.', 105, yPosition - 3, { align: 'center' })

  doc.save(`Receipt-${safeText(data.receipt_number)}.pdf`)
}