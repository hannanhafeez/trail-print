import { FC, ReactNode } from "react"
import { RadioGroup } from '@headlessui/react'
import { MySelectButton } from "../../../components/MyButton"
// import Image from "next/image"
import ExportedImage from "next-image-export-optimizer"

export const Row: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <div className='h-[36px] flex gap-x-4 relative'>
            <button className='absolute -left-6 px-2 top-1 text-[#38423B]'>
                <svg width="6" height="22" viewBox="0 0 4 20" fill="currentColor">
                    <path d="M3.36 17.4458C3.36 17.7338 3.292 17.9978 3.156 18.2378C3.012 18.4778 2.82 18.6698 2.58 18.8138C2.34 18.9578 2.072 19.0298 1.776 19.0298C1.48 19.0298 1.212 18.9578 0.972 18.8138C0.732 18.6698 0.54 18.4778 0.396 18.2378C0.252 17.9978 0.18 17.7338 0.18 17.4458C0.18 17.1498 0.252 16.8818 0.396 16.6418C0.54 16.4018 0.731999 16.2098 0.971999 16.0658C1.212 15.9218 1.48 15.8498 1.776 15.8498C2.072 15.8498 2.34 15.9218 2.58 16.0658C2.82 16.2098 3.012 16.4018 3.156 16.6418C3.292 16.8818 3.36 17.1498 3.36 17.4458ZM3.36 10.0044C3.36 10.2924 3.292 10.5564 3.156 10.7964C3.012 11.0364 2.82 11.2284 2.58 11.3724C2.34 11.5164 2.072 11.5884 1.776 11.5884C1.48 11.5884 1.212 11.5164 0.971999 11.3724C0.731999 11.2284 0.539999 11.0364 0.396 10.7964C0.251999 10.5564 0.179999 10.2924 0.179999 10.0044C0.179999 9.70836 0.251999 9.44036 0.395999 9.20036C0.539999 8.96036 0.731999 8.76836 0.971999 8.62436C1.212 8.48036 1.48 8.40836 1.776 8.40836C2.072 8.40836 2.34 8.48036 2.58 8.62436C2.82 8.76836 3.012 8.96036 3.156 9.20036C3.292 9.44036 3.36 9.70836 3.36 10.0044ZM3.36 2.56295C3.36 2.85095 3.292 3.11495 3.156 3.35495C3.012 3.59495 2.82 3.78695 2.58 3.93095C2.34 4.07495 2.072 4.14695 1.776 4.14695C1.48 4.14695 1.212 4.07495 0.971999 3.93095C0.731999 3.78695 0.539999 3.59495 0.395999 3.35495C0.251999 3.11495 0.179999 2.85095 0.179999 2.56295C0.179999 2.26695 0.251999 1.99895 0.395999 1.75895C0.539999 1.51895 0.731999 1.32695 0.971999 1.18295C1.212 1.03895 1.48 0.966953 1.776 0.966953C2.072 0.966953 2.34 1.03895 2.58 1.18295C2.82 1.32695 3.012 1.51895 3.156 1.75895C3.292 1.99895 3.36 2.26695 3.36 2.56295Z" />
                </svg>
            </button>
            {children}
        </div>
    )
}

export const SelectButton: FC<{title?: string, value: string, children?: ReactNode }> = ({ 
    title, value ,children 
}) => {
    return(
        <RadioGroup.Option value={value} className={'flex-1 cursor-pointer'}>
            {({ checked }) => (
                <MySelectButton title={title || ''} className={'flex-1 flex-col-reverse transition-all duration-200  ' + (checked ? 'ring-4 ring-theme_blue ' : '')}>
                    {children}
                </MySelectButton>
            )}
        </RadioGroup.Option>
    )
}

export const SelectImage: FC<{ title?: string, value: string, src: string, color?: string }> = ({ 
    title, value, src, color
}) => {
    return(
        <RadioGroup.Option value={value} className={'flex-1 cursor-pointer'}>
            {({ checked }) => (
                <div  className={'flex flex-col items-stretch gap-y-2'}>
                    <div className={"relative aspect-square w-full transition-all duration-200 " + (checked ? 'ring-[7px] ring-theme_green ' : 'outline outline-offset-0 outline-[hsla(52,17%,72%,0.5)]')}>
                        <ExportedImage src={src} alt={title + 'image'} layout='fill' objectFit="cover"/>
                    </div>

                    <span className='font-quicksand font-light text-center text-16 lg:text-18' style={{color}}>
                        {title}
                    </span>
                </div>
            )}
        </RadioGroup.Option>
    )
}

