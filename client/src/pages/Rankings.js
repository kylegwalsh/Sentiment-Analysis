import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../components';
import { connect } from "react-redux";
import * as actions from "../actions";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
  }
  componentWillMount() {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({ companies: resJson });
      });
  }
  render() {
    const products = [ {company:"Google",sentiment:80,diversity:80}, {company:"Apple",sentiment:40,diversity:20} ];
    const columns = [{
      dataField: 'company',
      text: 'Company',
      sort: true,
      align: 'center'
    }, {
      dataField: 'sentiment',
      text: 'Overall Sentiment',
      sort: true,
      align: 'center',
      classes: (cell, row, rowIndex, colIndex) => {
        if (products[rowIndex].sentiment > 0) return 'green-val';
        else if(products[rowIndex].sentiment < 0) return 'red-val';
        return '';
      }
    }, {
      dataField: 'diversity',
      text: 'Diversity Rating',
      sort: true,
      align: 'center',
      classes: (cell, row, rowIndex, colIndex) => {
        if (products[rowIndex].sentiment > 50) return 'green-val';
        else if(products[rowIndex].sentiment < 50) return 'red-val';
        return '';
      }
    }];
    const defaultSorted = [{
      dataField: 'sentiment',
      order: 'desc'
    }];
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.props.history.push(`/companies/${products[rowIndex].company}`);
      }
    };
    const rowClasses = 'hover-row';

    return (
      <div>
        <Header noFilter company={'Sentissimo'} />

        <div className="text-center">
          <h2><strong>Company Rankings</strong></h2>
        </div>

        <div className="col-sm-8 col-sm-offset-2">
          <BootstrapTable
            keyField='company'
            data={ products }
            columns={ columns }
            defaultSorted={ defaultSorted }
            rowEvents={ rowEvents }
            rowClasses={ rowClasses }
            pagination={ paginationFactory() }
            />
          <p className="note">
            Overall sentiment ranges from -100 to 100 (with 100 being the most positive)<br/>
            Diversity rating ranges from 0 to 100 (with 100 being the most diverse)
          </p>
        </div>

      </div>
    );
  }
}
