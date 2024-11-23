import "./socket";
import { BrowserRouter } from "react-router-dom";
import BottomNavbar from "./components/bottom-nav";
import DeviceFrame from "./components/frame";
import Navbar from "./components/navbar";
import RouteSetup from "./providers/route-setup";

function App() {
  return (
    <DeviceFrame>
      <BrowserRouter>
        <div className="dark bg-gray-900 text-gray-200 min-h-dvh ">
          <Navbar />
          <BottomNavbar />
          <main className="container mx-auto p-2">
            <RouteSetup></RouteSetup>
          </main>
        </div>
      </BrowserRouter>
    </DeviceFrame>
  );
}

export default App;
