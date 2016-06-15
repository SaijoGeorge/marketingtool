'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FogParticle = function () {
    function FogParticle(ctx, canvasWidth, canvasHeight) {
        _classCallCheck(this, FogParticle);

        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 0;
        this.y = 0;
    }

    FogParticle.prototype.setPosition = function setPosition(x, y) {
        this.x = x;
        this.y = y;
    };

    FogParticle.prototype.setVelocity = function setVelocity(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };

    FogParticle.prototype.setImage = function setImage(image) {
        this.image = image;
    };

    FogParticle.prototype.render = function render() {
        if (!this.image) return;

        this.ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2, 400, 400);

        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= this.canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = this.canvasWidth;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
                this.xVelocity = -this.xVelocity;
                this.x = 0;
            }

        // Check if has crossed the bottom edge
        if (this.y >= this.canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = this.canvasHeight;
        }
        // Check if has crossed the top edge
        else if (this.y <= 0) {
                this.yVelocity = -this.yVelocity;
                this.y = 0;
            }
    };

    return FogParticle;
}();

var Fog = function () {
    function Fog() {
        var _this = this;

        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var selector = _ref.selector;
        var _ref$density = _ref.density;
        var density = _ref$density === undefined ? 50 : _ref$density;
        var _ref$velocity = _ref.velocity;
        var velocity = _ref$velocity === undefined ? 2 : _ref$velocity;
        var particle = _ref.particle;
        var bgi = _ref.bgi;

        _classCallCheck(this, Fog);

        var canvas = document.querySelector(selector);
        var bcr = canvas.parentElement.getBoundingClientRect();
        this.ctx = canvas.getContext('2d');
        this.canvasWidth = canvas.width = bcr.width;
        this.canvasHeight = canvas.height = bcr.height;

        this.particleCount = density;
        this.maxVelocity = velocity;
        this.particle = particle;
        this.bgi = bgi;

        this._createParticles();
        this._setImage();

        if (!this.bgi) return;

        var img = new Image();
        img.onload = function () {
            var size = coverImg(img, _this.canvasWidth, _this.canvasHeight);
            _this.bgi = { img: img, w: size.w, h: size.h };
            _this._render();
        };
        img.src = this.bgi;
    }

    Fog.prototype._createParticles = function _createParticles() {
        this.particles = [];

        var random = function random(min, max) {
            return Math.random() * (max - min) + min;
        };

        for (var i = 0; i < this.particleCount; i++) {
            var particle = new FogParticle(this.ctx, this.canvasWidth, this.canvasHeight);

            particle.setPosition(random(0, this.canvasWidth), random(0, this.canvasHeight));
            particle.setVelocity(random(-this.maxVelocity, this.maxVelocity), random(-this.maxVelocity, this.maxVelocity));

            this.particles.push(particle);
        }
    };

    Fog.prototype._setImage = function _setImage() {
        var _this2 = this;

        if (!this.particle) return;

        var img = new Image();
        img.onload = function () {
            return _this2.particles.forEach(function (p) {
                return p.setImage(img);
            });
        };
        img.src = this.particle;
    };

    Fog.prototype._render = function _render() {
        if (this.bgi) {
            this.ctx.drawImage(this.bgi.img, 0, 0, this.bgi.w, this.bgi.h);
        } else {
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }

        this.particles.forEach(function (p) {
            return p.render();
        });

        requestAnimationFrame(this._render.bind(this));
    };

    return Fog;
}();

var Eraser = function () {
    function Eraser() {
        var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var bgCanvas = _ref2.bgCanvas;
        var brushCanvas = _ref2.brushCanvas;
        var bgi = _ref2.bgi;
        var _ref2$radius = _ref2.radius;
        var radius = _ref2$radius === undefined ? 120 : _ref2$radius;

        _classCallCheck(this, Eraser);

        bgCanvas = this.bgCanvas = document.querySelector(bgCanvas);
        this.brushCanvas = document.querySelector(brushCanvas);
        this.bgCtx = this.bgCanvas.getContext('2d');
        this.brushCtx = this.brushCanvas.getContext('2d');

        this.parentElement = this.bgCanvas.parentElement;
        var bcr = this.parentElement.getBoundingClientRect();
        this.canvasWidth = this.bgCanvas.width = this.brushCanvas.width = bcr.width;
        this.canvasHeight = this.bgCanvas.height = this.brushCanvas.height = bcr.height;

        this.brushRadius = radius;

        this.bgi = new Image();
        this.bgi.onload = this._attachEvents.bind(this);
        this.bgi.src = bgi;

        this.utils = {
            distanceBetween: function distanceBetween(point1, point2) {
                return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
            },
            angleBetween: function angleBetween(point1, point2) {
                return Math.atan2(point2.x - point1.x, point2.y - point1.y);
            },
            getMousePos: function getMousePos(e) {
                var bcr = bgCanvas.getBoundingClientRect();
                return {
                    x: e.clientX - bcr.left,
                    y: e.clientY - bcr.top
                };
            }
        };
    }

    Eraser.prototype._attachEvents = function _attachEvents() {
        this.parentElement.addEventListener('mousemove', this._onMouseMove.bind(this));
        this.parentElement.addEventListener('mouseleave', this._onMouseLeave.bind(this));
    };

    Eraser.prototype._onMouseMove = function _onMouseMove(e) {
        var currentPoint = this.utils.getMousePos(e);
        this.lastPoint = this.lastPoint || currentPoint;

        var dist = this.utils.distanceBetween(this.lastPoint, currentPoint);
        var angle = this.utils.angleBetween(this.lastPoint, currentPoint);

        for (var ii = 0; ii < dist; ii += 5) {
            var x = this.lastPoint.x + Math.sin(angle) * ii;
            var y = this.lastPoint.y + Math.cos(angle) * ii;

            var brush = this.brushCtx.createRadialGradient(x, y, 0, x, y, this.brushRadius);
            brush.addColorStop(0, 'rgba(0, 0, 0, 1)');
            brush.addColorStop(.3, 'rgba(0, 0, 0, .1)');
            brush.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.brushCtx.fillStyle = brush;
            this.brushCtx.fillRect(x - this.brushRadius, y - this.brushRadius, this.brushRadius * 2, this.brushRadius * 2);
        }

        this.lastPoint = currentPoint;

        this.bgCtx.globalCompositeOperation = 'source-over';
        var size = coverImg(this.bgi, this.canvasWidth, this.canvasHeight);
        this.bgCtx.drawImage(this.bgi, 0, 0, size.w, size.h);
        this.bgCtx.globalCompositeOperation = 'destination-in';
        this.bgCtx.drawImage(this.brushCanvas, 0, 0);
    };

    Eraser.prototype._onMouseLeave = function _onMouseLeave() {
        this.lastPoint = null;
    };

    return Eraser;
}();

var coverImg = function coverImg(img, width, height) {
    var ratio = img.width / img.height;
    var w = width;
    var h = w / ratio;
    if (h < height) {
        h = height;
        w = h * ratio;
    }
    return { w: w, h: h };
};

var bgi = 'assets/images/mybackground.png';

new Fog({
    selector: '#fog',
    particle: 'assets/images/fog-particle.png',
    density: 80,
    bgi: bgi
});

new Eraser({
    bgCanvas: '#bg',
    brushCanvas: '#brush',
    radius: 100,
    bgi: bgi
});
