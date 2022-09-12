import React, { FC } from 'react'

import css from './MyInput.module.css'

export type MyInputProps = {
} & React.InputHTMLAttributes<HTMLInputElement>

const MyInput:FC<MyInputProps> = ({
    className,
    ...props
}) => {
    return (
        <input {...props} className={`${css.input_css} ${className}`}/>
    )
}

export default MyInput