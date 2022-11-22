var w = $(".app-section-bottom").innerWidth() - 40;
var h = $(".app-section-bottom").innerHeight() - 40;
var actualRatioW = w / h;
var actualRatioH = h / w;
var desiredRatioW = 16 / 9;
var desiredRatioH = 9 / 16;
var maxW = Math.min(w, (desiredRatioW / actualRatioW) * w);
var maxH = Math.min(h, (desiredRatioH / actualRatioH) * h);
$(".app-bottom-section-canvas-container").width(maxW);
$(".app-bottom-section-canvas-container").height(maxH);
let theImg;

var width = $(".app-bottom-section-canvas-container").innerWidth();
var height = $(".app-bottom-section-canvas-container").innerHeight();
var GUIDELINE_OFFSET = 5;
var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);
stage.getContainer().style.backgroundColor = "white";
// were can we snap our objects?
function getLineGuideStops(skipShape) {
  // we can snap to stage borders and the center of the stage
  var vertical = [0, stage.width() / 2, stage.width()];
  var horizontal = [0, stage.height() / 2, stage.height()];

  // and we snap over edges and center of each object on the canvas
  stage.find(".object").forEach((guideItem) => {
    if (guideItem === skipShape) {
      return;
    }
    var box = guideItem.getClientRect();
    // and we can snap to all edges of shapes
    vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
    horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
  });
  return {
    vertical: vertical.flat(),
    horizontal: horizontal.flat(),
  };
}

// what points of the object will trigger to snapping?
// it can be just center of the object
// but we will enable all edges and center
function getObjectSnappingEdges(node) {
  var box = node.getClientRect();
  var absPos = node.absolutePosition();

  return {
    vertical: [
      {
        guide: Math.round(box.x),
        offset: Math.round(absPos.x - box.x),
        snap: "start",
      },
      {
        guide: Math.round(box.x + box.width / 2),
        offset: Math.round(absPos.x - box.x - box.width / 2),
        snap: "center",
      },
      {
        guide: Math.round(box.x + box.width),
        offset: Math.round(absPos.x - box.x - box.width),
        snap: "end",
      },
    ],
    horizontal: [
      {
        guide: Math.round(box.y),
        offset: Math.round(absPos.y - box.y),
        snap: "start",
      },
      {
        guide: Math.round(box.y + box.height / 2),
        offset: Math.round(absPos.y - box.y - box.height / 2),
        snap: "center",
      },
      {
        guide: Math.round(box.y + box.height),
        offset: Math.round(absPos.y - box.y - box.height),
        snap: "end",
      },
    ],
  };
}

