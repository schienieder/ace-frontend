const NavItem = ({ text }) => {
    return (
        <a className="text-sm font-medium hover:text-gray-200 uppercase cursor-pointer">
            { text }
        </a>
    )
}

export default NavItem
