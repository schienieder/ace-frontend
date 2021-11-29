const Services = () => {
    return (
        <div className="w-full h-auto bg-white grid grid-cols-1 md:grid-cols-2 gap-y-5 text-gray-800 font-mont">
            <div className="col-start-1 w-full h-full flex flex-col justify-center gap-y-5 p-20">
                <div className="flex flex-col">
                    <div className="block md:hidden bg-testimonial-img1  bg-cover bg-center w-52 h-52 mb-3 rounded-full"></div>
                    <h4 className="text-2xl md:text-3xl font-source font-black">Leo John & Cheryl</h4>
                    <p className="text-sm md:text-base text-gray-500">Proud Clients of Alas</p>
                </div>
                <p className="text-sm md:text-base">
                    Thank you so much team Alas! Because of you we are now a happy married couple.
                    Godbless sa inyuhang tanan po and more blessings to come.
                    I pray good health, safety and protection kay daghan pa po nagkinahanglan sa inyuha.
                    Highly recommended team, walay makalupig kudos everyone!
                </p>
                <p className="text-sm md:text-base">#Bow not to the king but to the team Alas!</p>
                <svg 
                    className="w-24 h-24 transform rotate-180 opacity-70 -mt-5"
                    xmlns="http://www.w3.org/2000/svg"  
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                >
                    <path 
                        d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z" 
                        fill="#E5E7EB"
                    />
                </svg>
            </div>
            <div className="col-start-2 h-full w-full hidden md:flex flex-col justify-center items-center p-8">
                <div className="h-full w-full grid grid-cols-2 grid-rows-3 gap-5">
                    <div className="bg-testimonial-img1  bg-cover bg-center col-start-1 row-span-3"></div>
                    <div className="bg-testimonial-img2  bg-cover bg-center col-start-2 row-span-2"></div>
                    <div className="bg-testimonial-img3  bg-cover bg-center col-start-2 row-span-1"></div>
                </div>
                {/* <div className="bg-testimonial-img border-gray-900 bg-cover bg-center w-about-img h-full"></div> */}
            </div>
        </div>
    )
}

export default Services
