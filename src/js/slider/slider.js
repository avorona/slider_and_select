import nouiSlider from 'nouislider';
import Input from './_input';
import Range from './_range';


export default class Slider {

  constructor(settings) {
    this.config = settings;
    this.input;
    this.range;
    this.slider;
    this._initInput();
    this._initRange();
    this._initSlider();

  }

  _initInput() {

    let self = this;

    self.input = new Input(self.config.inputSelector, {
      slider: self.sliderSelector,
      config: self.config
    });

  }

  _initRange() {

    let self = this;
    self.range = new Range(self.config);

  }


  _initSlider() {

    const handlesSliders = [].slice.call(document.querySelectorAll(this.config.sliderSelector));
    let self = this;

    handlesSliders.forEach(element => {
      nouiSlider.create(element, {
        start: self.config.start,
        range: {
          'min': self.config.min,
          'max': self.config.max
        }
      });

      self.input.setVal(self.config.start);

      element.noUiSlider.on('update', function(values, handle) {
        self.input.setVal(values[handle]);
        self.range.setProgress(values[handle]);
      });

    });

  }


}
