import React from 'react'
import { HomeImage } from '../assets'

const Hero = () => {
  return (
    <section id='home' className={`flex md:flex-row flex-col sm:py-16 py-6`}>
      <div className='flex-1 flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-start'>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">

        </div>
        <div className='flex flex-row justify-between items center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>The Next <br className='sm:block hidden'/>{" "} 
            <span className='text-gradient'>Generation</span>{" "}
          </h1>
        </div>
        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full'>Payment Method</h1>
        <p className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5`}>At PalPay, we make international payments seamless, fast, and secure.  With cutting-edge security measures, encrypted transfers, and support for global currencies, your financial transactions are in safe hands. Log in or register today to explore our reliable and efficient payment system.</p>
      </div>

      <div>
        <img src={HomeImage} alt='HomeImage' className='w-[100%] h-[100%] relative z-[5]'/>
        <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient'/>
        <div className='absolute z-[1] w-[40%] h-[80%] bottom-40 white__gradient rounded-full'/>
        <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient rounded'/>
      </div>

    </section>
  )
}

export default Hero