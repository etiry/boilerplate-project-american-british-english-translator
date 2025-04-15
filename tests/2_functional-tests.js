const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("translation with text and locale fields", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, "Mangoes are my favorite fruit.");
        assert.equal(
          res.body.translation,
          'Mangoes are my <span class="highlight">favourite</span> fruit.'
        );
        done();
      });
  });

  test("translation with text and invalid locale field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-french",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid value for locale field");
        done();
      });
  });

  test("translation with missing text field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        locale: "american-to-french",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test("translation with missing locale field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test("translation with empty text field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "No text to translate");
        done();
      });
  });

  test("translation with text that needs no translation", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Hello!",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, "Hello!");
        assert.equal(res.body.translation, "Everything looks good to me!");
        done();
      });
  });
});
