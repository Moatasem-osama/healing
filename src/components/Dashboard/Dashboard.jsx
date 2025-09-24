import { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import Charts from "./Charts";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Report from "../Report/Report";
import Loader from "../Loader/Loader";

export default function Dashboard() {
  let { userTokenAccess } = useContext(userContext);
  const [userInfo, setUserInfo] = useState(null);

  async function getUserInfo() {
    try {
      let { data } = await api.get(
        `/auth/account/userProfile/`,
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
          },
        }
      );
      setUserInfo(data.user);
    } catch (err) {
      toast.error("خطأ في تحميل البيانات");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
    
      {!userInfo ? <Loader/> : (
        <section className="min-h-screen bg-gray-50 font-cairo">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-emerald-600 font-bold">
                      {userInfo?.name?.first?.[0]}{userInfo?.name?.last?.[0]}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {userInfo?.name?.first} {userInfo?.name?.last}
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-8 text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">العمر: </span>
                    <span className="mr-2 text-gray-800 font-medium">{userInfo?.age}</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">الجنس: </span>
                    <span className="mr-2 text-gray-800 font-medium">{userInfo?.gender}</span>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 text-emerald-600 pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-600">الأمراض المزمنة: </span>
                      <p className="mr-2 text-gray-800 font-medium">{userInfo?.diseases || "لا يوجد"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 text-emerald-600 pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-600">الحساسية: </span>
                      <p className="mr-2 text-gray-800 font-medium">{userInfo?.allergies || "لا يوجد"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 text-emerald-600 pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-600">الأدوية: </span>
                      <p className="mr-2 text-gray-800 font-medium">{userInfo?.medications || "لا يوجد"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-emerald-600 pt-1">
                      <i className="fa-solid fa-weight-hanging fa-2x"></i>
                    </div>
                    <div>
                      <span className="text-gray-600">الوزن: </span>
                      <p className="mr-2 text-gray-800 font-medium">{userInfo?.weight || "لا يوجد"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-emerald-600 pt-1">
                      <i className="fa-solid fa-ruler-vertical fa-2x"></i>
                    </div>
                    <div>
                      <span className="text-gray-600">الطول: </span>
                      <p className="mr-2 text-gray-800 font-medium">{userInfo?.height || "لا يوجد"}</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/editProfile"
                  className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  تعديل البيانات
                </Link>
                <Report />
              </aside>

              <main className="w-full lg:w-3/4">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة</h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100">
                      <div className="flex items-center">
                        <div className="bg-emerald-100 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">عدد المواعيد</h2>
                          <p className="text-2xl font-bold text-gray-800">3</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">عدد التقارير</h2>
                          <p className="text-2xl font-bold text-gray-800">5</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">عدد الوصفات</h2>
                          <p className="text-2xl font-bold text-gray-800">2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">الإحصائيات</h1>
                  <div className="charts">
                    <Charts />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
