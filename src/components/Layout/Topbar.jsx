import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import laserImg from '../../assets/naslov.jpg';

function Topbar() {
    const { t } = useTranslation();
    return (
        <div className='text-white' style={{ backgroundImage: `url(${laserImg})`, padding: '5px', borderRadius: '5px' }}>
            <div className='container mx-auto flex justify-between items-center py-3 px-4 '>
                <div className='hidden md:flex items-center space-x-4'>

                    <a href="https://www.facebook.com/100054658980729/mentions/?_rdr" className='hover:text-gray-400' style={{backgroundColor: "rgb(91, 53, 1)", padding: "5px", borderRadius: "5px"}}>
                        <span>MM Laser</span>       <TbBrandMeta className='h-5 w-5' />  <span>{t('follow')}</span>
                    </a>

                </div>
                <div className='text-lg text-center flex-grow'>
                    <p>{t('sales')}</p>
                </div>
                <div className="text-sm hidden md:block">
                    <a href="tel:+38761205263" className='hover:text-gray-300' style={{backgroundColor: "rgb(91, 53, 1)", padding: "5px", borderRadius: "5px"}}>
                        {t('contact')} +387 61 205 263

                    </a>
                </div>
            </div>
        </div>
    )
}

export default Topbar