import React from 'react';
import './Index.scss';

export class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          Welcome to{' '}
          <a href="https://www.heaplinker.com" title="visit to heaplinker.com">
            heaplinker.com
          </a>
          !
        </div>
      </div>
    );
  }
}
