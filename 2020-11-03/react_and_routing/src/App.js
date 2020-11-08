import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
  Prompt,
} from 'react-router-dom';

function App(props) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={props.bookFacade} />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={props.bookFacade} />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={props.bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

function Header(props) {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/add-book">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/find-book">
          Find Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Products(props) {
  let { path, url } = useRouteMatch();
  const books = props.bookFacade.getBooks();

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {books &&
          books.map((book) => {
            return (
              <li>
                <Link to={`${url}/` + book.id}>{book.title}</Link>
              </li>
            );
          })}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a product.</h3>
        </Route>
        <Route path={`${path}/:productId`}>
          <Details books={books} />
        </Route>
      </Switch>
    </div>
  );
}

function AddBook(props) {
  const [values, setValues] = useState({ title: '', info: '' });
  const [error, setError] = useState('');
  let [isBlocking, setIsBlocking] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.length > 0 || value.length > 0) {
      setIsBlocking(true);
    } else {
      setIsBlocking(false);
    }

    setValues({ ...values, [name]: value });
  };

  const addBook = (e) => {
    e.preventDefault();
    setError('');
    const { title, info } = values;

    if (!title || !info) {
      setError('Title or info missing');
      return;
    }
    props.bookFacade.addBook(values);
    setValues({ title: '', info: '' });
    alert('book added');
  };

  return (
    <div>
      <Prompt
        when={isBlocking}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}? You have unsaved changes`
        }
      />
      <h2>Add Book</h2>
      <form onSubmit={addBook}>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          onChange={handleInputChange}
          value={values.title}></input>
        <br></br>
        <input
          type="text"
          name="info"
          placeholder="Add Info"
          onChange={handleInputChange}
          value={values.info}></input>
        <br></br>
        <p style={{ color: 'red' }}>{error}</p>
        <button>Save</button>
      </form>
    </div>
  );
}

function FindBook(props) {
  const [searchString, setSearchString] = useState('');
  const [error, setError] = useState('');
  const [book, setBook] = useState(null);
  const books = props.bookFacade.getBooks();

  const search = (e) => {
    e.preventDefault();

    if (!searchString) {
      setError('Enter search string');
      return;
    }

    const bookArr = books.filter((item) => item.id == searchString);
    if (bookArr && bookArr[0]) {
      setBook(bookArr[0]);
      reset();
    } else {
      setError('No book with id' + searchString);
    }
  };

  const reset = () => {
    setError('');
    setSearchString('');
  };

  return (
    <div>
      <form onSubmit={search}>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}></input>
        <button>Search</button>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
      <p>Enter id for book to see</p>
      {book && (
        <>
          <p>id: {book.id}</p>
          <p>title: {book.title}</p>
          <p>info: {book.info}</p>
          <button
            onClick={(e) => {
              props.bookFacade.deleteBook(book.id);
              reset();
              setBook(null);
            }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function Details(props) {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { productId } = useParams();
  const productItem = props.books.filter((item) => item.id == productId);
  return (
    <div>
      <h3>{productId}</h3>
      <p>id: {productItem[0] && productItem[0].id}</p>
      <p>title: {productItem[0] && productItem[0].title}</p>
      <p>info: {productItem[0] && productItem[0].info}</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
    </div>
  );
}
