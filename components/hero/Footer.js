import { CopyToClipboard } from 'react-copy-to-clipboard';

const Footer = () => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    return (
        <div className="w-full h-full flex flex-col text-gray-200">
            {/* <div className="bg-gray-800 h-3/4 flex flex-col md:flex-row items-center md:justify-around gap-y-6 gap-x-10 py-8">
                <div className="flex flex-row md:flex-col gap-x-8 gap-y-3">
                    <CopyToClipboard text="This is the address of Alas!">
                        <div className="flex items-center gap-x-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="hidden md:block text-sm">Osmena Street, Tagum City</p>
                        </div>
                    </CopyToClipboard>
                    <div className="flex items-center gap-x-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="hidden md:block text-sm">+63911202890</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="inputIcon" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="hidden md:block text-sm">ace_cadayona@gmail.com</p>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-y-2">
                    <h4 className="text-sm md:text-base font-bold">Company</h4>
                    <p className="text-xs md:text-sm">About Us</p>
                    <p className="text-xs md:text-sm">The Team</p>
                </div>
                <div className="flex flex-col items-center md:items-start gap-y-2">
                    <h4 className="text-sm md:text-base font-bold">Services</h4>
                    <p className="text-xs md:text-sm">FAQ</p>
                    <p className="text-xs md:text-sm">Testimonials</p>
                </div>
                <div className="flex flex-col items-center md:items-start gap-y-2">
                    <h4 className="text-sm md:text-base font-bold">Legal</h4>
                    <p className="text-xs md:text-sm">Terms & Conditions</p>
                    <p className="text-xs md:text-sm">Privacy Policy</p>
                </div>
            </div> */}
            <div className="bg-gray-900 flex flex-col md:flex-row justify-center items-center py-3">
                <div className="flex items-center gap-x-1">
                    <svg 
                        className="h-5 w-5 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2S2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8s-8-3.663-8-8s3.663-8 8-8z" 
                            fill="#E5E7EB"
                        />
                        <path d="M12 17c.901 0 2.581-.168 3.707-1.292l-1.414-1.416C13.85 14.735 12.992 15 12 15c-1.626 0-3-1.374-3-3s1.374-3 3-3c.993 0 1.851.265 2.293.707l1.414-1.414C14.582 7.168 12.901 7 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5z" 
                            fill="#E5E7EB"
                        />
                    </svg>
                    <h4 className="text-xs md:text-sm font-medium border-r border-gray-200 pr-1">Marahuyo { currYear }</h4>
                    <p className="text-xs md:text-sm font-medium">All Rights Reserved</p>
                </div>
                {/* <div className="flex gap-x-5">
                    <svg 
                        className="w-6 h-6 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999c0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891c1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" 
                            fill="#E5E7EB"
                        />
                    </svg>
                    <svg 
                        className="w-6 h-6 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248a4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008a3.004 3.004 0 0 1 0 6.008z" 
                            fill="#E5E7EB"
                        />
                        <circle 
                            cx="16.806" 
                            cy="7.207" r="1.078" 
                            fill="#E5E7EB"
                        />
                        <path 
                            d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42a4.6 4.6 0 0 0-2.633 2.632a6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71c0 2.442 0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632a6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419a4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186c.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688a2.987 2.987 0 0 1-1.712 1.711a4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055c-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311a2.985 2.985 0 0 1-1.719-1.711a5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654c0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311a2.991 2.991 0 0 1 1.712 1.712a5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655c0 2.436 0 2.698-.043 3.654h-.011z" 
                            fill="#E5E7EB"
                        />
                    </svg>
                    <svg 
                        className="w-6 h-6 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            d="M19.633 7.997c.013.175.013.349.013.523c0 5.325-4.053 11.461-11.46 11.461c-2.282 0-4.402-.661-6.186-1.809c.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721a4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062c.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973a4.02 4.02 0 0 1-1.771 2.22a8.073 8.073 0 0 0 2.319-.624a8.645 8.645 0 0 1-2.019 2.083z" 
                            fill="#E5E7EB"
                        />
                    </svg>
                </div> */}
            </div>
        </div>
    )
}

export default Footer
