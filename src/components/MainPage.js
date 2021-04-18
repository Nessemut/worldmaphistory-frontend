import React, {useEffect, useState} from 'react';
import BottomBar from "./BottomBar"
import WorldMap from "./WorldMap";

const MainPage = () => {

    const [year, setYear] = useState(-1200);


    return(
        <div>
            <WorldMap year={year} />
            <BottomBar yearSetter={setYear} year={year}/>
        </div>
    )

}

export default MainPage;