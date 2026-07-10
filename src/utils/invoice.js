// Convert numbers based on current language
const convertNumbers = (number, isRTL) => {
  if (isRTL) {
    return number.toString().replace(/[0-9]/g, (m) => "٠١٢٣٤٥٦٧٨٩"[m]);
  }
  return number.toString();
};

// Format date based on current language
const formatDate = (dateString, isRTL) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isRTL) {
    return new Date(dateString).toLocaleDateString("ar-SA", options);
  } else {
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
};

// Format currency based on current language
const formatCurrency = (amount, isRTL) => {
  const formattedAmount = convertNumbers(amount, isRTL);

  if (isRTL) {
    return `${formattedAmount} $`;
  }
  return `$${formattedAmount}`;
};

// Get tour name based on current language
const getTourName = (tour, isRTL) => {
  return isRTL ? tour.nameAr || tour.name : tour.name;
};

// Get tour description based on current language
const getTourDescription = (tour, isRTL) => {
  return isRTL ? tour.descriptionAr || tour.description : tour.description;
};

// Get duration text based on current language
const getDurationText = (duration, isRTL) => {
  return `${duration} ${isRTL ? "أيام" : "days"}`;
};

// Get per person text based on current language
const getPerPersonText = (isRTL) => {
  return isRTL ? "للفرد" : "per person";
};

