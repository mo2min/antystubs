export const INOVATIONS = `
  SELECT ?item ?itemLabel ?inventorLabel
  WHERE 
  {
    {?item wdt:P279 wd:Q1183543 ;
          wdt:P61 ?inventor .}
    UNION 
    {?item wdt:P31 wd:Q1183543 ;
            wdt:P61 ?inventor .}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "ar,en". }
  }
`;

export const HISTORIC_PLACE = `
`;

// TODO dynamic entity id

export function getClaimsQuery(entity_id, lang) {
  return ` 
    ## Get Entity Claims
    SELECT ?prop ?pValLabel ?pStmnt ?pStmntLabel {
      VALUES (?q) {(wd:${entity_id})}
      
      ?q ?prop ?statement .
      ?statement ?ps ?pStmnt .
      
      ?pVal wikibase:claim ?prop.
      ?pVal wikibase:statementProperty ?ps.
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang}" }
    } 
`;
}
