export class UserDetail{
  Title?:string;
  EmployeeName ?: string;
  Manager ?: string;
  cellPhone ?: string;
  Location ?: string;
  Priority ?:string;
  Category?:string;
  SubCategory?:string;
  TypesOfRequest?:string;
  Subject ?:string;
  Description?:string;
  AlternateContact?:string;
  FileLink?:string;
  FileID?:string;

  constructor(userResponse:any){
    this.Title = userResponse.Title;
    this.EmployeeName=userResponse.EmployeeName;
    this.Manager=userResponse.Manager;
    this.cellPhone=userResponse.cellPhone;
    this.Location=userResponse.Location;
    this.Priority=userResponse.Priority;
    this.Category=userResponse.Category;
    this.SubCategory=userResponse.SubCategory;
    this.TypesOfRequest=userResponse.TypesOfRequest;
    this.Subject=userResponse.Subject;
    this.Description=userResponse.Description;
    this.AlternateContact=userResponse.AlternateContact;
    this.FileLink=userResponse.FileLink;
    this.FileID=userResponse.FileID;
  }
}

export interface INewRequestProps {
  description: string;
  UserDetails : UserDetail[];
}

export interface INewRequestState{
  SD_Details : UserDetail;
  TypesOfRequests : TypesOfRequest[];
  Priorities : Priority[];
  Categories : Category[];
}

export interface TypesOfRequest{
  Title : string;
}

export interface Priority{
  Title: string;
}

export interface Category{
  Title: string;
}
