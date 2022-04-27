import adminStyles from '../styles/Admin.module.css'

const useNav = () => {

    const handleNavClass = (activeNav, isDarkMode) => {
        let navClass;
        if (!activeNav && !isDarkMode) {
            navClass = `${adminStyles.navItem} ${adminStyles.navItemBg}`
        }
        else if (!activeNav && isDarkMode) {
            navClass = `${adminStyles.navItem} ${adminStyles.navItemDarkBg}`
        } 
        else if (activeNav && !isDarkMode) {
            navClass = `${adminStyles.navItem} ${adminStyles.navItemActiveBg}`
        } 
        else if (activeNav && isDarkMode) {
            navClass = `${adminStyles.navItem} ${adminStyles.navItemActiveDarkBg}`
        } 
        return navClass
    }

    return {
        handleNavClass
    }
}

export default useNav