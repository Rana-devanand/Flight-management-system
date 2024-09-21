import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {

  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  console.log(userData);
  const GoBack = () =>{
    navigate(-1);
  }

  const PaymentDone = () => {
    navigate("/Payment" , {state : userData});
  }
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-[50%] mx-auto mt-10 mb-10">
          <div className="rounded shadow-2xl ">
            <div className="flex justify-between p-4">
              <p className="font-semibold text-lg">Enter OTP</p>
              <p className="font-medium">Secure Payment</p>
            </div>
            <p className="p-4">
              One time Password (OTP) successfully sent to the phone number
              linked to your card ending with XXXX
            </p>

            <div className="p-4">
              <input className="border border-zinc-300 rounded-md p-3 w-[60%]" 
                    type="text" name="" 
                    placeholder="Enter OTP" 
                    aria-label="Enter OTP" 
                    require
                    id="" />
              <button className="ml-2 text-white bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded"
                      onClick={PaymentDone}
                >
                Submit
              </button>
            </div>

            <div className="px-4">
              <p>
                Please note that you may need to verify your phone number to
                complete the payment.
              </p>
              <p>
                You can also try using a different payment method or contact
                your bank for assistance.
              </p>
              <p>
                If you have already tried and failed to complete the payment,
                please contact our customer support team for assistance.
              </p>
              <p>Thank you for your patience.</p>

              <div className="flex justify-center mt-5">
                <button className="text-white bg-cyan-500 hover:bg-blue-600 py-3 px-5 mb-10 rounded"
                        onClick={GoBack}
                >
                  Back to Home
                </button>
              </div>

              {/* <img src={Loader} alt="Loading..." className="w-12 h-12 mt-5" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
