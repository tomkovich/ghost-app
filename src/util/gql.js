import gql from "graphql-tag";

const FETCH_MOVIES = gql`
  {
    getMovies {
      title
      date
      username
      id
    }
  }
`;

export default FETCH_MOVIES;