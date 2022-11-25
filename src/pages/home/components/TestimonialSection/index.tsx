import ExportedImage from 'next-image-export-optimizer';
// import Image from 'next/image';
import React, { FC, useCallback, useRef } from 'react'

import css from './testimonial.module.css';

export type TestimonialSectionProps = {
}

const TestimonialSection:FC<TestimonialSectionProps> = ({}) => {
    const ref = useRef<HTMLDivElement>(null)

    const onBtnPressed = useCallback((dir: 'L' | 'R') => {
        ref.current?.scrollBy({ left: (dir === 'L' ? -1 : 1) * ref.current?.clientWidth, behavior: 'smooth', })
    }, [])

    const length = testimonials?.length || 0

    return (
        <div className="relative overflow-hidden w-full">
            <button className='z-10 absolute left-4 top-[50%] translate-y-[-50%] h-7 aspect-square bg-[#ffffff33] p-1'
                onClick={() => onBtnPressed('L')}
            >
                <ExportedImage unoptimized alt='left button' src={'/assets/svg/arrow2.svg'} layout='fill' objectFit='contain'
                    className='p-2'
                    />
            </button>

            <button className='z-10 absolute right-4 top-[50%] translate-y-[-50%] h-7 aspect-square bg-[#ffffff33] p-1'
                onClick={() => onBtnPressed('R')}
            >
                <ExportedImage unoptimized alt='left button' src={'/assets/svg/arrow1.svg'} layout='fill' objectFit='contain'
                    className='p-2'
                />
            </button>
            <div ref={ref} className={css.scrollContainer}>

                {
                    testimonials.map(({subtitle, person, content},ind)=>(
                        <div key={`${ind}-${person}`} className={css.testimonial_card}>
                            <p>
                                {content}
                            </p>
                            <div className={css.testimonialInfo}>
                                <span>{person}</span>
                                <span>{subtitle}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const testimonials = [
    {
        content: `“It’s going to be great to have the Paper Trails map up on my wall to remember some of those experiences. After all that's what we do all this for. The experience.”`,
        person: 'David Bourke',
        subtitle: 'Tour Divide Finisher 2019'
    },
    {
        content: `“It’s going to be great to have the Paper Trails map up on my wall to remember some of those experiences. After all that's what we do all this for. The experience.”`,
        person: 'Tim Cook',
        subtitle: 'Tour Divide Finisher 2012'
    }
]

export default TestimonialSection