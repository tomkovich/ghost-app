import gql from "graphql-tag";

const FETCH_MOVIES = gql`
  {
    getMovies {
      title
      date
    }
  }
`;

export default FETCH_MOVIES;