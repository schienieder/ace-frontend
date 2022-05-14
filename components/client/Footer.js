const Footer = () => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    return (
        <div className="w-full h-14 bg-true-100 dark:bg-gray-900 flex justify-center items-center gap-x-1 border-t border-gray-200 dark:border-gray-700">
            <svg 
                className="w-5 h-5 md:w-6 md:h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2S2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8s-8-3.663-8-8s3.663-8 8-8z" 
                    fill="#4B5563"
                />
                <path d="M12 17c.901 0 2.581-.168 3.707-1.292l-1.414-1.416C13.85 14.735 12.992 15 12 15c-1.626 0-3-1.374-3-3s1.374-3 3-3c.993 0 1.851.265 2.293.707l1.414-1.414C14.582 7.168 12.901 7 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5z" 
                    fill="#4B5563"
                />
            </svg>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-700 font-bold">Marahuyo { currYear } <span className="border-l border-gray-600 pl-1 font-medium">All Rights Reserved</span></p>
        </div>
    )
}

export default Footer
