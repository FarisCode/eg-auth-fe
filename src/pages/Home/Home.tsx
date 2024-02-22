import { useContext, useEffect } from "react";
import { MyContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Button } from "semantic-ui-react";

export default function Home() {
  const { isAuthenticated, handleSignOut } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-gray-100">
      <Button onClick={handleSignOut} className="absolute top-5 right-5" basic color='red' content='Sign Out' />
      <TypeAnimation
        sequence={[
          'Welcome to the application.',
        ]}
        wrapper="span"
        cursor={true}
        style={{ fontSize: '2em', textAlign: 'center', display: 'inline-block' }}
      />
    </div>
  )
}
