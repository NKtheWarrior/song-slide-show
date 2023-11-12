// components/Home.js
"use client";
import { useRouter } from "next/navigation";

export default function Home({ bhajan }: any) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center p-4 gap-4">
      <h1 className="text-3xl font-bold">Vaishnav Songs</h1>
      <button
        className="m-3 border-gray-400 border-2 rounded-md p-2"
        onClick={() => router.push("/view")}
      >
        View In Full Screen
      </button>
      <div className="bg-gray-200 w-[90vw] lg:w-[40vw] items-center justify-center text-center rounded-lg">
        <p className="text-2xl p-2">Bhajans</p>
        <div className="bg-white m-2 rounded-lg">
          <ul>
            {bhajan.map((item: any) => (
              <div>
                <li
                  key={item.id}
                  className="text-xl p-2 cursor-pointer"
                  onClick={() => router.push("/edit?b=" + (item.id - 1))}
                >
                  {item.name}
                </li>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
