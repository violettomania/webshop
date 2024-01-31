import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

// TODO: fix carousel images not changing
export default function Carousel() {
  return (
    <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
      {carouselImages.map((image) => {
        return (
          <div key={image} className='carousel-item'>
            <img
              src={image}
              className='rounded-box h-full w-80 object-cover'
              alt='carousel-item'
            />
          </div>
        );
      })}
    </div>
  );
}
