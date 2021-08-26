import Link from 'next/link'

const Rate = () => {
    return (
        <div className="row-start-6 w-full h-full flex justify-center items-center font-mont bg-white text-gray-800 py-5">
            <div className="relative h-4/5 w-4/5 bg-gray-100 rounded-xl p-10 flex justify-between items-center">
                <div className="flex flex-col justify-center gap-y-1">
                    <h4 className="text-xl md:text-2xl font-source font-black">How was your experience?</h4>
                    <p className="text-sm">We would really like to know your satisfaction with our services.</p>
                </div>
                <div className="flex">
                    <input
                        type="file"
                        className="bg-white w-80 px-3 py-1 rounded-tl-lg rounded-bl-lg"
                    />
                    <Link href="/ratings">
                        <a 
                            className="px-5 py-2 bg-pink-600 hover:bg-pink-500 color-transition rounded-tr-lg rounded-br-lg text-gray-100 font-bold text-sm md:text-base cursor-pointer tracking-wide"
                        >Rate</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Rate