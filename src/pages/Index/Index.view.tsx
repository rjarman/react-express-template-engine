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
          <meta
            name="description"
            content="I'm a computer science fresh graduate from Bangabandhu Sheikh Mujibur Rahman Science & Technology University. I am experienced in programming, database management, JavaScript, TypeScript, Python and C++ Programming Languages. I'm familiar with anaconda, git, gitkraken, react, angular, express, node.js, webpack, apache cordova, ionic and bootsrap platforms. As a DIY enthusiast I have many projects with Nvidia Jetson Nano, Rasberry Pi and Arduino. In the near future, I want to learn more about new technologies such as Cloud Computing or Artificial Intelligence using machine learning or deep learning techniques for example. Currently, I'm working on projects based on these topics which are connected with Artificial Intelligence."
          />
          <meta name="robots" content="index, follow" />

          <meta property="og:title" content="Rafsun Jany Arman" />
          <meta
            property="og:description"
            content="I'm a computer science fresh graduate from Bangabandhu Sheikh Mujibur Rahman Science & Technology University. I am experienced in programming, database management, JavaScript, TypeScript, Python and C++ Programming Languages. I'm familiar with anaconda, git, gitkraken, react, angular, express, node.js, webpack, apache cordova, ionic and bootsrap platforms. As a DIY enthusiast I have many projects with Nvidia Jetson Nano, Rasberry Pi and Arduino. In the near future, I want to learn more about new technologies such as Cloud Computing or Artificial Intelligence using machine learning or deep learning techniques for example. Currently, I'm working on projects based on these topics which are connected with Artificial Intelligence."
          />
          <meta
            property="og:image"
            content="http://euro-travel-example.com/thumbnail.jpg"
          />
          <meta property="og:url" content="https://heaplinker.com/" />
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="og:site_name" content="Rafsun Jany Arman" />
          <meta
            name="twitter:image:alt"
            content="Image of the owner of this site"
          />

          <meta name="twitter:site" content="@_rjarman" />

          <title>Heaplinker</title>
          <link rel="canonical" href="https://heaplinker.com/" />
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
