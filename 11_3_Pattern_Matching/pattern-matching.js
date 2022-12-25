/*
  Regular expression character classes.

  Any one character between brackets - [...]
  Any one character not between the brackets - [^...]
  Any character except newline or another Unicode line terminator. Unless used with s flag. - .
  Any ASCII word character. Equivalent to [a-zA-Z0-9_] - \w
  Any character that is not an ASCII word character. Equivalent to [^a-zA-Z0-9_] - \W
  Any Unicode whitespace character. - \s
  Any character that is not Unicode whitespace. - \S
  Any ASCII digit. Equivalent to [0-9] - \d
  Any character other than an ASCII digint. Equivalent to [^0-9] - \D
  A literal backspace(special case) - [\b]

  /[abc]/;  a,b,c - mathes any one of the letters.
  /[^abc]/; any other than a,b,c - negated character class.
  /[a-z]/; any one lowercase character from Latin alphabet.
  /[a-zA-Z0-9]/; any letter, digit from Latin alphabet.

  -- REPETITION:
  {n,m} - at least n but no more m
  {n,} - n or more times
  {n} - exactly n
  ? - zero or one. Equivalent to {0, 1}
  + - one or more. Equivalent to {1,}
  * - zero or more. Equivalent to {0,}

  -- ALTERNATION, GROUPING, REFERENCE
  | - Alternation: match either the subexpression to the elft or the subexpression to the right.
  (...) - Grouping: group items into a single unit that can be used with *,+,?,|, and etc. Also
          remember that characters that match this group for use with a later references.
  (?:...) - Grouping only: group items into a single unit, but do not remember the characters that match this group.
  \n - Match the same characters that were matched when group number n was first matched. Grouops are subexpressions
       within (possibly nested) parentheses. Group numbers are assigned by counting left parentheses from left to
       right. Groups formed with (?: are not numbered.
  ?<...> - ES2018 named groups. Etc.: /(?<city>\w+)/. To reference back to matched group \k<city>

  -- ANCHORS
  ^ - Match the beginning of the string or, with the m flag, the beggining of a line.
  $ - Match the end of the string and, with the m flag, the end of a line.
  \b - Match a word boundary. That is, mat the position between a \w character and a \W character or between a \w
        character and the beginning or end of a string. (Note, hoverever, that [\b] matches backspace.)
*/

// regex definition
function definition() {
  let p1 = /s$/i;
  let p2 = new RegExp("s$");
}

// character classes - [abc]
function characterClasses() {}

function main() {}

main();
