export default class Range {

  constructor(settings) {
    this.config = settings;
    this._init();
  }

  _init() {
    this._createLabels();
  }

  setProgress(value) {

    const ruller = document.querySelector(this.config.customRange);
    const rullerStrokes = [...(ruller.children[0].children)];
    const l = rullerStrokes.length;


    let position = Math.floor(l / (this.config.max - this.config.min) * value);
    if (position >= rullerStrokes.length) {
      position = rullerStrokes.length - 1;
    }

    let current = rullerStrokes[position];

    current.style.fill = '#C55C4B';

    this._fillPrevSiblings(current);
    this._fillNextSiblings(current);

  }


  _fillPrevSiblings(el, filter) {

    const siblings = [];
    while (el = el.previousElementSibling) {
      if (!filter || filter(el)) siblings.push(el);
    }

    siblings.forEach(e => {
      e.style.fill = '#C55C4B';
    });

  }

  _fillNextSiblings(el, filter) {

    const siblings = [];
    while (el = el.nextElementSibling) {
      if (!filter || filter(el)) siblings.push(el);
    }

    siblings.forEach(e => {
      e.style.fill = '#FFFFFF';
    });


  }

  _createLabels() {

    let minLabel = document.querySelector('.js-label-min');
    let maxLabel = document.querySelector('.js-label-max');

    minLabel.innerHTML = this.config.min;
    maxLabel.innerHTML = this.config.max;

  }


}
