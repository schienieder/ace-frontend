import AboutItem from './AboutItem'
import Image from 'next/image'

const About = () => {
    return (
        <div className="row-start-2 w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700 font-mont gap-y-5 md:gap-y-10 p-8">
            <div className="flex flex-col items-center">
                <h4 className="text-xl md:text-3xl font-source font-black">What Makes Alas Special?</h4>
                <div className="w-64 md:w-80 border-b-2 border-teal-700 rounded-full"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-20 gap-y-5 md:gap-y-0">
                <AboutItem 
                    title="Hassle Free Events"
                    desc="Book an event, sit back and have a drink."
                >
                    <Image 
                        src="/images/party.svg"
                        height={60}
                        width={60}
                        alt="Party"
                    />
                </AboutItem>
                <AboutItem 
                    title="No Hidden Charges"
                    desc="Transparent fees because we are not like any other."
                >
                    <Image 
                        src="/images/invoice.svg"
                        height={60}
                        width={60}
                        alt="Invoice"
                    />
                </AboutItem>
            </div>
            <div className="flex flex-col md:flex-row gap-x-20 gap-y-5 md:gap-y-0">
                <AboutItem 
                    title="Quality of Services"
                    desc="Lorem ipsum dolor, et al buang u sapin mufasa"
                >
                    <Image 
                        src="/images/medal.svg"
                        height={60}
                        width={60}
                        alt="Medal"
                    />
                </AboutItem>
                <AboutItem 
                    title="Client Friendly"
                    desc="The top priority of ACE is the client's perspective in handling the event, establishing solid connections of emotions and relationships to the client."
                >
                    <Image 
                        src="/images/handshake.svg"
                        height={60}
                        width={60}
                        alt="Hand Shake"
                    />
                </AboutItem>
            </div>
        </div>
    )
}

export default About
