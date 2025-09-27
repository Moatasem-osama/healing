import { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Questions from "./Questions/Questions";

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `منذ ${diff} ثانية`;
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

export default function RecipesList() {
  let { userTokenAccess } = useContext(userContext);
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    let { data } = await api.get(`/community/recipes/`, {
      headers: {
        Authorization: `Bearer ${userTokenAccess}`,
      },
    });
    setRecipes(data.recipes);
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      {recipes.length === 0 ? (
        <Loader />
      ) : (
        <div className=" py-10 font-cairo container p-5 mx-auto">
        <header className="text-center mb-12"> <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4"> مجتمعنا </h1> <p className="text-lg text-gray-600 mb-6">مكان لتبادل الأفكار والمناقشات حول الطب الطبيعي</p> 
        <Link to={'add'} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold hover:shadow-emerald-200 hover:shadow-xl hover:-translate-y-1"><span>أضف وصفة جديدة</span> <span className="text-lg">🌿</span></Link>
        </header>
          <div className=" mx-auto space-y-4">
            {recipes.map((rec) => (
              <Link
                to={`/community/recipes/${rec.id}`}
                key={rec.id}
                className="block bg-white rounded-lg shadow border border-gray-200 py-2 px-3 hover:shadow-md transition"
              >
              <article className="flex justify-between items-center mb-4">
              <div >

                <h4 className="text-lg font-semibold text-emerald-700 mb-3">
                  {rec.title}
                </h4>
                <div className="flex text-sm gap-3 text-gray-500 mb-4">
                  <span className="font-medium flex items-center gap-1">
                    <i className="fa fa-user text-emerald-600"></i>
                  {rec.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa fa-clock text-emerald-600"></i>
                    {timeAgo(rec.created_at)}
                  </span>
                </div>
              </div>
                <p className="text-gray-600 text-sm max-w-xs mx-auto leading-7 text-center hidden md:block">
                  {rec.description.length > 100
                    ? rec.description.substring(0, 150) + "..."
                    : rec.description}
                </p>
              </article>
                
              </Link>
            ))}
          </div>
        </div>
      )}
      <Questions />
    </>
  );
}
