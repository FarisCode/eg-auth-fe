import Lottie from "react-lottie";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page" className="flex min-h-screen items-center justify-center" >
      <div className="flex flex-col items-center">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: require("../../assets/lottie/404.json"),
          }}
          height={300}
          width={300}
        />
        <button className="bg-slate-500 px-4 py-2 text-white rounded-md">
          <a href="/">Go Home</a>
        </button>
      </div>
    </div>
  );
}