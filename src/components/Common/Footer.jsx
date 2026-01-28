import React from 'react'
import { Link } from 'react-router-dom';
import { TbBrandMeta  } from 'react-icons/tb'
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import NewsletterForm from "../NewsletterForm";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray mb-4'>
           {t('offersAndUpdates')}
          </p>
          {/*<p className='font-medium text-sm text-gray-600 mb-6 '>Sign up and get 10% off yours first order.</p>*/}

          {/* Newsletter from */}
          <NewsletterForm />
         </div>
      <div>
          <h3 className='text-lg text-gray-800 mb-4'>{t("support")}</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='/contact' className='hover:text-gray-800 transition-colors'>{t("callus")}</Link>
            </li>
            
            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>About Us</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>FAQs</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Features</Link>
            </li>

          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>{t('follow')}</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <TbBrandMeta className='h-5 w-5' />
            </a>

            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <IoLogoInstagram className='h-5 w-5' />
            </a>

            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <RiTwitterXLine className='h-4 w-4' />
            </a>

          </div>

          <p className='text-gray-500'>{t('callus')}</p>
          <FiPhoneCall className='inline-block mr-2' />
          <span className='font-medium text-gray-800'>+387 61 234 567</span>
        </div>
      </div>
      {/* Footer bottom */}
      <div className=' container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          &copy; 2025 Sarajevo. {t('rights')}
        </p>
      </div>
    </footer>

  )
}


export default Footer