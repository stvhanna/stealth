
import { Element } from '../Element.mjs';
import { Widget  } from '../Widget.mjs';



const update = function(tab) {

	if (tab !== null) {

		this.buttons.back.state(tab.can('back') ? 'enabled' : 'disabled');
		this.buttons.next.state(tab.can('next') ? 'enabled' : 'disabled');
		this.buttons.action.value(tab.can('pause') ? 'pause' : 'refresh');
		this.buttons.action.state('enabled');

	} else {

		this.buttons.back.state('disabled');
		this.buttons.next.state('disabled');
		this.buttons.action.state('disabled');

	}

};



const History = function(browser) {

	this.element = new Element('browser-history', [
		'<button data-key="back" title="Visit earlier Site" disabled></button>',
		'<button data-key="next" title="Visit later Site" disabled></button>',
		'<button data-key="action" data-val="refresh" title="Refresh/Pause current Tab" disabled></button>',
		'<button data-key="open" title="Open Tab" disabled></button>'
	].join(''));

	this.buttons = {
		back:   this.element.query('[data-key="back"]'),
		next:   this.element.query('[data-key="next"]'),
		action: this.element.query('[data-key="action"]'),
		open:   this.element.query('[data-key="open"]')
	};


	this.element.on('contextmenu', (e) => {
		e.preventDefault();
		e.stopPropagation();
	});

	this.buttons.back.on('click', () => {
		browser.back();
	});

	this.buttons.next.on('click', () => {
		browser.next();
	});

	this.buttons.action.on('click', () => {

		let val = this.action.value();
		if (val === 'refresh') {
			browser.refresh();
		} else if (val === 'pause') {
			browser.pause();
		}

	});

	this.buttons.open.state('enabled');
	this.buttons.open.on('click', () => {
		browser.navigate('stealth:welcome');
	});


	browser.on('show',    (tab) => update.call(this, tab));
	browser.on('refresh', (tab) => update.call(this, tab));


	Widget.call(this);

};


History.prototype = Object.assign({}, Widget.prototype);


export { History };

