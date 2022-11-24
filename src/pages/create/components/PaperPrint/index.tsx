import React, { FC, useRef, useEffect, useState, useMemo, useCallback } from 'react'
import mapboxgl, { AnySourceData, LngLatLike, Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN as string;

import 'mapbox-gl/dist/mapbox-gl.css';

import css from './paperprint.module.css';
import { PageState, TRACKING_DATA } from '../../../../store/slices/createPageSlice';
import { colorThemeData } from '../../../../constants/themeData';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// type MyDatum = { date: Date, stars: number }

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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const graph_Port_ratio = 1131 / 80
const graph_Land_ratio = 1624 / 80

const PaperPrint: FC<PaperPrintProps> = ({
    state,
    mapStyle = colorThemeData[0].mapStyle,
    colors: { activity, background, elevation, primaryText, secondaryText },
}) => {
    const { text: { title, subtitle }, theme, orientation, layout, elevationProfile, valueLabels, trails, useDashedLined, endpoints, activityThickness, colors } = state;
    const isPortrait = orientation === 'portrait';

    const mapContainer = useRef(null);
    const map = useRef<Map | null>(null);
    const [lng, setLng] = useState(-70.9001);
    const [lat, setLat] = useState(42.5599);
    const [zoom, setZoom] = useState(14);

    const addNewLayer = useCallback(() => {
        if (trails.length === 0) return;

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
    }, [trails, activity, activityThickness])

    const addSourceAndLayers = ()=>{
        console.log('addSourceAndLayers')
        if (trails.length === 0) {
            return
        };
        console.log('trails new')

        try {
            const geojson = {
                'type': 'FeatureCollection',
                'features': trails.map(({ mapDetail }) => {
                    //@ts-ignore
                    const isPoint = mapDetail.geometry.type === 'Point';
                    //@ts-ignore
                    const is2D = Array.isArray(mapDetail.geometry.coordinates[0]) && !Array.isArray(mapDetail.geometry.coordinates[0][0])
                    //@ts-ignore
                    // const is3D = Array.isArray(mapDetail.geometry.coordinates[0][0]) && !Array.isArray(mapDetail.geometry.coordinates[0][0][0])
                    var newCoordinates;
                    if (isPoint) {
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.slice(0, 2);
                    } else if (is2D) {
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.map(coord => coord.slice(0, 2));
                    }/* else if(is3D){
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates.map(coord => coord.map(coord2=>coord2.slice(0,2)));
                    } */else {
                        //@ts-ignore
                        newCoordinates = mapDetail.geometry.coordinates;
                    }
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'properties': mapDetail.properties,
                            //@ts-ignore
                            'coordinates': newCoordinates,
                        }
                    }
                })
            };

            console.log({geojson})

            map.current?.addSource('LineString', {
                'type': 'geojson',
                //@ts-ignore
                'data': geojson,
            });

            addNewLayer();

        } catch (error) {
            console.warn(error)
        }
    }


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            style: mapStyle,
            container: mapContainer.current || '',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: true,
        });

        map.current?.on('styledata', addSourceAndLayers)
    });


    const fitToNewBounds = useCallback(() => {
        if (trails.length==0) return;
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
            .filter((a) => (!isNaN(a[0] && a[1])));

        console.log(bounds);

        const lngLatBounds = new mapboxgl.LngLatBounds(
            bounds[0],
            bounds[0]
        );

        for (const coord of bounds) {
            lngLatBounds.extend(coord);
        }
        map.current?.fitBounds(lngLatBounds, {
            padding: 80
        });
    }, [trails])

    useEffect(() => {
        setTimeout(() => {map.current?.resize(); fitToNewBounds();}, 300);
    }, [title, subtitle, orientation, elevationProfile])

    useEffect(() => {
        map.current?.setStyle(mapStyle);
    }, [mapStyle])

    useEffect(()=>fitToNewBounds(), [fitToNewBounds])
    useEffect(() => addSourceAndLayers(), [trails,])


    const elevationData = useMemo(()=>{
        if (trails.length === 0) return [];
        console.log('trails')

        //@ts-ignore
        const elevation = trails.reduce((acc, trail) => {
            return [
                    ...acc,
                    //@ts-ignore
                    ...((trail.mapDetail.geometry.coordinates) || [])
                    //@ts-ignore
                ].map(a => (a[2] || 0))
        }
            , [] as LngLatLike[])
            //@ts-ignore

        // console.log({elevation});
        map.current?.resize();
        return elevation
    }, [trails])

    return (
        <div className={[css.paper, !isPortrait ? css.paper_landscape : ''].join(' ')} style={{ backgroundColor: background }}>
            <div className={(layout === '2' || layout === '4') ? css.content_wrapper_rev : css.content_wrapper}>
                <div ref={mapContainer} className={`${css.mapbox_wrapper} map-container`}>
                </div>

                {elevationData.length > 0  &&
                    <Line className={[css.graph].join(' ')}
                            options={{
                                aspectRatio: orientation === 'portrait' ? graph_Port_ratio : graph_Land_ratio  ,
                                responsive: true,
                                plugins: {
                                    legend: { display: false, },
                                    title: { display: false, },
                                },

                                scales:{
                                    x: { display: false, },
                                    y: { display: false, },
                                }
                            }}

                            data={{
                                labels,
                                datasets: [
                                    {
                                        fill: true,
                                        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                                        data: elevationData,
                                        // borderColor: colors.elevation,
                                        backgroundColor: elevation,
                                        borderWidth: 0,
                                        pointRadius: 0,
                                    },
                                ],
                            }}
                        />
                }



                {(title || subtitle || valueLabels.some(({ value, label }) => !!value || !!label)) &&
                    <div className={[css.bottom_container, (layout === '3' || layout === '4') ? "flex-col items-center gap-4" : ''].join(' ')}>
                        <div className={[css.heading_container, (layout === '3' || layout === '4') ? "items-center" : ''].join(' ')}>
                            {title && <h1 style={{ color: primaryText }}>{title}</h1>}
                            {subtitle && <p style={{ color: secondaryText }}>{subtitle}</p>}
                        </div>

                        <div className={[css[(isPortrait && (layout === '1' || layout === '2')) ? 'value_label_outer' :'value_label_outer_ls']].join(' ')}>
                            {
                                valueLabels.map(({ id, value, label }, ind) => (
                                    // (value || label) &&
                                    <div key={id} className={[
                                            css.value_label_inner,
                                            (!isPortrait && (layout === '3' || layout === '4')) ? 'flex-row-reverse items-baseline gap-2' : '',
                                            (isPortrait && (layout === '3' || layout === '4')) ? 'text-center' : '',
                                            ].join(' ')}
                                    >
                                        {!((layout === '3' || layout === '4') && ind === 0) && <div style={{ backgroundColor: secondaryText }} className={css.value_label_divider}></div>}
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