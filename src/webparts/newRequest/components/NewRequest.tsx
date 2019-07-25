import * as React from 'react';
import styles from './NewRequest.module.scss';
import { INewRequestProps, UserDetail } from './INewRequestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import Priority from './Priority';
import Categories from './Category';
import SubCategories from './SubCategory';
import TypesOfRequest from './TypeOfRequest';

import { sp } from "@pnp/sp";  
import { CurrentUser } from '@pnp/sp/src/siteusers';  
import { default as pnp, ItemAddResult } from "sp-pnp-js";

//Bootsrap and Jquery
require('jquery');
require('bootstrap');



let Priorities=[];
let CategoriesArr=[];
let SubCategoriesArr=[];
let TypesOfRequestArr=[];

export default class NewRequest extends React.Component<INewRequestProps, UserDetail> {
  
  //public onInit(){}

  constructor(props:INewRequestProps,state:UserDetail){
    super(props, state)
    this.state = {
      Title:'test',
      EmployeeName:'',
      Manager : '',
      cellPhone: '',
      Location:'',
      Priority:'-Select-',
      Category:'-Select-',
      SubCategory:'-Select-',
      TypesOfRequest:'',
      Subject:'',
      Description:'',
      AlternateContact:'',
      FileLink:'',
      FileID:''
    }
  }

  additem(){
    debugger;
    let JsonItems : any = JSON.stringify(this.state);
    console.log(JsonItems);
    try{
        // add an item to the list
        pnp.sp.web.lists.getByTitle("SD").items.add(
          JSON.parse(JsonItems)
        ).then((iar: ItemAddResult) => {
          console.log(iar);
        }).catch((error)=>{
          console.log(error);
        });
    }
    catch(ex){
      console.log(ex);
    }
    
  }

  getValueByRequestID(RequestID){
    sp.web.lists.getByTitle('SD').items.getById(RequestID).get()
    .then((result)=>{
      //this.state = result;
      let vvv = result.map((res):UserDetail=>{
        return res;
      })
      this.setState(vvv);
    })
  }

  componentWillMount(){
    debugger;
    let RequestID = this.getQueryStringValue();
    if(RequestID){
      this.getValueByRequestID(RequestID)
    }
    this.GetCurrentUser();
    this.getPriorityValue();
    this.getCategories();
    this.TypesOfRequestArr();
  }

  componentDidMount(){
    console.log('Comp did Mount');
  }

  private getPriorityValue(){
    sp.web.lists.getByTitle('Priority').items.get().then((items:any[])=>{
      Priorities = items;
    });
  }

  private getQueryStringValue(){
    //debugger;
    let queryParms = new UrlQueryParameterCollection(window.location.href);
    let myParm = queryParms.getValue("RequestID");
    return myParm;
  }
  
  private getCategories(){
    sp.web.lists.getByTitle('Category').items.get().then((items: any[])=>{
        CategoriesArr = items;
        console.log(CategoriesArr);
    })
  }

  private TypesOfRequestArr(){
    sp.web.lists.getByTitle('RequestTypes').items.get().then((items: any[])=>{
      TypesOfRequestArr = items;
    })
  }

  public GetCurrentUser(){   

      let Name, Manager, cell,Loc ;  
      sp.profiles.myProperties.get()
      .then(function(result) {
          Name = result.DisplayName,
          Manager =(result.UserProfileProperties[15]["Value"]).split('|')[2],
          cell = result.UserProfileProperties[58]["Value"],
          Loc = result.UserProfileProperties[61]["Value"]
      })
      .then(()=>{
        //set value to state
        this.setState({
          EmployeeName: Name,
          Manager : Manager,
          cellPhone:cell ,
          Location:Loc 
        });
      });

  }

  handleEventListener = e =>{
    //debugger;
    console.log(e.target.id);
    this.setState({
      [e.target.id] : e.target.value 
    });
  }

  alertFromPare(){
    console.log('Called from child')
  }

  DeletedUploadedFile(){
    pnp.sp.web.lists.getByTitle("SDDocs").items.getById(parseInt(this.state.FileID)).delete().then(_ => {
      this.setState({
        FileLink : '',  
        FileID :  '',
      })
    });

  }

