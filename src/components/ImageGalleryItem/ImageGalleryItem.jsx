import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={handleModalOpen}
          className={css.ImageGalleryItemImage}
        />
      </li>

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

// export class ImageGalleryItem extends Component {
//   state = { showModal: false };

//   handleModalOpen = () => {
//     this.setState({ isModalOpen: true });
//   };

//   handleModalClose = () => {
//     this.setState({ isModalOpen: false });
//   };

//   render() {
//     const { webformatURL, tags, largeImageURL } = this.props.item;

//     const { isModalOpen } = this.state;

//     return (
//       <>
//         <li className={css.ImageGalleryItem}>
//           <img
//             src={webformatURL}
//             alt={tags}
//             onClick={this.handleModalOpen}
//             className={css.ImageGalleryItemImage}
//           />
//         </li>

//         {isModalOpen && (
//           <Modal
//             largeImageURL={largeImageURL}
//             tags={tags}
//             handleModalClose={this.handleModalClose}
//           />
//         )}
//       </>
//     );
//   }
// }
ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
