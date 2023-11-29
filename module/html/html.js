/* A simple content module for loading a local html file */
function html_menuitem(args) {
  return "javascript:html_load('"+args+"');";
}

function html_display(content) {
  $('#contentArea').html(content);
}
function html_load(file) {
  // File may or may not be contained in a JSON string and array. Strip uneeded characters
  file = file.replace(/"/g,'');
  file = file.replace(/\[/g,'');
  file = file.replace(/\]/g,'');
  pushStateWithoutDuplicate(file, './?p=html/'+file);
  $.ajax({
      type: 'GET',
      url: "content/"+file
  }).done(html_display);
}
function html_permlink(permlink) {
  permlink = permlink.join("/");
  html_load(permlink);
}
