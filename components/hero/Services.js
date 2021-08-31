import ServiceCards from './ServiceCards'

const Services = () => {
    return (
        <div className="row-start-4 w-full h-screen bg-gray-50 flex flex-col justify-center items-center text-gray-800 font-mont gap-y-10 p-8">
            <div className="flex flex-col items-center gap-y-2">
                <h4 className="text-2xl md:text-3xl font-source font-black">Our Services</h4>
                <p className="text-sm">Here's a glimpse of the services that we offer.</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-8">
                <ServiceCards />
            </div>
        </div>
    )
}

export default Services
