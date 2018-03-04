import React, { Component } from 'react';
import { Filter } from '.';
import { connect } from 'react-redux';
import * as actions from '../actions';
import $ from 'jquery';

class _FilterArea extends Component {

  constructor(props) {
    super(props);

    // Options for filters
    this.ethnicityOptions = ['American Indian', 'Asian', 'Black', 'Hispanic', 'Pacific Islander', 'White', 'Other'];
    this.genderOptions = ['Male', 'Female', 'Non-binary'];
    this.ageOptions = ['Less than 20 Years Old', '30-40 Years Old', '40-50 Years Old', '50-60 Years Old', 'Greater than 60 Years Old'];
    this.maritalOptions = ['Single', 'Not Single'];
  }

  componentDidUpdate() {
    // Hide clear filters btn if none are active
    if(!this.props.filters.ethnicity && !this.props.filters.gender && !this.props.filters.age && !this.props.filters.marital) {
      $('.clear-filters-btn').hide();
    }
    else {
      $('.clear-filters-btn').show();
    }
  }

  // Update filter values
  handleChange(filter, value) {
    this.props.updateFilters(filter, value);
  }

  render() {
    return (
      <div className="filter-area">
        <div className="container">
          <div className="row">
            <Filter title='Ethnicity' value={this.props.filters.ethnicity} handleChange={(e) => this.handleChange('ethnicity', e.target.value)} options={this.ethnicityOptions} />
            <Filter title='Gender' value={this.props.filters.gender} handleChange={(e) => this.handleChange('gender', e.target.value)} options={this.genderOptions} />
            <Filter title='Age' value={this.props.filters.age} handleChange={(e) => this.handleChange('age', e.target.value)} options={this.ageOptions} />
            <Filter title='Marital Status' value={this.props.filters.marital} handleChange={(e) => this.handleChange('marital', e.target.value)} options={this.maritalOptions} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export const FilterArea = connect(mapStateToProps, actions)(_FilterArea);
