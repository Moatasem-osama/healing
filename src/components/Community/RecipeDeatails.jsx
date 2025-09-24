import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";

export default function RecipeDetails() {
  const { id } = useParams();
  let { userTokenAccess } = useContext(userContext);
  const [recipe, setRecipe] = useState(null);

  async function getRecipe() {
    let { data } = await api.get(`/community/recipes/${id}/`, {
      headers: {
        Authorization: `Bearer ${userTokenAccess}`,
      },
    });
    setRecipe(data.recipe);
  }

  useEffect(() => {
    getRecipe();
  }, [id]);

  if (!recipe) return <Loader />;

  return (
 <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
          {recipe.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">{recipe.description}</p>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3">
              <span className="text-emerald-700 text-lg">🧾</span>
            </div>
            <p className="text-xl font-semibold text-emerald-800">المكونات:</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <pre className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {recipe.ingredients}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3">
              <span className="text-emerald-700 text-lg">👨‍🍳</span>
            </div>
            <p className="text-xl font-semibold text-emerald-800">طريقة التحضير:</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <p className="text-gray-700 text-lg leading-relaxed">
              {recipe.instructions}
            </p>
          </div>
        </div>

        <Link
          to="/community/recipes"
          className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          رجوع إلى القائمة
        </Link>
      </div>
    </div>
  );
}
