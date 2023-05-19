import React, { Component } from 'react';
import * as PixabayAPI from '../components/services/pixabarApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    items: [],
    showBtn: false,
    isEmpty: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoading: true });

      PixabayAPI.fetchPhotos(value, page)
        .then(({ hits, total }) => {
          if (!hits.length) {
            this.setState({ isEmpty: true });
            return;
          }

          this.setState(prevState => ({
            items: [...prevState.items, ...hits],
            showBtn: page < Math.ceil(total / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = value => {
    this.setState({
      value,
      page: 1,
      items: [],
      showBtn: false,
      isEmpty: false,
      isLoading: false,
      error: null,
    });
  };

  handleButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { items, isEmpty, showBtn, error, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleSubmit={this.handleSubmit} />

        {isEmpty && (
          <p className={css.Text}>
            Sorry. There are no images on your search ...{' '}
          </p>
        )}

        <ImageGallery items={items} />

        {showBtn && <Button onClick={this.handleButton} />}

        {isLoading && <Loader />}

        {error && <p className={css.Text}>Sorry. {error}</p>}
      </div>
    );
  }
}
