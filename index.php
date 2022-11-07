<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Menu builder</title>
    <link rel="stylesheet" href="assets/css/common.css" />
    <link rel="stylesheet" href="assets/css/top.css" />
    <link rel="stylesheet" href="assets/css/middle.css" />
    <link rel="stylesheet" href="assets/css/bottom.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  </head>
  <body>
    <div class="app-container">
      <div class="app-section-top">
        <div class="app-section-custom-thumb-options">
          <div class="addDisplay-cutstom-section">
            <div
              class="app-top-section-menu-add-container"
              onclick="addDisplay(this);"
            >
              <img
                src="./assets/svg/addcontainer.svg"
                class="addImgBtn"
                alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
        <div class="add-section-add-tod-playlist-container">
          <div class="add-section-add-tod" onclick="toggleTod();">ADD TOD</div>
          <div class="tod-timer-container">
            <div class="tod-start-time-pick">
              <div class="tod-start-time-pick-label">Start Time</div>
              <input type="time" id="todStartTime" value="01:00" />
            </div>
            <div class="tod-end-time-pick">
              <div class="tod-end-time-pick-label">End Time</div>
              <input type="time" id="todEndTime" value="01:00" />
            </div>
            <button class="tod-fetch-time" onclick="fetchTod()">Done</button>
          </div>
        </div>
        <div
          class="app-top-section-menu-thumb-delay-container"
          id="sortableThumbDiv"
        >
          <div class="app-top-thumb-delay-holder">
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
                  id="delayInput-0"
                  min="1"
                  value="5"
                />
              </div>
              <div class="app-top-section-menu-delay-secs-label">Secs</div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-section-middle">
        <div class="app-middle-section-menu-items-container">
          <div class="app-mid-sect-menu-items bg-container">
            <div class="app-mid-sect-menu-items-bg-icon">
              <img src="./assets/svg/bg.svg" alt="" srcset="" />
            </div>
            <div class="app-mid-sect-menu-items-bg-label">BACKGROUND</div>
          </div>
          <div class="app-mid-sect-menu-items bgimg-container">
            <div class="app-mid-sect-menu-items-bgimg-icon">
              <img src="./assets/svg/bgimg.svg" alt="" srcset="" />
            </div>
            <label for="uploadBgImg" class="app-mid-sect-menu-items-bgimg-label"
              >BACKGROUND IMAGE</label
            >
            <!-- <div class="app-mid-sect-menu-items-bgimg-label">
              BACKGROUND IMAGE
            </div> -->
            <input
              type="file"
              id="uploadBgImg"
              accept="image/png, image/jpeg"
              onchange="loadFile(event)"
              hidden
            />
          </div>
          <div class="app-mid-sect-menu-items img-container">
            <div class="app-mid-sect-menu-items-img-icon">
              <img src="./assets/svg/img.svg" alt="" srcset="" />
            </div>
            <div class="app-mid-sect-menu-items-img-label">IMAGE</div>
          </div>
          <div class="app-mid-sect-menu-items text-container">
            <div class="app-mid-sect-menu-items-text-icon">
              <img src="./assets/svg/text.svg" alt="" srcset="" />
            </div>
            <div class="app-mid-sect-menu-items-text-label">TEXT</div>
          </div>
          <div class="app-mid-sect-menu-items pp-container">
            <div class="app-mid-sect-menu-items-pp-icon">
              <img src="./assets/svg/pp.svg" alt="" srcset="" />
            </div>
            <div class="app-mid-sect-menu-items-pp-label">PRODUCT PRICE</div>
          </div>
        </div>
        <div class="app-middle-section-menu-undo-redo-container">
          <div class="app-middle-section-menu-undo-icon">
            <img
              src="./assets/svg/undo.svg"
              class="undo-redo-svg"
              alt=""
              srcset=""
            />
          </div>
          <div class="app-middle-section-menu-redo-icon">
            <img
              src="./assets/svg/redo.svg"
              class="undo-redo-svg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
      <div class="app-section-bottom">
        <div class="app-bottom-section-canvas-container" id="qwe"></div>
        <div class="app-bottom-section-save-reset-container">
          <div class="app-bottom-section-save-container" onclick="saveData()">
            Save
          </div>
          <div class="app-bottom-section-reset-container">Reset All</div>
        </div>
      </div>
    </div>
    <script src="assets/js/customFn.js"></script>
    <script>
      function toggleTod(e) {
        $(".tod-timer-container").toggleClass("tod-timer-container-hidden");
      }

      function fetchTod() {
        var x = document.getElementById("todStartTime").value;
        var y = document.getElementById("todEndTime").value;
        console.log(x + " - " + y);
        $(".tod-timer-container").toggleClass("tod-timer-container-hidden");
        $(".tod-time-thumb", ".todElem").text(x + " - " + y);
      }
      $(function () {
        $("#sortableThumbDiv").sortable();
      });
    </script>
  </body>
</html>