export const invoicePDF = (booking, isRTL) => {
  const invoiceContent = `
  <!DOCTYPE html>
  <html dir="${isRTL ? "rtl" : "ltr"}" lang="${isRTL ? "ar" : "en"}">
  <head>
    <meta charset="UTF-8">
    <title>Invoice - ${booking.id}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body { 
        font-family: ${
          isRTL
            ? "'Noto Naskh Arabic', Arial, sans-serif"
            : "'Inter', Arial, sans-serif"
        }; 
        margin: 0;
        padding: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: #1f2937;
        direction: ${isRTL ? "rtl" : "ltr"};
        text-align: ${isRTL ? "right" : "left"};
        line-height: 1.6;
      }
      
      .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e5e7eb;
      }
      
      .header {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        padding: 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        animation: float 20s infinite linear;
      }
      
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        100% { transform: translate(-20px, -20px) rotate(360deg); }
      }
      
      .header-content {
        position: relative;
        z-index: 2;
      }
      
      .logo {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 8px;
        letter-spacing: -0.025em;
      }
      
      .logo-subtitle {
        font-size: 1.1rem;
        opacity: 0.9;
        margin-bottom: 20px;
        font-weight: 400;
      }
      
      .invoice-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 16px;
        letter-spacing: -0.025em;
      }
      
      .invoice-meta {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
        flex-wrap: wrap;
      }
      
      .meta-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 12px 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .content {
        padding: 40px;
      }
      
      .section {
        margin-bottom: 32px;
        background: #f8fafc;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
      }
      
      .section:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }
      
      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e40af;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #3b82f6;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .section-title::before {
        content: '▶';
        font-size: 0.8em;
        color: #3b82f6;
        ${isRTL ? "transform: rotate(180deg);" : ""}
      }
      
      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
      }
      
      .info-item {
        margin-bottom: 12px;
      }
      
      .info-label {
        font-weight: 500;
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 4px;
        display: block;
      }
      
      .info-value {
        font-weight: 600;
        color: #1f2937;
        font-size: 1rem;
      }
      
      .price-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .price-table td {
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;
        transition: background-color 0.2s ease;
      }
      
      .price-table tr:hover td {
        background-color: #f9fafb;
      }
      
      .price-table .total-row {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        font-weight: 700;
        font-size: 1.1rem;
      }
      
      .price-table .total-row td {
        border-bottom: none;
        padding: 20px;
      }
      
      .tour-image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
        margin-${isRTL ? "left" : "right"}: 16px;
        border: 3px solid #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
      
      .tour-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }
      
      .tour-info {
        flex: 1;
      }
      
      .tour-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 8px;
      }
      
      .tour-description {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      
      .tour-meta {
        display: flex;
        gap: 20px;
        margin-top: 12px;
        flex-wrap: wrap;
      }
      
      .meta-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #eff6ff;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        color: #1e40af;
        font-weight: 500;
      }
      
      .footer {
        background: #1e293b;
        color: white;
        padding: 30px 40px;
        text-align: center;
        border-top: 1px solid #334155;
      }
      
      .footer-content {
        max-width: 600px;
        margin: 0 auto;
      }
      
      .thank-you {
        font-size: 1.1rem;
        margin-bottom: 16px;
        color: #cbd5e1;
      }
      
      .contact-info {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
        flex-wrap: wrap;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #94a3b8;
      }
      
      .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
        background: #10b981;
        color: white;
      }
      
      @media print {
        body {
          background: white !important;
          padding: 20px !important;
        }
        
        .invoice-container {
          box-shadow: none !important;
          border: 1px solid #ccc !important;
        }
        
        .header {
          background: #3b82f6 !important;
          -webkit-print-color-adjust: exact;
        }
        
        .price-table .total-row {
          background: #3b82f6 !important;
          -webkit-print-color-adjust: exact;
        }
        
        .section:hover {
          transform: none !important;
          box-shadow: none !important;
        }
      }
      
      @media (max-width: 768px) {
        body {
          padding: 20px;
        }
        
        .content {
          padding: 20px;
        }
        
        .header {
          padding: 30px 20px;
        }
        
        .invoice-meta {
          flex-direction: column;
          gap: 10px;
        }
        
        .info-grid {
          grid-template-columns: 1fr;
        }
        
        .tour-header {
          flex-direction: column;
          text-align: center;
        }
        
        .tour-image {
          margin: 0 0 16px 0;
        }
        
        .contact-info {
          flex-direction: column;
          gap: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <!-- Header -->
      <div class="header">
        <div class="header-content">
          <div class="logo">JWAZZY TRAVEL</div>
          <div class="logo-subtitle">${
            isRTL
              ? "رحلات استثنائية تخلق ذكريات تدوم مدى الحياة"
              : "Extraordinary journeys that create memories lasting a lifetime"
          }</div>
          <h1 class="invoice-title">${
            isRTL ? "فاتورة الحجز" : "BOOKING INVOICE"
          }</h1>
          <div class="invoice-meta">
            <div class="meta-item">
              <strong>${isRTL ? "رقم الفاتورة:" : "Invoice #:"}</strong> ${
    booking.id
  }
            </div>
            <div class="meta-item">
              <strong>${isRTL ? "التاريخ:" : "Date:"}</strong> ${formatDate(
    booking.confirmedAt,
    isRTL
  )}
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Customer Information -->
        <div class="section">
          <h2 class="section-title">${
            isRTL ? "معلومات العميل" : "Customer Information"
          }</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "الاسم الكامل" : "Full Name"
              }</span>
              <div class="info-value">${booking.customerInfo.name}</div>
            </div>
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "البريد الإلكتروني" : "Email Address"
              }</span>
              <div class="info-value">${booking.customerInfo.email}</div>
            </div>
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "رقم الهاتف" : "Phone Number"
              }</span>
              <div class="info-value">${
                booking.customerInfo.phone || (isRTL ? "غير متوفر" : "N/A")
              }</div>
            </div>
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "عدد المسافرين" : "Travelers"
              }</span>
              <div class="info-value">${convertNumbers(
                booking.travelers,
                isRTL
              )}</div>
            </div>
          </div>
          ${
            booking.customerInfo.specialRequests
              ? `
            <div class="info-item" style="margin-top: 16px;">
              <span class="info-label">${
                isRTL ? "طلبات خاصة" : "Special Requests"
              }</span>
              <div class="info-value">${
                booking.customerInfo.specialRequests
              }</div>
            </div>
          `
              : ""
          }
        </div>

        <!-- Tour Information -->
        <div class="section">
          <h2 class="section-title">${
            isRTL ? "تفاصيل الجولة" : "Tour Details"
          }</h2>
          <div class="tour-header">
            <img src="${booking.tour.image}" alt="${getTourName(
    booking.tour,
    isRTL
  )}" class="tour-image" onerror="this.style.display='none'">
            <div class="tour-info">
              <h3 class="tour-name">${getTourName(booking.tour, isRTL)}</h3>
              <p class="tour-description">${getTourDescription(
                booking.tour,
                isRTL
              )}</p>
              <div class="tour-meta">
                <div class="meta-badge">
                  📅 ${getDurationText(booking.tour.duration, isRTL)}
                </div>
                <div class="meta-badge">
                  💰 ${formatCurrency(
                    booking.tour.price,
                    isRTL
                  )} ${getPerPersonText(isRTL)}
                </div>
                <div class="meta-badge">
                  ✈️ ${booking.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Price Summary -->
        <div class="section">
          <h2 class="section-title">${
            isRTL ? "ملخص السعر" : "Price Summary"
          }</h2>
          <table class="price-table">
            <tr>
              <td>${isRTL ? "المجموع الفرعي" : "Subtotal"}</td>
              <td style="text-align: ${
                isRTL ? "left" : "right"
              };">${formatCurrency(booking.pricing.subtotal, isRTL)}</td>
            </tr>
            <tr>
              <td>${isRTL ? "الضرائب (10%)" : "Tax (10%)"}</td>
              <td style="text-align: ${
                isRTL ? "left" : "right"
              };">${formatCurrency(booking.pricing.tax, isRTL)}</td>
            </tr>
            <tr class="total-row">
              <td>${isRTL ? "المجموع الكلي" : "Total Amount"}</td>
              <td style="text-align: ${
                isRTL ? "left" : "right"
              };">${formatCurrency(booking.pricing.total, isRTL)}</td>
            </tr>
          </table>
        </div>

        <!-- Trip Details -->
        <div class="section">
          <h2 class="section-title">${
            isRTL ? "تفاصيل الرحلة" : "Trip Details"
          }</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "تاريخ السفر" : "Travel Date"
              }</span>
              <div class="info-value">${booking.date}</div>
            </div>
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "حالة الحجز" : "Booking Status"
              }</span>
              <div class="info-value">
                <span class="status-badge">${getStatusText(
                  booking.status
                )}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">${
                isRTL ? "تاريخ التأكيد" : "Confirmed On"
              }</span>
              <div class="info-value">${formatDate(
                booking.confirmedAt,
                isRTL
              )}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-content">
          <p class="thank-you">
            ${
              isRTL
                ? "شكراً لاختياركم جوازي للسياحة"
                : "Thank you for choosing Jwazzy Travel!"
            }
          </p>
          <div class="contact-info">
            <div class="contact-item">
              📞 +1 (555) 123-4567
            </div>
            <div class="contact-item">
              ✉️ support@jwazzy.com
            </div>
            <div class="contact-item">
              🌐 www.jwazzy.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
`;
  return invoiceContent;
};

