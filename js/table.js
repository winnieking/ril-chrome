function Table(){}

Table.render = function(list){
  var list_content = "";
  for(var i = 0; i < list.length; i++)
  {
    var item = list[i];
    item.index = i;
    var html = Table.getItemHtml(item);
    list_content += html;
  }

  $("#table_list").html(list_content);
  $(".table_img_mark_as_read").click(markAsRead);
}

Table.getItemHtml = function(item){
  var title = item.resolved_title ? item.resolved_title : item.given_title;
  var item =  "<tr id=\"line_index_"+item.index+"\" >"+
    "<td class=\"no_border\">"+
    "<span><img src=\""+Table.getFaviconUrl(item)+"\" id=\"favicon_index_"+item.index+"\" class=\"favicon\"></img></span>"+
    "</td>"+
    "<td nowrap='nowrap' class=\"item_link_td\">"+
    "<span id=\"title_span_index_"+item.index+"\" onclick=\"markAsRead()\">"+
    "<a href=\""+item.resolved_url+"\" target=\"_blank\" title=\""+title+"\">"+title+"</a>"+
    "</span>"+
    "</td>"+
    "<td class=\"no_border table_img_mark_as_read\" id=\"list_img_index_"+item.index+"\" item_id=\""+item.item_id+"\" index=\""+item.index+"\" title=\"Mark as Read\">"
    "</td>" +
    "</tr>";
    return item;
}

Table.getFaviconUrl = function(item){
  return Table.getDomain(item.resolved_url)+"/favicon.ico";
}

Table.getDomain = function(url){
  url = url.replace(/https?/,"");
  url = url.replace("://", "");
  var index = url.indexOf("/");
  url = "http://" + url.substr(0, index);
  if(url.length > 30)
    url = url.substr(0, 30) + "...";
  return url;
}

Table.changeElemStyle = function(id){  
  if(document.getElementById("list_img_index_"+id))
  {
    document.getElementById("list_img_index_"+id).style.backgroundImage="url('images/uncheck.png')";
    var elem = document.getElementById("line_index_"+id);
    elem.style.opacity = 0.3;
    elem.style.textDecoration = "line-through";
  }
}