// find all snapping possibilities
function getGuides(lineGuideStops, itemBounds) {
  var resultV = [];
  var resultH = [];

  lineGuideStops.vertical.forEach((lineGuide) => {
    itemBounds.vertical.forEach((itemBound) => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      // if the distance between guild line and object snap point is close we can consider this for snapping
      if (diff < GUIDELINE_OFFSET) {
        resultV.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  lineGuideStops.horizontal.forEach((lineGuide) => {
    itemBounds.horizontal.forEach((itemBound) => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      if (diff < GUIDELINE_OFFSET) {
        resultH.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  var guides = [];

  // find closest snap
  var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
  var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
  if (minV) {
    guides.push({
      lineGuide: minV.lineGuide,
      offset: minV.offset,
      orientation: "V",
      snap: minV.snap,
    });
  }
  if (minH) {
    guides.push({
      lineGuide: minH.lineGuide,
      offset: minH.offset,
      orientation: "H",
      snap: minH.snap,
    });
  }
  return guides;
}

function drawGuides(guides) {
  guides.forEach((lg) => {
    if (lg.orientation === "H") {
      var line = new Konva.Line({
        points: [-6000, 0, 6000, 0],
        stroke: "rgb(0, 161, 255)",
        strokeWidth: 1,
        name: "guid-line",
        dash: [4, 6],
      });
      layer.add(line);
      line.absolutePosition({
        x: 0,
        y: lg.lineGuide,
      });
    } else if (lg.orientation === "V") {
      var line = new Konva.Line({
        points: [0, -6000, 0, 6000],
        stroke: "rgb(0, 161, 255)",
        strokeWidth: 1,
        name: "guid-line",
        dash: [4, 6],
      });
      layer.add(line);
      line.absolutePosition({
        x: lg.lineGuide,
        y: 0,
      });
    }
  });
}

layer.on("dragmove", function (e) {
  layer.find(".guid-line").forEach((l) => l.destroy());
  var lineGuideStops = getLineGuideStops(e.target);
  var itemBounds = getObjectSnappingEdges(e.target);
  var guides = getGuides(lineGuideStops, itemBounds);
  if (!guides.length) {
    return;
  }

  drawGuides(guides);

  var absPos = e.target.absolutePosition();
  guides.forEach((lg) => {
    switch (lg.snap) {
      case "start": {
        switch (lg.orientation) {
          case "V": {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case "H": {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
      case "center": {
        switch (lg.orientation) {
          case "V": {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case "H": {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
      case "end": {
        switch (lg.orientation) {
          case "V": {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case "H": {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
    }
  });
  e.target.absolutePosition(absPos);
});

layer.on("dragend", function (e) {
  // clear all previous lines on the screen
  layer.find(".guid-line").forEach((l) => l.destroy());
});
let currentShape;
let fontSize;
let textAlign;
$(".font-size-quill").on("change", function () {
  let input = $(this);
  currentShape.fontSize(Number(input.val()));
});
$(".text-align-quill-left-align").click(function () {
  currentShape.align("left");
  $(".text-align-quill-left-align").css({
    backgroundColor: "#f5f5f5",
  });
  $(".text-align-quill-center-align,.text-align-quill-right-align").css({
    backgroundColor: "white",
  });
});
$(".text-align-quill-center-align").click(function () {
  currentShape.align("center");
  $(".text-align-quill-left-align,.text-align-quill-right-align").css({
    backgroundColor: "white",
  });
  $(".text-align-quill-center-align").css({ backgroundColor: "#f5f5f5" });
});
$(".text-align-quill-right-align").click(function () {
  currentShape.align("right");
  $(".text-align-quill-left-align,.text-align-quill-center-align").css({
    backgroundColor: "white",
  });
  $(".text-align-quill-right-align").css({ backgroundColor: "#f5f5f5" });
});
$(".text-bold-quill").click(function () {
  if (currentShape.fontStyle() === "bold") {
    $(".text-bold-quill").css({ backgroundColor: "white" });
    currentShape.fontStyle("normal");
  } else if (currentShape.fontStyle() === "normal") {
    currentShape.fontStyle("bold");
    $(".text-bold-quill").css({ backgroundColor: "#f5f5f5" });
  } else if (currentShape.fontStyle() === "italic bold") {
    $(".text-bold-quill").css({ backgroundColor: "white" });
    currentShape.fontStyle("italic");
  } else if (currentShape.fontStyle() === "italic") {
    $(".text-bold-quill").css({ backgroundColor: "#f5f5f5" });
    currentShape.fontStyle("italic bold");
  }
});
$(".text-italics-quill").click(function () {
  if (currentShape.fontStyle() === "italic") {
    $(".text-italics-quill").css({ backgroundColor: "white" });
    currentShape.fontStyle("normal");
  } else if (currentShape.fontStyle() === "normal") {
    currentShape.fontStyle("italic");
    $(".text-italics-quill").css({ backgroundColor: "#f5f5f5" });
  } else if (currentShape.fontStyle() === "italic bold") {
    $(".text-italics-quill").css({ backgroundColor: "white" });
    currentShape.fontStyle("bold");
  } else if (currentShape.fontStyle() === "bold") {
    $(".text-italics-quill").css({ backgroundColor: "#f5f5f5" });
    currentShape.fontStyle("italic bold");
  }
});
function addTextContainer(elem) {
  var textPlacehoderDefault;

  if ($(elem).hasClass("text-container")) {
    textPlacehoderDefault = "Burger Combo";
  } else if ($(elem).hasClass("pp-container")) {
    textPlacehoderDefault = "$20";
  }
  var textNode = new Konva.Text({
    text: textPlacehoderDefault,
    x: 50,
    y: 80,
    fontSize: 20,
    draggable: true,
    fontSize: 30,
    fill: "#1E8BC3",
    name: "object",
  });
  textNode.on("mouseenter", function () {
    stage.container().style.cursor = "move";
  });

  textNode.on("mouseleave", function () {
    stage.container().style.cursor = "default";
  });
  layer.add(textNode);

  var trAddtxt = new Konva.Transformer({
    nodes: [textNode],
    centeredScaling: true,
    rotationSnaps: [0, 90, 180, 270],
    keepRatio: true,
    padding: 10,
    // enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  //   textNode.on("transform", function () {
  //     // reset scale, so only with is changing by transformer
  //     textNode.setAttrs({
  //       width: textNode.width() * textNode.scaleX(),
  //       scaleX: 1,
  //     });
  //   });

  layer.add(trAddtxt);
  textNode.on("dblclick dbltap click", (e) => {
    currentShape = e.target;
    fontSize = currentShape.fontSize();
    textAlign = currentShape.align();
    $(".font-size-quill").val(fontSize);

    if (textAlign === "left") {
      $(".text-align-quill-left-align").css({
        backgroundColor: "#f5f5f5",
      });
      $(".text-align-quill-center-align,.text-align-quill-right-align").css({
        backgroundColor: "white",
      });
    } else if (textAlign === "center") {
      $(".text-align-quill-left-align,.text-align-quill-right-align").css({
        backgroundColor: "white",
      });
      $(".text-align-quill-center-align").css({ backgroundColor: "#f5f5f5" });
    } else if (textAlign === "right") {
      $(".text-align-quill-left-align,.text-align-quill-center-align").css({
        backgroundColor: "white",
      });
      $(".text-align-quill-right-align").css({ backgroundColor: "#f5f5f5" });
    }

    if (currentShape.fontStyle() === "bold") {
      $(".text-bold-quill").css({ backgroundColor: "#f5f5f5" });
      $(".text-italics-quill").css({ backgroundColor: "white" });
    } else if (currentShape.fontStyle() === "normal") {
      $(".text-bold-quill").css({ backgroundColor: "white" });
      $(".text-italics-quill").css({ backgroundColor: "white" });
    }
    if (currentShape.fontStyle() === "italic") {
      $(".text-italics-quill").css({ backgroundColor: "#f5f5f5" });
      $(".text-bold-quill").css({ backgroundColor: "white" });
    } else if (currentShape.fontStyle() === "normal") {
      $(".text-italics-quill").css({ backgroundColor: "white" });
      $(".text-bold-quill").css({ backgroundColor: "white" });
    }
    if (currentShape.fontStyle() === "italic bold") {
      $(".text-bold-quill").css({ backgroundColor: "#f5f5f5" });
      $(".text-italics-quill").css({ backgroundColor: "#f5f5f5" });
    } else if (currentShape.fontStyle() === "normal") {
      $(".text-bold-quill").css({ backgroundColor: "white" });
      $(".text-italics-quill").css({ backgroundColor: "white" });
    }

    $(".app-bottom-section-canvas-quill-container").css({ left: "5px" });
  });
  textNode.on("dblclick dbltap", (e) => {
    currentShape = e.target;
    textNode.hide();
    trAddtxt.hide();
    var textPosition = textNode.absolutePosition();
    var areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    rotation = textNode.rotation();
    var transform = "";
    if (rotation) {
      transform += "rotateZ(" + rotation + "deg)";
    }

    var px = 0;
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += "translateY(-" + px + "px)";

    textarea.style.transform = transform;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      trAddtxt.show();
      trAddtxt.forceUpdate();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + "px";
    }

    textarea.addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", function (e) {
      scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + "px";
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
        trAddtxt.nodes([]);
        console.log("akjsdhkj");
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  });
  stage.on("click", function (e) {
    currentShape = e.target;
    // console.log(currentShape, "-90878976");
    if (currentShape === stage) {
      trAddtxt.nodes([]);
      $(".app-bottom-section-canvas-quill-container").css({ left: "-60px" });
    } else {
      trAddtxt.nodes([currentShape]);
    }
    // layer.draw();
  });
}
var imageObj = new Image();
function loadFile(event) {
  // var src = URL.createObjectURL(event.target.files[0]);
  var images = [];
  var URL = window.webkitURL || window.URL;
  var url = URL.createObjectURL(event.target.files[0]);
  $(".activeThumb").css("background-image", "url(" + url + ")");
  // var imageObj = new Image();
  imageObj.src = url;

  imageObj.onload = function () {
    var img_width = $("#container").innerWidth();
    var img_height = $("#container").innerHeight();

    theImg = new Konva.Image({
      image: imageObj,
      x: 0,
      y: 0,
      width: img_width,
      height: img_height,
      draggable: true,
      centeredScaling: false,
      resizeEnabled: false,
    });

    layer.add(theImg);
    layer.draw();
    // theImg.moveToBottom();
  };
}
function selectThumb(elem) {
  $(".app-top-section-menu-thumb-container").removeClass("activeThumb");
  $(elem).addClass("activeThumb");
  var canvasSrc = $(".activeThumb").css("background-image");

  canvasSrc = canvasSrc
    .replace("url(", "")
    .replace(")", "")
    .replace(/\"/gi, "");
  imageObj.src = canvasSrc;
  // $("#qwe").css("background-image", "url(" + canvasSrc + ")");
}
