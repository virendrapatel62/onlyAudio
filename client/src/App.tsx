import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playground from "./pages/playground";
import "./socket";
import CreatorGoLivePage from "./pages/creator-go-live";
import HomePage from "./pages/homepage";
import MyCreators from "./pages/my-creators";
import Navbar from "./components/navbar";
import JoinTheLive from "./pages/join-live";

function App() {
  return (
    <BrowserRouter>
      <div className="dark bg-gray-800 text-gray-300 min-h-dvh">
        <Navbar />
        <main className="container mx-auto p-4 ">
          <Routes>
            <Route path="/" Component={HomePage}></Route>
            <Route path="/go-live" Component={CreatorGoLivePage}></Route>
            <Route path="/playground" Component={Playground}></Route>
            <Route path="/my-creators" Component={MyCreators}></Route>
            <Route path="/join-live/:creator" Component={JoinTheLive}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
