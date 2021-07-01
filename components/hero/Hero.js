import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="row-start-1 w-full min-h-screen bg-gray-100 flex md:grid md:grid-cols-2 md:place-items-center justify-center items-center text-gray-800">
            <div className="md:col-start-1 flex flex-col items-center md:items-start">
                <h4 className="text-3xl md:text-4xl font-source font-black">Alas Creative Events</h4>
                <p className="text-lg md:text-xl">"a dream beyond forever"</p>
                <Link href="/register">
                    <button className="w-36 px-4 py-2 mt-5 bg-transparent hover:bg-teal-700 focus:bg-teal-700 border border-teal-700 focus:outline-none text-teal-700 hover:text-gray-200 focus:text-gray-200 color-transition flex justify-center items-center gap-x-1 rounded-sm">
                        <p className="font-bold text-base">Book Now</p>
                        <svg 
                            className="w-4 h-4 text-current" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="hidden h-full w-full bg-gray-200 col-start-2 md:flex justify-center items-end">
                <Image 
                    src="/images/Married Couple.png"
                    alt="Married Couple"
                    height={ 530 }
                    width={ 354 }
                />
            </div>
        </div>
    )
}

export default Hero
