import React, { FC, ReactNode } from 'react'

import css from './MyButton.module.css';

export type MyButtonProps = {
    title: string,
    children?: ReactNode,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const MyButton:FC<MyButtonProps> = ({title, children, className, ...props}) => {
    return (
        <button {...props} className={`${css.btn_class} ${className}`}>
            {title}
            {children}
        </button>
    )
}

export type MySelectButtonProps = {
    title: string,
    className?: string,
    children?: ReactNode,
}

export const MySelectButton:FC<MyButtonProps> = ({title, children, className,}) => {
    return (
        <span className={`${css.btn_class} ${className}`}>
            {title}
            {children}
        </span>
    )
}

export default MyButton