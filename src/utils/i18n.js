import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      destinations: "Destinations",
      tours: "Tours",
      about: "About",
      contact: "Contact",
      
      // Home page
      welcome: "Welcome to Jwazzy Travel",
      subtitle: "Discover the world with our exclusive travel experiences",
      cta: "Book Now",
      featured: "Featured Destinations",
      
      // Common
      bookNow: "Book Now",
      learnMore: "Learn More",
      price: "Price",
      duration: "Duration",
      days: "days",
      
      // Booking
      selectDate: "Select Date",
      numberOfTravelers: "Number of Travelers",
      total: "Total",
      proceedToPayment: "Proceed to Payment",
      
      // Payment
      payment: "Payment",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvc: "CVC",
      payNow: "Pay Now",

      // Contact
      sendMessage: "Send Message",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      subject: "Subject",
      message: "Message"
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      destinations: "الوجهات",
      tours: "الجولات",
      about: "عن الشركة",
      contact: "اتصل بنا",
      
      // Home page
      welcome: "مرحباً بكم في جوازي للسياحة",
      subtitle: "اكتشف العالم مع تجاربنا السياحية الحصرية",
      cta: "احجز الآن",
      featured: "الوجهات المميزة",
      
      // Common
      bookNow: "احجز الآن",
      learnMore: "المزيد",
      price: "السعر",
      duration: "المدة",
      days: "أيام",
      
      // Booking
      selectDate: "اختر التاريخ",
      numberOfTravelers: "عدد المسافرين",
      total: "المجموع",
      proceedToPayment: "المتابعة للدفع",
      
      // Payment
      payment: "الدفع",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      cvc: "الرمز السري",
      payNow: "ادفع الآن",

      // Contact
      sendMessage: "إرسال رسالة",
      fullName: "الاسم الكامل",
      emailAddress: "البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      subject: "الموضوع",
      message: "الرسالة"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    // Arabic-specific configuration
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n