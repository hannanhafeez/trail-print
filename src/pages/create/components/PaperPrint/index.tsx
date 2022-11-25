import React, { FC, useRef, useEffect, useState, useMemo, useCallback, useLayoutEffect } from 'react'

const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN as string;

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Layer, LngLatLike, MapRef, Source, } from 'react-map-gl';
import {bbox, lineString,} from '@turf/turf';

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
import { Feature, GeoJsonProperties, Geometry } from 'geojson';

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
    mapStyle?: string,
    colors: {
        primaryText: string,
        secondaryText: string,
        background: string,
        activity: string,
        elevation: string,
    }
}

const id = 'LineString';
const INITIAL_MAP_STATE = { longitude: -70.90001, latitude: 42.5599, zoom: 14 }
const graph_Port_ratio = (1131 / 80) , graph_Land_ratio = (1624 / 80);

const PaperPrint: FC<PaperPrintProps> = ({
    state,
    mapStyle = colorThemeData[0].mapStyle,
    colors: { activity, background, elevation, primaryText, secondaryText },
}) => {
    const { text: { title, subtitle }, /* geoJson, */ orientation, layout, elevationProfile, valueLabels, trails, useDashedLined, activityThickness } = state;
    const isPortrait = orientation === 'portrait';

    const mapRef = useRef<MapRef>(null);

    const fitToBounds = useCallback(() => {
        if (trails.length == 0) return;
        //@ts-ignore
        const bounds = trails.reduce((acc, trail) => {
            return trail.mapDetail.geometry.type === 'Point'
                ? acc
                : [
                    ...acc,
                    //@ts-ignore
                    ...((trail.mapDetail.geometry.coordinates) || [])
                    //@ts-ignore
                ].map(a => ([a[0], a[1]]))
        }
            , [] as LngLatLike[])
            //@ts-ignore
            .filter((a) => (!isNaN(a[0] && a[1])));

        // console.log({bounds});

        const line = lineString(bounds);

        const [minLng, minLat, maxLng, maxLat] = bbox(line);
        console.table({minLng, minLat, maxLng, maxLat})

        mapRef.current?.fitBounds(
            [
                [maxLng, maxLat],
                [minLng, minLat],
            ],
            { padding: 80, duration: 2000 }
        );
    }, [trails])

    useLayoutEffect(()=>{
        fitToBounds();
    }, [trails])

    useEffect(()=>{
        setTimeout(()=>mapRef.current?.resize(), 300)
    },[title, subtitle, orientation, elevationProfile])

    const geojson = useMemo(()=>{
       return ({
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
       } as unknown) as Feature<Geometry, GeoJsonProperties>
    }, [trails])

    const elevationData = useMemo(()=>{
        if (trails.length === 0) return [];
        console.log('trails')

        //@ts-ignore
        const elevation = trails.reduce((acc, trail) => {
            return [
                    ...acc,
                    //@ts-ignore
                ...((trail.mapDetail.geometry.coordinates) || []).map(a => (a[2] || 0))
                    //@ts-ignore
                ]
            }
            , [] as number[])
            //@ts-ignore

        console.log({elevation});
        mapRef.current?.resize();
        return elevation
    }, [trails])

    return (
        <div className={[css.paper, !isPortrait ? css.paper_landscape : ''].join(' ')} style={{ backgroundColor: background }}>
            <div className={(layout === '2' || layout === '4') ? css.content_wrapper_rev : css.content_wrapper}>

                <Map ref={mapRef} mapboxAccessToken={MAP_TOKEN}
                    initialViewState={INITIAL_MAP_STATE}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle={mapStyle}
                    logoPosition={'top-left'}
                    attributionControl={false}
                >
                    <Source id='my-geojson' type="geojson" data={geojson}>
                        <Layer
                            id={id}
                            type='line'
                            layout={{
                                "line-join": "round", "line-cap": 'round',
                            }}
                            paint={{
                                "line-color": activity,
                                "line-width": activityThickness,
                                ...(useDashedLined &&{ "line-dasharray": [3, 3]}),
                            }}
                        />

                    </Source>
                </Map>

                {elevationData.length > 0 && elevationProfile &&
                    <Line className={[css.graph].join(' ')}
                            options={{
                                aspectRatio: orientation === 'portrait' ? graph_Port_ratio : graph_Land_ratio  ,
                                responsive: true,
                                plugins: {
                                    legend: { display: false, },
                                    title: { display: false, },
                                },

                                scales:{
                                    x: { display: false,},
                                    y: {
                                        display: false,
                                        // min: Math.min(...elevationData), // max: Math.max(...elevationData),
                                    },
                                }
                            }}

                            data={{
                                labels: elevationData,
                                datasets: [
                                    {
                                        fill: true,
                                        // data: [0, 5, 2],
                                        data: elevationData,
                                        // data: elevationData.slice(0,2),
                                        backgroundColor: elevation,
                                        borderWidth: 0, pointRadius: 0,
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

/* const addLayerToMap = (
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

} */

export default PaperPrint