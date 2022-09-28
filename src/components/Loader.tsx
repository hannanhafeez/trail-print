import ExportedImage from "next-image-export-optimizer"
import { FC } from "react"

const Loader: FC<{size?: number }> = ({size=64}) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <ExportedImage alt="loader" src={'/assets/svg/block-loader.svg'} width={size} height={size} objectFit="contain"/>
    </div>
  )
}

export default Loader