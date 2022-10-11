function loadFile(event) {
  var src = URL.createObjectURL(event.target.files[0]);
  $(".activeThumb").css("background-image", "url(" + src + ")");
  var canvasSrc = $(".activeThumb").css("background-image");
  canvasSrc = canvasSrc
    .replace("url(", "")
    .replace(")", "")
    .replace(/\"/gi, "");
  $("#qwe").css("background-image", "url(" + canvasSrc + ")");
}

function selectThumb(elem) {
  $(".app-top-section-menu-thumb-container").removeClass("activeThumb");
  $(elem).addClass("activeThumb");
  var canvasSrc = $(".activeThumb").css("background-image");
  canvasSrc = canvasSrc
    .replace("url(", "")
    .replace(")", "")
    .replace(/\"/gi, "");
  $("#qwe").css("background-image", "url(" + canvasSrc + ")");
}

function addDisplay(elem) {
  console.log($(".app-top-section-menu-thumb-container").length);
  if ($(".app-top-section-menu-thumb-container").length == 0) {
    $(
      `<div class="app-top-section-menu-thumb-container"  onclick="selectThumb(this);">  <span class="remove-menu-thumb" onclick="removeDisplay(this);"> </span></div>`
    ).insertBefore(".app-top-section-menu-add-container");
  } else {
    $(`<div class="app-top-section-menu-delay-container">
    <div class="app-top-section-menu-delay-label">Delay</div>
    <div class="app-top-section-menu-delay-input-secs">
      <input type="number" name="" id="delayInput" min="1" value="5" />
    </div>
    <div class="app-top-section-menu-delay-secs-label">Secs</div>
  </div><div class="app-top-section-menu-thumb-container"  onclick="selectThumb(this);">  <span class="remove-menu-thumb" onclick="removeDisplay(this);"> </span></div>`).insertBefore(
      ".app-top-section-menu-add-container"
    );
  }
}
function removeDisplay(elem) {
  if (
    $(elem)
      .parent()
      .prev("div")
      .hasClass("app-top-section-menu-delay-container")
  ) {
    $(elem).parent().prev("div").remove();
    $(elem).parent().remove();
  } else {
    $(elem).parent().remove();
  }
}
