/* eslint-disable import/prefer-default-export */
const PORT = process.env.PORT || 4000;
export const APOLLO = {
  uri: `http://localhost:${PORT}/api/graphql`,
};

export const BUNDLE_ANALYZER = {
  openAnalyzer: false,
};
