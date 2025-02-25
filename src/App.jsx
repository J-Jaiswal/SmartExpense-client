import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analysis from "./components/Analysis";
import Login from "./auth/Login";
import Home from "./homePage/Home";
import History from "./history/History";
import ExpenseAnalysisFilter from "./components/ExpenseAlaysisFilter";
import Signup from "./auth/SignUp";

function App() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-full">
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />

              <Route path="/expense" element={<Analysis />} />
              <Route path="/filter" element={<ExpenseAnalysisFilter />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
}

export default App;
