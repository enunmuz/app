//eventListener to select the file
// document
//   .getElementById("uploadBgImg")
//   .addEventListener("change", readURL, true);

//function to select images only
function loadFile(event) {
  var src = URL.createObjectURL(event.target.files[0]);

  // var file = document.getElementById("uploadBgImg").files[0];
  // var reader = new FileReader();
  // reader.onloadend = function () {
  //   console.log(reader);
  $(".activeThumb").css("background-image", "url(" + src + ")");
  // };
  // if (file) {
  //   reader.readAsDataURL(file);
  // } else {
  // }
}

function selectThumb(elem) {
  $(".app-top-section-menu-thumb-container").removeClass("activeThumb");
  $(elem).addClass("activeThumb");
  var src = $(".activeThumb").css("background-image");
  src = src.replace("url(", "").replace(")", "").replace(/\"/gi, "");
  $("#qwe").css("background-image", "url(" + src + ")");
}

function addDisplay(elem) {
  $(`<div class="app-top-section-menu-delay-container">
    <div class="app-top-section-menu-delay-label">Delay</div>
    <div class="app-top-section-menu-delay-input-secs">
      <input type="number" name="" id="delayInput" min="1" value="5" />
    </div>
    <div class="app-top-section-menu-delay-secs-label">Secs</div>
  </div><div class="app-top-section-menu-thumb-container"  onclick="selectThumb(this);"></div>`).insertBefore(
    ".app-top-section-menu-add-container"
  );
}
