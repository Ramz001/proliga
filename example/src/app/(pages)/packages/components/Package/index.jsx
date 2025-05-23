import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Zap, Users, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useSelector } from 'react-redux'
import { PACKAGE_TYPE } from 'app/utils/packages.util'
import { useTranslation } from 'react-i18next'
import { selectPackages } from 'app/lib/features/package/package.selector'

const PackageContainer = ({ packageType }) => {
  const packages = useSelector(selectPackages)
  const { t } = useTranslation()

  const getPackageTitle = (type) => {
    switch (type) {
      case PACKAGE_TYPE.team_balance:
        return t('Balans')
      case PACKAGE_TYPE.transfer_count:
        return t('Transfer')
      case PACKAGE_TYPE.single_club_count:
        return t('Bir jamoa oyinchilari')
      default:
        return ''
    }
  }

  return (
    <Card className="border-yellow-500 bg-neutral-900 transition-all hover:border-yellow-400">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-neutral-100 xs:text-xl">
            {getPackageTitle(packageType)}
          </CardTitle>
          <PackageIcon type={packageType} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Separator className="mb-4 bg-yellow-500/20" />
        <div className="space-y-4">
          {packages
            .filter((item) => item.type === packageType)
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded bg-neutral-800 p-2 transition-all hover:bg-neutral-700"
              >
                <div className="flex cursor-default items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="border border-yellow-200 bg-primary/15 text-yellow-400"
                  >
                    {item.amount}
                  </Badge>
                  <span className="text-sm text-neutral-300">
                    {t('ga oshirish')}
                  </span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-yellow-500 text-neutral-900 transition-all hover:bg-primary hover:text-neutral-900"
                >
                  <Link href={`/confirm-payment/${item.id}`}>
                    {t('Tanlash')}
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

const PackageIcon = ({ type }) => {
  switch (type) {
    case PACKAGE_TYPE.team_balance:
      return <Coins className="h-6 w-6 text-primary/90" />
    case PACKAGE_TYPE.transfer_count:
      return <Zap className="h-6 w-6 text-primary/90" />
    case PACKAGE_TYPE.single_club_count:
      return <Users className="h-6 w-6 text-primary/90" />
    default:
      return null
  }
}

export default PackageContainer
