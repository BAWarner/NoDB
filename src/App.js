import React from 'react';
import './App.scss';
import Header from './Components/Header';
import Collection from './Components/Collection'
import axios from 'axios';

class App extends React.Component{
    constructor(){
      super();
      this.state = {
        collection: []
      }
      this.updateCollections = this.updateCollections.bind(this);
    }
    componentDidMount(){
      axios
      .get(`/api/collections`)
      .then( res => this.setState({collection: res.data}) )
      .catch( err => console.log(err) );

    }
    updateCollections(updatedCollection){
      this.setState({collection: updatedCollection});
    }
    render(){
      return (
        <div>
          <Header />
          <Collection 
            collection={this.state.collection}
            updateCollections={this.updateCollections}
          />
        </div>
    );
  }
}

export default App;
