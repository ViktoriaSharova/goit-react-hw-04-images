import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImg } from "./Api/Api";

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      const elemIndex  = query.indexOf('/') + 1;
      const searchQuery = query.slice(elemIndex , query.length);

      try {
        setIsLoading(true);
        const fetchedImages = await fetchImg(searchQuery, page);
        setImages(prevState => [...prevState, ...fetchedImages.data.hits]);
      } catch (error) {
        toast.error('Try again!');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  const getSearchInfo = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.search.value;
    form.reset();
    setQuery(`${Date.now()}/${newQuery.trim()}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
      <>
        <Searchbar onSubmit={getSearchInfo} />
        {isloading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery findCards={images} />
            <Button onBtnClick={handleLoadMore} />
          </>
        )}
        <Toaster />
      </>
  );
};