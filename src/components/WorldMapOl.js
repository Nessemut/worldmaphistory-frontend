import OlMap from "ol/Map";
import React, {useEffect, useState} from 'react';
import Map from "ol/Map";
import Control from "ol/control/Control"
import OlView from "ol/View";
import Ol from "ol"
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {GeoJSON} from "ol/format";
import {Fill, Stroke, Style, Text} from 'ol/style';
import View from "ol/View";
import 'ol/ol.css';
import Vector from "ol/source/Vector";
import OSM from "ol/source/OSM";
import {ZoomToExtent, defaults as defaultControls} from 'ol/control';
import buildUrl from "../util/urlBuilder"


const WorldMapOl = (props) => {

    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(1);
    const [projection, setProjection] = useState('EPSG:4326')
    /*const [vectorLayer, setVectorLayer] = useState(new VectorLayer({
        source: new VectorSource({
            url: buildUrl(props.year),
            format: new GeoJSON(),
        }),
        style: feature => {
            highlightStyle.getText().setText(feature.get('name'));
            return style;
        }
    }))*/


    const style = new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new Stroke({
            color: '#319FD3',
            width: 1,
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: '#000',
            }),
            stroke: new Stroke({
                color: '#fff',
                width: 3,
            }),
        }),
    });

    let highlightStyle = new Style({
        stroke: new Stroke({
            color: '#f00',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.1)',
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: '#000',
            }),
            stroke: new Stroke({
                color: '#f00',
                width: 3,
            }),
        }),
    });


    let vectorLayer = new VectorLayer({
        source: new VectorSource({
            url: buildUrl(props.year),
            format: new GeoJSON(),
        }),
        style: feature => {
            highlightStyle.getText().setText(feature.get('name'));
            return style;
        }
    });

    let terrainLayer = new TileLayer({
        source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {
                'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
                'TILED': false,
            },
        }),
    });

    let map = new OlMap({
        target: null,
        layers: [terrainLayer, vectorLayer],
        view: new View({
            center: center,
            zoom: zoom,
            projection: projection,
            opacity: 0.5
        }),
        controls: [],
        interactions: defaultInteractions({
            doubleClickZoom: true,
            dragAndDrop: true,
            dragPan: true,
            keyboardPan: false,
            keyboardZoom: false,
            mouseWheelZoom: true,
            pointer: false,
            select: false
        })
    })

    map.setTarget("map")


    useEffect(() => {
        //map.getLayers().item(1).dispose()
        map.addLayer(new VectorLayer({
            renderMode: 'vector',
            force: true,
            alwaysRerenderOnChange: true,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            style: feature => {
                highlightStyle.getText().setText(feature.get('name'));
                return style;
            }
        }));
    }, [props.year])

    return (
        <div>
            <div id="map" style={{width: "100%", height: "100%", position: "fixed"}}></div>

        </div>
    )
}

export default WorldMapOl;
