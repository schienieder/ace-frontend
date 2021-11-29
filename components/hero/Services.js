import Image from 'next/image'

const Services = () => {
    return (
        <div className="w-full h-auto bg-gray-50 flex flex-col justify-center items-center text-gray-800 font-mont gap-y-10 p-8">
            <div className="flex flex-col items-center gap-y-2">
                <h4 className="text-xl md:text-3xl font-source font-black">Our Services</h4>
                <p className="text-xs md:text-sm">Here's a glimpse of the services that we offer.</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-8">
                <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center h-28 w-28 md:h-40 md:w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                        <div className="hidden md:block">
                            <Image 
                                src="/images/pre-event.svg"
                                height={ 75 }
                                width={ 75 }
                                alt="Pre-Event"
                            />
                        </div>
                        <div className="block md:hidden">
                            <Image 
                                src="/images/pre-event.svg"
                                height={ 50 }
                                width={ 50 }
                                alt="Pre-Event"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-1 p-5">
                        <h4 className="font-bold text-sm md:text-base">Pre-Event Planning</h4>
                        <p className="text-xs md:text-sm">
                        Offer budget & branding creation, venue booking, etc. Before taking the entire action as we aim a sucessful event to our client.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center h-28 w-28 md:h-40 md:w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                        <div className="hidden md:block">
                            <Image 
                                src="/images/marketing.svg"
                                height={ 75 }
                                width={ 75 }
                                alt="Design & Marketing"
                            />
                        </div>
                        <div className="block md:hidden">
                            <Image 
                                src="/images/marketing.svg"
                                height={ 50 }
                                width={ 50 }
                                alt="Design & Marketing"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-1 p-5">
                        <h4 className="font-bold text-sm md:text-base">Design & Marketing Management</h4>
                        <p className="text-xs md:text-sm">Process and preperation which entails, us, the organizers, collaborating with business partners to make events extra special.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center h-28 w-28 md:h-40 md:w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                        <div className="hidden md:block">
                            <Image 
                                src="/images/post-event.svg"
                                height={ 75 }
                                width={ 75 }
                                alt="Post-Event"
                            />
                        </div>
                        <div className="block md:hidden">
                            <Image 
                                src="/images/post-event.svg"
                                height={ 50 }
                                width={ 50 }
                                alt="Post-Event"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-1 p-5">
                        <h4 className="font-bold text-sm md:text-base">Onsite & Post Event Planning</h4>
                        <p className="text-xs md:text-sm">Personnel and staffs being in charge of details and preparation for the day of the event, must strictly comply prior to our clients.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
