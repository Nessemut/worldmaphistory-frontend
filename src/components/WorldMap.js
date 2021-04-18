import {GeoJSON, MapContainer, TileLayer} from 'react-leaflet';
import urlBuilder from "../util/urlBuilder";
import {useEffect, useState} from "react";


const WorldMap = props => {

    const position = [0, 0]
    const [territories, setTerritories] = useState([])

    const territoryIsToBeUpdated = (temp, receivedTerritory) => {
        let index = 0
        let isThere = false
        territories.forEach(territory => {
            if (territory.key === receivedTerritory.key) {
                isThere = true;
            } else if (territory.name === receivedTerritory.name) {
                let temp = territories
                temp.splice(index)
                temp.push(receivedTerritory)
                isThere = true;
            }
            index += 1
        });
        if (!isThere) {
            temp.push(receivedTerritory)
        }
    }

    const manageCurrentTerritories = () => {
        let temp = territories
        fetch(urlBuilder(props.year))
            .then(res => res.json())
            .then(data => {
                data.forEach(territory => {
                    let t = {
                        key: territory.key,
                        polygon: territory.polygon,
                        style: territory.style,
                        name: territory.name
                    }
                    territoryIsToBeUpdated(temp, t)
                })
            })
        setTerritories(temp)
    }


    useEffect(() => {
        console.log(territories)
        manageCurrentTerritories()
    }, [props.year])


    const getGeoJsonComponents = () => {
        return territories.map(territory => {
            return (
                <GeoJSON
                    key={territory.key}
                    style={territory.style}
                    data={territory.polygon}
                />
            )
        })
    }


    return (
        <MapContainer
            center={position}
            zoom={2}
            minZoom={3}
            maxZoom={7}
            scrollWheelZoom={true}
            style={{width: "100%", height: "100%", position: "fixed"}}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
            />

            {getGeoJsonComponents()}

        </MapContainer>

    );
};

export default WorldMap;