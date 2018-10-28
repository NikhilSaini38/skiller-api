////
/// @page globals/randomstring
/// @author Nikhil Saini
/// @desc Random string generator function
/// @example var key = randomString("1-a-A-$-#-*"); gives key = 6-y-Z-<-r-@
/// @invocation randomString(pattern);
/// @param pattern: A string with random character identifiers
/// @default random identifiers:-
///     1: numerical digit,
///     a: lowercase alphabet
///     A: uppercase alphabet
///     #: alphanumeric character
///     $: special character
///     *: wildcard
/// @notes:
///     1. Both the function and dictionary are available globally
///     2. Charcters that are not acting as identifiers will be preserved
///     3. Character sets can be customised/added by setting global.randomStringTable.<character-identifier> to desirable string of possible characters
////

///dictionary for possible characters
global.randomStringTable = {
  "1": "1234567890",
  "a": "qwertyuiopasdfghjklzxcvbnm",
  "A": "QWERTYUIOPASDFGHJKLZXCVBNM",
  "$": "~!@#$%^&*()_+`{}:\"<>?|\\[];',./-=",
  "#": "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
  "*":
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM~!@#$%^&*()_+`{}:\"<>?|\\[];',./-="
};

/// function for random string generation
global.randomString = pattern => {
  var randomString = "";
  for (var i = 0; i < pattern.length; i++) {
    var possibility = randomStringTable[pattern[i]];
    randomString += possibility
      ? possibility.charAt(Math.floor(Math.random() * possibility.length))
      : pattern[i];
  }
  return randomString;
};