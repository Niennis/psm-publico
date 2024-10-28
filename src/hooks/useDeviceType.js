import { useEffect, useState } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;

    const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent) && !isTablet;

    const tablet = /iPad|Android/i.test(userAgent)
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
    const noEsNah = !/Mobile/i.test(userAgent);

    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('TYPE OF', typeof window.AbortController.navigator)
    console.log('tablet', tablet)
    console.log('mobile', mobile)
    console.log('noEsNah', noEsNah)
    console.log('USER AGENT', navigator.userAgent)

    if (isMobile) {
      setDeviceType('mobile');
    } else if (isTablet) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  return deviceType;
};

export default useDeviceType;
