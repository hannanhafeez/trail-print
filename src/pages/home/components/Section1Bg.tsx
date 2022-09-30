import React, { FC, useEffect, useState } from 'react'

export type Section1BgProps = {
}

const Section1Bg:FC<Section1BgProps> = ({}) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const listener = () => {
            const width = window.innerWidth;
            if(width <= 640){
                if (!(imageUrl === '/assets/imgs/svg-bg-map@640.webp' || imageUrl === '/assets/imgs/svg-bg-map@1280.webp' || imageUrl === '/assets/imgs/svg-bg-map.webp')) {
                    setImageUrl('/assets/imgs/svg-bg-map@640.webp')
                }
            }else if( width > 640 && width <= 1280){
                if (!(imageUrl === '/assets/imgs/svg-bg-map@1280.webp' || imageUrl === '/assets/imgs/svg-bg-map.webp')){
                    setImageUrl('/assets/imgs/svg-bg-map@1280.webp')
                }
            }else{
                if (!(imageUrl === '/assets/imgs/svg-bg-map.webp')) {
                    setImageUrl('/assets/imgs/svg-bg-map.webp')
                }
            }
        }
        listener();
        window.addEventListener('resize', listener)
    
        return () => {
            window.removeEventListener('resize', listener);    
        }
    }, [])
    

    return (
        <div className='absolute inset-0 overflow-hidden bg-[#1c3460]'>
            <svg className='h-full w-auto xl:h-auto xl:w-full' viewBox="0 0 1440 737" fill="none">
                <defs>
                    <marker id="circle" viewBox="0 0 10 10"
                        refX="1" refY="5"
                        markerUnits="strokeWidth"
                        markerWidth="10" markerHeight="10"
                        orient="auto">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <circle cx="4.32178" cy="4.19037" r="4" fill="#AFD130" />
                        </svg>
                    </marker>
                </defs>
                <mask id="mask0_269_888" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="737">
                    <rect width="1440" height="736.472" fill="white" />
                </mask>
                <g mask="url(#mask0_269_888)">
                    <g filter="url(#filter0_dd_269_888)">
                        <rect y="-208" width="1440" height="1440" fill="url(#pattern0)" />
                    </g>
                    <g style={{ mixBlendMode: 'color'}} opacity="0.7">
                        <rect width="1440" height="736.472" fill="#4C6CAC" />
                    </g>
                </g>
                <path d="M371.269 618.229C379.039 601.279 379.641 575.663 378.971 564.974V515.72C378.971 513.511 377.18 511.72 374.971 511.72H212.84C210.631 511.72 208.84 509.929 208.84 507.72V465.715V390.678C208.84 388.468 210.631 386.678 212.84 386.678H359.042C360.579 386.678 361.98 385.797 362.646 384.413L377.136 354.32C378.132 352.25 377.185 349.768 375.062 348.889L337.782 333.446C336.287 332.827 335.313 331.368 335.313 329.751V187.651V73.3707" stroke="#AFD130" strokeWidth="2" strokeLinejoin="round" strokeDasharray="8 4" strokeLinecap='round' markerStart='url(#circle)' markerEnd='url(#circle)'/>
                <defs>
                    <filter id="filter0_dd_269_888" x="-16" y="-216" width="1472" height="1472" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="8" />
                        <feGaussianBlur stdDeviation="8" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_269_888" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                        <feBlend mode="normal" in2="effect1_dropShadow_269_888" result="effect2_dropShadow_269_888" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_269_888" result="shape" />
                    </filter>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_269_888" transform="scale(0.000390625)" />
                    </pattern>
                    <image id="image0_269_888" width="2560" height="2560" xlinkHref={imageUrl} />
                </defs>
            </svg>
        </div>
    )
}

export default Section1Bg