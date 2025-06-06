import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserData = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const updateUserData = useCallback(
    async ({
      name,
      last_name,
      middle_name,
      bio,
      gender,
      birth_date,
      userTable,
      cb = () => {},
    }) => {
      // eslint-disable-next-line no-undef

      if (!name) {
        setError(t('Ism kiriting'))
        return toast.warning(t('Ism kiriting'), { theme: 'dark' })
      }
      if (!gender) {
        setError(t('Jinsni tanlang'))
        return toast.warning(t('Jinsni tanlang'), { theme: 'dark' })
      }
      if (!birth_date) {
        setError(t("Tug'ilgan yilingizni kiriting"))
        return toast.warning(t("Tug'ilgan yilingizni kiriting"))
      }
      if (!userTable?.id) {
        setError('User not authenticated')
        return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
      }

      try {
        setIsLoading(true)
        setError('')

        let obj = {
          name,
          last_name,
          middle_name,
          bio,
          gender,
          birth_date,
        }

        const { data, error } = await supabase
          .from('user')
          .update(obj)
          .eq('id', userTable?.id)
          .is('deleted_at', null)
          .single()

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          return { error, data }
        }

        cb()
        await update()
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred'),
          { theme: 'dark' }
        )
      } finally {
        setIsLoading(false)
      }
    },
    [t, update]
  )
  return { updateUserData, isLoading, error }
}
