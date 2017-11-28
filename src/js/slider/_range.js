


export default class Range {
  
  constructor(settings) {

    this.config=settings; 

    
    this._init();
  

  }



  _init() {
    this._createLabels();
  }


  setProgress(value) {

    let ruller= document.querySelector(this.config.customRange);

    let rullerStrokes=[].slice.call(ruller.children[0].children);
    let l = rullerStrokes.length;
    // console.log(value, ruller, rullerStrokes);

    let position = Math.floor(l/(this.config.max - this.config.min)*value);


    // console.log(position);

    let current = rullerStrokes[position];

    current.style.fill ='#FF6F2B';

    this._fillPrevSiblings(current);

    this._fillNextSiblings(current);

  }


  _fillPrevSiblings(el, filter) {

   
    var siblings = [];
    while (el = el.previousElementSibling) { if (!filter || filter(el)) siblings.push(el); }

    siblings.forEach(e => {
      // console.log(e);
      e.style.fill = '#FF6F2B';

    });
   


  } 

  _fillNextSiblings(el, filter) {

 
    var siblings = [];
    while (el = el.nextElementSibling) { if (!filter || filter(el)) siblings.push(el); }
    

    siblings.forEach(e => {
      e.style.fill ='#E3E3E3';
    });
  

  }


  _createLabels() {

    let minLabel=document.querySelector('.js-label-min');
    let maxLabel=document.querySelector('.js-label-max');
    // let wrap = document.querySelector('.label-wrap');

    // console.log(this.config.min, this.config.max);
    minLabel.innerHTML=this.config.min;
    maxLabel.innerHTML=this.config.max;


  }

  

}
