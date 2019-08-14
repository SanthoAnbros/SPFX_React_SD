export interface IHyperLinksProps {
  description: string;
}

export interface Sites{
  SiteUrl : string;
  HasAccess : string;
}

export interface IHyperLinksStates{
  ListOfSites : Sites[];
}
