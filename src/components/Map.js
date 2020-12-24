import React, {Component} from "react";
import OlMap from "ol/Map";
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

class WorldMap extends Component {
    constructor(props) {
        super(props);

        let layer =
            new TileLayer({
                source: new TileWMS({
                    url: 'https://ahocevar.com/geoserver/wms',
                    params: {
                        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
                        'TILED': false,
                    },
                }),
            });


        this.state = {center: [0, 0], zoom: 2, projection: 'EPSG:4326'};

        this.olmap = new OlMap({
            target: null,
            layers: [layer],
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom,
                projection: this.state.projection,
                opacity: 0.1
            }),
            /*controls : new Control({
                attribution : false,
                zoom : false,
            }),*/
            interactions: defaultInteractions({
                doubleClickZoom: true,
                dragAndDrop: true,
                dragPan: true,
                keyboardPan: false,
                keyboardZoom: false,
                mouseWheelZoom: true,
                pointer: false,
                select: false
            }),
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");

        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({center, zoom});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        return !(center === nextState.center && zoom === nextState.zoom);
    }

    userAction() {
        this.setState({center: [546000, 6868000], zoom: 5});
    }

    render() {
        this.updateMap();
        return (
            <div id="map" style={{width: "100%", height: "900px"}}>

            </div>
        );
    }
}

export default WorldMap;
