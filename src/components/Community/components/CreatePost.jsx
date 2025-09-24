
// return (
//   <div className="p-6 font-cairo">
//     <button
//       onClick={onCancel}
//       className="flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-all duration-300 font-semibold"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//       </svg>
//       العودة إلى القائمة
//     </button>

//     <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
//       <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center">إنشاء منشور جديد</h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label htmlFor="title" className="block text-lg font-semibold text-emerald-700 mb-3">عنوان المنشور</label>
//           <input
//             type="text"
//             id="title"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
//             placeholder="أدخل عنوانًا جذابًا..."
//             value={newPost.title}
//             onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//           />
//         </div>
        
//         <div className="mb-8">
//           <label htmlFor="content" className="block text-lg font-semibold text-emerald-700 mb-3">محتوى المنشور</label>
//           <textarea
//             id="content"
//             rows="6"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
//             placeholder="ماذا تريد أن تقول للمجتمع؟"
//             value={newPost.content}
//             onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//           ></textarea>
//         </div>
        
//         <div className="flex justify-end space-x-4 space-x-reverse">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
//           >
//             إلغاء
//           </button>
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold mr-4"
//           >
//             نشر المنشور
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );