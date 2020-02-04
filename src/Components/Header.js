import React, { Component } from 'react';
import axios from 'axios';


export default class Header extends Component{
    constructor(){
        super();
        this.state = {
            searchQuery: '',
            showAll: true
        }
    }
    componentDidMount(){
        let showAll = this.props.showAllVal;
        this.setState({showAll})
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
    showAll = () => {
        this.setState({showAll: !this.state.showAll});
        this.props.showAll();
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
                    <img onClick={this.resetQuery} className="logo" src='https://4cd6f516swoxc9lfa735xv12-wpengine.netdna-ssl.com/wp-content/themes/Pixability/src/img/home/icon-youtube.png' alt='Logo'/>
                    <span onClick={this.showAll} className="show-all ">Show {this.state.showAll === true ? 'Carousel' : 'All'}</span>
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