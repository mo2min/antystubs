import { SPARQLQueryDispatcher } from "./wikiFetch";
import { WikiQueryResult, WikiClaimSimple } from "../common/types";
import { getClaimsQuery } from "../sparqls/stups";

export async function getWikiClaims(wiki_id: string) {
  console.log(getClaimsQuery(wiki_id, "ar"));
  let { results } = (await new SPARQLQueryDispatcher().query(
    getClaimsQuery(wiki_id, "ar")
  )) as WikiQueryResult;
  (results.bindings as any[]).forEach((single) => {
    const wikiClaim = {} as WikiClaimSimple;
    wikiClaim.prop_id = ("" + single.prop.value).replace(
      "http://www.wikidata.org/prop/",
      ""
    );
    wikiClaim.prop_ar = single.pValLabel.value;
    wikiClaim.prop_en = single.rdfProp.value;
    wikiClaim.value = {} as any;
    wikiClaim.value.QID =
      single.pStmnt.type === "uri" ? single.pStmnt.value : null;
    wikiClaim.value.literal = single.pStmntLabel.value;
    console.log(wikiClaim);
  });
}
