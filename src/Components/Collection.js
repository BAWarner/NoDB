import React, { Component } from 'react';
import Media from './Media';


class Collection extends Component{
    render(){
        let mapMe = this.props.collection.map( (media, index) => {
                return(
                    <Media
                        key={index}
                        collection={media}
                        updateCollection={this.props.updateCollections}
                    />
                );
            }
        );
        return(
            <div>
                <h1>My Media Collection</h1>
                {mapMe}
            </div>
        );
    }

}


export default Collection;