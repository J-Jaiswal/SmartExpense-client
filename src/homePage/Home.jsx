import React from "react";
import Credit from "./Credit";
import Debit from "./Debit";
import { useState } from "react";

const Home = () => {
  const [active, setActive] = useState("debit");

  return (
    <div className="flex justify-center gap-[120px] w-full my-14">
      <div className="flex flex-col w-full gap-[50px]">
        <div className="flex w-full justify-center gap-[30px]">
          <div className="flex text-[40px]">
            <p
              className={`hover:text-[#3983c1] cursor-pointer mr-4 ${
                active === "debit" ? "text-[#225178] font-semibold" : ""
              }`}
              onClick={() => setActive("debit")}
            >
              Debit
            </p>
            /
            <p
              className={`hover:text-[#3983c1] cursor-pointer ml-4 ${
                active === "credit" ? "text-[#225178] font-semibold" : ""
              }`}
              onClick={() => setActive("credit")}
            >
              Credit
            </p>
          </div>
        </div>
        {active === "debit" ? <Debit /> : <Credit />}
      </div>

      {/* <Debit />
      <Credit /> */}
    </div>
  );
};

export default Home;
