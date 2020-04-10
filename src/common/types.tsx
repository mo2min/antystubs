export type SoftwareCoStub = {
  id: string;
  title: string;
  area: {
    title: string;
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

export type WikiResult = {
  value: string;
  lang: string;
};

export type Site = {
  _id: string;
  name: string;
  handle: string;
  stub_knol_id: string;
  stub_data: HistoricPlaceStub | SoftwareCoStub;
};
