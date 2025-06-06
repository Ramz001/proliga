import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const Confirmation = ({ onConfirm, onCancel, isModalOpen, setModalOpen }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="flex max-w-[96%] flex-col items-center justify-between gap-2 rounded-xl bg-neutral-950 p-6 text-neutral-100 xs:max-w-96 md:max-w-max xl:max-w-[30rem]">
        <DialogTitle className="mb-12 mt-6 cursor-default text-xl font-bold md:tracking-wide">
          {t('Ishonchingiz komilmi')}
        </DialogTitle>
        <div className="flex items-center gap-1">
          <Button
            className="h-auto w-36 select-none rounded-md border-2 border-red-600 bg-red-600 py-2 font-medium text-neutral-50 transition-all hover:bg-red-800 focus:outline-white md:w-44"
            onClick={onConfirm}
            tabIndex={0}
            autoFocus={true}
          >
            {t('Tasdiqlash')}
          </Button>
          <Button
            className="h-auto w-36 select-none rounded-md border-2 border-neutral-600 bg-neutral-900 py-2 font-medium text-neutral-200 transition-all hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50 md:w-44"
            onClick={onCancel}
          >
            {t('Qaytish')}
          </Button>
        </div>
        <DialogDescription className="hidden">
          {t('Ishonchingizni tasdiqlaysizmi')}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Confirmation
