import React, { useState, useEffect } from 'react';
import * as PixabayAPI from '../components/services/pixabarApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value === '') return;

    setIsLoading(true);

    PixabayAPI.fetchPhotos(value, page)
      .then(({ hits, total }) => {
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }

        setItems(prevItems => [...prevItems, ...hits]);

        setShowBtn(page < Math.ceil(total / 12));
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [value, page]);

  const handleForm = query => {
    if (query === value) {
      alert('Please enter new query request');
      return;
    }
    setValue(query);
    setPage(1);
    setItems([]);
    setShowBtn(false);
    setIsLoading(false);
    setIsEmpty(false);
    setError(null);
  };

  const handleButton = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleForm} />

      {isEmpty && (
        <p className={css.Text}>
          Sorry. There are no images on your search ...{' '}
        </p>
      )}

      <ImageGallery items={items} />

      {showBtn && <Button onClick={handleButton} />}

      {isLoading && <Loader />}

      {error && <p className={css.Text}>Sorry. {error}</p>}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     value: '',
//     page: 1,
//     items: [],
//     showBtn: false,
//     isEmpty: false,
//     isLoading: false,
//     error: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { value, page } = this.state;

//     if (prevState.value !== value || prevState.page !== page) {
//       this.setState({ isLoading: true });

//       PixabayAPI.fetchPhotos(value, page)
//         .then(({ hits, total }) => {
//           if (!hits.length) {
//             this.setState({ isEmpty: true });
//             return;
//           }

//           this.setState(prevState => ({
//             items: [...prevState.items, ...hits],
//             showBtn: page < Math.ceil(total / 12),
//           }));
//         })
//         .catch(error => {
//           this.setState({ error: error.message });
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   handleForm = value => {
//     this.setState({
//       value,
//       page: 1,
//       items: [],
//       showBtn: false,
//       isEmpty: false,
//       isLoading: false,
//       error: null,
//     });
//   };

//   handleButton = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { items, isEmpty, showBtn, error, isLoading } = this.state;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleForm} />

//         {isEmpty && (
//           <p className={css.Text}>
//             Sorry. There are no images on your search ...{' '}
//           </p>
//         )}

//         <ImageGallery items={items} />

//         {showBtn && <Button onClick={this.handleButton} />}

//         {isLoading && <Loader />}

//         {error && <p className={css.Text}>Sorry. {error}</p>}
//       </div>
//     );
//   }
// }
