import React from "react";

export default function JsonPre({ data }: any) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
