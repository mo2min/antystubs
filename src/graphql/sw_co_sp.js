import { gql } from "apollo-boost";

export const CREATE_SOFTWARE_SERVICE_PROVIDER = gql`
  mutation CreateSoftwareServiceProvider($title: String!, $website: String) {
    CreateSoftwareServiceProvider(title: $title, website: $website) {
      _id
    }
  }
`;

export const ALL_SOFTWARE_SERVICE_PROVIDERS = gql`
  {
    SoftwareServiceProvider {
      id
      title
    }
  }
`;

export const ALL_STUBS = gql`
  {
    Stub {
      id
      title
      ... on HistoricPlaceStub {
        historic_place {
          title
          wiki_id
          curr_area {
            title
          }
        }
      }
      ... on SoftwareCoStub {
        area {
          title
          city
        }
        softwareCompany {
          wiki_id
        }
      }

      ... on SoftwareSPCollStub {
        title
        service
        sproviders {
          title
        }
      }

      __typename
    }
  }
`;

export const CREATE_SOFTWARE_SERVICE_PROVIDERS_COLL_STUB = gql`
  mutation CreateSoftwareSPCollStub($title: String!, $service: String) {
    CreateSoftwareSPCollStub(title: $title, service: $service) {
      _id
    }
  }
`;
