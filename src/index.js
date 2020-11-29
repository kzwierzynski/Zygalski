import $ from 'jquery';
import debounce from 'js/utils';

require('css/index.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(document).ready(() => {

  $(window).on('resize', debounce(() => {

  }, 50));
});
