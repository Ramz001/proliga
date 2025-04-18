import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getUrl } from 'app/utils/static.util'

const WinPrizesSlide = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const prizes = useSelector(selectPrizes)
  const competition_id = +path.split('/')[2] || 0

  return (
    <div className="flex h-auto flex-col space-y-4 md:space-y-6">
      <div className="space-y-2">
        <h2 className="carousel-header font-bold uppercase">
          {t('Sovrinlarni yutib oling')}
        </h2>
        <p className="carousel-text text-neutral-300">{t('Eng ko‘p ball')}</p>
      </div>
      <div className="z grid grid-cols-2 grid-rows-2 justify-center gap-2 sm:flex sm:grid-rows-1 md:gap-4 xl:gap-8">
        {prizes.map(
          (prize) =>
            prize?.competition_id.id === competition_id &&
            prize?.is_active && <Prize prize={prize} key={prize?.id} />
        )}
      </div>
    </div>
  )
}

const Prize = ({ prize }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  return (
    <div
      className={cn(
        'flex min-w-24 flex-1 flex-col items-center justify-center md:max-w-80',
        prize.order === 3 &&
          'col-span-2 mx-auto max-w-[50%] sm:col-span-1 sm:mx-0 sm:max-w-max'
      )}
    >
      <p className="mb-1 text-xs sm:text-sm md:mb-2 md:text-lg xl:text-xl">
        {getCorrectName({ lang, uz: prize?.name, ru: prize?.name_ru })}
      </p>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-1 lg:p-2">
        <img
          src={getUrl(prize?.image)}
          alt={prize?.name}
          loading="lazy"
          className="aspect-auto h-auto w-auto bg-cover"
        />
      </div>
      <p>
        <span className="font-bold md:text-xl">{prize.order} </span>
        {t("O'RIN")}
      </p>
    </div>
  )
}

export default WinPrizesSlide
