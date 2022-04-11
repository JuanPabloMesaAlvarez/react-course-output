import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import QuoteDetail from "./components/quotes/QuoteDetail";
import QuoteList from "./components/quotes/QuoteList";
import QuoteForm from "./components/quotes/QuoteForm";
import Layout from "./components/layout/Layout";
import NotFound from "./components/UI/NotFound";

const DUMMY_QUOTES = [
  { id: "q1", author: "Me", text: "Testing react" },
  { id: "q2", author: "Me", text: "Testing routes" }
];

function App() {

  const history = useHistory();

  const onAddQuote = (quote) => {
    // DUMMY_QUOTES.push(quote);
    history.push("/quotes");
  }

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <QuoteList quotes={DUMMY_QUOTES} />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <QuoteForm onAddQuote={onAddQuote} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
