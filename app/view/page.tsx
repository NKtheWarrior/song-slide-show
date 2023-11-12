"use client";
import { useState } from "react";
import io from "socket.io-client";
var socket = io(":3001");

export default function Home() {
  const [text, setText] = useState();
  socket.on("chat message", (msg) => {
    setText(msg.slice(2));
  });
  function socketHandler(type: any) {
    socket.emit("chat message", type);
    return false;
  }
  socketHandler("sync");

  return (
    <div className="flex flex-direction-row justify-center items-center h-[100vh]">
      <p className="text-[104px] max-2xl:text-2xl w-[1350px]  max-2xl:w-[320px] text-center font-bold p-2">
        {text}
      </p>
    </div>
  );
}
