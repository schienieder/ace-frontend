import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

const Rate = () => {
    return (
        <div className={`row-start-6 w-full ${heroStyles.h_rate} flex flex-col justify-center items-center font-mont bg-gray-100 text-gray-800 gap-y-5`}>
            <div className="flex flex-col items-center gap-y-2">
                <h4 className="text-xl md:text-2xl font-source font-black">How was your experience?</h4>
                <p className="text-xs md:text-sm">Rate our services based on your satisfaction.</p>
            </div>
            <div className="flex w-72 md:w-96 mt-5 border border-gray-300 rounded-tr-lg rounded-br-lg">
                <input
                    type="file"
                    className="bg-white px-3 py-1 rounded-tl-lg rounded-bl-lg text-sm"
                />
                <Link href="/ratings">
                    <a 
                        className="px-3 md:px-5 py-2 bg-pink-600 hover:bg-pink-500 color-transition rounded-tr-lg rounded-br-lg text-gray-100 font-bold text-sm md:text-base cursor-pointer tracking-wide"
                    >Rate</a>
                </Link>
            </div>
            {/* <div className="relative h-4/5 w-4/5 bg-gray-100 rounded-xl p-10 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col justify-center gap-y-1">
                    <h4 className="text-sm md:text-2xl font-source font-black">How was your experience?</h4>
                    <p className="text-xs md:text-sm">We would really like to know your satisfaction with our services.</p>
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
            </div> */}
        </div>
    )
}

export default Rate