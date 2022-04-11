import { Fragment } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

import classes from './QuoteItem.module.css';

import Comments from "../comments/Comments";
import HighlightedQuote from "./HighlightedQuote";

const DUMMY_QUOTES = [
    { id: "q1", author: "Me", text: "Testing react" },
    { id: "q2", author: "Me", text: "Testing routes" }
];

const QuoteDetail = () => {

    const params = useParams();
    const routeMatch = useRouteMatch();
    const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if (!quote) {
        return <p>Quote not found</p>
    }

    return (

        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={`/quotes/${params.quoteId}`} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${routeMatch.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${routeMatch.path}/comments`}>
                <section>
                    <Comments comments={[{ id: "c1", text: "test comment" }, { id: "c2", text: "test comment 2" }]} />
                </section>
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;
