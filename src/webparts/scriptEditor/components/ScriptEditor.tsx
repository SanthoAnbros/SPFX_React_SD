import * as React from 'react';
import styles from './ScriptEditor.module.scss';
import { IScriptEditorProps } from './IScriptEditorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class ScriptEditor extends React.Component<IScriptEditorProps, {}> {

  
  public render(): React.ReactElement<IScriptEditorProps> {
    let Script : string = escape(this.props.description);
    //SPComponentLoader.loadScript(Script);
    //SPComponentLoader.loadCss(Script);
    
    return (
      <div className={ styles.scriptEditor }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{escape(this.props.extdes)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
