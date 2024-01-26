export default function Checkout() {
  return (
    <section className='align-element py-20'>
      <div className='border-b border-base-300 pb-5'>
        <h2 className='text-3xl font-medium tracking-wider capitalize'>
          place your order
        </h2>
      </div>
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <form
          method='post'
          action='/checkout'
          className='flex flex-col gap-y-4'
        >
          <h4 className='font-medium text-xl capitalize'>
            shipping information
          </h4>
          <div className='form-control'>
            <label htmlFor='name' className='label'>
              <span className='label-text capitalize'>first name</span>
            </label>
            <input
              type='text'
              name='name'
              className='input input-bordered undefined'
              value=''
            />
          </div>
          <div className='form-control'>
            <label htmlFor='address' className='label'>
              <span className='label-text capitalize'>address</span>
            </label>
            <input
              type='text'
              name='address'
              className='input input-bordered undefined'
              value=''
            />
          </div>
          <div className='mt-4'>
            <button type='submit' className='btn btn-primary btn-block'>
              place your order
            </button>
          </div>
        </form>
        <div className='card bg-base-200'>
          <div className='card-body'>
            <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
              <span>Subtotal</span>
              <span className='font-medium'>$179.99</span>
            </p>
            <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
              <span>Shipping</span>
              <span className='font-medium'>$5.00</span>
            </p>
            <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
              <span>Tax</span>
              <span className='font-medium'>$18.00</span>
            </p>
            <p className='flex justify-between text-sm mt-4 pb-2'>
              <span>Order Total</span>
              <span className='font-medium'>$202.99</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
