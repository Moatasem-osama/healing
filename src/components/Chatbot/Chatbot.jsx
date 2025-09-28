import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance"; 
import { userContext } from "../../context/UserContext";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const { userTokenAccess } = useContext(userContext);

  async function getTicket(name) {
    try {
      const { data } = await api.get(`/ai/getNewTicket/?name=${name}`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setTicket(data.ticket);
      setMessages([{ text: `مرحبًا ${name}! كيف يمكنني مساعدتك اليوم؟`, isBot: true }]);
    } catch {
      setError("تعذر بدء محادثة جديدة، حاول مرة أخرى.");
      setMessages([{ text: "تعذر بدء محادثة جديدة، حاول مرة أخرى.", isBot: true }]);
    }
  }

  useEffect(() => {
    if (userTokenAccess && nameSubmitted && username) {
      getTicket(username);
    }
  }, [userTokenAccess, nameSubmitted, username]);

  async function handleSendMessage() {
    if (!inputValue.trim() || !ticket) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { data } = await api.post(
        "/ai/chat/",
        { ticketCode: ticket.code, message: userMessage },
        { headers: { Authorization: `Bearer ${userTokenAccess}` } }
      );
      setMessages((prev) => [
        ...prev,
        { text: data.reply || "لم يتم استلام رد.", isBot: true },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "حدث خطأ أثناء إرسال الرسالة.", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNameSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setNameSubmitted(true);
  }

  return (
    <section className=" font-cairo py-9 container flex flex-col bg-green-50">
         <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
           عشبة شفاء بوت
         </h1>
   
         {!nameSubmitted ? (
           <form
             onSubmit={handleNameSubmit}
             className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4"
             aria-label="نموذج إدخال الاسم لبدء المحادثة"
           >
             <label htmlFor="username" className="block font-semibold text-gray-700">
               من فضلك أدخل اسمك للبدء:
             </label>
             <input
               id="username"
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="اكتب اسمك..."
               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
               required
               aria-required="true"
             />
             <button
               type="submit"
               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
             >
               بدء المحادثة
             </button>
             {error && <p className="text-red-600 text-sm">{error}</p>}
           </form>
         ) : (
           <>
             <div
               className="flex-1 overflow-y-auto mb-4 px-2 md:px-8"
               aria-live="polite"
               aria-label="منطقة الرسائل"
             >
               <div className="flex flex-col gap-4 max-w-4xl mx-auto h-100">
                 {messages.map((msg, index) => (
                   <div
                     key={index}
                     className={`p-4 rounded-2xl shadow-md max-w-xs md:max-w-md lg:max-w-lg break-words ${
                       msg.isBot
                         ? "bg-emerald-900 text-white mr-auto"
                         : "bg-white/90 ml-auto"
                     }`}
                     role="text"
                   >
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                 ))}
   
                 {isLoading && (
                   <div className="p-4 rounded-2xl shadow-md max-w-xs md:max-w-md lg:max-w-lg bg-emerald-900 text-white mr-auto">
                     <span className="animate-pulse">جاري التفكير...</span>
                   </div>
                 )}
               </div>
             </div>
   
             <div className="px-2 md:px-8 mt-auto">
               <div className="max-w-4xl mx-auto">
                 <form
                   onSubmit={(e) => {
                     e.preventDefault();
                     handleSendMessage();
                   }}
                   className="flex items-center bg-white shadow-xl rounded-full px-4 py-2"
                   aria-label="صندوق إدخال الرسالة"
                 >
                   <i className="fa-solid fa-robot text-green-700 mr-2"></i>
                   <textarea
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="اكتب سؤالك هنا..."
                     className="flex-1 bg-transparent outline-none px-2 resize-none "
                     rows={2}
                     aria-label="حقل إدخال الرسالة"
                   />
                   <button
                     type="submit"
                     className="ml-2 text-green-700 hover:text-green-900 transition"
                     aria-label="إرسال الرسالة"
                   >
                     <i className="fa-solid fa-paper-plane"></i>
                   </button>
                 </form>
               </div>
             </div>
           </>
         )}
       </section>
  );
}
