import React, { useEffect, useState } from 'react'

const DashBoard = () => {

     const [token, setToken] = useState(null);

     useEffect(() => {
          // Retrieve the token from localStorage
          const storedToken = localStorage.getItem('token');

          if (storedToken) {
               // Parse it if necessary (e.g., if it's stored as a JSON string)
               setToken(storedToken);
          }
     }, []);

     return (
          <div className="bg-[#111827] w-full h-screen">
               <div>
                    <h1 className="text-center text-white pt-10 text-xl font-bold">Welcome to Flight India</h1>

               </div>
          </div>
     );

}

export default DashBoard;