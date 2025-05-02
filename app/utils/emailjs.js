import { init } from "@emailjs/browser";

// تهيئة EmailJS
// قم بتغيير هذا المفتاح بمفتاح API الخاص بك من حساب EmailJS
export const initEmailJS = () => {
  init("qPppjI3bsP7G-KO-r");
};

/*
تعليمات إعداد EmailJS:

1. قم بالتسجيل في موقع EmailJS (https://www.emailjs.com/) - يوفر خطة مجانية تسمح بإرسال 200 رسالة شهرياً
2. قم بإنشاء Email Service (مثل Gmail أو Outlook أو غيرها) وسجل العنوان المطلوب استلام الرسائل عليه
3. قم بإنشاء Email Template باستخدام المتغيرات التالية:
   - {{user_name}} - اسم المرسل
   - {{user_email}} - بريد المرسل الإلكتروني
   - {{user_phone}} - رقم هاتف المرسل
   - {{subject}} - موضوع الرسالة
   - {{message}} - نص الرسالة
4. احصل على:
   - YOUR_SERVICE_ID من صفحة Email Services
   - YOUR_TEMPLATE_ID من صفحة Email Templates
   - YOUR_PUBLIC_KEY من صفحة Account > API Keys
5. استبدل القيم الثلاثة في ملف Footer.jsx وفي هذا الملف

ملاحظة: احرص على عدم مشاركة مفتاح API مع أي شخص
*/
