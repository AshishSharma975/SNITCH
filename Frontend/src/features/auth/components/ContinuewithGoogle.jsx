import React from 'react'

const ContinuewithGoogle = () => {
    return (
        <div className="mt-4 flex justify-center">
            <a
                href="/api/auth/google"
                className="flex items-center gap-3 px-5 py-3 w-full max-w-sm justify-center 
    bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white rounded-xl 
    border border-gray-700 hover:border-gray-500 
    transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                />

                <span className="text-sm font-medium tracking-wide">
                    Continue with Google
                </span>
            </a>
        </div>
    )
}

export default ContinuewithGoogle