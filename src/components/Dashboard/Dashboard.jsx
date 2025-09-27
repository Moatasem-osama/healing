import { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Report from "../Report/Report";
import Loader from "../Loader/Loader";
import { DataContext } from "../../context/DataContext";
import Stats from "./Stats/Stats";

export default function Dashboard() {
  let { userTokenAccess } = useContext(userContext);
  let { testsCount, appointmentsCount } = useContext(DataContext);
  const [userInfo, setUserInfo] = useState(null);

  async function getUserInfo() {
    try {
      let { data } = await api.get(`/auth/account/userProfile/`, {
        headers: {
          Authorization: `Bearer ${userTokenAccess}`,
        },
      });
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
      {!userInfo ? (
        <Loader />
      ) : (
        <section className="min-h-screen bg-gray-50 font-cairo">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <aside className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-emerald-600 font-bold">
                      {userInfo?.name?.first?.[0]}
                      {userInfo?.name?.last?.[0]}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {userInfo?.name?.first} {userInfo?.name?.last}
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <i className="fa fa-2x me-2 fa-birthday-cake text-emerald-600 w-6"></i>
                    <span className="text-gray-600 ml-2">العمر: </span>
                    <span className="text-gray-800 font-medium">
                      {userInfo?.age}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <i className="fa fa-2x me-2 fa-venus-mars text-emerald-600 w-6"></i>
                    <span className="text-gray-600 ml-2">الجنس: </span>
                    <span className="text-gray-800 font-medium">
                      {userInfo?.gender}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <i className="fa fa-2x me-2 fa-heartbeat text-emerald-600 w-6 mt-1"></i>
                    <div>
                      <span className="text-gray-600">الأمراض المزمنة: </span>
                      <p className="text-gray-800 font-medium">
                        {userInfo?.diseases || "لا يوجد"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa fa-2x me-2 fa-allergies text-emerald-600 w-6 mt-1"></i>
                    <div>
                      <span className="text-gray-600">الحساسية: </span>
                      <p className="text-gray-800 font-medium">
                        {userInfo?.allergies || "لا يوجد"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa fa-2x me-2 fa-pills text-emerald-600 w-6 mt-1"></i>
                    <div>
                      <span className="text-gray-600">الأدوية: </span>
                      <p className="text-gray-800 font-medium">
                        {userInfo?.medications || "لا يوجد"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa fa-2x me-2 fa-weight text-emerald-600 w-6 mt-1"></i>
                    <div>
                      <span className="text-gray-600">الوزن: </span>
                      <p className="text-gray-800 font-medium">
                        {userInfo?.weight || "لا يوجد"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa fa-2x me-2 fa-ruler-vertical text-emerald-600 w-6 mt-1"></i>
                    <div>
                      <span className="text-gray-600">الطول: </span>
                      <p className="text-gray-800 font-medium">
                        {userInfo?.height || "لا يوجد"}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/editProfile"
                  className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  <i className="fa fa-2x me-2 fa-edit ml-2"></i> تعديل البيانات
                </Link>

                <Report />
              </aside>

              {/* Main */}
              <main className="w-full lg:w-3/4">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    نظرة عامة
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100">
                      <div className="flex items-center">
                        <div className="bg-emerald-100 p-3 rounded-lg">
                          <i className="fa fa-2x  fa-calendar text-emerald-600 text-xl"></i>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">عدد المواعيد</h2>
                          <p className="text-2xl font-bold text-gray-800">
                            {appointmentsCount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <i className="fa fa-2x  fa-file-medical text-blue-600 text-xl"></i>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">عدد التقارير</h2>
                          <p className="text-2xl font-bold text-gray-800">1</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <i className="fa fa-2x  fa-vials text-purple-600 text-xl"></i>
                        </div>
                        <div className="mr-3">
                          <h2 className="text-gray-600 text-sm">
                            عدد التحاليل الطبية
                          </h2>
                          <p className="text-2xl font-bold text-gray-800">
                            {testsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
 <Stats/>
              </main>
            </div>
          </div>
        </section>
       
      )}
    </>
  );
}
