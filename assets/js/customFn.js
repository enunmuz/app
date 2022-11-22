//eventListener to select the file
// document
//   .getElementById("uploadBgImg")
//   .addEventListener("change", readURL, true);

//function to select images only
// var images = [];
var delayInputCounter = 1;
// function loadFile(event) {
//   var src = URL.createObjectURL(event.target.files[0]);

//   // var file = document.getElementById("uploadBgImg").files[0];
//   // var reader = new FileReader();
//   // reader.onloadend = function () {
//   images.push(event.target.files[0]);
//   $(".activeThumb").css("background-image", "url(" + src + ")");
//   var canvasSrc = $(".activeThumb").css("background-image");
//   canvasSrc = canvasSrc
//     .replace("url(", "")
//     .replace(")", "")
//     .replace(/\"/gi, "");
//   $("#qwe").css("background-image", "url(" + canvasSrc + ")");
// }

function saveData() {
  var x = document.getElementById("app-success-snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  var data = new FormData();
  jQuery.each(images, function (i, file) {
    data.append("file-" + i, file);
  });

  for (let i = 0; i < 20; i++) {
    if ($("#delayInput-" + i).val()) {
      let val = $("#delayInput-" + i).val();
      data.append("delayInput-" + i, val);
    }
  }

  jQuery.ajax({
    url: "upload_data.php",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: "POST",
    type: "POST",
    success: function (data) {
      console.log(data);
    },
  });
}
$(document).on(
  "click",
  ".app-top-section-menu-thumb-container",
  function (event) {
    if ($(".tod-start-time-pick-info-container-hidden").is(":visible")) {
      $(this).toggleClass("todElem");
      $(this).removeClass("activeThumb");
    } else if ($(".tod-remove-daypart-info-container-hidden").is(":visible")) {
      $(this).toggleClass("todElem");
      $(this).removeClass("activeThumb");
    }
    // if (event.ctrlKey) {
    //   $(this).toggleClass("todElem");
    // }
  }
);

function addDisplay(elem) {
  console.log($(".app-top-section-menu-thumb-container").length);
  $(".app-menu-thumb-delay-container-holder")
    .append(`<div class="app-top-thumb-delay-holder">
<div
  class="app-top-section-menu-thumb-container"
  onclick="selectThumb(this);"
>
  <span class="remove-menu-thumb" onclick="removeDisplay(this);">
  </span>
  <span class="tod-time-thumb"></span>
</div>
<div class="app-top-section-menu-delay-container">
  <div class="app-top-section-menu-delay-label">Delay</div>
  <div class="app-top-section-menu-delay-input-secs">
    <input
      class="delayInput"
      type="number"
      name=""
      id="delayInput-${delayInputCounter}"
      min="1"
      value="5"
    />
  </div>
  <div class="app-top-section-menu-delay-secs-label">Secs</div>
</div>
</div>`);
  delayInputCounter++;
}
function removeDisplay(elem) {
  console.log($(elem).closest(".app-top-thumb-delay-holder"), "jkhghjkhgjkhg");
  $(elem).closest(".app-top-thumb-delay-holder").remove();
  // $(elem).parent().next("div").remove();
  // $(elem).parent().remove();
}
