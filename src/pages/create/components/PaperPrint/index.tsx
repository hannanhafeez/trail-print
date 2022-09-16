import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'; 

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN as string;

import 'mapbox-gl/dist/mapbox-gl.css';

import css from './paperprint.module.css';

export type PaperPrintProps = {
}

const PaperPrint:FC<PaperPrintProps> = ({}) => {
    const mapContainer = useRef(null);
    const map = useRef<Map|null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            style: 'mapbox://styles/aoreamuno/cl82zovde000p14pkummrl01m',
            center: [lng, lat],
            zoom: zoom,
            // boxZoom:true,
            // attributionControl:true,
        });
    });

    return (
        <div className={css.paper}>
            <div className={css.content_wrapper}>
                <div ref={mapContainer} className={`${css.mapbox_wrapper} map-container`}>

                </div>

                <div className='h-[30%]'>

                </div>

            </div>
        </div>
    )
}

export default PaperPrint