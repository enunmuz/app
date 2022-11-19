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
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"
    />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  </head>
  <body>
    <div class="app-container">
      <div class="app-tod-popup-overlay"></div>
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
        <div class="add-section-add-remove-tod-playlist-container">
          <div class="add-section-add-tod-playlist-container">
            <div class="add-section-add-tod">Add Daypart</div>
          </div>
          <div class="add-section-remove-tod-playlist-container">
            <div class="add-section-remove-tod">Remove Daypart</div>
          </div>
        </div>
        <div
          class="app-top-section-menu-thumb-delay-container"
          id="sortableThumbDiv"
        >
          <div
            class="app-menu-thumb-delay-container-holder"
            id="appSlidesThumb"
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
        <div class="tod-start-time-pick-info-container">
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
          <div class="tod-start-time-pick-info-label">
            Select the slides to add Daypart and click on
            <span>Done</span> button.
          </div>
        </div>
        <div class="tod-remove-daypart-info-container">
          <div class="tod-remove-daypart-info-label">
            Select the slides to remove Daypart and click on
            <span>Remove Daypart</span> button.
          </div>
          <button class="tod-remove-time" onclick="deleteTod()">
            Remove Daypart
          </button>
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
      $(document).click(function (e) {
        if ($(e.target).is(".add-section-remove-tod")) {
          $(".tod-remove-daypart-info-container").toggleClass(
            "tod-remove-daypart-info-container-hidden"
          );
          $(".app-tod-popup-overlay").toggle();
        } else if (
          !(
            $(e.target).is(".tod-remove-daypart-info-container-hidden") ||
            $(e.target).is(".app-top-section-menu-thumb-container")
          )
        ) {
          $(".tod-remove-daypart-info-container-hidden")
            .children()
            .click(function (e) {
              e.stopPropagation();
            });
          if ($(".tod-remove-daypart-info-container-hidden").is(":visible")) {
            $(".tod-remove-daypart-info-container").toggleClass(
              "tod-remove-daypart-info-container-hidden"
            );
            $(".app-top-section-menu-thumb-container").removeClass("todElem");
            $(".app-tod-popup-overlay").toggle();
          }
        }

        if ($(e.target).is(".add-section-add-tod")) {
          $(".tod-start-time-pick-info-container").toggleClass(
            "tod-start-time-pick-info-container-hidden"
          );
          $(".app-tod-popup-overlay").toggle();
        } else if (
          !(
            $(e.target).is(".tod-start-time-pick-info-container-hidden") ||
            $(e.target).is(".app-top-section-menu-thumb-container")
          )
        ) {
          $(".tod-start-time-pick-info-container-hidden")
            .children()
            .click(function (e) {
              e.stopPropagation();
            });
          if ($(".tod-start-time-pick-info-container-hidden").is(":visible")) {
            $(".tod-start-time-pick-info-container").toggleClass(
              "tod-start-time-pick-info-container-hidden"
            );
            $(".app-top-section-menu-thumb-container").removeClass("todElem");
            $(".app-tod-popup-overlay").toggle();
          }
        }
      });
      // function toggleTod(e) {
      //   $(".tod-start-time-pick-info-container").toggleClass(
      //     "tod-start-time-pick-info-container-hidden"
      //   );
      // }

      function fetchTod() {
        var x = document.getElementById("todStartTime").value;
        var y = document.getElementById("todEndTime").value;
        console.log(x + " - " + y);
        $(".tod-start-time-pick-info-container").toggleClass(
          "tod-start-time-pick-info-container-hidden"
        );
        $(".app-tod-popup-overlay").toggle();
        $(".tod-time-thumb", ".todElem").text(x + " - " + y);
        $(".app-top-section-menu-thumb-container").removeClass("todElem");
      }
      function deleteTod() {
        $(".tod-remove-daypart-info-container").toggleClass(
          "tod-remove-daypart-info-container-hidden"
        );
        $(".app-tod-popup-overlay").toggle();
        $(".tod-time-thumb", ".todElem").text("");
        $(".app-top-section-menu-thumb-container").removeClass("todElem");
      }

      $(function () {
        var sortableList = $("#appSlidesThumb");
        sortableList.sortable({
          revert: true,
          scroll: false,
          cursor: "move",
          placeholder: "sortable-placeholder",
        });
        sortableList.disableSelection();
      });
    </script>
  </body>
</html>
