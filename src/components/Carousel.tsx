import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

export default function Carousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const transitions = useTransition(currentImageIndex, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {transitions((style, i) => (
          <animated.div
            key={i}
            className='carousel-item'
            style={{
              ...style,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={carouselImages[i]}
              className='rounded-box object-cover'
              style={{ width: '100%', height: '100%' }}
              alt='carousel-item'
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
