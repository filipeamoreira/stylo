module.exports = (function(){
  /*
   * Generated by PEG.js 0.6.2.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "start": parse_start,
        "hexcolor": parse_hexcolor,
        "hexcolorlong": parse_hexcolorlong,
        "hexcolorshort": parse_hexcolorshort,
        "hex": parse_hex,
        "rgba": parse_rgba,
        "shortcut": parse_shortcut,
        "elements": parse_elements
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_start() {
        var result0;
        
        result0 = parse_hexcolor();
        if (result0 === null) {
          result0 = parse_rgba();
          if (result0 === null) {
            result0 = parse_shortcut();
          }
        }
        return result0;
      }
      
      function parse_hexcolor() {
        var result0;
        var pos0;
        
        reportFailures++;
        pos0 = pos;
        result0 = parse_hexcolorshort();
        if (result0 === null) {
          result0 = parse_hexcolorlong();
        }
        if (result0 !== null) {
          result0 = (function(offset, hex) {
              var r = parseInt(hex.substring(0, 2), 16);
              var g = parseInt(hex.substring(2, 4), 16);
              var b = parseInt(hex.substring(4, 6), 16);
        
              var Color = require("app/models/properties/color");
              return new Color(r, g, b);
            })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("hexcolor");
        }
        return result0;
      }
      
      function parse_hexcolorlong() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 35) {
          result0 = "#";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"#\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse_hex();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_hex();
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, hexes) {
              return hexes.join('');
            })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_hexcolorshort() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 35) {
          result0 = "#";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"#\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_hex();
          if (result1 !== null) {
            result2 = parse_hex();
            if (result2 !== null) {
              result3 = parse_hex();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, h1, h2, h3) {
              return h1 + h1 + h2 + h2 + h3 + h3;
            })(pos0, result0[1], result0[2], result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_hex() {
        var result0;
        
        if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9a-fA-F]");
          }
        }
        return result0;
      }
      
      function parse_rgba() {
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 4) === "rgb(") {
          result0 = "rgb(";
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"rgb(\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_elements();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 41) {
              result2 = ")";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\")\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 === null) {
          pos1 = pos;
          if (input.substr(pos, 5) === "rgba(") {
            result0 = "rgba(";
            pos += 5;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"rgba(\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_elements();
            if (result1 !== null) {
              if (input.charCodeAt(pos) === 41) {
                result2 = ")";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\")\"");
                }
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
              elements = elements.map(function(i){ return parseFloat(i) });
        
              var Color = require('app/models/properties/color');
              return new Color(elements[0], elements[1], elements[2], elements[3]);
            })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("rgba");
        }
        return result0;
      }
      
      function parse_shortcut() {
        var result0;
        
        reportFailures++;
        if (input.substr(pos, 3) === "red") {
          result0 = "red";
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"red\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 3) === "tan") {
            result0 = "tan";
            pos += 3;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"tan\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 4) === "grey") {
              result0 = "grey";
              pos += 4;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"grey\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 4) === "gray") {
                result0 = "gray";
                pos += 4;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"gray\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 4) === "lime") {
                  result0 = "lime";
                  pos += 4;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"lime\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 4) === "navy") {
                    result0 = "navy";
                    pos += 4;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"navy\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 4) === "blue") {
                      result0 = "blue";
                      pos += 4;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"blue\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos, 4) === "teal") {
                        result0 = "teal";
                        pos += 4;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"teal\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.substr(pos, 4) === "aqua") {
                          result0 = "aqua";
                          pos += 4;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"aqua\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.substr(pos, 4) === "cyan") {
                            result0 = "cyan";
                            pos += 4;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"cyan\"");
                            }
                          }
                          if (result0 === null) {
                            if (input.substr(pos, 4) === "gold") {
                              result0 = "gold";
                              pos += 4;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"gold\"");
                              }
                            }
                            if (result0 === null) {
                              if (input.substr(pos, 4) === "peru") {
                                result0 = "peru";
                                pos += 4;
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"peru\"");
                                }
                              }
                              if (result0 === null) {
                                if (input.substr(pos, 4) === "pink") {
                                  result0 = "pink";
                                  pos += 4;
                                } else {
                                  result0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"pink\"");
                                  }
                                }
                                if (result0 === null) {
                                  if (input.substr(pos, 4) === "plum") {
                                    result0 = "plum";
                                    pos += 4;
                                  } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"plum\"");
                                    }
                                  }
                                  if (result0 === null) {
                                    if (input.substr(pos, 4) === "snow") {
                                      result0 = "snow";
                                      pos += 4;
                                    } else {
                                      result0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"snow\"");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("shortcut");
        }
        return result0;
      }
      
      function parse_elements() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        if (input.length > pos) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("any character");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (input.length > pos) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("any character");
            }
          }
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          if (input.charCodeAt(pos) === 44) {
            result2 = ",";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\",\"");
            }
          }
          if (result2 !== null) {
            result3 = [];
            if (input.length > pos) {
              result4 = input.charAt(pos);
              pos++;
            } else {
              result4 = null;
              if (reportFailures === 0) {
                matchFailed("any character");
              }
            }
            while (result4 !== null) {
              result3.push(result4);
              if (input.length > pos) {
                result4 = input.charAt(pos);
                pos++;
              } else {
                result4 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
            }
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            if (input.charCodeAt(pos) === 44) {
              result2 = ",";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\",\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              if (input.length > pos) {
                result4 = input.charAt(pos);
                pos++;
              } else {
                result4 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              while (result4 !== null) {
                result3.push(result4);
                if (input.length > pos) {
                  result4 = input.charAt(pos);
                  pos++;
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("any character");
                  }
                }
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, head, tail) {
              var result = [head];
              for (var i = 0; i < tail.length; i++) {
                result.push(tail[i][2]);
              }
              return result;
            })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
