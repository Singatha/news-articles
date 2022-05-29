import "./App.css";
import Card from "../Card/Card";
import Publisher from "../Publisher/Publisher";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState, useEffect, createContext } from "react";
import { PAGE_SIZE, PAGE_INDEX, API_KEY, FIRST_PAGE, getPublishers } from '../utils/utils';

export const PublisherContext = createContext();

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [articles, setArticle] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const publishers = [];
  const filteredArticles = articles.filter((article) => article.source.name === publisher);
  const total = publisher === '' ? articles.length : filteredArticles.length;
  

  const numberOfPages = Math.ceil(total/PAGE_SIZE);
  const currentIndex = (pageNumber-1)*PAGE_SIZE;
  const offset = currentIndex + PAGE_SIZE;

  getPublishers(articles, publishers);
  const currentArticles = publisher === '' ? articles.slice(currentIndex, offset): filteredArticles.slice(currentIndex, offset);

  const handleChange = (event, value) => {
    setPageNumber(value);
  }
  
  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=tesla&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setArticle(result.articles);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <p> could not load page !</p>;
  } else if (!isLoaded) {
    return <p> loading... </p>;
  } else {
    return (
      <PublisherContext.Provider value={[setPublisher]}>
        <div className="App">
          <div className="grid-container">
            <div className="inner-grid">
              {currentArticles.length > 0 ?
                currentArticles.map((article, index) => {
                  return (
                    <Card
                      key={index}
                      articleIndex={index}
                      description={article.description}
                      pageIndex={PAGE_INDEX}
                      imgSrc={article.urlToImage}
                      publisher={article.source.name}
                      title={article.title}
                      date={article.publishedAt}
                    />
                  )
                })
                :
                <p>No results</p>
              }

            </div>
            <div className="vertical-line"></div>
            <Publisher publishers={publishers} />
            <Pagination
              count={numberOfPages}
              showFirstButton={pageNumber === FIRST_PAGE ? false : true }
              hidePrevButton={pageNumber === FIRST_PAGE ? true : false }
              hideNextButton={pageNumber === numberOfPages ? true : false }
              showLastButton={pageNumber === numberOfPages ? false : true }
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  components={{ first: KeyboardDoubleArrowLeftIcon, last: KeyboardDoubleArrowRightIcon }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </PublisherContext.Provider>
    );
  }
}

// try and formatters and linters
// unit tests
// mobile responsiveness
