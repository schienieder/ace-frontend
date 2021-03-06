import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

const Rate = () => {
    return (
        <div className={`row-start-6 w-full ${heroStyles.h_rate} flex flex-col justify-center items-center font-mont bg-gray-100 text-gray-800 gap-y-5`}>
            <div className="flex flex-col items-center gap-y-2">
                <h4 className="text-xl md:text-2xl font-source font-black">How was your experience?</h4>
                <p className="text-xs md:text-sm">Rate our services based on your satisfaction.</p>
            </div>
            <Link href="/ratings">
                <a 
                    className="px-3 md:px-5 py-2 bg-pink-600 hover:bg-pink-500 color-transition rounded-lg text-gray-100 font-bold text-sm md:text-base cursor-pointer tracking-wide"
                >Rate Now!</a>
            </Link>
        </div>
    )
}

export default Rate