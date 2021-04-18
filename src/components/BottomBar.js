import YearSlider from "./YearSlider";
import React, {useState} from 'react';
import {ChevronDoubleDown, ChevronDoubleUp} from "react-bootstrap-icons";

const BottomBar = (props) => {

    const [visible, setVisible] = useState(true);


    return (
        <div>
            {
                visible ? <div className={"bottomBar"}>
                        <button className={"chevronButton"}
                                onClick={() => setVisible(false)}
                        >
                            <ChevronDoubleDown size={20}/>
                        </button>
                        <YearSlider yearSetter={props.yearSetter} year={props.year}/>
                    </div>
                    :
                    <button className={"chevronButton"}
                            onClick={() => setVisible(true)}
                    >
                        <ChevronDoubleUp size={20}/>
                    </button>
            }
        </div>
    );

};

export default BottomBar;