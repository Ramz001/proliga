import Gutter from '../../../../../components/Gutter'
import dynamic from 'next/dynamic'
const Matches = dynamic(() => import('./Matches'), {
  ssr: false,
})
const News = dynamic(() => import('./News'), {
  ssr: false,
})
import BigBanner from 'components/Banners/Big'
import MiniBanner from 'components/Banners/Mini'

const WorldNews = () => {
  return (
    <Gutter>
      <section className="mb-2 flex min-h-[40rem] flex-col justify-between gap-2 py-4 lg:flex-row">
        <Matches />
        <section className="relative mx-auto h-min flex-col items-center justify-between overflow-hidden md:flex lg:mx-0">
          <MiniBanner />
          <BigBanner />
        </section>
        <News />
      </section>
    </Gutter>
  )
}

export default WorldNews
