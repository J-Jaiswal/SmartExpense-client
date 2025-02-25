import React from "react";
import DebitHistory from "./CreditHistory";
import CreditHistory from "./DebitHistory";

const History = () => {
  return (
    <div className="flex justify-center gap-16 w-full my-16">
      <CreditHistory />
      {/* <DebitHistory /> */}
    </div>
  );
};

export default History;
