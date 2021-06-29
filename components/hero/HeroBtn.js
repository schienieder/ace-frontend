import Link from 'next/link'

const HeroBtn = ({ text, href, children }) => {
    return (
        <Link href={ href }>
            <button className="px-4 py-2 mt-5 bg-teal-900 hover:bg-teal-800 transition-colors duration-75 ease-linear focus:bg-teal-800 ring-2 ring-offset-2 ring-transparent ring-offset-transparent focus:ring-teal-800 focus:ring-offset-teal-700 focus:outline-none text-gray-200 flex items-center gap-x-1 rounded-sm">
                <p className="font-medium text-base">{ text }</p>
                { children }
            </button>
        </Link>
    )
}

HeroBtn.defaultProps = {
    href : '/'
}

export default HeroBtn
