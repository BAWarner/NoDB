import React from 'react';
import Media from './Media';


function Collection(props){
    let mappedMedia = props.collection.map( (media, index) => {
            return(
                <Media
                    key={index}
                    collection={media}
                    updateCollection={props.updateCollections}
                />
            );
        }
    );
    return(
        <main>
            <h1 className="text-center mrg-btm-65">My Media Collection</h1>
            <div className="collection-wrap flex justify-center flex-wrap">
                {mappedMedia}
            </div>
        </main>
    );
}




export default Collection;