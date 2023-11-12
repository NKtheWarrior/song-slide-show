"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Key } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

var socket = io(":3001");

function socketHandler(type: any) {
  socket.emit("chat message", type);
  return false;
}
export default function Editpage({ bhajan }: any) {
  const router = useRouter();

  const args: any = useSearchParams().get("b");

  // Check if bhajan data is missing
  if (!bhajan || !args || !bhajan[args]) {
    return <h1 className="text-3xl font-bold p-2">Invalid Params</h1>;
  }
  const lyrics = bhajan[args].lyrics;
  const [currentIndex, setCurrentIndex] = useState(0);

  socketHandler("text:" + lyrics[currentIndex]);
  useEffect(() => {
    socket.on("chat message", function (msg: any) {});
  }, []);

  const handleNext = () => {
    if (currentIndex === lyrics.length - 1) {
      return;
    }
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    socketHandler("text:" + lyrics[newIndex]);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    socketHandler("text:" + lyrics[newIndex]);
  };

  const handleNextBhajan = () => {
    if (parseInt(args) === bhajan.length - 1) {
      return;
    }
    setCurrentIndex(0);
    router.push("/edit?b=" + (parseInt(args) + 1));
  };

  const handlePreviousBhajan = () => {
    if (parseInt(args) === 0) {
      return;
    }
    setCurrentIndex(0);
    router.push("/edit?b=" + (parseInt(args) - 1));
  };

  const [currentButton, setCurrentButton] = useState(0);

  const handleButtonClicked = (index: number) => {
    setCurrentIndex(index);
    socketHandler("text:" + lyrics[index]);
  };

  const buttons = lyrics.map((_: any, index: any) => (
    <button
      key={index}
      onClick={() => handleButtonClicked(index)}
      className="btn w-10"
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="flex flex-direction-row p-8">
      <div>
        <div>
          <h1 className="text-3xl font-bold p-2">{bhajan[args].name}</h1>
          <p className="text-l p-2">{lyrics[currentIndex - 1]}</p>
          <p className="text-xl font-bold p-2">{lyrics[currentIndex]}</p>
          <p className="text-l p-2">{lyrics[currentIndex + 1]}</p>
        </div>
        <button onClick={handleNext} className="btn">
          Next
        </button>
        <button onClick={handlePrevious} className="btn">
          Previous
        </button>
        <button onClick={handleNextBhajan} className="btn">
          Next Bhajan
        </button>
        <button onClick={handlePreviousBhajan} className="btn">
          Previous Bhajan
        </button>
        <div>
          <p>Jump to Stanza</p>
          {buttons}
        </div>
      </div>
    </div>
  );
}
