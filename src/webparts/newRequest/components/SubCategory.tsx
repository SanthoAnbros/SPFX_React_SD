import * as React from 'react';

let SubCat : JSX.Element[];

const SubCategories = (props) =>{
    //debugger;
    SubCat=props.SubCategoriesArr.map((items) : JSX.Element=>{
        if(items.Title==props.Category){
            return(
                <option value={items.SubCategory}>{items.SubCategory}</option>
                )
        }
        
    })
    return(
        <select onChange={props.handleEventListener} id="SubCategory" className="form-control">
            <option value="-Select-">-Select-</option>
            {SubCat}
        </select>
    )
}

export default SubCategories