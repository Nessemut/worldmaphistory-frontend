import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from "./components/MainPage";
import {View} from 'react-native';
import './App.css';


class Header extends Component {
    render() {
        return (
            <div id={"App-header"}>
                <View style={{flex: 1, flexDirection: 'row'}}>

                    <a className={"titleName"}>WorldMapHistory</a>

                </View>
            </div>
        );
    }
}

function App() {
    return (
        <Router>
            <div className="App container py-3">
                <Header/>
                <Switch>
                    <Route path='/' component={MainPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
