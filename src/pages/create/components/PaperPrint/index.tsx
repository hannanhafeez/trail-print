import React, { FC } from 'react'

import css from './paperprint.module.css';

export type PaperPrintProps = {
}

const PaperPrint:FC<PaperPrintProps> = ({}) => {
    return (
        <div className={css.paper}>
            <div className={css.map_wrapper}>

            </div>
        </div>
    )
}

export default PaperPrint