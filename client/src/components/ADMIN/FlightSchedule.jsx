import React from "react";
import skyImage from "../../assets/images/sky.jpg";

// Date picker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
// ----------------------------------------------------------------

function FlightSchedule() {
  return (
    <>
      <div className="h-screen w-full text-white flex justify-center"
       >
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold">
            {" "}
            Create Flights Schedule
          </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-sm">
              Add Flight time table
            </h4>

            <form
            //   onSubmit={HandleSubmit} ref={FormRef}
            >
              <div className="flex flex-wrap justify-start gap-5 mt-5">
                {/* -----------------------------------------------------
                              Select Flight
                    -----------------------------------------------------
                */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Select flight
                  </label>
                  <select
                    id="flight"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    // onChange={(e) => setDeparture(e.target.value)}
                    name="flight"
                    required
                  >
                    <option selected disabled>
                      Choose a flight
                    </option>
                    {/* {allCity.length > 0 &&
                      allCity
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                        .map((data, index) => (
                          <option key={index} value={data.name}>
                            {data.name}
                          </option>
                        ))} */}
                  </select>
                </div>
                {/* -----------------------------------------------------
                              Start Date
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Start Date
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <Flatpickr
                      // value={date}
                      // onChange={chooseDate}
                      options={{
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                        // minDate: `${onlyDate}`,
                        maxDate: "",
                      }}
                      placeholder="choose Start Date"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="StartDate"
                      required
                    />
                  </div>
                </div>

                {/* -----------------------------------------------------
                              End Date
                    -----------------------------------------------------
                    */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    End Date
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <Flatpickr
                      // value={date}
                      // onChange={chooseDate}
                      options={{
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                        // minDate: `${onlyDate}`,
                        maxDate: "",
                      }}
                      placeholder="Choose End Date"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="EndDate"
                      required
                    />
                  </div>
                </div>

                {/* -----------------------------------------------------
                              Recurrence Flight
                    -----------------------------------------------------
                */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                  Recurrence Flight
                  </label>
                  <select
                    id="recurrence"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    // onChange={(e) => setDeparture(e.target.value)}
                    name="flight"
                    required
                  >
                    <option selected disabled>
                      Choose a Flight Recurrence
                    </option>
                    <option value="0">Daily</option>
                    <option value="1">Weekly</option>
                    <option value="2">Alternative</option>

                  </select>
                </div>

                {/* -----------------------------------------------------
                              Enter Departure Timezone
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Departure Timezone
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <Flatpickr
                      // value={date}
                      // onChange={chooseDate}
                      options={{
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                        // minDate: `${onlyDate}`,
                        maxDate: "",
                      }}
                      placeholder="Departure Time Pick"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="departureTimezone"
                      required
                    />
                  </div>
                </div>
                


                {/* -----------------------------------------------------
                              Enter Arrival Timezone
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                  Enter Arrival Timezone
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <Flatpickr
                      // value={date}
                      // onChange={chooseDate}
                      options={{
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                        // minDate: `${onlyDate}`,
                        maxDate: "",
                      }}
                      placeholder="Arrival Time Pick"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="arrivalTimezone"
                      required
                    />
                  </div>
                </div>

               

               
              </div>

              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
                //  onClick={notify}
              >
                {" "}
                ADD Flight
              </button>
            </form>
            {/* <ToastContainer /> */}
          </div>
        </div>
      </div>

      {/* All flight List  */}

      <div className="w-full h-screen bg-slate-300">
        <div className="w-[95%] mx-auto flex justify-center">
          <div>
            <h1 className="text-2xl font-semibold mt-10">All Flight</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>
        <div className="px-6 py-2 ">
          <button
            className="bg-blue-800 px-4 py-2 rounded text-white text-sm"
            //   onClick={LoadAllFlight}
          >
            CLick to load
          </button>

          <input
            type="search"
            placeholder="Search Flight by name..."
            className="w-[60%] px-4 ml-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            //   onChange={getFilteredFlight}
            name="Airline"
          />
        </div>
      </div>
    </>
  );
}

export default FlightSchedule;
