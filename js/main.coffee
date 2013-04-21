autoTime = 233

moveToButton = ->
  $('#fake_mouse').animate(
    top: $('#search_button').position().top + 5,
    left: $('#search_button').position().left+15,
    500, ->
      #location.href = $('#search').attr('action') + '?' + $('#search').formSerialize()
  )

moveToText = ->
  $('#fake_mouse').animate(
    top: $("#search_query").position().top + 5,
    left: $("#search_query").position().left,
    2000, ->
      $("#search_query").focus()
  )

moveToRandom = (str)->
  stemp = str
  $('#fake_mouse').animate(
    top:"+=5px",
    left:"+=10px",
    "fast", ->
      autoInput(stemp,0)
  )

switchMouseCursor = ->
  agent = navigator.userAgent
  if agent.indexOf("Windows NT")
    $('#fake_mouse').attr("src", "img/mouse_arrow_windows_aero.png")
  else if agent.indexOf("Mac OS")
    $('#fake_mouse').attr("src", "img/mouse_arrow_mac.png")

autoInput = (str,index) ->
  val = str.substr(0,index + 1)
  $("#search_query").attr("value",val)
  if index < str.length
    setTimeout(
      -> autoInput(str,index+1),
      Math.random()*autoTime
    )
  else
    moveToButton()

search_submitted = ->
  $('#search_query').value = _.string.trim($('#search_query').val())
  if $('#search_query').val()
    $("#search_url").html location.href + '?s=' + $('#search_query').val()

$(document).ready ->
  if wd = $.url().param 's'
    #access with a query
    $('#fake_mouse').show()
    switchMouseCursor()
    $('#search').ready ->
      moveToText()
      moveToRandom(wd)
  else
    #access directly, without a query
    $('#search').submit ->
      search_submitted()
      false
    $('#search_button').click ->
      search_submitted()
      false
