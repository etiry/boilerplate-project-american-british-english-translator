const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translateAmericanToBritish(text) {
    const locale = "american-to-british";

    const convertedPhrases = this.convertPhrases(text, locale);
    const convertedSpelling = this.convertSpelling(convertedPhrases, locale);
    const convertedTitles = this.convertTitles(convertedSpelling, locale);
    const result = this.convertTime(convertedTitles, locale);

    return result;
  }

  translateBritishToAmerican(text) {
    const locale = "british-to-american";

    const convertedPhrases = this.convertPhrases(text, locale);
    const convertedSpelling = this.convertSpelling(convertedPhrases, locale);
    const convertedTitles = this.convertTitles(convertedSpelling, locale);
    const result = this.convertTime(convertedTitles, locale);

    return result;
  }

  convertPhrases(text, locale) {
    const dictionary =
      locale === "american-to-british" ? americanOnly : britishOnly;
    let translated = text;

    for (const [from, to] of Object.entries(dictionary).sort(
      ([a], [b]) => b.length - a.length
    )) {
      const regex = new RegExp(`\\b${from}\\b`, "gi");
      translated = translated.replace(regex, this.addHighlight(to));
    }

    return translated;
  }

  convertSpelling(text, locale) {
    let translated = text;

    for (const [american, british] of Object.entries(
      americanToBritishSpelling
    )) {
      if (locale === "american-to-british") {
        const regex = new RegExp(`\\b${american}\\b`, "gi");
        translated = translated.replace(regex, this.addHighlight(british));
      } else {
        const regex = new RegExp(`\\b${british}\\b`, "gi");
        translated = translated.replace(regex, this.addHighlight(american));
      }
    }

    return translated;
  }

  convertTitles(text, locale) {
    let translated = text;

    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      if (locale === "american-to-british") {
        const regex = new RegExp(
          `(?<!\\w)${this.escapePeriods(american)}(?!\\w)`,
          "gi"
        );
        translated = translated.replace(
          regex,
          this.addHighlight(this.capitalize(british))
        );
      } else {
        const regex = new RegExp(`\\b${british}\\b`, "gi");
        translated = translated.replace(
          regex,
          this.addHighlight(this.capitalize(american))
        );
      }
    }

    return translated;
  }

  convertTime(text, locale) {
    if (locale === "american-to-british") {
      return text.replace(/\b(\d{1,2}):(\d{2})\b/g, this.addHighlight("$1.$2"));
    } else {
      return text.replace(
        /\b(\d{1,2})\.(\d{2})\b/g,
        this.addHighlight("$1:$2")
      );
    }
  }

  capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  escapePeriods(str) {
    return str.replace(/\./g, "\\.");
  }

  addHighlight(text) {
    return `<span class="highlight">${text}</span>`;
  }
}

module.exports = Translator;
