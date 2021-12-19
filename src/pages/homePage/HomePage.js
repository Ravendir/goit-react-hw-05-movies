import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import searchApi from "../../services/api";

class HomePage extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    const response = await searchApi.getTrendingApi();
    this.setState({ films: response });
  }

  render() {
    const { films } = this.state;
    return (
      <>
        <ul className={styles.list}>
          {films.map((film) => (
            <li key={film.id} className={styles.item}>
              <Link
                className={styles.homePageLink}
                to={{
                  pathname: `/movies/${film.id}`,
                  state: {
                    from: this.props.location.pathname,
                  },
                }}
              >
                <img
                  className={styles.img}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                />
                <p>{film.original_title || film.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
