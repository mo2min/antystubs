import { gql } from "apollo-boost";

export const ALL_SITES = gql`
  {
    allSites {
      data {
        _id
        name
        handle
      }
    }
  }
`;
