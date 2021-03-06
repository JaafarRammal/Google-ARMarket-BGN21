const getTests = async (req, res, next) => {
  res.json({
    test: "testing",
  });
};

const getTest = async (req, res, next) => {
  try {
    const id = req.params.id;

    res.json({
      id,
    });
  } catch (err) {
    res.json({
      message: `An error occurred: ${err}`,
    });
  }
};

module.exports = {
  getTests,
  getTest,
};
