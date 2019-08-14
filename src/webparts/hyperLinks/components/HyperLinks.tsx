import * as React from 'react';
import styles from './HyperLinks.module.scss';
import { IHyperLinksProps, IHyperLinksStates } from './IHyperLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web, PermissionKind, sp } from 'sp-pnp-js';
//import pnp from "sp-pnp-js";
import { SPComponentLoader } from '@microsoft/sp-loader';
import './Custom.css'

export default class HyperLinks extends React.Component<IHyperLinksProps, IHyperLinksStates> {
  constructor(props:IHyperLinksProps,state:IHyperLinksStates){
    super(props);
    this.state = {
      ListOfSites : [{SiteUrl:'', HasAccess:''}]
    }
  }


  CheckWhetherUserHasPermission = (weburl) => {
    try{
      const web = new Web(weburl);
      web.getCurrentUserEffectivePermissions().then(perms => { //WINDOWS POPUP HERE//
  
           if (web.hasPermissions(perms, PermissionKind.AddListItems)
               && web.hasPermissions(perms, PermissionKind.EditListItems)) {
               console.log('User has Access on ' + weburl);
               let Site = {SiteUrl:weburl, HasAccess:'Yes'}
               let mergedArray = [...this.state.ListOfSites, Site];
               
               this.setState({
                 ListOfSites : mergedArray
               })
               
           }
           else {
               console.log('User doesnt has Access on '+ weburl);
               let Site = {SiteUrl:weburl, HasAccess:'No'}
               let mergedArray = [...this.state.ListOfSites, Site];
               
               this.setState({
                 ListOfSites : mergedArray
               });
           }
      })
      .catch(err => {
        //debugger;
        if(err.message.indexOf('Access denied')>-1){
            let Site = {SiteUrl:weburl, HasAccess:'No'}
            let mergedArray = [...this.state.ListOfSites, Site];
            
            this.setState({
              ListOfSites : mergedArray
            });
        }
        console.log(err);
      })
    }
    catch(ex){
      debugger;
      console.log(ex);
    }
    
  }

  componentDidMount(){
    debugger;
    this.getList();
    let ListOfSiteUrls = [
      {url: "https://qonline.sharepoint.com/sites/santhoanbros"},
      {url:"https://santhoanbros4.sharepoint.com"},
      {url:"https://qonline.sharepoint.com/sites/santhoanbros"},
      {url:"https://santhoanbros4.sharepoint.com/sites/ServiceDesk/"},
      {url:"https://santhoanbros4.sharepoint.com/sites/testsite/"},
      {url:"https://testservice123.sharepoint.com"},
      {url:"https://testservice123.sharepoint.com/sites/appcatalog"}
    ]
    ListOfSiteUrls.map((Site)=>{
      this.CheckWhetherUserHasPermission(Site.url);
    });
    
  }
  Redirect = ()=> {
    alert('Hello');
    window.open()
  }

  getList(){
    alert('Started')
    sp.web.lists.getByTitle('Priority').items.get().then((items)=>{
      console.log(items);
    })
  }

  public render(): React.ReactElement<IHyperLinksProps> {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    
    const SitesArr = this.state.ListOfSites.map((Sites): JSX.Element=>{
      return(
        <div className="col-md-3">
            <div className="box" onClick={this.Redirect}>
                  {Sites.SiteUrl} : {Sites.HasAccess}
            </div>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
          {SitesArr}
        </div>
      </div>
    );
  }
}
