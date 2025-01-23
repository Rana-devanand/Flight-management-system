import React, { useState } from 'react'

const Loader = ({isLoadingTrue , message}) => {
    const [isLoading , setIsLoading] = useState(isLoadingTrue);
    // console.log(value , message);
    return (

        <>
            {/* Fullscreen Modal with Loader */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="flex flex-col items-center">
                        {/* Loader */}
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        <p className="text-white mt-4">{message}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loader