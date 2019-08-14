import * as React from 'react';

let TypesOfRequest: JSX.Element[];

const TOR = (props) =>{
    debugger;
    if(!TypesOfRequest || TypesOfRequest.length==0){
        TypesOfRequest = props.TypesOfRequest.map((item)=>{
            return <option value={item.Title}>{item.Title}</option>
        });
    }
    
    return(
        <select id="TypesOfRequest"  value={props.value} onChange={props.handleEventListener} className="form-control">
            <option value="-Select-">-Select-</option>
            {TypesOfRequest}
        </select>
    )
}

export default TOR