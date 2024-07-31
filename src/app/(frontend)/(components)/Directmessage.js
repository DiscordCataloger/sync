import { VscCheckAll } from "react-icons/vsc";
import { BsFill1CircleFill } from "react-icons/bs";

const messages = [
    { id: 1, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 2, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 3, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
    { id: 4, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
    { id: 1, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 2, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 3, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
    { id: 4, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
    { id: 1, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 2, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "unread" },
    { id: 3, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
    { id: 4, name: "Anil", text: "April fool's day", time: "Today, 9:52pm", status: "read" },
];

export default function DirectMessages() {
    return (
        <div className="bg-white p-2 rounded-3xl shadow-md mt-4 overflow-hidden">
            <div className="font-bold text-md p-3 text-black bg-gray-50">Direct Messages</div>
            <hr />
            <div className="overflow-y-auto max-h-[400px] h-full custom-scrollbar ">
                {messages.map(message => (
                    <div key={message.id} className="message-item flex items-center p-2 bg-gray-50 hover:bg-blue-200 transition-colors">
                        <div className="avatar w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div className="details flex-grow">
                            <div className="name font-bold text-black">{message.name}</div>
                            <div className="text text-gray-600">{message.text}</div>
                        </div>
                        <div>
                            <div className="time text-gray-400 text-sm">{message.time}</div>
                            <div style={{ color: message.status === "unread" ? 'red' : 'blue' }}>
                                {message.status === "unread" ? <BsFill1CircleFill /> : <VscCheckAll />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: white;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: white;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cce6ff;
                }
            `}</style>
        </div>
    );
}