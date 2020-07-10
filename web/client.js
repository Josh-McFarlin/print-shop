const sanityClient = require("@sanity/client");

const prod = process.env.NODE_ENV === "production";

const client = sanityClient({
  projectId: "kkzkbx8h",
  dataset: "production",
  token: "", // or leave blank to be anonymous user
  useCdn: prod, // `false` if you want to ensure fresh data
});

module.exports = client;
