import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '@/context';

const SuspenseLoader = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    // Determine which page skeleton to show based on current route
    const page = location.pathname === '/' ? 'home' : 'students';
    setLoading(true, page);
    
    return () => {
      setLoading(false);
    };
  }, [setLoading, location.pathname]);

  return null;
};

export default SuspenseLoader;
