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

export function getClaimsQuery(entity_id, lang) {
  return ` 
    ## Get Entity Claims
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?prop ?pValLabel ?pStmnt ?pStmntLabel ?rdfProp {
      VALUES (?q) {(wd:${entity_id})}
      
      ?q ?prop ?statement .
      ?statement ?ps ?pStmnt .
      
      ?pVal wikibase:claim ?prop.
      ?pVal wikibase:statementProperty ?ps.
      ?pVal rdfs:label ?rdfProp.
      
      filter(lang(?rdfProp) = 'en' )
      SERVICE wikibase:label { 
        bd:serviceParam wikibase:language "${lang}" .
      }
    } 
`;
}
