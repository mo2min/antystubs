export type SoftwareCoStub = {
  id: string;
  title: string;
  area: {
    title: string;
  };
  softwareCompany: {
    wiki_id: string;
  };
};

export type HistoricPlaceStub = {
  id: string;
  title: string;
  historic_place: {
    title: string;
    wiki_id: string;
    curr_area: {
      title: string;
    };
  };
};

export type WikiQueryResult = {
  results: {
    bindings: any[];
  };
  head: {
    vars: any[];
  };
};

export type WikiClaimSimple = {
  prop_id: string;
  prop_ar: string;
  prop_en: string;
  value: {
    literal: string;
    QID: string;
  };
};

export type Site = {
  _id: string;
  name: string;
  handle: string;
  stub_knol_id: string;
  stub_data: HistoricPlaceStub | SoftwareCoStub;
};
