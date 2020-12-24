import YearSlider from "./YearSlider";
import {Component} from "react/cjs/react.production.min";

class BottomBar extends Component {

    render() {
        return (
            <div className={"bottomBar"}>
                <YearSlider />
            </div>
        );
    }
}

export default BottomBar;