export const invoiceText = (booking, isRTL) => {
  const invoiceContent = isRTL
    ? `
جوازي للسياحة - تأكيد الحجز
============================
رقم الحجز: ${booking.id}
تاريخ التأكيد: ${formatDate(booking.confirmedAt, isRTL)}

تفاصيل الجولة:
---------------
الجولة: ${getTourName(booking.tour, isRTL)}
الوصف: ${getTourDescription(booking.tour, isRTL)}
المدة: ${getDurationText(booking.tour.duration, isRTL)}
سعر الفرد: ${formatCurrency(booking.tour.price, isRTL)}

معلومات المسافر:
-----------------
الاسم: ${booking.customerInfo.name}
البريد الإلكتروني: ${booking.customerInfo.email}
رقم الهاتف: ${booking.customerInfo.phone || "غير متوفر"}
عدد المسافرين: ${convertNumbers(booking.travelers, isRTL)}
الطلبات الخاصة: ${booking.customerInfo.specialRequests || "لا يوجد"}

تفاصيل الرحلة:
---------------
تاريخ السفر: ${booking.date}
الحالة: ${isRTL ? "مؤكد" : "confirmed"}

ملخص السعر:
-----------
المجموع الفرعي: ${formatCurrency(booking.pricing.subtotal, isRTL)}
الضرائب: ${formatCurrency(booking.pricing.tax, isRTL)}
المجموع الكلي: ${formatCurrency(booking.pricing.total, isRTL)}

شكراً لاختياركم جوازي للسياحة!
    `.trim()
    : `
JWAZZY TRAVEL - BOOKING CONFIRMATION
=====================================
Booking ID: ${booking.id}
Confirmation Date: ${formatDate(booking.confirmedAt, isRTL)}

TOUR DETAILS:
-------------
Tour: ${getTourName(booking.tour, isRTL)}
Description: ${getTourDescription(booking.tour, isRTL)}
Duration: ${getDurationText(booking.tour.duration, isRTL)}
Price per person: ${formatCurrency(booking.tour.price, isRTL)}

TRAVELER INFORMATION:
---------------------
Name: ${booking.customerInfo.name}
Email: ${booking.customerInfo.email}
Phone: ${booking.customerInfo.phone || "N/A"}
Travelers: ${booking.travelers}
Special Requests: ${booking.customerInfo.specialRequests || "None"}

TRIP DETAILS:
-------------
Travel Date: ${booking.date}
Status: ${booking.status}

PRICE SUMMARY:
--------------
Subtotal: ${formatCurrency(booking.pricing.subtotal, isRTL)}
Tax: ${formatCurrency(booking.pricing.tax, isRTL)}
Total: ${formatCurrency(booking.pricing.total, isRTL)}

Thank you for choosing Jwazzy Travel!
    `.trim();
  return invoiceContent;
};
