import { HistoricPlaceStub, SoftwareCoStub } from "./types";

export function guardHistoricPlaceStub(
  toBeDetermined: any
): toBeDetermined is HistoricPlaceStub {
  return toBeDetermined.__typename === "HistoricPlaceStub";
}

export function guardSoftwareCoStub(
  toBeDetermined: any
): toBeDetermined is SoftwareCoStub {
  return toBeDetermined.__typename === "SoftwareCoStub";
}
