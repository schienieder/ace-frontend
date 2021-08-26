import React from 'react'
import NavItem from './NavItem';
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
    return (
        <nav 
            className="w-full absolute flex items-center justify-between px-10 py-5 font-mont text-gray-800"
        >
            <div className="flex items-center gap-x-3">
                <Image 
                    src="/images/logo.svg"
                    width={ 50 }
                    height={ 50 }
                    alt="Logo"
                />
                <h4 className="text-2xl font-source font-black">Marahuyo</h4>
            </div>
            <div className="flex items-center gap-x-8 text-gray-300 z-10">
                <NavItem text="About" />
                <NavItem text="Services" />
                <NavItem text="Testimonials" />
                <Link href="/login">
                    <a 
                        className="bg-transparent hover:bg-gray-200 border border-gray-200 text-gray-200 hover:text-gray-800 color-transition px-5 py-2 rounded-lg font-bold tracking-wide"
                    >Login</a>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
