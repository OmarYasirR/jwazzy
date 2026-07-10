import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiUsers, FiAward, FiGlobe, FiHeart } from 'react-icons/fi'

const About = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const stats = [
    { icon: <FiUsers />, number: '10,000+', label: isRTL ? 'مسافر سعيد' : 'Happy Travelers' },
    { icon: <FiGlobe />, number: '100+', label: isRTL ? 'وجهة حول العالم' : 'Destinations Worldwide' },
    { icon: <FiAward />, number: '15+', label: isRTL ? 'سنوات من الخبرة' : 'Years Experience' },
    { icon: <FiHeart />, number: '98%', label: isRTL ? 'تقييم إيجابي' : 'Positive Rating' }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: isRTL ? "الرئيس التنفيذي" : "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: isRTL ? "خبيرة سياحة مع أكثر من 15 عامًا من الخبرة" : "Tourism expert with over 15 years of experience"
    },
    {
      name: "Ahmed Al-Mansoori",
      role: isRTL ? "مدير العمليات" : "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: isRTL ? "متخصص في تخطيط الرحلات والخدمات اللوجستية" : "Specialized in travel planning and logistics"
    },
    {
      name: "Maria Rodriguez",
      role: isRTL ? "مديرة خدمة العملاء" : "Customer Service Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: isRTL ? "ملتزمة بتقديم أفضل تجربة للعملاء" : "Committed to delivering the best customer experience"
    }
  ]

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic' : 'font-english'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            {isRTL ? 'عن جوزي للسياحة' : 'About Jwazzy Travel'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isRTL 
              ? 'نحن شركة سياحية رائدة ملتزمة بتقديم تجارب سفر استثنائية منذ عام 2009. مهمتنا هي جعل أحلام سفرك حقيقة.'
              : 'We are a leading travel company committed to delivering exceptional travel experiences since 2009. Our mission is to make your travel dreams come true.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              {isRTL ? 'قصتنا' : 'Our Story'}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                {isRTL 
                  ? 'بدأت جوزي للسياحة بشغف بسيط للسفر والاكتشاف. على مر السنين، نمت لتصبح واحدة من أكثر وكالات السفر ثقة في المنطقة.'
                  : 'Jwazzy Travel started with a simple passion for travel and discovery. Over the years, we have grown into one of the most trusted travel agencies in the region.'
                }
              </p>
              <p>
                {isRTL 
                  ? 'نحن نؤمن بأن كل رحلة هي قصة تروى، وهدفنا هو جعل قصصكم لا تنسى من خلال خدمة استثنائية وتخطيط دقيق.'
                  : 'We believe that every journey is a story to be told, and our goal is to make your stories unforgettable through exceptional service and careful planning.'
                }
              </p>
              <p>
                {isRTL 
                  ? 'فريقنا من خبراء السفر ملتزم بتقديم تجارب سفر مخصصة تلبي توقعاتك وتتجاوزها.'
                  : 'Our team of travel experts is committed to delivering personalized travel experiences that meet and exceed your expectations.'
                }
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt={isRTL ? "فريق جوزي للسياحة" : "Jwazzy Travel Team"}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {isRTL ? 'فريقنا' : 'Meet Our Team'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-light dark:text-primary-dark font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {isRTL ? 'قيمنا' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-light dark:bg-primary-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <FiHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {isRTL ? 'الشغف' : 'Passion'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'نحن متحمسون للسفر ونشارك هذا الشغف مع كل عميل.'
                  : 'We are passionate about travel and share this passion with every client.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light dark:bg-primary-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <FiAward className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {isRTL ? 'التميز' : 'Excellence'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'نسعى للتميز في كل جانب من جوانب خدمتنا.'
                  : 'We strive for excellence in every aspect of our service.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light dark:bg-primary-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <FiUsers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {isRTL ? 'الثقة' : 'Trust'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL 
                  ? 'نبني علاقات طويلة الأمد مبنية على الثقة والشفافية.'
                  : 'We build long-term relationships based on trust and transparency.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About