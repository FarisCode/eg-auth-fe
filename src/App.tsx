import { useContext } from "react"
import { MyContext } from "./contexts/auth"
import Loading from "./components/Loading/Loading";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";


const router = createBrowserRouter(routes)

export default function App() {
  const { isAuthenticated } = useContext(MyContext);

  if (isAuthenticated === null) return <Loading />

  return (
    <RouterProvider router={router} />
  )
}
