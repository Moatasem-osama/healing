import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data } = await api.get("/herbs/stories/all");
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
    <div className=" container mx-auto px-4 py-12 max-w-7xl ">
      <h1 className="text-4xl font-bold text-emerald-700 mb-12 text-center font-cairo tracking-wide">
        قصص الأعشاب
      </h1>

      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col border border-emerald-100 hover:border-emerald-200"
            >
              <img
                src={story.image_url}
                alt={story.title}
                className="rounded-xl h-48 w-full object-cover mb-6 shadow-md"
              />
              <Link
                to={`/herbDetails/${story.herb}`}
                className="text-emerald-600 hover:text-emerald-800 font-medium mb-4 text-right transition-colors duration-200 inline-flex items-center"
              >
                انتقل إلى عشبة {story.title.split(" ")[0]}
               <i className="fa fa-arrow-right-long ms-2"></i>
              </Link>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 leading-tight text-right">
                {story.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-right">
                {story.short_description}
              </p>
              <button
                onClick={() => setSelectedStory(story)}
                className="mt-auto text-emerald-700 font-semibold cursor-pointer py-3 border-t border-emerald-100 hover:text-emerald-900 transition-colors duration-200 text-right w-full"
              >
                اقرأ القصة كاملة
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">🌿</div>
          <p className="text-gray-500 text-lg">لا توجد قصص حالياً</p>
        </div>
      )}

      {/* Modal */}
     {selectedStory && (
  <div className="fixed bottom-0 inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] p-6 relative overflow-y-auto">
      <button
        onClick={() => setSelectedStory(null)}
        className="absolute top-4 cursor-pointer left-4 text-gray-500 hover:text-gray-800 text-2xl"
      >
        <i className="fa fa-close"></i>
      </button>
      <h2 className="text-3xl font-bold text-emerald-800 mb-4 text-right">
        {selectedStory.title}
      </h2>
      <p className="text-gray-700 leading-loose text-right whitespace-pre-line">
        {selectedStory.story}
      </p>
    </div>
  </div>
)}

    </div>
  );
}
