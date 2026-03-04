// Content moderation: detect and block inappropriate words in user-submitted names.
// This is intentionally stricter and tries to catch obfuscated/iterated/leet variants.

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

const REDACT = "***";

// Normalize text for profanity checking:
// - lowercase
// - map common leetspeak to letters
// - remove spaces and non-letters
// - collapse repeated characters (fuuuck -> fuck)
function normalizeForProfanity(text) {
  if (typeof text !== "string") return "";
  const leetMap = {
    "0": "o",
    "1": "i",
    "3": "e",
    "4": "a",
    "5": "s",
    "7": "t",
    "8": "b",
    "9": "g",
    "@": "a",
    "$": "s",
    "!": "i",
  };

  let raw = "";
  for (const ch of text.toLowerCase()) {
    if (ch >= "a" && ch <= "z") {
      raw += ch;
    } else if (leetMap[ch]) {
      raw += leetMap[ch];
    } else {
      // Skip spaces, punctuation, emojis, etc.
      continue;
    }
  }

  if (!raw) return "";

  // Collapse consecutive duplicate characters so "fuuuck" -> "fuck"
  let collapsed = "";
  let last = "";
  for (const ch of raw) {
    if (ch === last) continue;
    collapsed += ch;
    last = ch;
  }
  return collapsed;
}

function containsBadWord(text) {
  const norm = normalizeForProfanity(text);
  if (!norm) return false;
  return BAD_WORDS.some((bad) => norm.includes(bad));
}

/**
 * "Sanitize" a name. For now, if any bad pattern is detected we return
 * a redaction marker so the caller can decide whether to reject it.
 * @param {string} text - User input (e.g. name)
 * @returns {string} - Either the trimmed original text or a redaction marker.
 */
function redactBadWords(text) {
  if (typeof text !== "string") return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (containsBadWord(trimmed)) return REDACT;
  return trimmed;
}

/**
 * Returns true if the text is empty/invalid or contains any inappropriate
 * language or representation (including obfuscated forms).
 */
function hasInappropriateContent(text) {
  if (typeof text !== "string") return true;
  const sanitized = redactBadWords(text);
  if (sanitized.length === 0) return true;
  if (sanitized === REDACT || sanitized.split(/\s+/).every((w) => w === REDACT)) return true;
  if (containsBadWord(text)) return true;
  return false;
}

module.exports = { redactBadWords, hasInappropriateContent, containsBadWord };
