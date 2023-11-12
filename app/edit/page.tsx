import Editpage from "@/Components/Editpage";
import fs from "fs";
export default function Edit() {
  const bhajan = JSON.parse(fs.readFileSync("bhajans.json", "utf8"));
  return <Editpage bhajan={bhajan} />;
}
