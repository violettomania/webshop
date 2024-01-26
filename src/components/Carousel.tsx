export default function Carousel() {
  return (
    <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
      <div className='carousel-item'>
        <img
          src='/src/assets/hero1.webp'
          className='rounded-box h-full w-80 object-cover'
          alt='product'
        />
      </div>
      <div className='carousel-item'>
        <img
          src='/src/assets/hero2.webp'
          className='rounded-box h-full w-80 object-cover'
          alt='product'
        />
      </div>
      <div className='carousel-item'>
        <img
          src='/src/assets/hero3.webp'
          className='rounded-box h-full w-80 object-cover'
          alt='product'
        />
      </div>
      <div className='carousel-item'>
        <img
          src='/src/assets/hero4.webp'
          className='rounded-box h-full w-80 object-cover'
          alt='product'
        />
      </div>
    </div>
  );
}
