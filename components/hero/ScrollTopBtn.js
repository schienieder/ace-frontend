import React, { useState, useEffect, Fragment } from 'react'
import { useWindowScroll } from 'react-use'
import { Transition } from '@headlessui/react'

const ScrollTopBtn = () => {
    const { y : pageYOffset } = useWindowScroll()
    const [visible, setVisibility] = useState(false)
    let [isShowing, setIsShowing] = useState(true)

    useEffect(() => {
        pageYOffset > 400 ? setVisibility(true) : setVisibility(false)
    }, [pageYOffset])

    if (!visible) {
        return false
    }

    const scrollToTop = () => window.scrollTo({ top : 0, behavior : "smooth" })

    return (
        <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform transition duration-[400ms]"
            leaveFrom="opacity-100 rotate-0 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <button 
                className="fixed bottom-0 right-0 h-12 w-12 rounded-md bg-pink-600 hover:bg-pink-500 focus:outline-none focus:bg-pink-500 text-gray-200 flex items-center justify-center mr-10 md:mr-16 mb-24"
                onClick={ scrollToTop }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-current" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </Transition>
    )
}

export default ScrollTopBtn
