import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { staticPath } from 'app/utils/static.util'
import { selectTopPlayers } from 'app/lib/features/player/player.selector'
import { getUrl } from 'app/utils/static.util'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const RankingPlayers = () => {
  const { t } = useTranslation()
  const topPlayers = useSelector(selectTopPlayers)

  return (
    <div className="w-full rounded-xl bg-black p-5 text-neutral-100">
      <h3 className="text-xl font-bold">
        {t('Eng kuchli top 3 - futbolchilar')}
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-2 xs:grid-cols-3">
        {topPlayers?.length > 0 ? (
          topPlayers?.map((player, index) => (
            <PlayerPlace
              key={player?.id || index}
              player={player}
              index={index}
            />
          ))
        ) : (
          <div>{t('Oyinchilar yoq')}</div>
        )}
      </div>
    </div>
  )
}

const PlayerPlace = ({ player, index }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const image = useMemo(
    () => staticPath + '/player-png/' + player?.slug + '/app.png',
    [player?.slug]
  )

  return (
    <div className="relative min-h-32 rounded bg-neutral-100 p-2">
      <div className="flex items-center justify-between">
        <img
          src={getUrl(image)}
          alt="player"
          width={24}
          height={24}
          onError={(e) => (e.target.src = '/images/placeholder-user.png')}
          className="size-6 rounded-full text-black md:size-8"
        />
        <span className="flex h-6 w-12 items-center justify-center rounded-full bg-primary text-xs font-bold text-black sm:text-sm">
          {player?.point ?? 0}
        </span>
      </div>
      <h4 className="line-clamp-2 max-w-28 break-words text-sm font-bold text-black">
        {getCorrectName({ lang, uz: player?.name, ru: player?.name_ru })}
      </h4>
      <p className="line-clamp-2 max-w-28 break-words text-sm font-medium text-black">
        {getCorrectName({
          lang,
          uz: player?.club?.name,
          ru: player?.club?.name_ru,
        })}
      </p>
      <span className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-br-lg rounded-tl-lg bg-primary text-sm font-extrabold text-black">
        {index + 1}
      </span>
    </div>
  )
}

export default RankingPlayers
