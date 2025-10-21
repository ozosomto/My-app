import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

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
      <div className="p-4">
        {/* <h1>Message from Server:</h1> */}
        <p className="font-bold text-3xl">{messge}</p>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
