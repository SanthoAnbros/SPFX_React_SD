import * as React from 'react';

let Cats :JSX.Element[];
    
const Categories = (props) =>{
    if(!Cats || Cats.length==0){
        Cats = props.CategoriesArr.map((category): JSX.Element =>{
            if(Cats.indexOf(<option value={category.Title}>{category.Title}</option>)==-1){
    
                return(
                    <option value={category.Title}>{category.Title}</option>
                )
            }
        });
    }

    return(
        <select value={props.value} onChange={props.handleEventListener} id="Category" className="form-control">
            <option value="-Select-">-Select-</option>
            {Cats}
        </select>
    )
}

export default Categories