import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiCreditCard,
  FiEdit,
  FiSave,
  FiX,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";
import { Link } from 'react-router-dom'
import {  useBooking } from '../contexts/BookingContext'


const Profile = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});
  const { bookingHistory } = useBooking()

  // Initialize form when user data is available
  React.useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        nationality: user.nationality || "",
        passportNumber: user.passportNumber || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!editForm.name?.trim()) {
      newErrors.name = isRTL ? "الاسم الكامل مطلوب" : "Full name is required";
    } else if (editForm.name.length < 2) {
      newErrors.name = isRTL
        ? "الاسم يجب أن يكون على الأقل حرفين"
        : "Name must be at least 2 characters";
    }

    if (!editForm.email?.trim()) {
      newErrors.email = isRTL ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      newErrors.email = isRTL
        ? "البريد الإلكتروني غير صالح"
        : "Invalid email address";
    }

    // Phone validation (if provided)
    if (editForm.phone && !/^\+?[\d\s-()]{10,}$/.test(editForm.phone)) {
      newErrors.phone = isRTL ? "رقم الهاتف غير صالح" : "Invalid phone number";
    }

    // Date of birth validation (if provided)
    if (editForm.dateOfBirth) {
      const birthDate = new Date(editForm.dateOfBirth);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120); // 120 years ago
      const maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() - 5); // Must be at least 5 years old

      if (birthDate > maxDate) {
        newErrors.dateOfBirth = isRTL
          ? "يجب أن يكون عمرك 5 سنوات على الأقل"
          : "You must be at least 5 years old";
      } else if (birthDate < minDate) {
        newErrors.dateOfBirth = isRTL ? "التاريخ غير صالح" : "Invalid date";
      }
    }

    // Passport number validation (if provided)
    if (
      editForm.passportNumber &&
      !/^[A-Z0-9]{6,12}$/i.test(editForm.passportNumber)
    ) {
      newErrors.passportNumber = isRTL
        ? "رقم الجواز يجب أن يحتوي على 6-12 حرف أو رقم"
        : "Passport number must be 6-12 letters or numbers";
    }

    // Password validation (if changing password)
    if (editForm.password || editForm.confirmPassword) {
      if (editForm.password.length < 6) {
        newErrors.password = isRTL
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters";
      }

      if (editForm.password !== editForm.confirmPassword) {
        newErrors.confirmPassword = isRTL
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage({ type: "", text: "" });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validate form before submission
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: isRTL
          ? "يرجى تصحيح الأخطاء في النموذج"
          : "Please correct the errors in the form",
      });
      return;
    }

    try {
      // Prepare data for update (remove confirmPassword)
      const { confirmPassword, ...updateData } = editForm;
      if (!updateData.password) {
        delete updateData.password;
      }

      // Clean up empty strings
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === "") {
          updateData[key] = undefined;
        }
      });

      const result = await updateProfile(updateData);

      if (result.success) {
        setMessage({
          type: "success",
          text: isRTL
            ? "تم تحديث الملف الشخصي بنجاح"
            : "Profile updated successfully",
        });
        setIsEditing(false);
        // Clear password fields
        setEditForm((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
        setErrors({});
      } else {
        setMessage({
          type: "error",
          text:
            result.error ||
            (isRTL ? "فشل في تحديث الملف الشخصي" : "Failed to update profile"),
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: isRTL ? "حدث خطأ غير متوقع" : "An unexpected error occurred",
      });
    }
  };

  const nationalityOptions = [
    { value: "SA", label: isRTL ? "السعودية" : "Saudi Arabia" },
    { value: "AE", label: isRTL ? "الإمارات" : "United Arab Emirates" },
    { value: "US", label: isRTL ? "الولايات المتحدة" : "United States" },
    { value: "UK", label: isRTL ? "المملكة المتحدة" : "United Kingdom" },
    { value: "CA", label: isRTL ? "كندا" : "Canada" },
    { value: "FR", label: isRTL ? "فرنسا" : "France" },
    { value: "DE", label: isRTL ? "ألمانيا" : "Germany" },
    { value: "JP", label: isRTL ? "اليابان" : "Japan" },
    { value: "EG", label: isRTL ? "مصر" : "Egypt" },
    { value: "QA", label: isRTL ? "قطر" : "Qatar" },
  ];

  // Helper function to render input with error
  const renderInput = (
    name,
    label,
    type = "text",
    placeholder = "",
    required = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={editForm[name] || ""}
        onChange={handleInputChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${
          errors[name]
            ? "border-red-500 dark:border-red-400 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:ring-primary-light"
        }`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  // Helper function to render select with error
  const renderSelect = (name, label, options, required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && "*"}
      </label>
      <select
        name={name}
        value={editForm[name] || ""}
        onChange={handleInputChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${
          errors[name]
            ? "border-red-500 dark:border-red-400 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:ring-primary-light"
        }`}
      >
        <option value="">{isRTL ? "اختر" : "Select"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  // Helper function to render password input with error
  const renderPasswordInput = (name, label, placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <FiLock
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${
            isRTL ? "right-3" : "left-3"
          }`}
        />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={editForm[name] || ""}
          onChange={handleInputChange}
          className={`w-full py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${
            errors[name]
              ? "border-red-500 dark:border-red-400 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-primary-light"
          } ${isRTL ? "pr-20 pl-4" : "pl-10 pr-20"}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${
            isRTL ? "left-3" : "right-3"
          }`}
        >
          {showPassword ? (
            <FiEyeOff className="w-4 h-4" />
          ) : (
            <FiEye className="w-4 h-4" />
          )}
        </button>
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  if (!user) {
    return (
      <div
        className={`min-h-screen py-12 ${
          isRTL ? "font-arabic arabic-text" : "font-english"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
            {isRTL ? "الملف الشخصي" : "Profile"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL ? "جارٍ تحميل الملف الشخصي..." : "Loading profile..."}
          </p>
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
        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <FiUser className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-white/80">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                    {user.role === "admin"
                      ? isRTL
                        ? "مدير"
                        : "Admin"
                      : isRTL
                      ? "مستخدم"
                      : "User"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors duration-200"
                disabled={loading}
              >
                {isEditing ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiEdit className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {isRTL ? "المعلومات الشخصية" : "Personal Information"}
                    </h2>

                    {renderInput(
                      "name",
                      isRTL ? "الاسم الكامل" : "Full Name",
                      "text",
                      isRTL ? "أدخل اسمك الكامل" : "Enter your full name",
                      true
                    )}

                    {renderInput(
                      "email",
                      isRTL ? "البريد الإلكتروني" : "Email Address",
                      "email",
                      isRTL ? "example@email.com" : "you@example.com",
                      true
                    )}

                    {renderInput(
                      "phone",
                      isRTL ? "رقم الهاتف" : "Phone Number",
                      "tel",
                      isRTL ? "+966 123 456 789" : "+1 234 567 890"
                    )}

                    {renderInput(
                      "dateOfBirth",
                      isRTL ? "تاريخ الميلاد" : "Date of Birth",
                      "date"
                    )}
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {isRTL ? "معلومات إضافية" : "Additional Information"}
                    </h2>

                    {renderSelect(
                      "nationality",
                      isRTL ? "الجنسية" : "Nationality",
                      nationalityOptions
                    )}

                    {renderInput(
                      "passportNumber",
                      isRTL ? "رقم الجواز" : "Passport Number",
                      "text",
                      isRTL ? "رقم الجواز" : "Passport number"
                    )}

                    {/* Password Change Section */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        {isRTL ? "تغيير كلمة المرور" : "Change Password"}
                      </h3>

                      <div className="space-y-3">
                        {renderPasswordInput(
                          "password",
                          isRTL ? "كلمة المرور الجديدة" : "New Password",
                          isRTL ? "كلمة المرور الجديدة" : "New password"
                        )}

                        {renderPasswordInput(
                          "confirmPassword",
                          isRTL ? "تأكيد كلمة المرور" : "Confirm Password",
                          isRTL ? "تأكيد كلمة المرور" : "Confirm password"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    {isRTL ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FiSave className="w-5 h-5" />
                    )}
                    {isRTL ? "حفظ التغييرات" : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              // View Mode (unchanged)
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {isRTL ? "المعلومات الشخصية" : "Personal Information"}
                    </h2>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FiUser className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isRTL ? "الاسم الكامل" : "Full Name"}
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isRTL ? "البريد الإلكتروني" : "Email Address"}
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {user.phone && (
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FiPhone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isRTL ? "رقم الهاتف" : "Phone Number"}
                          </p>
                          <p className="text-gray-800 dark:text-white">
                            {user.phone}
                          </p>
                        </div>
                      </div>
                    )}

                    {user.dateOfBirth && (
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FiCalendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isRTL ? "تاريخ الميلاد" : "Date of Birth"}
                          </p>
                          <p className="text-gray-800 dark:text-white">
                            {new Date(user.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {isRTL ? "معلومات إضافية" : "Additional Information"}
                    </h2>

                    {user.nationality && (
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FiGlobe className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isRTL ? "الجنسية" : "Nationality"}
                          </p>
                          <p className="text-gray-800 dark:text-white">
                            {user.nationality}
                          </p>
                        </div>
                      </div>
                    )}

                    {user.passportNumber && (
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FiCreditCard className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isRTL ? "رقم الجواز" : "Passport Number"}
                          </p>
                          <p className="text-gray-800 dark:text-white">
                            {user.passportNumber}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isRTL ? "تاريخ الإنشاء" : "Member Since"}
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bookings Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {isRTL ? "حجوزاتي" : "My Bookings"}
                    </h2>
                    <Link
                      to="/my-bookings"
                      className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light font-medium"
                    >
                      {isRTL ? "عرض الكل" : "View All"}
                    </Link>
                  </div>

                  {bookingHistory.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">
                      {isRTL
                        ? "لا توجد حجوزات حتى الآن. ابدأ رحلتك مع جوزي للسياحة!"
                        : "No bookings yet. Start your journey with Jwazzy Travel!"}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {bookingHistory.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {isRTL ? booking?.tour?.nameAr : booking?.tour?.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(booking?.date)} • {booking?.travelers}{" "}
                              {isRTL ? "مسافر" : "traveler(s)"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              getStatusInfo(booking?.status)?.color
                            }`}
                          >
                            {getStatusInfo(booking?.status)?.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
