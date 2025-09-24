import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const {data} = await api.get("/herbs/stories/all");
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  if (loading) return <p className="text-center py-10">جارِ تحميل القصص...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center font-[var(--font-cairo)]">
        قصص الأعشاب
      </h1>

      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={story.image_url}
                alt={story.title}
                className="rounded-xl h-48 w-full object-cover mb-4"
              />
              <Link to={`/herbDetails/${story.herb}`}>انتقل إلى عشبة {story.title.split(' ')[0]}</Link>
              <h2 className="text-xl font-bold text-green-900 mb-2">
                {story.title}
              </h2>
              <p className="text-gray-700 mb-3">{story.short_description}</p>
              <details className="mt-auto">
                <summary className="text-green-700 font-semibold cursor-pointer">
                  اقرأ القصة كاملة
                </summary>
                <p className="text-gray-600 mt-2 leading-relaxed">{story.story}</p>
              </details>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">لا توجد قصص حالياً</p>
      )}
    </div>
  );
}
