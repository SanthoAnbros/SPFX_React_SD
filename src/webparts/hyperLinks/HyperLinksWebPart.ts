import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import pnp from "sp-pnp-js";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HyperLinksWebPartStrings';
import HyperLinks from './components/HyperLinks';
import { IHyperLinksProps } from './components/IHyperLinksProps';

export interface IHyperLinksWebPartProps {
  description: string;
}

export default class HyperLinksWebPart extends BaseClientSideWebPart<IHyperLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHyperLinksProps > = React.createElement(
      HyperLinks,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      pnp.setup({
        spfxContext: this.context
      });
      
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
