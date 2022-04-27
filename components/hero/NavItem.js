const NavItem = ({ text, destination }) => {
    return (
        <a 
            className="text-xs lg:text-sm font-medium hover:text-gray-200 uppercase cursor-pointer"
            href={ destination }
        >
            { text }
        </a>
    )
}

export default NavItem
