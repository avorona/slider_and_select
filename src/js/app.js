import App from './slider/slider';
import './_select';



let app = new App({

  min: 0,
  max: 100,
  start: 40,
  sliderSelector: '.js-range-slider',
  inputSelector: '.js-rs-change'
  
});
