import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' }); // Use "instant" behavior
    };

    scrollToTop(); // Scroll to the top on initial render and navigation
    return () => window.removeEventListener('scroll', scrollToTop); // Clean up listener on unmount
  }, [location]);

  return children;
};

export default ScrollToTop;