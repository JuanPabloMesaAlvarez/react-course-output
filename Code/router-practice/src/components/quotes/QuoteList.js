import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  const history = useHistory();
  const location = useLocation();

  const queryString = new URLSearchParams(location.search);
  const isSortedAscending = queryString.get('sort') === 'asc';

  const sortedList = sortQuotes(props.quotes, isSortedAscending)

  const sortQuotesHandler = () => {
    history.push('/quotes?sort=' + (isSortedAscending ? 'desc' : 'asc'));
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortQuotesHandler}>Sort { isSortedAscending ? 'descending' : 'ascending' }</button>
      </div>
      <ul className={classes.list}>
        {sortedList.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
