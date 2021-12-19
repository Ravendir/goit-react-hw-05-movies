import React, { Component, Suspense } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { movieDetailsPageRoutes } from "../../routes/movieDetailsPageRoutes";
import Loader from "../../Components/loader/Loader";
import styles from "./MovieDetailsPage.module.css";
import searchApi from "../../services/api";

class MovieDetailsPage extends Component {
  state = {
    title: null,
    poster_path: null,
    overview: null,
    vote_average: null,
    genres: [],
    from: "",
    query: "",
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await searchApi.getMovieDetailsApi(movieId);
    this.setState({
      ...response,
      from: this.props.location.state.from,
      query: this.props.location.state.query,
    });
  }

  handelClick = () => {
    const { history } = this.props;
    history.push({
      pathname: this.state.from,
      search: this.state.query ? `query=${this.state.query}` : null,
    });
  };

  render() {
    const { match } = this.props;
    const { title, poster_path, overview, vote_average, genres } = this.state;
    return (
      <>
        <button
          onClick={this.handelClick}
          type="button"
          className={styles.movieDetailsButton}
        >
          Go back
        </button>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg`
          }
          alt={title}
          className={styles.movieDetailsImg}
        />
        <h1>{title}</h1>
        <p>{`User vote: ${vote_average}`}</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <ul className={styles.genreList}>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div>Additional information</div>
        <div className={styles.containerDivNav}>
          {movieDetailsPageRoutes.map((route) => {
            return (
              <li key={route.path}>
                <NavLink
                  exact={route.exact}
                  to={`${match.url}${route.path}`}
                  className={styles.app}
                  activeClassName={styles.acvive}
                >
                  {route.name}
                </NavLink>
              </li>
            );
          })}
        </div>
        <Suspense fallback={<Loader />}>
          <Switch>
            {movieDetailsPageRoutes.map((route) => (
              <Route
                exact={route.exact}
                path={`${this.props.match.path}${route.path}`}
                component={route.component}
                key={route.path}
              />
            ))}
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default MovieDetailsPage;
