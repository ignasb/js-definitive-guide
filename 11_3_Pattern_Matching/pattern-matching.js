/*
********
* 11.3.1
********

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
  within (possibly nested) parentheses. Group numbers are assigned by counting left parentheses from left to right.
  Groups formed with (?: are not numbered.

  ?<...> - ES2018 named groups. Etc.: /(?<city>\w+)/. To reference back to matched group \k<city>

  -- ANCHORS
  ^ - Match the beginning of the string or, with the m flag, the beggining of a line.

  $ - Match the end of the string and, with the m flag, the end of a line.

  \b - Match a word boundary. That is, mat the position between a \w character and a \W character or between a \w
        character and the beginning or end of a string. (Note, hoverever, that [\b] matches backspace.)

  \B - Match a position that is not a word boundary.

  (?=p) - A positive lookahead assertopm. Require that the following characters match the pattern p, but do not
          include those charactrs in the match.

  (?!p) - A negative lookahead assertion. Require that the following characters do not match the pattern p.

  --FLAGS
  g - The 'g' flag indicates that the regular expression is "global"- that is, that we intend to use it to find
  all matches withing a string rather that just finding the first match. This flag does not alter the way that
  pattern matching is done, but, as we'll see later, it does not alter the behavior of the String match()
  method and the RegExp exec() method in important ways.

  i - The 'i' fkag specifies that pattern matching shoul be case-insensitive.

  m - The 'm' flag specifies that matching should be done in "multiline" mode. It says that the RegExp will
  be used with multiline strings and the ^ and $ anchros should match both the beginning and the end of
  the string and also the beginning and end of the individual lines within the string.

  s- Like the m flag, the s flag is also useful when working with text that includes newlines. Normally, a "."
  in regular expression matches any character except a line terminator. When the s flag is used, hover, "." will
  match any character, including line terminators. The s flag was added to JavaScript in ES2016 and,
  as of early 2020, is supported in Node, Chrome, Edge, and Safari, but not Firefox.

  u - The "u" flag stands for Unicode, and it makes the regular expression match full Unicode codepoints rather
  that matching 16-bit values. This flag was introduced in ES6, and you should make a habit of using it
  on all regular expressions unless you have some reasont not to. If you do not use this flag, then your RegExps
  will not work well with text that includes emoji and other characters(including many Chinese characters)
  that require more than 16bits.

  y - The "y" flag indicates that the regular expression is "sticky" and should match at the beginning of a string
  or at the first character following the previous match. When used with regular expression that is designed
  to find a single match, it effectively treats that regular expression as if it begins with ^ to anchor it to
  the beginning of the stirng. This flag is more usefult with regular expressions that are used repeatedly to
  find find all matches withing a string. In this case, it causes special behavior of the String match() method
  and the RegExp exec() method to enforce each subsequent match is anchored to the string position at which
  the last one ended.
*/

/*
********
* 11.3.2
********

String supported regular expression methods - search, replace, match, matchAll, split
*/

function main() {
  search();
  replace();
  match();
  matchAll();
  split();

  regexOne();
}

main();

function search() {
  /* search returns either the character position of the start of the first matching substring or -1 if there
    is no match. If the argument to search() is not a regular expression, it is first converted to one by
    passing to RegExp constructor. search() does not support global searches;
    it ignores the g flag of its regular expression argument.
  */
  const s1 = "JavaScript".search(/script/iu);
  const s2 = "Python".search(/script/iu);

  console.log(s1, s2);
}

function replace() {
  /* The replace () method performs search-and-replace operation. 1-st param regexp and second string.
    Supports g flag which replaces all matches in the string with the replacement string; otherwise,
    it replaces only the first match it finds. Does not convert first argument to RegExp(search does).
    Does not mutate string.
  */
  const text = "Testing test jaVaScript string. Javascript test.".replace(
    /javascript/gi,
    "JavaScript",
  );
  console.log(text);

  let quote = /"([^"]*)"/g;
  const replacedQuotes = 'He said "stop"'.replace(quote, "<<$1>>");
  console.log(replacedQuotes);

  let namedQuote = /"(?<quotedText>[^"]*)"/g;
  const replacedQuotesNamed = 'He said "stop"'.replace(namedQuote, "<<$1>>");
  console.log(replacedQuotesNamed);

  let s = "15 times 15 is 225";
  const octodecimal = s.replace(/\d+/gu, (n) => parseInt(n).toString(16));
  console.log(octodecimal);
}

function match() {
  /* Takes regular expression as its only argument(or converts its argument to a regular expression by
    passing it to the RegExp() constructor) and returns an array that contains the results of the match,
    or null if no match is found. If the regular expression has the g flag set, the method returns
    an array of all matches that appear in the string.
  */

  const simpleMatch = "7 plus 8 equals 15".match(/\d+/);
  console.log(simpleMatch);

  const simpleGlobalMatch = "7 plus 8 equals 15".match(/\d+/g);
  console.log(simpleGlobalMatch);

  const sampleText = "Visit my blog at http://www.example.com/~test";
  const groupedUrlRegExp = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
  const match = sampleText.match(groupedUrlRegExp);
  console.log(match);
}

function matchAll() {
  /* Expects RegExp with the g flag set. Instead of returning an array of matching substring like match()
    does, however, it returns an iterator that yields the kind of match objects that match() returns
    when used with a non-global RegExp.
  */

  const digitsOnlyRegExp = /\d+/g;
  const text = "1 AB 2 CD 3 EF 4 GH";
  for (let m of text.matchAll(digitsOnlyRegExp)) {
    console.log(`Found '${m[0]} at index ${m.index}`);
  }
}

function split() {
  /* Breaks the string on which it is cllaed into an array of substring, using the argument as a separator.
    It can be used with a string argument or reg exp.
  */
  console.log("123,456,789".split(","));
  console.log("1, 2, 3, \n4, 5".split(/\s*,\s*/));
}

function regexOne() {
  problemOne();
  problemTwo();

  function problemOne() {
    // Problem 1: Matching a decimal numbers.
    const decRegExp = /^-?\d+(\.|,)?\d+e?\d+\.?(\d+)?$/;
    const numbers = [
      "3.14528",
      "-255.34",
      "128",
      "1.9e10",
      "123,340.00",
      "720p",
    ];

    // Do not print "720p";
    const ans1 = numbers.filter((n) => n.match(decRegExp));
    console.log(ans1);
  }

  function problemTwo() {
    /*
      Capture	415-555-1234	415
      Capture	650-555-2345	650
      Capture	(416)555-3456	416
      Capture	202 555 4567	202
      Capture	4035555678	403
      Capture	1 416 555 9292	416
    */
    // Matching phone numbers
    const telNumbers = [
      "415-555-1234",
      "650-555-2345",
      "(416)555-3456",
      "202 555 4567",
      "4035555678",
      "1 416 555 9292",
    ];

    const phoneRegExp = /\(?(\d{3})\)?(\s|-)?\d{3}(\s|-)?\d{4}/;
    telNumbers.forEach((telNumber) => {
      console.log(telNumber.match(phoneRegExp));
    });
  }

  function problemThree() {
    /*
    Task	Text	Capture Groups
    Capture	tom@hogwarts.com	tom	To be completed
    Capture	tom.riddle@hogwarts.com	tom.riddle	To be completed
    Capture	tom.riddle+regexone@hogwarts.com	tom.riddle	To be completed
    Capture	tom@hogwarts.eu.com	tom	To be completed
    Capture	potter@hogwarts.com	potter	To be completed
    Capture	harry@hogwarts.com	harry	To be completed
    Capture	hermione+regexone@hogwarts.com	hermione
    */
  }
}
