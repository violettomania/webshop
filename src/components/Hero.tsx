export default function Hero() {
  return (
    <>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
          We are changing the way people shop
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <div className='mt-10'>
          <a className='btn btn-primary' href='/products'>
            Our Products
          </a>
        </div>
      </div>
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
    </>
  );
}
