import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl, { AnyLayer, AnySourceData, GeoJSONSourceOptions, LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';

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

const id = 'LineString';

const PaperPrint: FC<PaperPrintProps> = ({
    state,
    mapStyle = colorThemeData[0].mapStyle,
    colors: { activity, background, elevation, primaryText, secondaryText },
}) => {
    const mapContainer = useRef(null);
    const map = useRef<Map | null>(null);
    const [lng, setLng] = useState(-70.9001);
    const [lat, setLat] = useState(42.5599);
    const [zoom, setZoom] = useState(14);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: true,
        });

        const setMapData = () =>{
            // setLng(parseFloat(map!.current!.getCenter().lng.toFixed(4)));
            // setLat(parseFloat(map!.current!.getCenter().lat.toFixed(4)));
            // setZoom(parseFloat(map!.current!.getZoom().toFixed(2)));
            console.log('yolo')
        }
        // map.current.on('load', setMapData);


        return () => {
            // map.current?.off('load', setMapData)
        }
    });

    useEffect(() => {
        map.current?.setStyle(mapStyle);
    }, [mapStyle,])


    const { text: { title, subtitle }, theme, orientation, elevationProfile, valueLabels, trails, useDashedLined, endpoints, activityThickness } = state;
    useEffect(() => {
        setTimeout(() => map.current?.resize(), 300);
    }, [title, subtitle, orientation, elevationProfile])

    useEffect(() => {
        if (!map.current) return; // initialize map only once

        const src = map.current.getSource(id);
        const layer = map.current.getLayer(id);
        if (layer) {
            map.current.removeLayer(id)
        }
        if (src && map.current.isSourceLoaded(id)) {
            map.current.removeSource(id)
        }

        if (trails.length === 0) return;
        console.log('trails')

        //@ts-ignore
        const bounds: LngLatLike[] = trails.reduce((acc, trail) => {
                return trail.mapDetail.geometry.type === 'Point'
                ?
                acc
                :
                [
                    ...acc,
                    //@ts-ignore
                    ...((trail.mapDetail.geometry.coordinates) || [])
                //@ts-ignore
                ].map(a => ([a[0], a[1]]))
                }
                , [] as LngLatLike[])
            //@ts-ignore
            .filter((a)=> (!isNaN(a[0] && a[1])));

        console.log(bounds);

        const lngLatBounds = new mapboxgl.LngLatBounds(
            bounds[0],
            bounds[0]
        );

        for (const coord of bounds) {
            lngLatBounds.extend(coord);
        }
        map.current.fitBounds(lngLatBounds, {
            padding: 80
        });

        try {
            const geojson = {
                'type': 'FeatureCollection',
                'features': trails.map(({mapDetail})=>{
                    //@ts-ignore
                    const isPoint = mapDetail.geometry.type === 'Point';
                    //@ts-ignore
                    const is2D = Array.isArray(mapDetail.geometry.coordinates[0]) && !Array.isArray(mapDetail.geometry.coordinates[0][0])
                    //@ts-ignore
                    // const is3D = Array.isArray(mapDetail.geometry.coordinates[0][0]) && !Array.isArray(mapDetail.geometry.coordinates[0][0][0])
                    var newCoordinates;
                    if(isPoint){
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.slice(0,2);
                    }else if(is2D){
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.map(coord => coord.slice(0,2));
                    }/* else if(is3D){
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.map(coord => coord.map(coord2=>coord2.slice(0,2)));
                    } */else{
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates;
                    }
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'properties': mapDetail.properties,
                            //@ts-ignore
                            'coordinates':  newCoordinates,
                        }
                    }
                })
            };

            // console.log({geojson})

            map.current.addSource('LineString', {
                'type': 'geojson',
                //@ts-ignore
                'data': geojson
            });

            map.current.addLayer({
                'id': 'LineString',
                'type': 'line',
                'source': 'LineString',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    "line-color": activity,
                    "line-width": activityThickness
                }
            });
        } catch (error) {
            console.warn(error)
        }

    }, [trails])

    useEffect(() => {
        // if (!map.current) return; // initialize map only once
        if (trails.length === 0) return;

        if (trails.length > 0) {
            const layer = map.current?.getLayer(id);
            if (layer) {
                map.current?.removeLayer(id)
            }
        }

        try {
            map.current?.addLayer({
                'id': 'LineString',
                'type': 'line',
                'source': 'LineString',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    "line-color": activity,
                    "line-width": activityThickness
                }
            });

        } catch (error) {
            console.warn(error)
        }

    },[activity, activityThickness, trails.length])


    return (
        <div className={[css.paper, state.orientation === 'landscape' ? css.paper_landscape : ''].join(' ')} style={{ backgroundColor: background }}>
            <div className={css.content_wrapper}>
                <div ref={mapContainer} className={`${css.mapbox_wrapper} map-container`}>

                </div>
                {state.elevationProfile &&
                    <figure className={[css.graph].join(' ')} style={{ backgroundColor: elevation }} />
                }

                {(title || subtitle || valueLabels.some(({ value, label }) => !!value || !!label)) &&
                    <div className={[css.bottom_container].join(' ')}>
                        <div className={[css.heading_container].join(' ')}>
                            {title && <h1 style={{ color: primaryText }}>{title}</h1>}
                            {subtitle && <p style={{ color: secondaryText }}>{subtitle}</p>}
                        </div>

                        <div className={[css.value_label_outer].join(' ')}>
                            {
                                valueLabels.map(({ id, value, label }) => (
                                    // (value || label) &&
                                    <div key={id} className={[css.value_label_inner].join(' ')}>
                                        <div style={{ backgroundColor: secondaryText }} className={css.value_label_divider}></div>
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
    map: Map, layerData: AnySourceData,
    {
        useDashedLined,
        endpoints,
        activity,
        activityThickness,
    }:
    {
        useDashedLined: boolean,
        endpoints: boolean,
        activity: string,
        activityThickness: number
    }
) => {
    // map.addLayer({
    //     type: 'line',
    //     layout: {
    //         "line-join": 'round',
    //         "line-cap": 'round',
    //     },
    //     paint: {
    //         "line-color": activity,
    //         "line-width": activityThickness
    //     }
    // })

}

export default PaperPrint