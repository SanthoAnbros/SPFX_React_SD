import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NewRequestWebPartStrings';
import NewRequest from './components/NewRequest';
import { INewRequestProps } from './components/INewRequestProps';

export interface INewRequestWebPartProps {
  description: string;
}

export default class NewRequestWebPart extends BaseClientSideWebPart<INewRequestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewRequestProps > = React.createElement(
      NewRequest,
      {
        description: this.properties.description,
        UserDetails : []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
