import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="row-start-1 w-full h-screen bg-gray-100 flex flex-grow md:grid md:grid-cols-2 md:place-items-center justify-center items-center text-gray-800 overflow-hidden">
            <div className="md:col-start-1 flex flex-col items-center md:items-start">
                <svg 
                    className="w-20 h-20 transform opacity-60 -mt-5"
                    xmlns="http://www.w3.org/2000/svg"  
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                >
                    <path 
                        d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z" 
                        fill="#CBD5E1"
                    />
                </svg>
                <h4 className="text-2xl md:text-4xl font-source font-black">a <span className="text-pink-600">dream</span> beyond forever</h4>
                <p className="text-gray-500 text-xs md:text-base">Witness your dream events with your own eyes.</p>
                <Link href="/register">
                    <a 
                        className="px-5 py-2 mt-5 bg-pink-600 hover:bg-pink-500 color-transition rounded-lg text-white font-bold text-sm md:text-base tracking-wide"
                    >Book Now</a>
                </Link>
            </div>
            <div 
                className="hidden h-full w-full md:flex justify-center items-end bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 col-start-2"
            >
                <Image
                    src="/images/couple.png"
                    height={ 650 }
                    width={ 434 }
                    alt="Couple"
                    priority="true"
                    className="object-scale-down"
                />
            </div>
        </div>
    )
}

export default Hero
