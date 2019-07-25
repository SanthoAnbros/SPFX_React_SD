export interface UserDetail{
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
}

export interface INewRequestProps {
  description: string;
  UserDetails : UserDetail[];
}
