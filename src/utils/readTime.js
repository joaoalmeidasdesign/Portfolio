const DEFAULT_WORDS_PER_MINUTE = 200;
const MINIMUM_READ_TIME_MINUTES = 1;

function getWordCount(text) {
  const normalizedText = text.trim().replace(/\s+/g, " ");

  if (!normalizedText) {
    return 0;
  }

  return normalizedText.split(" ").length;
}

export function getReadTimeLabel(text, options = {}) {
  const { wordsPerMinute = DEFAULT_WORDS_PER_MINUTE } = options;
  const safeWordsPerMinute =
    Number.isFinite(wordsPerMinute) && wordsPerMinute > 0
      ? wordsPerMinute
      : DEFAULT_WORDS_PER_MINUTE;

  const wordCount = getWordCount(text ?? "");
  const minutes = Math.max(
    MINIMUM_READ_TIME_MINUTES,
    Math.ceil(wordCount / safeWordsPerMinute)
  );

  return `${minutes} min read`;
}

export function getCaseStudyText({ summary = "", meta = [], sections = [] } = {}) {
  const metaText = meta
    .flatMap((item) => [item.title, item.value])
    .filter(Boolean)
    .join(" ");

  const sectionText = sections
    .flatMap((section) => [
      section.title,
      section.subtitle,
      ...(section.blocks || []).flatMap((block) => [
        block.label,
        ...(block.body || []),
      ]),
    ])
    .filter(Boolean)
    .join(" ");

  return [summary, metaText, sectionText].filter(Boolean).join(" ");
}
