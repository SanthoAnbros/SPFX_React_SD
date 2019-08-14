import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-webpart-base';

import * as strings from 'ScriptEditorWebPartStrings';
import ScriptEditor from './components/ScriptEditor';
import { IScriptEditorProps } from './components/IScriptEditorProps';

export interface IScriptEditorWebPartProps {
  description: string;
  extdes:string;
}

export default class ScriptEditorWebPart extends BaseClientSideWebPart<IScriptEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IScriptEditorProps > = React.createElement(
      ScriptEditor,
      {
        description: this.properties.description,
        extdes:this.properties.extdes
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

  protected testfunct(e){
    alert('Hi');
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
        },
        {
          header: {
            description : "Test Desc"
          },
          groups: [
            {
              groupName: "test Group",
              groupFields: [
                PropertyPaneTextField('extdes', {
                  label: "List Name"
                }),
                PropertyPaneButton('extdes',{
                  text:"Click",
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick:this.testfunct
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
