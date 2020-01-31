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
            <main>
                <h1 className="text-center mrg-btm-65">My Media Collection</h1>
                <div className="collection-wrap flex justify-center flex-wrap">
                    {mapMe}
                </div>
            </main>
        );
    }

}


export default Collection;