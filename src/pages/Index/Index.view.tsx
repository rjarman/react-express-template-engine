import React from 'react';
import { SiteTemplate } from '../site.template';
import * as sampleImage from '../../public/logo.png';

export class Index extends React.Component {
  render() {
    return (
      <SiteTemplate
        title="Heaplinker"
        styleScript="index"
        documentBody={
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
        }
      />
    );
  }
}
