const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  const translator = new Translator();

  const removeHighlightSpan = (text) => {
    return text.replace(/<span class="highlight">(.*?)<\/span>/g, "$1");
  };

  test("should translate 'Mangoes are my favorite fruit.' to British English", () => {
    const input = "Mangoes are my favorite fruit.";
    const expected = "Mangoes are my favourite fruit.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'I ate yogurt for breakfast.' to British English", () => {
    const input = "I ate yogurt for breakfast.";
    const expected = "I ate yoghurt for breakfast.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'We had a party at my friend's condo.' to British English", () => {
    const input = "We had a party at my friend's condo.";
    const expected = "We had a party at my friend's flat.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Can you toss this in the trashcan for me?' to British English", () => {
    const input = "Can you toss this in the trashcan for me?";
    const expected = "Can you toss this in the bin for me?";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'The parking lot was full.' to British English", () => {
    const input = "The parking lot was full.";
    const expected = "The car park was full.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Like a high tech Rube Goldberg machine.' to British English", () => {
    const input = "Like a high tech Rube Goldberg machine.";
    const expected = "Like a high tech Heath Robinson device.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'To play hooky means to skip class or work.' to British English", () => {
    const input = "To play hooky means to skip class or work.";
    const expected = "To bunk off means to skip class or work.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'No Mr. Bond, I expect you to die.' to British English", () => {
    const input = "No Mr. Bond, I expect you to die.";
    const expected = "No Mr Bond, I expect you to die.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Dr. Grosh will see you now.' to British English", () => {
    const input = "Dr. Grosh will see you now.";
    const expected = "Dr Grosh will see you now.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Lunch is at 12:15 today.' to British English", () => {
    const input = "Lunch is at 12:15 today.";
    const expected = "Lunch is at 12.15 today.";
    const result = translator.translateAmericanToBritish(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'We watched the footie match for a while.' to American English", () => {
    const input = "We watched the footie match for a while.";
    const expected = "We watched the soccer match for a while.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Paracetamol takes up to an hour to work.' to American English", () => {
    const input = "Paracetamol takes up to an hour to work.";
    const expected = "Tylenol takes up to an hour to work.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'First, caramelise the onions.' to American English", () => {
    const input = "First, caramelise the onions.";
    const expected = "First, caramelize the onions.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'I spent the bank holiday at the funfair.' to American English", () => {
    const input = "I spent the bank holiday at the funfair.";
    const expected = "I spent the public holiday at the carnival.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'I had a bicky then went to the chippy.' to American English", () => {
    const input = "I had a bicky then went to the chippy.";
    const expected = "I had a cookie then went to the fish-and-chip shop.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'I've just got bits and bobs in my bum bag.' to American English", () => {
    const input = "I've just got bits and bobs in my bum bag.";
    const expected = "I've just got odds and ends in my fanny pack.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'The car boot sale at Boxted Airfield was called off.' to American English", () => {
    const input = "The car boot sale at Boxted Airfield was called off.";
    const expected = "The swap meet at Boxted Airfield was called off.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Have you met Mrs Kalyani?' to American English", () => {
    const input = "Have you met Mrs Kalyani?";
    const expected = "Have you met Mrs. Kalyani?";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Prof Joyner of King's College, London.' to American English", () => {
    const input = "Prof Joyner of King's College, London.";
    const expected = "Prof. Joyner of King's College, London.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should translate 'Tea time is usually around 4 or 4.30.' to American English", () => {
    const input = "Tea time is usually around 4 or 4.30.";
    const expected = "Tea time is usually around 4 or 4:30.";
    const result = translator.translateBritishToAmerican(input);

    assert.equal(removeHighlightSpan(result), expected);
  });

  test("should add highlight styling to translated words in 'Mangoes are my favorite fruit.'", () => {
    const input = "Mangoes are my favorite fruit.";
    const expected =
      'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const result = translator.translateAmericanToBritish(input);

    assert.equal(result, expected);
  });

  test("should add highlight styling to translated words in 'I ate yogurt for breakfast.'", () => {
    const input = "I ate yogurt for breakfast.";
    const expected =
      'I ate <span class="highlight">yoghurt</span> for breakfast.';
    const result = translator.translateAmericanToBritish(input);

    assert.equal(result, expected);
  });

  test("should add highlight styling to translated words in 'We watched the footie match for a while.'", () => {
    const input = "We watched the footie match for a while.";
    const expected =
      'We watched the <span class="highlight">soccer</span> match for a while.';
    const result = translator.translateBritishToAmerican(input);

    assert.equal(result, expected);
  });
  test("should add highlight styling to translated words in 'Paracetamol takes up to an hour to work.'", () => {
    const input = "Paracetamol takes up to an hour to work.";
    const expected =
      '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const result = translator.translateBritishToAmerican(input);

    assert.equal(result, expected);
  });
});
