import React from 'react';
import * as sampleImage from '../../public/logo.png';
import * as favicon from '../../public/favicon.ico';

interface IndexProps {
  link: string;
  index: string[];
}

export class Index extends React.Component<{
  styles: IndexProps;
  scripts: IndexProps;
}> {
  private getAdditionalTags(): JSX.Element[][] {
    const tags: JSX.Element[][] = [[], []];
    this.props.styles.index.forEach((style, index) => {
      const _ = `${this.props.styles.link}${style}.min.css`;
      tags[0].push(<link key={index} rel="stylesheet" href={_} />);
    });
    this.props.scripts.index.forEach((script, index) => {
      const _ = `${this.props.scripts.link}${script}.min.js`;
      tags[1].push(<script key={index} src={_}></script>);
    });
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
          <title>Heaplinker</title>
          <link rel="shortcut icon" href={favicon.default} />
          {this.getAdditionalTags()[0]}
        </head>
        <body>
          <div className="container">
            <figure>
              <img src={sampleImage.default} alt="heaplinker logo" />
              <figcaption>
                Welcome to{' '}
                <a
                  href="https://www.heaplinker.com"
                  title="visit to heaplinker.com"
                >
                  heaplinker.com
                </a>
                !
              </figcaption>
            </figure>
          </div>
          {this.getAdditionalTags()[1]}
        </body>
      </html>
    );
  }
}
