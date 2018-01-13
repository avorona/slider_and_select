export default class Select {

  constructor(selector, settings) {

    this.config = settings;
    this.selector = selector;
    this.origin = {
      select: [],
      options: [],
      values: []
    };
    this.custom = {
      wrap: [],
      block: [],
      list: [],
      items: [],
      itemSelector: '',
      drop: []
    };
    this.output = {
      base: [],
      placeholder: settings.placeholder
    };
    this._init();
  }


  _init() {

    const select = document.querySelectorAll(this.selector);
    this.origin.select = select;

    const options = [...(select[0].children)];
    this.origin.options = options;

    let values = options.map(e => {
      return e.value;

    });

    this.origin.values = values;

    this._generateCustom();
    this._bindEvents();
  }


  _generateCustom() {
    this._generateBox();
  }

  _generateBox() {

    let values = this.origin.values;
    let select = this.origin.select;
    let self = this;

    select.forEach(el => {

      let wrap = document.createElement('div');
      wrap.classList.add('c-wrap');
      self.custom.wrap = wrap;

      let output = document.createElement('div');
      output.classList.add('c-output');

      self.output.base = output;
      self._setCurrent('ph');

      el.classList.add('is-hidden');

      el.parentNode.insertBefore(wrap, el);
      wrap.appendChild(el);


      let block = document.createElement('div');
      block.classList.add('c-select');
      self.custom.block = block;

      let list = document.createElement('div');
      list.classList.add('c-select__list');
      self.custom.list = list;


      values.forEach(function(el, i) {

        let item = document.createElement('div');
        item.innerHTML = values[i];
        self.custom.itemSelector = 'c-select__item';
        item.classList.add(self.custom.itemSelector);
        item.setAttribute('data-value', values[i]);
        self.custom.items.push(item);

        list.appendChild(item);

      });

      block.appendChild(list);
      wrap.appendChild(output);
      wrap.appendChild(block);

      this._generateDrop(wrap);

    });
  }


  _generateDrop(wrapper) {

    let parent = wrapper;

    let drop = document.createElement('button');
    drop.classList.add('c-select__dropdown');

    this.custom.drop = drop;
    parent.appendChild(drop);

  }

  _setCurrent(value) {

    let self = this;
    let output = this.output.base;
    let ph = this.output.placeholder;

    if ((value === 'ph') && (ph === undefined)) {

      // console.log(value);
      output.innerHTML = ' ';

    } else if (value === 'ph') {
      output.innerHTML = ph;
      output.classList.add('is-ph');
    } else {
      output.innerHTML = value;
      output.classList.remove('is-ph');

      self._toggleOrigins(value);




    }


  }

  _toggleOrigins(val) {

    let value = val;
    let originOptions = this.origin.options;

    originOptions.forEach(e => {
      e.removeAttribute('selected');
    });

    let current = originOptions.find(el => {
      if (el.value === value) return el;
    });

    current.setAttribute('selected', '');

  }

  _bindEvents() {

    this._clickOnOutput();
    this._clickOnItem();
    this._checkClickOutside();

  }


  _clickOnOutput(t) {

    let self = this;
    let trigger = this.output.base;;

    trigger.addEventListener('click', function(e) {
      let el = e.currentTarget;
      let list = el.nextSibling;
      self._openList(list);

    });

  }


  _clickOnItem() {

    let self = this;
    let list = this.custom.items;
    let block = this.custom.block;
    let itemSelector = self.custom.itemSelector;

    list.forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        let t = e.target;
        if (t && t.classList.contains(itemSelector)) {
          let val = e.currentTarget.getAttribute('data-value');

          self._setCurrent(val);
          self._closeList(block);
        }
      });

    });


  }

  _checkClickOutside() {

    const body = document.querySelector('body');
    const block = this.custom.block;
    const wrap = this.custom.wrap;
    let self = this;

    body.addEventListener('click', function(e) {
      self._closeList(block);

    });


    wrap.addEventListener('click', function(e) {


      if (!e.target.classList.contains(self.custom.itemSelector)) {
        e.stopPropagation();
      }
      self._openList(block);

    });



  }

  _openList(block) {

    block.classList.add('is-visible');
    this._toggleDrop(true);

  }

  _closeList(block) {

    block.classList.remove('is-visible');
    this._toggleDrop(false);

  }

  _toggleDrop(s) {
    let drop = this.custom.drop;
    if (s) {
      drop.classList.add('is-active');
    } else {
      drop.classList.remove('is-active');
    }

  }

}
