/* eslint-disable import/prefer-default-export */
const PORT = process.env.PORT || 4000;

export const IP_ENV = '0.0.0.0';

export const APOLLO = {
  uri: `http://${IP_ENV}:${PORT}/api/graphql`,
};

export const BUNDLE_ANALYZER = {
  openAnalyzer: false,
};
