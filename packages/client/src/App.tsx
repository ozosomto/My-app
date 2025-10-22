import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import ChatBox from "./components/ChatBox/chatbox";

function App() {
  const [messge, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
    // .catch((err) => console.error("Error fetching message:", err));
  }, []);

  return (
    <>
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">AI Chat Assistant 🤖</h1>
      <ChatBox />
    </div>
    </>
  );
}

export default App;
