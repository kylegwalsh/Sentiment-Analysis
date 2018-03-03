import React, { Component } from 'react';
import { Header } from '../components';

export class Companies extends Component {
  render() {
    return (
      <div>
        <Header company={this.props.match.params.name}/>

      </div>
    );
  }
}
