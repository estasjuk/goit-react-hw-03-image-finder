import { Component } from 'react';

import css from './Pictures.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchPictures } from 'shared/services/pictures-api';
import Button from 'shared/components/Button/Button/Button';
import Modal from 'shared/components/Button/Modal/Modal';
import LargeImage from './ImageGallery/LargeImage/LargeImage';

class Pictures extends Component {
  state = {
    pictures: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    loadMore: false,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPictures();
    }
  }

  async fetchPictures() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchPictures(search, page);
      this.setState(({ pictures }) => ({
        pictures: [...pictures, ...data.hits],
      }));
      console.log(data.hits);
      this.checkData(data);
    } catch (error) {
      this.setState(error => error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  searchPictures = ({ search }) => {
    this.setState({ search, page: 1, pictures: [] });
  };

  checkData = ({ totalHits, hits }) => {
    const PER_PAGE = 12;
    const { page } = this.state;
    if (page === 1 && totalHits !== 0) {
      this.setState({ loadMore: true });
    }
    if (totalHits === 0) {
      this.setState({ loadMore: false });
    } else if (hits.length < PER_PAGE) {
      alert('Oops! This is a finish, try something else');
      this.setState({ loadMore: false });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showPicture = ({ largeImageURL, tags }) => {
    this.setState({
      largeImage: {
        largeImageURL,
        tags,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: null });
  };

  render() {
    const { pictures, loading, error, showModal, largeImage } = this.state;
    const { searchPictures, loadMore, showPicture, closeModal } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchPictures} />
        <ImageGallery pictures={pictures} showPicture={showPicture} />
        {loading && <p>...loading</p>}
        {error && <p>Something goes wrong...</p>}
        {Boolean(pictures.length) && <Button onClick={loadMore} />}
        {showModal && (
          <Modal close={closeModal}>
            <LargeImage {...largeImage} />
          </Modal>
        )}
      </div>
    );
  }
}
export default Pictures;
