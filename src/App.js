import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
class App extends Component {
    state = {
      search: false
    }

    toggleSideBar(){
        if(!this.state.search){
            this.setState({search: true});
        }

    }
    render() {
        return (
            <div id='page'>
                <div className="button" onClick={()=>{this.setState({search: !this.state.search});}}>
                    <div className="bar"></div>
                    <div className="barm"></div>
                    <div className="bar"></div>
                </div>
                <Map toggleSideBar={()=>{this.toggleSideBar();}} search={this.state.search}/>
            </div>
        );
    }
}

export default App;
