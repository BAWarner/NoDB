import React, { Component } from 'react';
import axios from 'axios';

class Media extends Component{
    constructor(){
        super();
        this.state = {
            checkedOut: false
        }
        this.removeMedia = this.removeMedia.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
    }
    removeMedia(){
        let id = this.props.collection.id;

        axios
        .delete(`/api/collections/${id}`)
        .then( res => {
                this.props.updateCollection(res.data);
            }
        )
        .catch( err => console.log(err) )
    }

    changeChecked(){
        let id = this.props.collection.id;
        axios
        .put(`/api/collections/${id}`)
        .then( res => {
                this.props.updateCollection(res.data);
            } 
        )
        .catch( err => console.log(err) );
    }

    render(){
        let { title, type, poster, releaseYear, genre, checkedOut } = this.props.collection;
        return(
            <div className="singleMedia">
                <span onClick={this.changeChecked} className="checked out">Checked Out
                {
                    checkedOut === true
                        ? <span><em>checked</em></span>
                        : null
                }
                </span>
                <button onClick={this.editMedia}>Edit</button>
                <button onClick={this.removeMedia}>Remove</button>
                <img 
                    src={ 
                        poster
                        ? poster
                        : 'link_to_placeholder_image.com'
                     } 
                    alt="poster"
                />
                {title}
                {type}
                {releaseYear}
                {genre}
            </div>
        )
    }
}

export default Media;