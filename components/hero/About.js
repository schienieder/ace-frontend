const About = () => {
    return (
        <div className="w-full h-auto flex justify-center bg-white text-gray-800 font-mont md:py-20">
            <div className="w-full hidden md:grid grid-cols-2">
                <div className="col-start-1 w-full h-full flex items-center justify-center">
                    <div className="relative bg-gray-800 md:w-96 lg:w-about-img md:h-64 lg:h-80">
                        <div className="absolute bg-about-img bg-cover md:w-96 lg:w-about-img md:h-64 lg:h-80 bottom-5 right-4">
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col flex-wrap justify-center gap-y-5 p-10">
                    <h4 className="text-3xl font-source font-black">What is Alas?</h4>
                    <div className="text-base">
                        Alas Creative Events is a full coordination service, lifestyle based, professional event
                        planning company that specializes in wedding events, corporate events, debut, pageantries,
                        private events and any occasion that is in need of our service.
                    </div>
                </div>
            </div>
            <div className="flex md:hidden h-full flex-col justify-center items-center gap-y-5 p-10">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col">
                        <div className="h-64 w-full bg-about-img bg-cover bg-center rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col gap-y-2 p-5">
                            <h4 className="text-xl font-source font-black">What is Alas?</h4>
                            <div className="text-xs">
                            Alas Creative Events is a full coordination service, lifestyle based, professional event
                            planning company that specializes in wedding events, corporate events, debut, pageantries,
                            private events and any occasion that is in need of our service.
                            </div>
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default About
