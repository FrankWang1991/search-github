import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
export default helper(function formatterNumber(params/*, hash*/) {

  if(isEmpty(params)) {
    return 0
  }
  const value = params[0] || 0;

  return params[1] !== true?
     new Intl.NumberFormat('en-GB', { notation: "compact" , compactDisplay: "short" }).format(value)
     : Number.prototype.toLocaleString.call(value) 
});
