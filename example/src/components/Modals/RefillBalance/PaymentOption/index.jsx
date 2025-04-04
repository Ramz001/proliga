import Image from 'next/image'

const RefilBalanceModalPaymentOption = ({ onClick, style, img, alt }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 w-32 rounded border bg-stone-950 p-3 transition-all xs:h-16 xs:w-36 sm:w-full sm:p-4 xl:rounded-md ${style}`}
    >
      <Image
        src={img}
        width={36}
        draggable={false}
        height={36}
        className="h-full w-full self-center"
        alt={alt}
      />
    </button>
  )
}

export default RefilBalanceModalPaymentOption
