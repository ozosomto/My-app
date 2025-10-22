import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          conversationId: conversationId || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = { sender: "bot", text: data.message };
        setMessages((prev) => [...prev, botMessage]);

        if (data.conversationId) {
          setConversationId(data.conversationId);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `⚠️ ${data.error || "Server error"}` },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not connect to backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col gap-4">
      <div className="h-96 overflow-y-auto flex flex-col gap-2 p-2 border border-gray-700 rounded-xl bg-gray-900">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[75%] ${
              msg.sender === "user"
                ? "self-end bg-blue-600 text-white"
                : "self-start bg-gray-700 text-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 rounded-xl font-semibold"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
