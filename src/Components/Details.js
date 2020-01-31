import React from 'react';

function Details(props){
    let { genre, director, network, seasons, runtime, checkedOut, checkedTo  } = props.collection;
    if(runtime){
        runtime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    }
    return(
        <div className="details">
            {
                director
                    ? <span className="single-info block">Director: {director}</span>
                    : null
            }
            {
                network
                    ? <span className="single-info block">Network: {network}</span>
                    : null
            }
            {
                seasons
                    ? <span className="single-info block">{seasons} Season(s)</span>
                    : null
            }
            {
                runtime
                    ? <span className="single-info block">{runtime}</span>
                    : null
            }
            {
                genre
                    ? <span className="single-info block">{genre}</span>
                    : null
            }
            {
                checkedOut === true
                    ? <>
                        {
                            checkedTo.person && checkedTo.dateCheckedOut
                                ? <span className="single-info block">Checked out to: {checkedTo.person} on         {checkedTo.dateCheckedOut}</span>
                                : null
                        }
                      </>
                    : null
            }
        </div>
      )
}


export default Details;