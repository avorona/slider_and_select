export default class Input {

  constructor(selector, settings) {

    this.slider = settings.slider;
    this.selector = selector;
    this.config = settings.config;
    this.inputs = [...document.querySelectorAll(selector)];
    this._bindEvents();

  }


  setVal(value) {

    this.value = Math.floor(+value);

    this.inputs.forEach(el => {
      el.value = this.value;
    });

  }

  _bindEvents() {

    let self = this;
    this.inputs.forEach(el => {
      el.addEventListener('input', function(e) {
        let input = e.currentTarget;
        let val = input.value;

        el.closest('.slider__input').classList.remove('is-invalid');
        self._setRangeValue(val);
      });

    });

  }


  _setRangeValue(value) {

    const handlesSliders = [].slice.call(document.querySelectorAll(this.config.sliderSelector));
    handlesSliders.forEach(element => {

      if (value === 0) return element.noUiSlider.set(0);
      element.noUiSlider.set(value);
    });

  }




}
