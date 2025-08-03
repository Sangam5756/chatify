import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/Room";
import Body from "./components/Body";
import { ToastContainer  } from "react-toastify";


const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
