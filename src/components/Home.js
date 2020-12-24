import React, {Component} from 'react';
import WorldMap from "./Map";
import BottomBar from "./BottomBar"

class Home extends Component {
    render() {
        return (
            <div>
                <WorldMap />
                <BottomBar />
            </div>
        );
    }
}

export default Home;