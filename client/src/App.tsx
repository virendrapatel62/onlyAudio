import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Playground from "./pages/playground";
import "./socket";
import CreatorGoLivePage from "./pages/creator-go-live";
import HomePage from "./pages/homepage";
import MyCreators from "./pages/my-creators";
import Navbar from "./components/navbar";
import JoinTheLive from "./pages/join-live";
import DeviceFrame from "./components/frame";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ResetPassword from "./pages/auth/reset-password";

function App() {
  return (
    <DeviceFrame>
      <BrowserRouter>
        <div className="dark bg-gray-900 text-gray-200 min-h-dvh ">
          <Navbar />
          <main className="container mx-auto p-4 ">
            <Routes>
              <Route path="/" Component={HomePage}></Route>
              <Route path="/go-live" Component={CreatorGoLivePage}></Route>
              <Route path="/playground" Component={Playground}></Route>
              <Route path="/my-creators" Component={MyCreators}></Route>
              <Route path="/join-live/:creator" Component={JoinTheLive}></Route>

              <Route
                path="/auth"
                element={<Navigate to={"/auth/login"} />}
              ></Route>
              <Route path="/auth/login" Component={LoginPage}></Route>
              <Route
                path="/auth/reset-password"
                Component={ResetPassword}
              ></Route>
              <Route path="/auth/register" Component={RegisterPage}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DeviceFrame>
  );
}

export default App;
