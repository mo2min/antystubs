export type SoftwareServiceProvider = {
  id: String;
  title: String;
  website: String;
  linkedin: String;
};

export type SoftwareServiceProvidersCollStub = {
  id: String;
  title: String;
  service: String;
  collection: SoftwareServiceProvider[];
};
