import Component from '@glimmer/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

/**
 * debounce
 */
/*
function selfDebounce(fn,delay) {
    let timer = null;
    return function(...args) {
       const context = this;
       clearTimeout(timer)
       timer = setTimeout(() => {
           fn.apply(context,args)
       }, delay);
    }
}
*/
export default class SearchWrapperBarComponent extends Component {
    fetch() {
        // debounce delay 之后执行的操作
        const value = this.args.inputValue;
        if(!isEmpty(value)) {
            this.args.inputChange(this.args.inputValue)
        }
    }
    @action
    inputChange(/* e */) {
        debounce(this, this.fetch, 1000);
    }
}
