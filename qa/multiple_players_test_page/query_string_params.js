// handle query string params
getQueryStringParams = function() {
  var params = {};
  var ps = window.location.search.split(/\?|&|\//);
  for (var i = 0; i < ps.length; i++) {
    if (ps[i]) {
      var p = ps[i].split(/=/);
      params[p[0]] = p[1];
    }
  }
  return params;
}