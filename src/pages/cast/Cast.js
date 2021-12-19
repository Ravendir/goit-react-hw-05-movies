import React, { Component } from "react";
import searchApi, { chageWordEnum } from "../../services/api";

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await searchApi.getCastReviewApi(
      movieId,
      chageWordEnum.CREDITS
    );
    this.setState({ actors: response.cast });
  }

  render() {
    return (
      <>
        <ul>
          {this.state.actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : `https://cdn.pixabay.com/photo/2020/05/15/13/58/mountain-5173654_960_720.jpg`
                }
                alt={actor.name}
              />
              {actor.name}
              <p>
                {`Character:
                ${actor.character}`}
              </p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Cast;
