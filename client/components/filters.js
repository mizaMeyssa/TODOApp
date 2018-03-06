exports.beautify = function() {

  return function(str, wordSensitive, limit, start) {

  	var str = str || '';
  	var wordSensitive = wordSensitive || false;
  	limit = limit || 0;

  	var pretty_str = '';

  	if (str.length > limit) {
  		var pretty_str_arr = str.substring(0, limit).split(' ')
  		pretty_str_arr.pop();
  		pretty_str = pretty_str_arr.join(' ');

  	} else {
  		pretty_str = str+"...";
  	}
    return pretty_str;

  }

}