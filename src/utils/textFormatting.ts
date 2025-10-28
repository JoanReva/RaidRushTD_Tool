import * as React from 'react';

/**
 * Highlights numeric values (+X, -X, +X%) in text with styled spans
 * @param text - Text to parse and highlight
 * @param className - CSS class name for highlighted values
 * @returns Array of text strings and React elements
 */
export const highlightNumericValues = (
  text: string,
  className: string = 'numeric-value'
): (string | React.ReactElement)[] => {
  const parts = text.split(/(\+\d+%?|-\d+%?)/g);
  
  return parts.map((part, index) => {
    const match = part.match(/^([+-])(\d+%?)$/);
    if (match) {
      const [, sign, value] = match;
      return React.createElement(
        'span',
        { key: index, className },
        `${sign === '+' ? '+' : ''}${value}`
      );
    }
    return part;
  });
};

/**
 * Formats upgrade level strings, converting asterisks to star emojis
 * @param level - Level string (e.g., "***", "Level 1")
 * @returns Formatted React element
 */
export const formatUpgradeLevel = (level: string): React.ReactElement => {
  const starCount = level.match(/\*/g)?.length || 0;
  
  if (starCount > 0) {
    return React.createElement(
      'span',
      { className: 'upgrade-level-stars' },
      '⭐'.repeat(starCount)
    );
  }
  
  return React.createElement(React.Fragment, {}, level);
};
