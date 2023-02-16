import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Excercise1 from "./pages/Excersice1";
import Excercise2 from "./pages/Excersice2";

import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Excercise1 />
  },
  {
    path: "/excercise2",
    element: <Excercise2 />
  }
]);

const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;
