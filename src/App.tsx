import Header from './components/Header';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <section className='align-element py-20'>
        <div className='grid lg:grid-cols-2 gap-24 items-center'>
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
        </div>
        <div className='pt-24'>
          <div className='border-b border-base-300 pb-5'>
            <h2 className='text-3xl font-medium tracking-wider capitalize'>
              featured products
            </h2>
          </div>
          <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <a
              className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
              href='/products/19'
            >
              <figure className='px-4 pt-4'>
                <img
                  src='https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600'
                  alt='avant-garde lamp'
                  className='rounded-xl h-64 md:h-48 w-full object-cover'
                />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize tracking-wider'>
                  avant-garde lamp
                </h2>
                <span className='text-secondary'>$179.99</span>
              </div>
            </a>
            <a
              className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
              href='/products/6'
            >
              <figure className='px-4 pt-4'>
                <img
                  src='https://images.pexels.com/photos/3679601/pexels-photo-3679601.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2'
                  alt='coffee table'
                  className='rounded-xl h-64 md:h-48 w-full object-cover'
                />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize tracking-wider'>
                  coffee table
                </h2>
                <span className='text-secondary'>$179.99</span>
              </div>
            </a>
            <a
              className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
              href='/products/7'
            >
              <figure className='px-4 pt-4'>
                <img
                  src='https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600'
                  alt='comfy bed'
                  className='rounded-xl h-64 md:h-48 w-full object-cover'
                />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize tracking-wider'>
                  comfy bed
                </h2>
                <span className='text-secondary'>$129.99</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
