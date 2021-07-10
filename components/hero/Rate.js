import Link from 'next/link'
const Contact = () => {
    return (
        <div className="row-start-5 w-full h-full flex flex-col justify-center items-center gap-y-5 bg-white">
            <div className="flex flex-col items-center">
                <h4 className="text-xl md:text-3xl font-source font-black">Rate Our Services</h4>
                <p className="text-base">Do you wan't to express your satisfaction?</p>
            </div>
            <Link href="/ratings" passHref>
                <a 
                    className="h-12 w-36 bg-teal-800 hover:bg-teal-700 text-gray-50 color-transition flex justify-center items-center gap-x-1 rounded-sm"
                >
                    <p className="text-base font-bold">Rate Now</p>
                    <svg 
                        className="w-5 h-5 text-current" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </Link>
        </div>
    )
}

export default Contact
