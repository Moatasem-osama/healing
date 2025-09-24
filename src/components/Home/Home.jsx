import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
     <div className="font-cairo bg-gray-50 text-gray-800" >

        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              عشبة شفاء 🌿
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
              منصة ويب ذكية تساعد المصريين على علاج الأعراض الشائعة باستخدام الأعشاب المحلية
              وربطها بالعادات الغذائية المصرية.
            </p>
            <Link
              to={"/dashboard"}
              className="inline-block bg-white text-emerald-700 px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
            >
              ابدأ الآن
            </Link>
          </div>
        </section>

        <Link
          to="/chatbot"
          className="fixed bottom-8 right-8 flex items-center justify-center rounded-full bg-emerald-500 p-4 shadow-lg hover:bg-emerald-600 transition-all duration-300 z-10"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </Link>

        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
              عن الفكرة
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 text-center max-w-4xl mx-auto">
              المنصة توفر للمستخدم إمكانية إدخال الأعراض باللهجة المصرية لتحليلها
              واقتراح وصفات عشبية مناسبة. تتضمن لوحة تحكم شخصية لمتابعة البيانات
              الطبية، مكتبة أعشاب تفاعلية، وقسم "وصفات الأجداد" الذي يجمع الوصفات الشعبية
              بعد مراجعتها، بالإضافة إلى "قصص تراثية" عن الأعشاب.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-emerald-600 text-center mb-12">
              المميزات الرئيسية
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300">
                <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  🌱
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">
                  مكتبة الأعشاب
                </h3>
                <p className="text-gray-600">
                  موسوعة تفاعلية تشمل فوائد وأضرار وطريقة تحضير الأعشاب.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  📊
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  لوحة التحكم
                </h3>
                <p className="text-gray-600">
                  متابعة بيانات المريض (العمر، الوزن، الأمراض المزمنة) والتحاليل الطبية
                  بمساعدة تحليل ذكي.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="bg-amber-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  👵
                </div>
                <h3 className="text-xl font-semibold text-amber-700 mb-4">
                  وصفات الأجداد
                </h3>
                <p className="text-gray-600">
                  خلطات شعبية متوارثة يتم مراجعتها وإتاحتها للمستخدمين.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
              الفئة المستهدفة
            </h2>
            <ul className="grid md:grid-cols-2 gap-6 text-gray-600">
              <li className="flex items-start ">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 ml-2 mt-1">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>مرضى السكري والضغط الذين يحتاجون متابعة يومية.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>المصريون الذين يستخدمون الطب العشبي (حوالي 60% من السكان).</span>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>الأمهات الجدد الباحثات عن حلول طبيعية.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>سكان القرى الذين يعتمدون على الأعشاب لضعف الخدمات الصحية.</span>
              </li>
              <li className="flex items-start md:col-span-2">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>الشباب المهتمون بالتراث والطب البديل.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-emerald-600 text-center mb-12">
              كيف تعمل المنصة؟
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-sm border border-emerald-100 text-center">
                <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-4 text-emerald-700">تسجيل البيانات</h3>
                <p className="text-gray-600">
                  أنشئ حساب بسيط وأدخل بياناتك (العمر، الوزن، الأمراض المزمنة).
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-sm border border-blue-100 text-center">
                <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-4 text-blue-700">إدخال الأعراض</h3>
                <p className="text-gray-600">
                  اكتب أو سجّل صوتيًا الأعراض، والمنصة تقترح لك وصفات عشبية مناسبة.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-sm border border-amber-100 text-center">
                <div className="bg-amber-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-4 text-amber-700">الحصول على النصائح</h3>
                <p className="text-gray-600">
                  استلم نصائح عشبية مخصصة وتذكيرات لمتابعة صحتك باستمرار.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">إحصائيات داعمة</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900">
                <p className="text-4xl font-bold mb-2">60%</p>
                <p>من المصريين جربوا الأعشاب الطبية</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900">
                <p className="text-4xl font-bold mb-2">22%</p>
                <p>من البالغين مصابون بالسكري</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900">
                <p className="text-4xl font-bold mb-2">65%</p>
                <p>يستخدمون الأعشاب بجانب الأدوية</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900">
                <p className="text-4xl font-bold mb-2">50,000</p>
                <p>مستخدم متوقع في أول سنة</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-100 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-emerald-600 mb-6">تواصل معنا</h2>
            <p className="text-gray-600 mb-8">
              لو عندك استفسار أو اقتراح لتحسين المنصة، تقدر تتواصل معانا بسهولة.
            </p>
            <a
              href="mailto:moatasemosama18@gmail.com"
              className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg shadow hover:bg-emerald-600 transition-all duration-300 font-medium"
            >
              أرسل رسالة
            </a>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-6 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <p>© 2025 عشبة شفاء - جميع الحقوق محفوظة</p>
          </div>
        </footer>
      </div>
  );
}
