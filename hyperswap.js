function getRules() {
  json = localStorage.getItem('redirects') || '[]'; 
  return JSON.parse(json);
}

function setRules(list) {
  localStorage.setItem('redirects', JSON.stringify(list));
  update();
}

function add() {
  var $from = $('#from');
  var $to = $('#to');
  if ($from.val() == '') {
    alert('Enter a url pattern', 'error');
    return;
  }
  if ($to.val() == '') {
    alert('Enter a redirect url', 'error');
    return;
  }
  try {
    new RegExp($from.val());
  } catch(err) {
    alert('Error: '+err, 'error');
    return;
  }
  redirects = getRules();
  redirects.push([$from.val(), $to.val()]);
  setRules(redirects);
  $from.val('');
  $to.val('');
  alert('Redirection Rule added.');
}

function remove() {
  redirects = getRules();
  if (!redirects) {
    update();
    return;
  }
  redirects.splice(this.value, 1);
  setRules(redirects);
  alert('Redirection Rule deleted.');
}

function alert(msg, type) {
  var $alert = $('#alert');
  var timeout;
  type = type || 'success'
  $alert.find('span.msg').html(msg);
  $alert.attr('class', 'alert fade in alert-'+type);
  $alert.show();
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    $alert.slideUp();
  }, 5000);
}

function update() {
  var redirects = getRules();
  var $tbody = $('#redirects table tbody');
  $tbody.html('');
  $('#redirects').toggle(redirects.length>0);
  for (var i=0; i<redirects.length; i++) {
    addTableItem(i, redirects[i][0], redirects[i][1]);
  }
}

function tmpln(id, context) {
  var tmpln = $('#'+id).html()
  for (var v in context) {
    tmpln = tmpln.replace('{{'+v+'}}', context[v]);
  }
  return $(tmpln);
}

function addTableItem(id, from, to) {
  var $row = tmpln('table_row', {
    'id': id,
    'from': from,
    'to': to
  });
  $row.find('button.remove').on('click', remove);
  $row.appendTo($('#redirects table tbody'));
}


$(document).ready(function(){
  $('#add').on('click', add);
  $('#alert').alert();
  update();
});
