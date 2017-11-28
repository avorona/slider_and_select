import App from './slider/slider';
import './_select';



let app = new App({

  min: 0,
  max: 100,
  start: 30,
  sliderSelector: '.js-range-slider',
  inputSelector: '.js-rs-change',
  customRange: '.js-ruller',
  handlerImg: 'slider.svg'
});
