'use strict';

var getMaxItem = function (arr) {
  var max = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};
var HEIGHT_OF_DIAGRAM = 150;
var DIAGRAM_START_POINT_X = 160;
var DIAGRAM_START_POINT_Y = 240;
var WIDTH_OF_COLUMN = 40;
var SPACE_BETWEEN_COLUMNS = 50;
var CLOUD_START_POINT_X = 100;
var CLOUD_START_POINT_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_CORNER_RADIUS = 50;
var createCloud = function (ctx, startX, startY, width, height, radius, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(startX + radius, startY);
  ctx.lineTo(startX + width - radius, startY);
  ctx.arc(startX + width - radius, startY + radius, radius, -(Math.PI / 2), 0, false);
  ctx.lineTo(startX + width, startY + height - radius);
  ctx.arc(startX + width - radius, startY + height - radius, radius, 0, Math.PI / 2, false);
  ctx.lineTo(startX + radius, startY + height);
  ctx.arc(startX + radius, startY + height - radius, radius, Math.PI / 2, -Math.PI, false);
  ctx.lineTo(startX, startY + radius);
  ctx.arc(startX + radius, startY + radius, radius, Math.PI, -(Math.PI / 2), false);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

window.renderStatistics = function (ctx, names, times) {
  createCloud(ctx, CLOUD_START_POINT_X + 10, CLOUD_START_POINT_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_CORNER_RADIUS, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, CLOUD_START_POINT_X, CLOUD_START_POINT_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_CORNER_RADIUS, 'white');

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono, 16px';
  ctx.fillText('Ура, вы победили!', 230, 40);
  ctx.fillText('Список результатов:', 220, 60);

  var startHistogramColumnX = DIAGRAM_START_POINT_X;
  for (var i = 0; i < times.length; i++) {
    times[i] = Math.round(times[i]);
    ctx.fillStyle = (names[i] === 'Вы') ? 'red' : 'hsl(240,' + (Math.random().toFixed(1)) * 100 + '%, 50%)';
    ctx.fillRect(startHistogramColumnX, DIAGRAM_START_POINT_Y, WIDTH_OF_COLUMN, -(HEIGHT_OF_DIAGRAM * times[i] / getMaxItem(times)));
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], startHistogramColumnX, DIAGRAM_START_POINT_Y + 20);
    ctx.fillText(times[i], startHistogramColumnX, DIAGRAM_START_POINT_Y + -(HEIGHT_OF_DIAGRAM * times[i] / getMaxItem(times)) - 10);
    startHistogramColumnX += WIDTH_OF_COLUMN + SPACE_BETWEEN_COLUMNS;
  }
};
