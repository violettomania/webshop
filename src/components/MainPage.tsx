import FeaturedProducts from './FeaturedProducts';
import Hero from './Hero';

const version = process.env.REACT_APP_VERSION;

export default function MainPage() {
  return (
    <>
      <section className='align-element py-20'>
        <Hero />
        <FeaturedProducts />
      </section>
      <div className='version-info'>
        <p>Version: {version}</p>
      </div>
    </>
  );
}
