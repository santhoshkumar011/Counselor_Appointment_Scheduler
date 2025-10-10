import React, { useState } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";

const AiChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your counselor assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const apiKey = "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"; ]

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "https://router.huggingface.co/v1/chat/completions",
        {
          model: "zai-org/GLM-4.6:novita",
          messages: [
            {
              role: "system",
              content: "You are a friendly assistant for a student dashboard. Answer clearly and politely."
            },
            {
              role: "user",
              content: input
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data?.choices[0]?.message?.content || "Sorry, I couldn't understand that."
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong with the AI." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex justify-between items-center">
        <h2 className="text-white font-bold">CounselBot</h2>
        <button className="text-white hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
      </div>

      {/* Chat messages */}
      <div className="p-4 flex-1 overflow-y-auto h-64 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl ${msg.sender === "bot" ? "bg-gray-100 text-gray-900 self-start" : "bg-blue-500 text-white self-end"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-1"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default AiChatbot;
