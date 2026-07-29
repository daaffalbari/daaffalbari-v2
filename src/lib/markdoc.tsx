import Markdoc, { type Node } from "@markdoc/markdoc";
import React from "react";

/**
 * Renders a Keystatic Markdoc field (returned as `{ node }` from the reader)
 * into React. Wrap the output in a `.prose` container to pick up the editorial
 * blog styling defined in globals.css.
 */
export function renderMarkdoc(node: Node): React.ReactNode {
  const renderable = Markdoc.transform(node);
  return Markdoc.renderers.react(renderable, React);
}
