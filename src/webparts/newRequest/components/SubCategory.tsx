import * as React from 'react';

let SubCat : JSX.Element[];

const SubCategories = (props) =>{
    debugger;
    if(!SubCat || SubCat.length==0 || SubCat[0]==undefined){
        SubCat=props.SubCategoriesArr.map((items) : JSX.Element=>{
            if(items.Title==props.Category){
                return(
                    <option value={items.SubCategory}>{items.SubCategory}</option>
                    )
            }
        })
    }
    return(
        <select onChange={props.handleEventListener} value={props.value} id="SubCategory" className="form-control">
            <option value="-Select-">-Select-</option>
            {SubCat}
        </select>
    )
}

export default SubCategories