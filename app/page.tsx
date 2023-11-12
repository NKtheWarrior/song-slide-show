import Homepage from "@/Components/Homepage";
import fs from "fs";
export default function Home() {
  const bhajan = JSON.parse(fs.readFileSync("bhajans.json", "utf8"));
  return (
    <div>
      <Homepage bhajan={bhajan} />
    </div>
  );
}
