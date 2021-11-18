const RULES_URL = "https://api.twitter.com/2/tweets/search/stream/rules";
const STREAM_URL = "https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id&user.fields=created_at,profile_image_url,name,url,location";

const EVENTS = {
  JOIN: "join",
  KEYWORD: "keyword",
  DATA: "data",
};

module.exports = { RULES_URL, STREAM_URL, EVENTS };
