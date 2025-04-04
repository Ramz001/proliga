'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import YandexAd from '../YandexAd'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BANNER, BANNER_SERVICE_TYPE } from 'app/utils/banner.util'
import { useMemo, useState, useEffect, memo } from 'react'
import { useCreateBannerView } from 'app/hooks/system/useCreateBannerView/useCreateBannerView'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { getUrl } from 'app/utils/static.util'

const ModalBanner = ({ isModalOpen, setModalOpen }) => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const userTable = useSelector(selectUserTable)
  const geo = useSelector(selectGeo)
  const NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH =
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH
  const [windowWidth, setWindowWidth] = useState(0)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () =>
      banners.find(
        (b) => b?.banner_type === BANNER.MODAL_BANNER && !b?.is_mobile
      ),
    [banners]
  )
  const mobileBanner = useMemo(
    () =>
      banners.find(
        (b) => b?.banner_type === BANNER.MODAL_BANNER && b?.is_mobile
      ),
    [banners]
  )

  const handleOpen = (open) => {
    setModalOpen(open)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (banner?.type === BANNER_SERVICE_TYPE.CUSTOM) {
      if (banner?.id && userTable?.id && geo && agent) {
        createBannerView({
          banner_id: banner?.id,
          userTable,
          geo,
          agent,
        })
      }
    }
  }, [banner, windowWidth, agent, userTable, geo, createBannerView])

  return (
    <>
      {banner?.type === BANNER_SERVICE_TYPE.CUSTOM && (
        <Dialog open={isModalOpen} onOpenChange={handleOpen}>
          <DialogContent
            closeButtonStyle="right-0 -top-8"
            className="max-h-max w-[96%] rounded-md p-0 md:max-w-[80%] 2xl:w-full 2xl:max-w-[1280px]"
          >
            <Link
              href={banner?.link ?? ''}
              className="block rounded md:min-w-[620px] xl:min-w-[1024px] 2xl:min-w-[1280px] 2xl:max-w-[1280px]"
            >
              <img
                src={getUrl(banner?.content_url) ?? ''}
                alt={banner?.name}
                width={128}
                height={72}
                loading="lazy"
                className="aspect-video h-full w-full rounded"
              />
            </Link>
            <DialogTitle className="hidden">Ad title</DialogTitle>
            <DialogDescription className="hidden">
              Ad Descriptor
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
      {banner?.type === BANNER_SERVICE_TYPE.YANDEX &&
        windowWidth > NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH && (
          <YandexAd type="fullscreen" blockId={banner?.service_id} />
        )}
      {mobileBanner?.type === BANNER_SERVICE_TYPE.YANDEX &&
        windowWidth < NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH && (
          <YandexAd type="fullscreen" blockId={mobileBanner?.service_id} />
        )}
    </>
  )
}

export default memo(ModalBanner)
