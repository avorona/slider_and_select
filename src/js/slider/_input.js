
export default class Input {

  constructor(selector,settings) {

    this.slider = settings.slider;
    this.selector=selector;
    this.config= settings.config;
    this.inputs=[].slice.call(document.querySelectorAll(selector));
    this._bindEvents();

  }


  setVal(value) {
  
    this.value = value;
    this.inputs.forEach(el => { 
      el.value=value;
    });

  }  

  _bindEvents() {

    let self = this;

    this.inputs.forEach(el => {

      el.addEventListener('input', function(e) {

        let input = e.currentTarget;

        // input.value = slider.noUiSlider.get();

        let val = input.value;

        if (self._validateData(input)) {

          console.log('validato');
          console.log(val);
          el.closest('.slider__input').classList.remove('is-invalid');

          self._setRangeValue(val);

        } else {
          console.log(val);
          el.closest('.slider__input').classList.add('is-invalid');
          input.value = '';

          self._setRangeValue(0);

          setTimeout(() => {
            el.closest('.slider__input').classList.remove('is-invalid');
          }, 800);


        }

      });

    });

  }





  _validateData(input) {

    let regexp = new RegExp('^[0-9]+/.+$');
    let val = input.value;
    let self=this;

    if ((regexp.test(val) && (val.length <= self.config.max)) || (val.length === 0)) { return true; }

    return false;

  }

  _setRangeValue(value) {

    const handlesSliders = [].slice.call(document.querySelectorAll(this.config.sliderSelector));
    // let self = this;

    handlesSliders.forEach(element => {

      if (value === 0) return element.noUiSlider.set(0);

      element.noUiSlider.set(value);

    });

  }




}
