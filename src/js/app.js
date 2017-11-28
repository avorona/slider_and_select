import Slider from './slider/slider';
import Select from './select/select';



let slider = new Slider ({

  min: 0,
  max: 255,
  start: 24,
  sliderSelector: '.js-range-slider',
  inputSelector: '.js-rs-change',
  customRange: '.js-ruller',
  handlerImg: 'slider.svg'
});


let select = new Select ( '.js-select', {


  placeholder: 'Sattelites of Uranus*' // optional

});
