import React, {useEffect, useState} from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {Play, SkipBackward, SkipForward, Stop} from 'react-bootstrap-icons';

const YearSlider = () => {

    const limitYears = {
        max: parseInt(new Date().getFullYear()),
        starting: -3800
    }

    const speeds = [1, 2, 5, 10, 50, 100, 200];
    const [speed, setSpeed] = useState(2);
    const [year, setYear] = useState(0);
    const [autoRun, setAutorun] = useState(true);

    const formatYear = (year) => {
        if (year < 0) return year * -1 + ' BCE'
        else return year + ' CE'
    }

    const changeSpeed = (sum) => {
        setAutorun(true)
        setSpeed(prevSpeed => {
            const l = speeds.length - 1
            if (!sum && prevSpeed === 0) {
                return 0
            } else if (sum && prevSpeed === l) {
                return l
            }
            return sum ? prevSpeed + 1 : prevSpeed - 1
        })
    }

    const increaseYear = () => {
        setYear(prevYear => {
            if (prevYear < limitYears.max) return prevYear + 1
            setAutorun(false)
            return limitYears.max
        });
    }

    useEffect(() => {
        if (autoRun) {
            const interval = window.setInterval(increaseYear, 2000 / speeds[speed])
            return () => {
                clearInterval(interval)
            }
        }
    }, [speed, autoRun])

    useEffect(() => {
        // TODO: update map every year
    }, [year])

    return (
        <div>
            <div className={"yearSlider"}>
                <RangeSlider
                    className={"yearRangeSlider"}
                    value={year}
                    min={limitYears.starting}
                    max={limitYears.max}
                    onChange={(y) => setYear(parseInt(y.target.value))}
                    variant='secondary'
                    tooltip='off'
                />
                <h1 className={"yearCounter"}>{formatYear(year)}</h1>
                <button className={"timeControlButton"} onClick={() => changeSpeed(false)}>
                    <SkipBackward size={24}/>
                </button>
                <button className="timeControlButton" onClick={() => setAutorun(!autoRun)}>
                    {
                        autoRun ? <Stop size={24}/> : <Play size={24}/>
                    }
                </button>
                <button className={"timeControlButton"} onClick={() => changeSpeed(true)}>
                    <SkipForward size={24}/></button>

            </div>
        </div>
    )

}

export default YearSlider