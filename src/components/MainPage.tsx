import FeaturedProducts from './FeaturedProducts';
import Hero from './Hero';

export default function MainPage() {
  return (
    <section className='align-element py-20'>
      <Hero />
      <FeaturedProducts />
    </section>
  );
}
