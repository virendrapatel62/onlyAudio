import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playground from "./pages/playground";
import "./socket";
import CreatorGoLivePage from "./pages/creator-go-live";
import HomePage from "./pages/homepage";
import MyCreators from "./pages/my-creators";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-4 my-3">
        <Navbar />
        <main className="container mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" Component={HomePage}></Route>
            <Route path="/go-live" Component={CreatorGoLivePage}></Route>
            <Route path="/playground" Component={Playground}></Route>
            <Route path="/my-creators" Component={MyCreators}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
