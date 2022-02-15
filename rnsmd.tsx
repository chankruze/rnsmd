/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Feb 11 2022 20:43:19 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import React from "react";
import Box from "../../components/modules/Box";
import { styles as defaultStyles } from "./styles";
import rules from "./rules";
import _ from "lodash";
import SimpleMarkdown from "simple-markdown";

interface MarkdownStyles {
  styles?: any;
}

const Markdown: React.FC<MarkdownStyles> = ({ children, styles }) => {
  const mergedStyles = _.merge({}, defaultStyles, styles);
  let _rules = rules(mergedStyles);
  _rules = _.merge({}, SimpleMarkdown.defaultRules, _rules);

  const parser = SimpleMarkdown.parserFor(_rules);

  const parse = (source) => {
    var blockSource = source + "\n\n";
    return parser(blockSource, { inline: false });
  };

  const renderer = SimpleMarkdown.reactFor(
    SimpleMarkdown.ruleOutput(_rules, "react")
  );

  const child = _.isArray(children) ? children.join("") : children;
  const tree = parse(child);

  return <Box style={[defaultStyles.view]}>{renderer(tree)}</Box>;
};

export default Markdown;
