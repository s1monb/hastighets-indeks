import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import Header from "../components/Header";

export default function Page() {
  const router = useRouter();

  console.log(router.query.url);

  return (
    <div>
      <ReactTooltip />
      <Header />
    </div>
  );
}
