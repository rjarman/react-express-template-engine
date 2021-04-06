import React from 'react';
import { scripts, styles } from './config.json';
import { TemplateProps } from '../pages.type';
import * as favicon from '../../assets/favicon.ico';

export class SiteTemplate extends React.Component<TemplateProps> {
  private __styles: { [key: string]: string[] | string };
  private __scripts: { [key: string]: string[] | string };

  constructor(props: TemplateProps) {
    super(props);
    this.__styles = styles;
    this.__scripts = scripts;
  }
  private getAdditionalTags(): JSX.Element[][] {
    const tags: JSX.Element[][] = [[], []];
    if (typeof this.__styles[this.props.styleScript] !== 'string') {
      const stylesLen = this.__styles[this.props.styleScript].length;
      const scriptLen = this.__scripts[this.props.styleScript].length;
      for (let i = 0; i < stylesLen; i++) {
        const _ = `${styles.link}${
          this.__styles[this.props.styleScript][i]
        }.min.css`;
        tags[0].push(<link key={i} rel="stylesheet" href={_} />);
      }
      for (let i = 0; i < scriptLen; i++) {
        const _ = `${scripts.link}${
          this.__scripts[this.props.styleScript][i]
        }.min.js`;
        tags[1].push(<script key={i} src={_}></script>);
      }
    }
    return tags;
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{this.props.title}</title>
          <link rel="shortcut icon" href={favicon.default} />
          {this.getAdditionalTags()[0]}
        </head>
        <body>
          {this.props.documentBody}
          {this.getAdditionalTags()[1]}
        </body>
      </html>
    );
  }
}
