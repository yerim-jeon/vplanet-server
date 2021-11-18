const needle = require("needle");

const { RULES_URL } = require("../constants");

const token = process.env.TOKEN;

const getAllRules = async () => {
  try {
    const response = await needle("get", RULES_URL, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    });

    return response.body;
  } catch (error) {
    console.log(error);
  }
};

const deleteAllRules = async (rules) => {
  try {
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map(rule => rule.id);

    const data = {
      "delete": {
        "ids": ids
      }
    };

    const response = await needle("post", RULES_URL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });

    return response.body;
  } catch (error) {
    console.log(error);
  }
}

const setRules = async (rules) => {
  const data = {
    "add": rules
  };

  try {
    const response = await needle("post", RULES_URL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });

    return response.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllRules, deleteAllRules, setRules };
