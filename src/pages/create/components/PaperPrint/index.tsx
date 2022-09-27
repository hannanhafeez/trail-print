import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'; 
import { AxisOptions, Chart } from 'react-charts';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN as string;

import 'mapbox-gl/dist/mapbox-gl.css';

import css from './paperprint.module.css';
import { TRACKING_DATA } from '../../../../store/slices/createPageSlice';

type MyDatum = { date: Date, stars: number }

export type PaperPrintProps = {
    data?: TRACKING_DATA,
    mapStyle?: string | mapboxgl.Style,
    colors: {
        primaryText: string,
        secondaryText: string,
        background: string,
        activity: string,
        elevation: string,
    }
}

const defaultData: TRACKING_DATA = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
]

const PaperPrint:FC<PaperPrintProps> = ({
    // data = defaultData,
    mapStyle = 'mapbox://styles/aoreamuno/cl82zovde000p14pkummrl01m',
    colors:{activity, background, elevation, primaryText, secondaryText},
}) => {
    const mapContainer = useRef(null);
    const map = useRef<Map|null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom,
            // boxZoom:true,
            // attributionControl:true,
        });
    }, [lat, lng, mapStyle, zoom]);

    

    return (
        <div className={css.paper} style={{ backgroundColor: background }}>
            <div className={css.content_wrapper}>
                <div ref={mapContainer} className={`${css.mapbox_wrapper} map-container`}>

                </div>

                <figure className='h-[80px] w-full' /* style={{backgroundColor: elevation}} */>
                    
                </figure>

            </div>
        </div>
    )
}

export default PaperPrint