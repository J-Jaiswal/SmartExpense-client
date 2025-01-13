import React from "react";
import Credit from "./Credit";
import Debit from "./Debit";

const Home = () => {
  return (
    <div className="flex justify-center gap-[120px] w-full my-14">
      <Debit />
      <Credit />
    </div>
  );
};

export default Home;
