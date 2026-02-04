import { useEffect } from 'react';
import { useLoading } from '@/context';

const SuspenseLoader = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  return null;
};

export default SuspenseLoader;
