import { gql } from "apollo-boost";

export const ALL_PAGES = gql`
  {
    allPages {
      data {
        _id
        title
        content
        site {
          _id
          name
        }
      }
    }
  }
`;

export const CREATE_PAGE = gql`
  mutation createPage($title: String!, $content: String!, $site_ref: ID!) {
    createPage(
      data: { title: $title, site: { connect: $site_ref }, content: $content }
    ) {
      _id
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation deletePage($id: ID!) {
    deletePage(id: $id) {
      _id
    }
  }
`;
