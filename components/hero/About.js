const About = () => {
    return (
        <div className="row-start-3 w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-white text-gray-800 font-mont">
            <div className="md:col-start-1 w-full h-full hidden md:flex items-center justify-center">
                <div className="relative bg-gray-800 w-about-img h-80">
                    <div className="absolute bg-about-img bg-cover w-about-img h-80 bottom-5 right-4">
                    </div>
                </div>
            </div>
            <div className="col-start-1 md:col-start-2 w-full h-full flex flex-col flex-wrap justify-center gap-y-5 p-10">
                <h4 className="text-2xl md:text-3xl font-source font-black">What is Alas?</h4>
                <div className="text-sm md:text-base">
                    Alas Creative Events is a full coordination service, lifestyle based, professional event
                    planning company that specializes in wedding events, corporate events, dinner
                    galas, fundraisers, long service awards, grand openings, conferences, pageantries,
                    debut, conventions, private events and any occasion that in need of our service.
                </div>
            </div>
        </div>
    )
}

export default About
