import nouiSlider from 'nouislider';
import Input from './_input';


export default class App {

  constructor(settings) {
    this.config=settings;
    this.input;
    this.slider;
    
    this._initInput();
    this._initSlider();
   

  }

  _initInput() {

    let self=this;
   
    self.input = new Input(self.config.inputSelector,{

      slider: self.sliderSelector,
      config: self.config

    });

  }


  _initSlider() {

    const handlesSliders = [].slice.call(document.querySelectorAll(this.config.sliderSelector));
    let self=this;

    handlesSliders.forEach(element => {

      nouiSlider.create(element, {
        start: self.config.start,
        connect: [true, false],
        range: {
          'min': self.config.min,
          'max': self.config.max
        }
      });

      self.input.setVal(self.config.start);


      element.noUiSlider.on('update', function(values, handle) {

        self.input.setVal(values[handle]);

      });

    });

  }



}





