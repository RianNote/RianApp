/* eslint-disable import/prefer-default-export */
const IsAWS = process.env.AWS_IP !== undefined;
const PORT = process.env.PORT || 4000;
export const IP_ENV = IsAWS ? process.env.AWS_IP : '0.0.0.0';

export const APOLLO = {
  uri: `http://${IP_ENV}:${PORT}/api/graphql`,
};

export const BUNDLE_ANALYZER = {
  openAnalyzer: false,
};

export const CSS_VARIABLES = {
  headerHeight: "70px",
  navWidth: "250px",
  timelineWidth: "370px",
  rianColor: "#00da82"
};