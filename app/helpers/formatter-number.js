import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
export default helper(function formatterNumber(params/*, hash*/) {

  if(isEmpty(params)) {
    return 0
  }
  return new Intl.NumberFormat('en-GB', { notation: "compact" , compactDisplay: "short" }).format(params[0])
});
