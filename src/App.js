import React from 'react';
import './App.scss';
import Header from './Components/Header';
import AddMedia from './Components/AddMedia';
import Collection from './Components/Collection';
import axios from 'axios';
import Footer from './Components/Footer';

class App extends React.Component{
    constructor(){
      super();
      this.state = {
        collection: [],
        showAddNew: false,
      }
      this.updateCollections = this.updateCollections.bind(this);
      this.toggleNewMedia = this.toggleNewMedia.bind(this);
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
    toggleNewMedia(showForm){
      this.setState({showAddNew: showForm});
    }
    render(){
      return (
        <div>
          {
            this.state.showAddNew === true
              ? <AddMedia 
                  toggleNewMedia={this.toggleNewMedia}
                  updateCollections={this.updateCollections}
                />
              : null
          
          }
          <Header
            updateCollections={this.updateCollections}
            showAddNew={this.toggleNewMedia}
          />
          <Collection 
            collection={this.state.collection}
            updateCollections={this.updateCollections}
          />
          <Footer />
        </div>
    );
  }
}

export default App;
