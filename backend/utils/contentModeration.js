// Content moderation: redact inappropriate words in user-submitted names.
// Used when club members add their name. Inappropriate content is replaced with ***.

const BAD_WORDS = [
  // Profanity (common)
  "damn", "hell", "crap", "ass", "bastard", "bitch", "dick", "cock", "pussy", "fuck", "shit",
  "wtf", "stfu", "bs", "screw", "sucks",
  // Slurs and hate (sample – extend as needed)
  "nigger", "nigga", "faggot", "fag", "retard", "retarded", "tranny", "chink", "gook",
  "kike", "spic", "whore", "slut", "hoe",
  // Additional variants / leetspeak
  "fuk", "fck", "sh1t", "sht", "a55", "b1tch", "biatch", "d1ck", "d1k",
  "n1gger", "n1gga", "f4ggot", "r3tard", "retard",
];

const BAD_PATTERN = new RegExp(
  "\\b(" + BAD_WORDS.join("|") + ")\\b",
  "gi"
);

const REDACT = "***";

/**
 * Redacts known bad words in text. Returns the sanitized string.
 * @param {string} text - User input (e.g. name)
 * @returns {string} - Text with bad words replaced by ***
 */
function redactBadWords(text) {
  if (typeof text !== "string") return "";
  return text.replace(BAD_PATTERN, REDACT).trim();
}

/**
 * Returns true if the text still contains the redaction placeholder or any bad word after redaction.
 * Used to reject submissions that are entirely or mostly inappropriate.
 */
function hasInappropriateContent(text) {
  if (typeof text !== "string") return true;
  const sanitized = redactBadWords(text);
  if (sanitized.length === 0) return true;
  if (sanitized === REDACT || sanitized.split(/\s+/).every((w) => w === REDACT)) return true;
  return false;
}

module.exports = { redactBadWords, hasInappropriateContent };
