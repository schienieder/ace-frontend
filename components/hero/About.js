import heroStyles from '../../styles/Hero.module.css'

const About = () => {
    return (
        <div className="row-start-2 w-full h-screen grid grid-cols-2 bg-white text-gray-800 font-mont">
            <div className="col-start-1 w-full h-full flex items-center justify-center">
                <div className={ heroStyles.aboutFlower }></div>
            </div>
            <div className="col-start-2 w-full h-full flex flex-col justify-center gap-y-5 p-8">
                <h4 className="text-xl md:text-3xl font-source font-black">What is Alas?</h4>
                <p className="text-base">Alas Creative Events is a full coordination service, lifestyle based, professional event
                planning company that specializes in wedding events, corporate events, dinner
                galas, fundraisers, long service awards, grand openings, conferences, pageantries,
                debut, conventions, private events and any occasion that in need of our service.</p>
                <button className="w-36 px-4 py-2 bg-transparent hover:bg-teal-700 focus:bg-teal-700 border border-teal-700 focus:outline-none text-teal-700 hover:text-gray-200 focus:text-gray-200 color-transition flex justify-center items-center gap-x-1 rounded-sm">
                    <p className="font-bold text-base">Read More</p>
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
            </div>
        </div>
    )
}

export default About
