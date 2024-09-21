import React, { useEffect, useState } from "react";
import Loader from "../assets/images/loader.svg";
import PaymentSuccess from "../assets/images/payementDone1.gif";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentDone() {

  const location = useLocation();
  const userData = location.state;
  console.log(userData);
  const navigate = useNavigate();
  const [message, setMessage] = useState(Loader);
  const [SuccessMsg, setSuccessMsg] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(PaymentSuccess);
      setSuccessMsg("Transaction completed successfully");
    }, 3000); // 3 seconds

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const GoToDashboard = () => {
    navigate("/PlainTicket" ,{state : userData});
  }


  return (
    <>
      <div className="flex justify-center flex-col items-center w-full h-screen">
        {message ? (
          <>
            <img className="w-[20%] h-72" src={message} alt="" />

            {SuccessMsg ? (
              <>
                <h1 className="text-xl">{SuccessMsg}</h1>
                <button className="px-10 py-3 bg-amber-500 rounded-md text-lg font-semibold"
                        onClick={GoToDashboard}
                  >Generate PDF</button>
              </>
            ) : (
              <h2 className="text-xl"> Please wait while we process your payment...</h2>
            )}
          </>
        ) : (
          <>{null}</>
        )}
      </div>
    </>
  );
}

export default PaymentDone;
