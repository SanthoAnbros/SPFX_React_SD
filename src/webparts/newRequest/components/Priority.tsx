import * as React from 'react'

let Options : JSX.Element[];
const Priority = (props) =>{
    //debugger;
    if(!Options || Options.length==0){
        Options = props.Priorities.map((item)=>{
            return <option value={item.Title}>{item.Title}</option>
        });
    }
    
    return(
        <select id="Priority"  value={props.selected} onChange={props.handleEventListener} className="form-control">
            <option value="-Select-">-Select-</option>
            {Options}
        </select>
    )
}

export default Priority 




