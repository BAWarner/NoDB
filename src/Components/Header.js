import React, { Component } from 'react';
import axios from 'axios';


export default class Header extends Component{
    constructor(){
        super();
        this.state = {
            searchQuery: ''
        }
    }
    filterCollections = (e) => {
        let targetType = e.target.id;
        axios
        .get(`/api/collections?type=${targetType}`)
        .then( res => {
                this.props.updateCollections(res.data);
            } 
        )
        .catch( err => console.log(err) );
    }
    resetQuery = () => {
        axios
        .get('/api/collections')
        .then(res => {
                this.props.updateCollections(res.data);
            } 
        )
        .catch( err => console.log(err) );
    }
    addNewMedia = () => {
        this.props.showAddNew(true);
    }
    handleSearch = (e) => {
        this.setState({ searchQuery: e.target.value });
    }
    sendSearch =  () => {
        axios
        .get(`/api/collections?search=${this.state.searchQuery}`)
        .then( res => {
                this.props.updateCollections(res.data);
            } 
        )
        .catch( err => console.log(err) );
    }
    render(){
        return(
            <header className="flex justify-between align-center">
                <div>
                    <img onClick={this.resetQuery} className="logo" src='' alt='Logo'/>
                </div>
                <div>
                    <nav> 
                        <ul className="flex justify-evenly align-center">
                            <li 
                                id="movies" 
                                onClick={this.filterCollections}
                            >Movies</li>
                            <li 
                                id="series" 
                                onClick={this.filterCollections}
                            >TV</li>
                            <li 
                                id="books"
                                onClick={this.filterCollections} 
                            >Books</li>
                            <li 
                                id="music"
                                onClick={this.filterCollections}
                            >Music</li>
                            <li 
                                id="checkedOut"
                                onClick={this.filterCollections}
                            >Checked Out</li>
                            <li
                                onClick={this.addNewMedia}
                            >Add New</li>
                            <li className='search'><input onChange={this.handleSearch} type="text" /><button onClick={this.sendSearch}>Search</button></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}