   UploadFiles = (e) => {
     debugger;
    var files = e.target.files;
   //in case of multiple files,iterate or else upload the first file.
    var file = files[0]; 
    if (file!=undefined || file!=null){

    //assuming that the name of document library is Documents, change as per your requirement, 
    //this will add the file in root folder of the document library, if you have a folder named test, replace it as "/Documents/test"
    pnp.sp.web.getFolderByServerRelativeUrl("/sites/santhoanbros/SDDocs").files.add(file.name, file, true).then((result) => {
        console.log(file.name + " upload successfully!");
          result.file.listItemAllFields.get().then((listItemAllFields) => {
            console.log(listItemAllFields);
             // get the item id of the file and then update the columns(properties)
             pnp.sp.web.lists.getByTitle("SDDocs").items.getById(listItemAllFields.Id).update({
                        Title: file.name            
            }).then(r =>{
              this.setState({
                FileLink : "/sites/SanthoAnbros/SDDocs/Forms/AllItems.aspx?id=/sites/SanthoAnbros/SDDocs/"+ file.name+"&parent=/sites/SanthoAnbros/SDDocs",  
                FileID : String(listItemAllFields.ID) 
              })
              console.log(r);
                        console.log(file.name + " properties updated successfully!");
            });           
        }); 
    });
  }
}

fileupload(e){
    //Get the file from File DOM
    var files = e.target.files;
    var file = files[0];
    try{
        //Upload a file to the SharePoint Library
        sp.web.getFolderByServerRelativeUrl("/sites/santhoanbros/Shared Documents")
        .files.add(file.name, file, true)
        .then(function(data) {
        alert(file.name + " upload successfully!");
        //document.getElementById("sample").innerHTML = file.name + " uploaded successfully!"
        alert('Item Uploaded')
        });
    }
    catch(ex){
      console.log(ex);
    }
    
}
  

  public render(): React.ReactElement<INewRequestProps> {

    //SPComponentLoader.loadCss('node_modules\bootstrap\dist\css\bootstrap.min.css')
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    return (
      <div className={ styles.newRequest }>
        <div className="container">
        
        <div className="form-row">
              <div className="form-group col-md-6">
                <label >Types Of Request</label>
                <TypesOfRequest handleEventListener={this.handleEventListener}  value={this.state.TypesOfRequest} TypesOfRequest={ TypesOfRequestArr }/>
              </div>
              <div className="form-group col-md-6">
                <label >Priority</label>
                <Priority handleEventListener={this.handleEventListener} selected={this.state.Priority} Priorities = { Priorities }/>
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-6">
                <label >Employee Name</label>
                <input type="text" className="form-control" disabled value={this.state.EmployeeName} onChange={this.handleEventListener} id="EmployeeName" />
              </div>
              <div className="form-group col-md-6">
                <label >Manager</label>
                <input type="text" className="form-control" disabled value={this.state.Manager} onChange={this.handleEventListener} id="Manager" />
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-6">
                <label >Location</label>
                <input type="text" className="form-control" disabled value={this.state.Location} onChange={this.handleEventListener} id="Location"/>
              </div>
              <div className="form-group col-md-6">
                <label >Contact</label>
                <input type="text" className="form-control" disabled value={this.state.cellPhone} onChange={this.handleEventListener} id="cellPhone" />
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-6">
                <label >Category</label>
                <Categories handleEventListener={this.handleEventListener} value={this.state.Category} CategoriesArr = { CategoriesArr }/>
              </div>
              <div className="form-group col-md-6">
                <label >Sub Category</label>
                <SubCategories handleEventListener={this.handleEventListener} Category={this.state.Category}  SubCategoriesArr = { CategoriesArr } value={this.state.SubCategory}/>
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-12">
                <label >Subject</label>
                <input id="Subject" value={this.state.Subject} onChange={ this.handleEventListener } className="form-control" type="text"></input>
              </div>
              <div className="form-group col-md-12">
                <label >Description</label>
                <textarea value={this.state.Description} id="Description" onChange={ this.handleEventListener } className="form-control" ></textarea>
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-6">
                <label >Alternate Contact</label>
                <input id="AlternateContact" value={this.state.AlternateContact} onChange={ this.handleEventListener } className="form-control" type="text"></input>
              </div>
              <div className="form-group col-md-6 ">
                
                { !this.state.FileLink ? 
                (
                  <div className="files">
                    <label >File Upload</label>
                    <input onChange={(e)=>this.UploadFiles(e)} className="form-control " type="file"></input>
                  </div>
                  )
                :
                (<div>
                          <a className="btn btn-primary" href={this.state.FileLink}>Download uploaded file</a>
                          <button onClick={()=>this.DeletedUploadedFile()} className="btn btn-primary">Delete</button> 
                  </div>)
                }
                
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-12">
                <button className="btn btn-primary" onClick={()=>this.additem()} type="button">Submit</button>
              </div>
          </div>
          
          {/* <button onClick={this.getQueryStringValue} >Log</button> */}
        </div>
      </div>
    );
    
  }
}
