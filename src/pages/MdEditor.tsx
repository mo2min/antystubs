import React, { useState, useEffect, SyntheticEvent } from "react";
import { Row, Col, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RouteComponentProps } from "react-router-dom";
import marked from "marked";

export default function MdEditor({ match }: RouteComponentProps) {
  const [content, setContent] = useState("");
  const [markdown, setMarkdown] = useState("");
  const { page_id } = match.params as any;

  useEffect(() => {
    setContent(page_id);
  }, [page_id]);

  useEffect(() => {
    setMarkdown(marked(content, { breaks: true }));
  }, [content]);

  async function saveContent() {
    console.log(content);
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <TextArea
            rows={10}
            value={content}
            onChange={(event: SyntheticEvent<HTMLTextAreaElement>) => {
              event.preventDefault();
              setContent(event.currentTarget.value);
            }}
          />
        </Col>
        <Col span={12}>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: markdown }}
          ></div>
        </Col>
      </Row>
      <div>
        <Button onClick={saveContent}> Save </Button>
      </div>
    </>
  );
}
