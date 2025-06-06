'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Gutter from '../Gutter'
import PlayLinks from './Links'
import MobileSidebar from './UserMobile/Sidebar'
import NavbarUserDesktop from './UserDesktop'
import NavbarUserMobile from './UserMobile'
import ChangeLanguageDropdown from './Language'
import Notification from './Notification'
import Marquee from 'components/Marquee'

const Navbar = () => {
  const path = usePathname()
  const [isModalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()
  const NEXT_PUBLIC_TEST_NAV_SLIDER = Boolean(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_TEST_NAV_SLIDER ?? ''
  )

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-0 z-20 w-screen bg-black bg-opacity-80 backdrop-blur-md',
          NEXT_PUBLIC_TEST_NAV_SLIDER ? 'pb-3' : 'py-3'
        )}
      >
        {NEXT_PUBLIC_TEST_NAV_SLIDER && (
          <Marquee
            text={t('Website is in test mode')}
            className="mb-3"
            speed="slow"
          />
        )}
        <Gutter>
          <div className="flex w-full items-center justify-between text-white">
            <Link
              href={
                path.split('/').includes('championships')
                  ? '/'
                  : '/championships'
              }
            >
              <Image
                src="/icons/proliga-full.svg"
                priority={true}
                alt="Proliga"
                width={180}
                height={56}
                draggable={false}
                className="w-28 cursor-pointer xs:w-32 md:w-36"
              />
            </Link>
            <PlayLinks />
            <div className="flex w-max items-center justify-center gap-4">
              <ChangeLanguageDropdown />
              <Notification />
              <NavbarUserMobile handleToggleModal={() => setModalOpen(true)} />
              <NavbarUserDesktop />
            </div>
          </div>
        </Gutter>
      </nav>
      <MobileSidebar isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export default Navbar
