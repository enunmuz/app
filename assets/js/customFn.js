//eventListener to select the file
// document
//   .getElementById("uploadBgImg")
//   .addEventListener("change", readURL, true);

//function to select images only
var images = [];
var delayInputCounter = 1;
function loadFile(event) {
  var src = URL.createObjectURL(event.target.files[0]);

  // var file = document.getElementById("uploadBgImg").files[0];
  // var reader = new FileReader();
  // reader.onloadend = function () {
  images.push(event.target.files[0]);
  $(".activeThumb").css("background-image", "url(" + src + ")");
  var canvasSrc = $(".activeThumb").css("background-image");
  canvasSrc = canvasSrc
    .replace("url(", "")
    .replace(")", "")
    .replace(/\"/gi, "");
  $("#qwe").css("background-image", "url(" + canvasSrc + ")");
}

function saveData() {
  var data = new FormData();
  jQuery.each(images, function (i, file) {
    data.append("file-" + i, file);
  });

  for(let i=0;i<20;i++){
    if($("#delayInput-"+i).val()){
      let val = $("#delayInput-"+i).val();
      data.append('delayInput-'+i, val);
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
  $(`<div class="app-top-section-menu-thumb-container"  onclick="selectThumb(this);">  <span class="remove-menu-thumb" onclick="removeDisplay(this);"> </span></div><div class="app-top-section-menu-delay-container">
  <div class="app-top-section-menu-delay-container">
    <div class="app-top-section-menu-delay-label">Delay</div>
    <div class="app-top-section-menu-delay-input-secs">
      <input class="delayInput" type="number" name="" id="delayInput-${delayInputCounter}" min="1" value="5" />
    </div>
    <div class="app-top-section-menu-delay-secs-label">Secs</div>
  </div>`).insertBefore(".app-top-section-menu-add-container");
  delayInputCounter++;
}
function removeDisplay(elem) {
  $(elem).parent().next("div").remove();
  $(elem).parent().remove();
}
