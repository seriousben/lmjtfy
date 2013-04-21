autoTime = 233

moveToButton = ->
  $('#fake_mouse').animate(
    top: $('#su').position().top + 5,
    left: $('#su').position().left+15,
    500, ->
      location.href = $('#search').attr('action') + '?' + $('#search').formSerialize()
  )

moveToText = ->
  $('#fake_mouse').animate(
    top: $("#kw").position().top + 5,
    left: $("#kw").position().left,
    2000, ->
      $("#kw").focus()
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
  $("#kw").attr("value",val)
  if index < str.length
    setTimeout(
      -> autoInput(str,index+1),
      Math.random()*autoTime
    )
  else
    moveToButton()

$(document).ready ->
  if wd = $.url().param 's'
    #access with a query
    $('#fake_mouse').show()
    switchMouseCursor()
    $('#su').ready ->
      moveToText()
      moveToRandom(wd)
  else
    #access directly, without a query
    $('#search').submit ->
      @kw.value = _.string.trim(@kw.value)
      if @kw.value
        $("#search_url").html location.href + '?s=' + $('#kw').val()
      false
