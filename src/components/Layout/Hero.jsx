import React from 'react'
import heroImg from '../../assets/Sebilj.jpg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import '../../../i18n';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className='relative' style={{margin: "0"}}>
      
        <img src={heroImg} alt="Sarajevo" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' style={{margin: "0", minWidth: "100%"}} />

      <div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
            {t('welcomeSarajevo')}
          </h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6 bg-primary'>
            {t('explore')}
          </p>
          <Link to='/suveniri' className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg" > 
            {t('shopNow')}
          </Link>
        </div>
        
      </div>
    </section>
  )
}

export default Hero