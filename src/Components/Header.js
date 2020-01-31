import React, { Component } from 'react';
import axios from 'axios';


export default class Header extends Component{
    filterCollections = (e) => {
        let targetType = e.target.id;
        console.log(e.target.id);
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
    render(){
        return(
            <header className="flex justify-between align-center">
                <div>
                    <img onClick={this.resetQuery} className="logo" src='' alt='Logo'/>
                </div>
                <div>
                    <nav> 
                            {/* Phase 2 - dynamically get catgories from objects */ 
                             /** Phase 2 - show in nav all by checked out **/
                            }
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
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}