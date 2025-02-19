import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// use this component to make sure a user loads each new page at the top
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
    }, [pathname]); // Trigger scroll when the pathname changes

    return null;
};

export default ScrollToTop;
