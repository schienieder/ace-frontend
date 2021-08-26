import Image from 'next/image'

const Awards = () => {
    return (
        <div className="row-start-2  w-full h-full flex flex-col justify-end items-center gap-y-5 bg-white text-gray-800">
            <div className="flex flex-col items-center gap-y-2">
                <h4 className="text-2xl md:text-3xl font-source font-black">Company Recognitions</h4>
                <p className="text-sm">One of the reasons why you should be in our hands.</p>
            </div>
            <div className="grid grid-cols-4 gap-x-10">
                <Image 
                    src="/images/award1.png"
                    width={ 149 }
                    height={ 140 }
                    alt="World Class Philippines Award"
                />
                <Image 
                    src="/images/award2.png"
                    width={ 162 }
                    height={ 140 }
                    alt="National Product Quality Excellence Award"
                />
                <Image 
                    src="/images/award3.png"
                    width={ 162 }
                    height={ 140 }
                    alt="Seal of Quality Service Award"
                />
                <Image 
                    src="/images/award4.png"
                    width={ 159 }
                    height={ 140 }
                    alt="Thailand Award"
                />
            </div>
        </div>
    )
}

export default Awards
