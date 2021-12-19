import React, { Component } from "react";
import parseQueryString from "../../lib/parseQueryString";
import Searchbar from "../../Components/searchbar/Searchbar";
import { Link } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import searchApi from "../../services/api";

class MoviesPage extends Component {
  state = { data: [], query: "" };

  componentDidMount() {
    const currentQuery = parseQueryString(this.props.location.search).query;
    if (currentQuery) {
      this.handleSearch();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const query = parseQueryString(prevProps.location.search).query;
    const currentQuery = parseQueryString(this.props.location.search).query;

    if (query !== currentQuery) {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    const { location } = this.props;
    const query = parseQueryString(location.search).query;
    searchApi
      .getSearchInputApi(query)
      .then((data) => this.setState({ data, query }));
  };

  handleChange = (evt) => {
    this.setState({ query: evt.target.value });
  };

  handleSubmit = (term) => {
    const { history, location } = this.props;
    const query = parseQueryString(location.search).query;
    if (!term || term === query) {
      return;
    }

    history.push(`/movies?query=${term}`);
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <Searchbar searchProducts={this.handleSubmit} />
        <ul className={styles.list}>
          {data.map((item) => (
            <li className={styles.item} key={item.id}>
              <Link
                className={styles.moviePageLink}
                to={{
                  pathname: `/movies/${item.id}`,
                  state: {
                    from: this.props.location.pathname,
                    query: this.state.query,
                  },
                }}
              >
                <img
                  className={styles.img}
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : `https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg`
                  }
                  alt=""
                />
                <p>{item.original_title || item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
