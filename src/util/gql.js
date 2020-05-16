import gql from "graphql-tag";

const FETCH_MOVIES = gql`
  {
    getMovies {
      title
      id
      date
      username
    }
  }
`;

export default FETCH_MOVIES;
