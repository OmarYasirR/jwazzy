import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock } from 'react-icons/fi'

const Contact = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Contact form data:', formData)
    alert(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: isRTL ? 'هاتف' : 'Phone',
      content: '+1 (555) 123-4567',
      description: isRTL ? 'من الإثنين إلى الجمعة' : 'Mon to Fri'
    },
    {
      icon: <FiMail />,
      title: isRTL ? 'بريد إلكتروني' : 'Email',
      content: 'info@jwazzy.com',
      description: isRTL ? 'أرسل لنا رسالة' : 'Send us a message'
    },
    {
      icon: <FiMapPin />,
      title: isRTL ? 'عنوان' : 'Address',
      content: isRTL ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
      description: isRTL ? 'المنطقة التجارية' : 'Business Bay'
    },
    {
      icon: <FiClock />,
      title: isRTL ? 'ساعات العمل' : 'Working Hours',
      content: '9:00 - 18:00',
      description: isRTL ? 'من الإثنين إلى الجمعة' : 'Mon to Fri'
    }
  ]

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic' : 'font-english'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            {t('contact')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isRTL 
              ? 'نحن هنا لمساعدتك! تواصل معنا لأي استفسارات أو لبدء التخطيط لرحلتك القادمة.'
              : 'We\'re here to help! Contact us for any inquiries or to start planning your next journey.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {isRTL ? 'معلومات التواصل' : 'Get in Touch'}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-light dark:bg-primary-dark w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {isRTL ? 'أرسل رسالة' : 'Send us a Message'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isRTL ? 'الموضوع' : 'Subject'} *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    >
                      <option value="">{isRTL ? 'اختر الموضوع' : 'Select Subject'}</option>
                      <option value="general">{isRTL ? 'استفسار عام' : 'General Inquiry'}</option>
                      <option value="booking">{isRTL ? 'حجز جولة' : 'Tour Booking'}</option>
                      <option value="custom">{isRTL ? 'جولة مخصصة' : 'Custom Tour'}</option>
                      <option value="support">{isRTL ? 'دعم العملاء' : 'Customer Support'}</option>
                      <option value="feedback">{isRTL ? 'ملاحظات' : 'Feedback'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FiSend />
                  {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white mb-8">
            {isRTL ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {isRTL ? 'كيف يمكنني حجز جولة؟' : 'How can I book a tour?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'يمكنك حجز الجولة مباشرة من خلال موقعنا الإلكتروني، أو عن طريق الاتصال بفريق المبيعات لدينا.'
                  : 'You can book a tour directly through our website, or by contacting our sales team.'
                }
              </p>
            </div>
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {isRTL ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'نحن نقبل البطاقات الائتمانية، التحويلات البنكية، وخدمات الدفع الإلكتروني.'
                  : 'We accept credit cards, bank transfers, and electronic payment services.'
                }
              </p>
            </div>
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {isRTL ? 'هل يمكنني تعديل حجزي؟' : 'Can I modify my booking?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'نعم، يمكنك تعديل الحجز قبل 48 ساعة من موعد الجولة. قد تنطبق بعض الشروط.'
                  : 'Yes, you can modify your booking up to 48 hours before the tour. Some conditions may apply.'
                }
              </p>
            </div>
            <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {isRTL ? 'ما هي سياسة الإلغاء؟' : 'What is the cancellation policy?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'يمكنك الإلغاء قبل 72 ساعة لاسترداد كامل المبلغ. بعد ذلك، قد تنطبق رسوم إلغاء.'
                  : 'You can cancel up to 72 hours in advance for a full refund. After that, cancellation fees may apply.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact