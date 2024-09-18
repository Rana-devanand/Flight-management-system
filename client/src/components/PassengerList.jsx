import React, { useState } from 'react'

function PassengerList() {

     const [passengerCount, setPassengerCount] = useState({
          adults: 1,
          children: 0,
          infantsInSeat: 0,
          infantsOnLap: 0,
        });
    
        const handleIncrement = (type) => {
          setPassengerCount((prevCount) => ({
            ...prevCount,
            [type]: prevCount[type] + 1,
          }));
        };
    
        const handleDecrement = (type) => {
          if (passengerCount[type] > 0) {
            setPassengerCount((prevCount) => ({
              ...prevCount,
              [type]: prevCount[type] - 1,
            }));
          }
        };
    

  return (
    <>
     <div className="passenger-selector p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-6">
  <h2 className="text-2xl font-semibold">1 passenger</h2>
  
  {/* Adults */}
  <div className="passenger-group flex items-center justify-between">
    <label htmlFor="adults" className="text-lg font-medium">Adults</label>
    <div className="counter flex items-center space-x-4">
      <button 
        onClick={() => handleDecrement('adults')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        id="adults"
        value={passengerCount.adults}
        readOnly
        className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
      />
      <button 
        onClick={() => handleIncrement('adults')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        +
      </button>
    </div>
  </div>

  {/* Children */}
  <div className="passenger-group flex items-center justify-between">
    <label htmlFor="children" className="text-lg font-medium">Children (aged 2-11)</label>
    <div className="counter flex items-center space-x-4">
      <button 
        onClick={() => handleDecrement('children')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        id="children"
        value={passengerCount.children}
        readOnly
        className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
      />
      <button 
        onClick={() => handleIncrement('children')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        +
      </button>
    </div>
  </div>

  {/* Infants (in seat) */}
  <div className="passenger-group flex items-center justify-between">
    <label htmlFor="infants-in-seat" className="text-lg font-medium">Infants (in seat)</label>
    <div className="counter flex items-center space-x-4">
      <button 
        onClick={() => handleDecrement('infantsInSeat')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        id="infants-in-seat"
        value={passengerCount.infantsInSeat}
        readOnly
        className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
      />
      <button 
        onClick={() => handleIncrement('infantsInSeat')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        +
      </button>
    </div>
  </div>

  {/* Infants (on lap) */}
  <div className="passenger-group flex items-center justify-between">
    <label htmlFor="infants-on-lap" className="text-lg font-medium">Infants (on lap)</label>
    <div className="counter flex items-center space-x-4">
      <button 
        onClick={() => handleDecrement('infantsOnLap')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        id="infants-on-lap"
        value={passengerCount.infantsOnLap}
        readOnly
        className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
      />
      <button 
        onClick={() => handleIncrement('infantsOnLap')} 
        className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
      >
        +
      </button>
    </div>
  </div>

  {/* Buttons */}
  <div className="buttons flex justify-end space-x-4">
    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600">Cancel</button>
    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600">Done</button>
  </div>
</div>

    </>
  )
}

export default PassengerList