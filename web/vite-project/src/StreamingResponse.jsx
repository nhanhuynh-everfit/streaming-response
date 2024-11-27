import { useEffect, useState } from "react";

const StreamingResponse = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch("http://localhost:4000/stream");

      if (!response.body) {
        console.error("ReadableStream not supported.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let isDone = false;

      while (!isDone) {
        const { value, done } = await reader.read();
        isDone = done;

        if (value) {
          const chunk = decoder.decode(value).trim();

          try {
            const json = JSON.parse(chunk);

            setMessages((prev) => {
              if (prev.some((message) => message.id === json.id)) {
                return prev; // Do nothing if `id` already exists
              }
              return [...prev, json]; // Add new object if unique
            });
          } catch (err) {
            console.error("Error parsing chunk:", err);
          }
        }
      }
    };

    fetchStream().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Streaming Response Example</h1>

      {messages.map((message, index) => (
        <p key={index}>{message.message}</p>
      ))}
    </div>
  );
};

export default StreamingResponse;
