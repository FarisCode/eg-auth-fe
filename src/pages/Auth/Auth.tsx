import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../contexts/auth";
import { useContext, useEffect } from "react";
import Lottie from "react-lottie";

export default function Auth() {
  const { isAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else if (location.pathname === "/auth") {
      navigate('/auth/sign-in');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex w-full h-screen">
      <aside className="flex-1 h-full bg-gray-100 justify-center items-center hidden lg:flex">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: require("../../assets/lottie/auth-page.json"),
          }}
          height={600}
          width={600}
        />
      </aside>
      <main className="lg:max-w-lg w-full h-full flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  )
}
