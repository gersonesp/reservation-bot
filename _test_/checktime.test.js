const checktime = require("../server");

test("checktime", () => {
  expect(checktime(11)).toBe(true);
});
