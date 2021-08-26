import Image from 'next/image'

const ServiceCards = () => {
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-40 w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                <Image 
                    src="/images/pre-event.svg"
                    height={ 75 }
                    width={ 75 }
                    alt="Pre-Event"
                />
            </div>
            <div className="flex flex-col items-center gap-y-1 p-5">
                <h4 className="font-bold text-base">Pre-Event Planning</h4>
                <p className="text-sm">
                Offer budget & branding creation, venue booking, etc. Before taking the entire action as we aim a sucessful event to our client.</p>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-40 w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                <Image 
                    src="/images/marketing.svg"
                    height={ 75 }
                    width={ 75 }
                    alt="Design & Marketing"
                />
            </div>
            <div className="flex flex-col items-center gap-y-1 p-5">
                <h4 className="font-bold text-base">Design & Marketing Management</h4>
                <p className="text-sm">Process and preperation which entails, us, the organizers, collaborating with our business partners to make your event extra special.</p>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-40 w-40 bg-gradient-to-t from-gray-200 to-gray-50 p-5 rounded-full">
                <Image 
                    src="/images/post-event.svg"
                    height={ 75 }
                    width={ 75 }
                    alt="Post-Event"
                />
            </div>
            <div className="flex flex-col items-center gap-y-1 p-5">
                <h4 className="font-bold text-base">Onsite & Post Event Planning</h4>
                <p className="text-sm">Personnel and staffs being in charge of details and facility's preparation for the day of the event, must strictly comply prior to our clients.</p>
            </div>
        </div>
        </>
    )
}

export default ServiceCards