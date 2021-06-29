import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="row-start-1 w-full min-h-screen bg-teal-700 flex md:grid md:grid-cols-2 md:place-items-center justify-center items-center text-gray-100">
            <div className="md:col-start-1 flex flex-col items-center md:items-start">
                <h4 className="text-3xl md:text-4xl font-source font-black">Alas Creative Events</h4>
                <p className="text-lg md:text-xl">"a dream beyond forever"</p>
                <Link href="/register">
                    <button className="px-4 py-2 mt-5 bg-transparent hover:bg-gray-200 border-2 border-gray-200 color-transition focus:bg-gray-200  focus:outline-none text-gray-200 hover:text-teal-700 focus:text-teal-700 flex items-center gap-x-1 rounded-sm">
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
            <div className="hidden h-full w-full col-start-2 md:flex justify-center items-center">
                <Image 
                    src="/images/hero_img.svg"
                    alt="Creative Man Image"
                    height={ 784.34 }
                    width={ 1080.97 }
                    className="transform scale-95"
                />
            </div>
        </div>
    )
}

export default Hero
