import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";
import { useBooking } from "../contexts/BookingContext";
import {
  FiCheck,
  FiDownload,
  FiMail,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiShare2,
} from "react-icons/fi";
import { invoicePDF, invoiceText } from "../utils/invoice";

const BookingConfirmation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL, currentLanguage } = useLanguage();
  const { getBookingById } = useBooking();

  const bookingId = location.state?.bookingId;
  const booking = bookingId ? getBookingById(bookingId) : null;

  // Convert numbers based on current language
  const convertNumbers = (number) => {
    if (isRTL) {
      return number.toString().replace(/[0-9]/g, (m) => "٠١٢٣٤٥٦٧٨٩"[m]);
    }
    return number.toString();
  };

  // Format date based on current language
  const formatDate = (dateString) => {
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
  const formatCurrency = (amount) => {
    const formattedAmount = convertNumbers(amount);

    if (isRTL) {
      return `${formattedAmount} $`;
    }
    return `$${formattedAmount}`;
  };

  // Get tour name based on current language
  const getTourName = (tour) => {
    return isRTL ? tour.nameAr || tour.name : tour.name;
  };

  // Get tour description based on current language
  const getTourDescription = (tour) => {
    return isRTL ? tour.descriptionAr || tour.description : tour.description;
  };

  // Get duration text based on current language
  const getDurationText = (duration) => {
    return `${duration} ${isRTL ? "أيام" : "days"}`;
  };

  // Get per person text based on current language
  const getPerPersonText = () => {
    return isRTL ? "للفرد" : "per person";
  };

  // Generate PDF Invoice using browser print
  const generatePDFInvoice = () => {
    if (!booking) return;

    const invoiceContent = invoicePDF(booking, isRTL)

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      // Optional: close window after printing
      // printWindow.close()
    }, 250);
  };

  // Download as Text File with language support
  const downloadTextInvoice = () => {
    if (!booking) return;

    const invoiceContent = invoiceText(booking, isRTL)
    const blob = new Blob([invoiceContent], {
      type: "text/plain; charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = isRTL
      ? `الحجز-${booking.id}.txt`
      : `Booking-${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share via Email with language support
  const shareViaEmail = () => {
    if (!booking) return;

    const subject = isRTL
      ? `تأكيد حجز جوزي للسياحة - ${booking.id}`
      : `Your Jwazzy Travel Booking Confirmation - ${booking.id}`;

    const body = isRTL
      ? `
السيد/ة ${booking.customerInfo.name}،

شكراً لحجزك مع جوزي للسياحة!以下是你預訂的詳細資料：

رقم الحجز: ${booking.id}
الجولة: ${getTourName(booking.tour)}
تاريخ السفر: ${booking.date}
عدد المسافرين: ${convertNumbers(booking.travelers)}
المبلغ الإجمالي: ${formatCurrency(booking.pricing.total)}

نحن متحمسون لاستضافتك! إذا كان لديك أي أسئلة، فلا تتردد في الاتصال بفريق الدعم لدينا.

مع أطيب التحيات،
فريق جوزي للسياحة
    `.trim()
      : `
Dear ${booking.customerInfo.name},

Thank you for booking with Jwazzy Travel! Here are your booking details:

Booking ID: ${booking.id}
Tour: ${getTourName(booking.tour)}
Travel Date: ${booking.date}
Number of Travelers: ${booking.travelers}
Total Amount: ${formatCurrency(booking.pricing.total)}

We're excited to have you on board! If you have any questions, please don't hesitate to contact our support team.

Best regards,
Jwazzy Travel Team
    `.trim();

    window.location.href = `mailto:${
      booking.customerInfo.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Share via Social Media/Other Apps with language support
  const shareBooking = async () => {
    if (!booking) return;

    const shareData = {
      title: isRTL ? "حجزي مع جوزي للسياحة" : "My Jwazzy Travel Booking",
      text: isRTL
        ? `حجزت "${getTourName(booking.tour)}" مع جوزي للسياحة! رقم الحجز: ${
            booking.id
          }`
        : `I just booked "${getTourName(
            booking.tour
          )}" with Jwazzy Travel! Booking ID: ${booking.id}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.text);
        alert(
          isRTL
            ? "تم نسخ تفاصيل الحجز إلى الحافظة"
            : "Booking details copied to clipboard!"
        );
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareData.text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(
          isRTL
            ? "تم نسخ تفاصيل الحجز إلى الحافظة"
            : "Booking details copied to clipboard!"
        );
      }
    } catch (error) {
      console.log("Sharing failed:", error);
    }
  };

  // Get status text based on current language
  const getStatusText = (status) => {
    const statusMap = {
      confirmed: isRTL ? "مؤكد" : "confirmed",
      paid: isRTL ? "مدفوع" : "paid",
      draft: isRTL ? "مسودة" : "draft",
      cancelled: isRTL ? "ملغى" : "cancelled",
    };
    return statusMap[status] || status;
  };

  if (!booking) {
    return (
      <div
        className={`min-h-screen py-12 ${
          isRTL ? "font-arabic arabic-text" : "font-english"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
            {isRTL ? "التأكيد غير موجود" : "Confirmation Not Found"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? "تعذر العثور على تفاصيل الحجز. يرجى التحقق من الرابط أو الاتصال بالدعم."
              : "Unable to find booking details. Please check the link or contact support."}
          </p>
          <Link
            to="/"
            className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
          >
            {isRTL ? "العودة إلى الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 ${
        isRTL ? "font-arabic arabic-text" : "font-english"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {isRTL ? "تم تأكيد الحجز بنجاح!" : "Booking Confirmed!"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isRTL
              ? "شكراً لك على حجزك مع جوزي للسياحة"
              : "Thank you for booking with Jwazzy Travel"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isRTL ? "رقم الحجز:" : "Booking ID:"} {booking.id}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Information */}
            <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? "تفاصيل الجولة" : "Tour Details"}
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src={booking.tour.image}
                  alt={getTourName(booking.tour)}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {getTourName(booking.tour)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {getTourDescription(booking.tour)}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {getDurationText(booking.tour.duration)}
                    </span>
                    <span>
                      {formatCurrency(booking.tour.price)} {getPerPersonText()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Information */}
            <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? "معلومات المسافر" : "Traveler Information"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isRTL ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <p className="text-gray-800 dark:text-white">
                    {booking.customerInfo.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isRTL ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <p className="text-gray-800 dark:text-white">
                    {booking.customerInfo.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isRTL ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <p className="text-gray-800 dark:text-white">
                    {booking.customerInfo.phone ||
                      (isRTL ? "غير متوفر" : "N/A")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isRTL ? "عدد المسافرين" : "Number of Travelers"}
                  </label>
                  <p className="text-gray-800 dark:text-white">
                    {convertNumbers(booking.travelers)}
                  </p>
                </div>
              </div>
              {booking.customerInfo.specialRequests && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isRTL ? "طلبات خاصة" : "Special Requests"}
                  </label>
                  <p className="text-gray-800 dark:text-white">
                    {booking.customerInfo.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Trip Details */}
            <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? "تفاصيل الرحلة" : "Trip Details"}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">
                    {isRTL ? "تاريخ السفر" : "Travel Date"}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {booking.date}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">
                    {isRTL ? "حالة الحجز" : "Booking Status"}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400 capitalize">
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    {isRTL ? "تاريخ التأكيد" : "Confirmed On"}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {formatDate(booking.confirmedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary & Actions */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? "ملخص السعر" : "Price Summary"}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{isRTL ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span>{formatCurrency(booking.pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{isRTL ? "الضرائب" : "Tax"}</span>
                  <span>{formatCurrency(booking.pricing.tax)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-3">
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {isRTL ? "المجموع" : "Total"}
                  </span>
                  <span className="text-lg font-semibold text-primary-light dark:text-primary-dark">
                    {formatCurrency(booking.pricing.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? "الإجراءات" : "Actions"}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={generatePDFInvoice}
                  className="w-full flex items-center justify-center gap-2 bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
                >
                  <FiDownload className="w-4 h-4" />
                  {isRTL ? "تحميل الفاتورة (PDF)" : "Download Invoice (PDF)"}
                </button>

                <button
                  onClick={downloadTextInvoice}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <FiDownload className="w-4 h-4" />
                  {isRTL ? "تحميل كملف نصي" : "Download as Text File"}
                </button>

                <button
                  onClick={shareViaEmail}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <FiMail className="w-4 h-4" />
                  {isRTL ? "إرسال بالبريد" : "Send via Email"}
                </button>

                <button
                  onClick={shareBooking}
                  className="w-full flex items-center justify-center gap-2 border border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 py-3 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-700 transition-colors duration-300"
                >
                  <FiShare2 className="w-4 h-4" />
                  {isRTL ? "مشاركة الحجز" : "Share Booking"}
                </button>

                <Link
                  to="/destinations"
                  className="w-full flex items-center justify-center gap-2 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark py-3 px-4 rounded-lg hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors duration-300"
                >
                  <FiMapPin className="w-4 h-4" />
                  {isRTL ? "استكشف المزيد" : "Explore More"}
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-sky-200 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                {isRTL ? "بحاجة إلى مساعدة؟" : "Need Help?"}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
                {isRTL
                  ? "فريق الدعم لدينا متاح 24/7 لمساعدتك في أي استفسارات."
                  : "Our support team is available 24/7 to assist you with any inquiries."}
              </p>
              <div className="text-blue-600 dark:text-blue-400 text-sm">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ support@jwazzy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
