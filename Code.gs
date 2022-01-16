/**
 * Sums input hours using syntax hh:mm.
 *
 * @param {range} input The values to add up.
 * @customfunction
 */
function ADDTIMES(input) {
  let minutes = 0;
  let debug = false;
  if (input == undefined) return "Undefined";
  if (typeof(input) == 'object') {
    if (typeof(input[0]) == 'object') {
      for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[i].length; ++j) {
          if (isNaN(parseInt(input[i][j]))) continue;
          minutes += parseInt(input[i][j].slice(0,input[i][j].indexOf(":")))*60
          if (isNaN(minutes)) return "NaN from hours calc 1";
          minutes += parseInt(input[i][j].slice(input[i][j].indexOf(":")+1))
          if (isNaN(minutes)) return "NaN from min calc 1";
        }
      }
    }
    else {
      return "This doesn't ever happen";
    }
  }
  else {
    minutes += parseInt(input.slice(0,input.indexOf(":")))*60
    if (isNaN(minutes)) return "NaN from hours calc";
    minutes += parseInt(input.slice(input.indexOf(":")+1))
    if (isNaN(minutes)) return "NaN from minutes calc";
  }
  let h = Math.trunc(parseFloat(minutes)/60);
  if (isNaN(h)) {
    return "NaN from hour display"
  }
  let m = (minutes%60>=10 ? minutes%60 : "0" + minutes%60);
  if (isNaN(m)) {
    return "NaN from minute display"
  }
  if (debug == true) {
    debug = "";
    try {
      debug += typeof(input) + "[" + input.length + "]" + ", " 
      debug += typeof(input[0]) + "[" + input[0].length + "]" + ", " 
      debug += typeof(input[0][0])  + "[" + input[0][0].length + "]"
    } catch {}
  }
  if (debug != "") return (h + ":" + m + ", " + debug)
  return (h + ":" + m);
}
/**
 * Subtracts input hours using syntax hh:mm.
 *
 * @param {a,b} input Subtracts b range from a range.
 * @customfunction
 */
function SUBTIMES(a,b) {
  let minutes = 0;
  if (typeof(a) == "string" && a.indexOf(":")==-1) { // overrides for format 00h00m
    if (a.indexOf("h")!=-1) {
      minutes += parseInt(a.slice(0,a.indexOf("h")))*60
      if (a.indexOf("m")!=-1) {
        minutes += parseInt(a.slice(a.indexOf("h")+1,a.indexOf("m")))
      }
      else if (!isNaN(parseInt(a.slice(a.indexOf("h")+1)))) {
        minutes += parseInt(a.slice(a.indexOf("h")+1))
      }
    }
    else {
      minutes += parseInt(a.slice(a.indexOf("h")+1))
    }
    if (isNaN(minutes)) {
      return "";
    }
    return FORMATMINUTES(minutes);
  }
  if (typeof(a[0]) == 'object') a = ADDTIMES(a);
  if (typeof(b[0]) == 'object') b = ADDTIMES(b);
  minutes = GETMINUTES(b)-GETMINUTES(a);
  while (minutes < 0) {
    minutes += 12*60
  }
  return FORMATMINUTES(minutes);
}
function GETMINUTES(input) {
  return parseInt(input.slice(0,input.indexOf(":")))*60 + parseInt(input.slice(input.indexOf(":")+1))
}
function FORMATMINUTES(minutes) {
    return (Math.trunc(minutes/60) + ":" + (Math.abs(minutes)%60>=10 ? Math.abs(minutes)%60 : "0" + Math.abs(minutes%60)));
}
