import Lottie from "react-lottie";
import animationData from "../../assets/lottie/loading.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export default function Loading() {
  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <Lottie
        options={defaultOptions}
        height={150}
        width={160}
      />
    </div>
  )
}
