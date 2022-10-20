import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN as string;

import 'mapbox-gl/dist/mapbox-gl.css';

import css from './paperprint.module.css';
import { PageState, TRACKING_DATA } from '../../../../store/slices/createPageSlice';
import { colorThemeData } from '../../../../constants/themeData';
import { setTimeout } from 'timers';

type MyDatum = { date: Date, stars: number }

export type PaperPrintProps = {
    state: PageState,
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
    state,
    mapStyle = colorThemeData[0].mapStyle,
    colors:{activity, background, elevation, primaryText, secondaryText},
}) => {
    const mapContainer = useRef(null);
    const map = useRef<Map|null>(null);
    const [lng, setLng] = useState(-70.9001);
    const [lat, setLat] = useState(42.5599);
    const [zoom, setZoom] = useState(14);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            center: [lng, lat],
            zoom: zoom,
            attributionControl:true,
        });
        const setMapData = () =>{
            setLng(parseFloat(map!.current!.getCenter().lng.toFixed(4)));
            setLat(parseFloat(map!.current!.getCenter().lat.toFixed(4)));
            setZoom(parseFloat(map!.current!.getZoom().toFixed(2)));
        }
        // map.current.on('move', setMapData);

        return ()=>{
            // map.current?.off('move', setMapData)
        }
    });

    useEffect(() => {
        map.current?.setStyle(mapStyle);
    }, [mapStyle,])


    const { text:{title, subtitle}, orientation, elevationProfile, valueLabels } = state;
    useEffect(() => {
        setTimeout(()=> map.current?.resize(), 300);
    }, [title, subtitle, orientation, elevationProfile])


    return (
        <div className={[css.paper, state.orientation === 'landscape' ? css.paper_landscape : '' ].join(' ')} style={{ backgroundColor: background }}>
            <div className={css.content_wrapper}>
                <div ref={mapContainer} className={`${css.mapbox_wrapper} map-container`}>

                </div>
                {state.elevationProfile &&
                    <figure className={[css.graph].join(' ')} style={{backgroundColor: elevation}}/>
                }

                {(title || subtitle || valueLabels.some(({value, label})=>!!value || !!label)) &&
                    <div className={[css.bottom_container].join(' ')}>
                        <div className={[css.heading_container].join(' ')}>
                            {title && <h1 style={{color: primaryText}}>{title}</h1>}
                            {subtitle && <p style={{color: secondaryText}}>{subtitle}</p>}
                        </div>

                        <div className={[css.value_label_outer].join(' ')}>
                            {
                                valueLabels.map(({id, value, label})=>(
                                    // (value || label) &&
                                    <div key={id} className={[css.value_label_inner].join(' ')}>
                                        <div style={{backgroundColor: secondaryText}} className={css.value_label_divider}></div>
                                        {<h2 style={{ color: primaryText }}>{value}</h2>}
                                        {<p style={{ color: secondaryText }}>{label}</p>}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

const addLayerToMap = (
    map: Map, layerData: mapboxgl.AnyLayer,
    useDashedLined: boolean,
    endpoints: boolean,
) => {
    map.addLayer({
        ...layerData,
        type: 'line',
        layout: {
            "line-join": 'round',
            "line-cap": 'round',
        },
        paint: {

        }
    })
}

export default PaperPrint