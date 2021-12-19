import React, { Component } from "react";
import searchApi, { chageWordEnum } from "../../services/api";

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await searchApi.getCastReviewApi(
      movieId,
      chageWordEnum.REVIEWS
    );
    console.log(response);

    this.setState({ reviews: response.results });
  }

  render() {
    return (
      <>
        <ul>
          {this.state.reviews.map((review) => (
            <li key={review.id}>
              {`Autor: ${review.author}`}
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Reviews;
