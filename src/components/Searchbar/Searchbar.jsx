import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.value) {
      // this.setState({ value: '' });
      alert('Enter a search query!');
      return;
    }

    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            onChange={this.handleChange}
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
