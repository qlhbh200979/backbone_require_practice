/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.1.0
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
*/
(function(){var t,e,s,i,r,o={}.hasOwnProperty,h=function(t,e){function s(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},n={zh_cn:{no_results_text:"没有找到"},zh_tw:{no_results_text:"沒有找到"},en:{no_results_text:"No results match"}};i=function(){function e(){this.options_index=0,this.parsed=[]}return e.prototype.add_node=function(t){return"OPTGROUP"===t.nodeName.toUpperCase()?this.add_group(t):this.add_option(t)},e.prototype.add_group=function(e){var s,i,r,o,h,n;for(s=this.parsed.length,this.parsed.push({array_index:s,group:!0,label:this.escapeExpression(e.label),children:0,disabled:e.disabled,title:e.title,search_keys:t.trim(e.getAttribute("data-keys")||"").replace(/,/g," ")}),h=e.childNodes,n=[],r=0,o=h.length;o>r;r++)i=h[r],n.push(this.add_option(i,s,e.disabled));return n},e.prototype.add_option=function(e,s,i){return"OPTION"===e.nodeName.toUpperCase()?(""!==e.text?(null!=s&&(this.parsed[s].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:e.value,text:e.text,title:e.title,html:e.innerHTML,selected:e.selected,disabled:i===!0?i:e.disabled,group_array_index:s,classes:e.className,style:e.style.cssText,search_keys:t.trim(e.getAttribute("data-keys")||"").replace(/,/," ")})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},e.prototype.escapeExpression=function(t){var e,s;return null==t||t===!1?"":/[\&\<\>\"\'\`]/.test(t)?(e={"<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#x27;","`":"&#x60;"},s=/&(?!\w+;)|[\<\>\"\'\`]/g,t.replace(s,function(t){return e[t]||"&amp;"})):t},e}(),i.select_to_array=function(t){var e,s,r,o,h;for(s=new i,h=t.childNodes,r=0,o=h.length;o>r;r++)e=h[r],s.add_node(e);return s.parsed},e=function(){function e(s,i){this.form_field=s,this.options=null!=i?i:{},e.browser_is_supported()&&(this.lang=n[this.options.lang||(t.zui.clientLang?t.zui.clientLang():"zh_cn")],this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return e.prototype.set_default_values=function(){var t=this;return this.click_test_action=function(e){return t.test_active_click(e)},this.activate_action=function(e){return t.activate_field(e)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.drop_direction=this.options.drop_direction||"auto",this.middle_highlight=this.options.middle_highlight,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},e.prototype.set_default_text=function(){return this.form_field.getAttribute("data-placeholder")?this.default_text=this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||e.default_multiple_text:this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||e.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||this.lang.no_results_text||e.default_no_result_text},e.prototype.mouse_enter=function(){return this.mouse_on_container=!0},e.prototype.mouse_leave=function(){return this.mouse_on_container=!1},e.prototype.input_focus=function(t){var e=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return e.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},e.prototype.input_blur=function(t){var e=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return e.blur_test()},100))},e.prototype.results_option_build=function(t){var e,s,i,r,o;for(e="",o=this.results_data,i=0,r=o.length;r>i;i++)s=o[i],e+=s.group?this.result_add_group(s):this.result_add_option(s),(null!=t?t.first:void 0)&&(s.selected&&this.is_multiple?this.choice_build(s):s.selected&&!this.is_multiple&&this.single_set_selected_text(s.text));return e},e.prototype.result_add_option=function(t){var e,s;return t.search_match&&this.include_option_in_results(t)?(e=[],t.disabled||t.selected&&this.is_multiple||e.push("active-result"),!t.disabled||t.selected&&this.is_multiple||e.push("disabled-result"),t.selected&&e.push("result-selected"),null!=t.group_array_index&&e.push("group-option"),""!==t.classes&&e.push(t.classes),s=document.createElement("li"),s.className=e.join(" "),s.style.cssText=t.style,s.title=t.title,s.setAttribute("data-option-array-index",t.array_index),s.innerHTML=t.search_text,this.outerHTML(s)):""},e.prototype.result_add_group=function(t){var e;return(t.search_match||t.group_match)&&t.active_options>0?(e=document.createElement("li"),e.className="group-result",e.title=t.title,e.innerHTML=t.search_text,this.outerHTML(e)):""},e.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},e.prototype.reset_single_select_options=function(){var t,e,s,i,r;for(i=this.results_data,r=[],e=0,s=i.length;s>e;e++)t=i[e],t.selected?r.push(t.selected=!1):r.push(void 0);return r},e.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},e.prototype.results_search=function(t){return this.results_showing?this.winnow_results(1):this.results_show()},e.prototype.winnow_results=function(t){var e,s,i,r,o,h,n,l,c,a,_,u,d;for(this.no_results_clear(),o=0,n=this.get_search_text(),e=n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),r=this.search_contains?"":"^",i=new RegExp(r+e,"i"),a=new RegExp(e,"i"),d=this.results_data,_=0,u=d.length;u>_;_++)s=d[_],s.search_match=!1,h=null,this.include_option_in_results(s)&&(s.group&&(s.group_match=!1,s.active_options=0),null!=s.group_array_index&&this.results_data[s.group_array_index]&&(h=this.results_data[s.group_array_index],0===h.active_options&&h.search_match&&(o+=1),h.active_options+=1),(!s.group||this.group_search)&&(s.search_text=s.group?s.label:s.html,s.search_keys_match=this.search_string_match(s.search_keys,i),s.search_text_match=this.search_string_match(s.search_text,i),s.search_match=s.search_text_match||s.search_keys_match,s.search_match&&!s.group&&(o+=1),s.search_match?(s.search_text_match&&s.search_text.length?(l=s.search_text.search(a),c=s.search_text.substr(0,l+n.length)+"</em>"+s.search_text.substr(l+n.length),s.search_text=c.substr(0,l)+"<em>"+c.substr(l)):s.search_keys_match&&s.search_keys.length&&(l=s.search_keys.search(a),c=s.search_keys.substr(0,l+n.length)+"</em>"+s.search_keys.substr(l+n.length),s.search_text+="&nbsp; <small style=\"opacity: 0.7\">"+c.substr(0,l)+"<em>"+c.substr(l)+"</small>"),null!=h&&(h.group_match=!0)):null!=s.group_array_index&&this.results_data[s.group_array_index].search_match&&(s.search_match=!0)));return this.result_clear_highlight(),1>o&&n.length?(this.update_results_content(""),this.no_results(n)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight(t))},e.prototype.search_string_match=function(t,e){var s,i,r,o;if(e.test(t))return!0;if(this.enable_split_word_search&&(t.indexOf(" ")>=0||0===t.indexOf("["))&&(i=t.replace(/\[|\]/g,"").split(" "),i.length))for(r=0,o=i.length;o>r;r++)if(s=i[r],e.test(s))return!0},e.prototype.choices_count=function(){var t,e,s,i;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,i=this.form_field.options,e=0,s=i.length;s>e;e++)t=i[e],t.selected&&""!=t.value&&(this.selected_option_count+=1);return this.selected_option_count},e.prototype.choices_click=function(t){return t.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},e.prototype.keyup_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),e){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(t.preventDefault(),this.results_showing)return this.result_select(t);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},e.prototype.clipboard_event_checker=function(t){var e=this;return setTimeout(function(){return e.results_search()},50)},e.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},e.prototype.include_option_in_results=function(t){return this.is_multiple&&!this.display_selected_options&&t.selected?!1:!this.display_disabled_options&&t.disabled?!1:t.empty?!1:!0},e.prototype.search_results_touchstart=function(t){return this.touch_started=!0,this.search_results_mouseover(t)},e.prototype.search_results_touchmove=function(t){return this.touch_started=!1,this.search_results_mouseout(t)},e.prototype.search_results_touchend=function(t){return this.touch_started?this.search_results_mouseup(t):void 0},e.prototype.outerHTML=function(t){var e;return t.outerHTML?t.outerHTML:(e=document.createElement("div"),e.appendChild(t),e.innerHTML)},e.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},e.default_multiple_text="",e.default_single_text="",e.default_no_result_text="No results match",e}(),t=jQuery,t.fn.extend({chosen:function(i){return e.browser_is_supported()?this.each(function(e){var r,o;r=t(this),o=r.data("chosen"),"destroy"===i&&o?o.destroy():o||r.data("chosen",new s(this,i))}):this}}),s=function(e){function s(){return r=s.__super__.constructor.apply(this,arguments)}return h(s,e),s.prototype.setup=function(){return this.form_field_jq=t(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},s.prototype.set_up_html=function(){var e,s;e=["chosen-container"],e.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&e.push(this.form_field.className),this.is_rtl&&e.push("chosen-rtl");var i=this.form_field.getAttribute("data-css-class");return i&&e.push(i),s={"class":e.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(s.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=t("<div />",s),this.is_multiple?this.container.html("<ul class=\"chosen-choices\"><li class=\"search-field\"><input type=\"text\" value=\""+this.default_text+"\" class=\"default\" autocomplete=\"off\" style=\"width:25px;\" /></li></ul><div class=\"chosen-drop\"><ul class=\"chosen-results\"></ul></div>"):this.container.html("<a class=\"chosen-single chosen-default\" tabindex=\"-1\"><span>"+this.default_text+"</span><div><b></b></div></a><div class=\"chosen-drop\"><div class=\"chosen-search\"><input type=\"text\" autocomplete=\"off\" /></div><ul class=\"chosen-results\"></ul></div>"),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.options.drop_width&&this.dropdown.css("width",this.options.drop_width).addClass("chosen-drop-size-limited"),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},s.prototype.register_observers=function(){var t=this;return this.container.bind("mousedown.chosen",function(e){t.container_mousedown(e)}),this.container.bind("mouseup.chosen",function(e){t.container_mouseup(e)}),this.container.bind("mouseenter.chosen",function(e){t.mouse_enter(e)}),this.container.bind("mouseleave.chosen",function(e){t.mouse_leave(e)}),this.search_results.bind("mouseup.chosen",function(e){t.search_results_mouseup(e)}),this.search_results.bind("mouseover.chosen",function(e){t.search_results_mouseover(e)}),this.search_results.bind("mouseout.chosen",function(e){t.search_results_mouseout(e)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(e){t.search_results_mousewheel(e)}),this.search_results.bind("touchstart.chosen",function(e){t.search_results_touchstart(e)}),this.search_results.bind("touchmove.chosen",function(e){t.search_results_touchmove(e)}),this.search_results.bind("touchend.chosen",function(e){t.search_results_touchend(e)}),this.form_field_jq.bind("chosen:updated.chosen",function(e){t.results_update_field(e)}),this.form_field_jq.bind("chosen:activate.chosen",function(e){t.activate_field(e)}),this.form_field_jq.bind("chosen:open.chosen",function(e){t.container_mousedown(e)}),this.form_field_jq.bind("chosen:close.chosen",function(e){t.input_blur(e)}),this.search_field.bind("blur.chosen",function(e){t.input_blur(e)}),this.search_field.bind("keyup.chosen",function(e){t.keyup_checker(e)}),this.search_field.bind("keydown.chosen",function(e){t.keydown_checker(e)}),this.search_field.bind("focus.chosen",function(e){t.input_focus(e)}),this.search_field.bind("cut.chosen",function(e){t.clipboard_event_checker(e)}),this.search_field.bind("paste.chosen",function(e){t.clipboard_event_checker(e)}),this.is_multiple?this.search_choices.bind("click.chosen",function(e){t.choices_click(e)}):this.container.bind("click.chosen",function(t){t.preventDefault()})},s.prototype.destroy=function(){return t(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},s.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},s.prototype.container_mousedown=function(e){return this.is_disabled||(e&&"mousedown"===e.type&&!this.results_showing&&e.preventDefault(),null!=e&&t(e.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!e||t(e.target)[0]!==this.selected_item[0]&&!t(e.target).parents("a.chosen-single").length||(e.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),t(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},s.prototype.container_mouseup=function(t){return"ABBR"!==t.target.nodeName||this.is_disabled?void 0:this.results_reset(t)},s.prototype.search_results_mousewheel=function(t){var e;return t.originalEvent&&(e=-t.originalEvent.wheelDelta||t.originalEvent.detail),null!=e?(t.preventDefault(),"DOMMouseScroll"===t.type&&(e=40*e),this.search_results.scrollTop(e+this.search_results.scrollTop())):void 0},s.prototype.blur_test=function(t){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},s.prototype.close_field=function(){return t(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},s.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},s.prototype.test_active_click=function(e){var s;return s=t(e.target).closest(".chosen-container"),s.length&&this.container[0]===s[0]?this.active_field=!0:this.close_field()},s.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=i.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},s.prototype.result_do_highlight=function(t,e){var s,i,r,o,h,n,l=-1;t.length&&(this.result_clear_highlight(),this.result_highlight=t,this.result_highlight.addClass("highlighted"),r=parseInt(this.search_results.css("maxHeight"),10),n=this.result_highlight.outerHeight(),h=this.search_results.scrollTop(),o=r+h,i=this.result_highlight.position().top+this.search_results.scrollTop(),s=i+n,this.middle_highlight&&(e||"always"===this.middle_highlight||s>=o||h>i)?l=Math.min(i-n,Math.max(0,i-(r-n)/2)):s>=o?l=s-r>0?s-r:0:h>i&&(l=i),l>-1&&this.search_results.scrollTop(l))},s.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},s.prototype.results_show=function(){if(this.is_multiple&&this.max_selected_options<=this.choices_count())return this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1;this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(1);var e=this.drop_direction;if("auto"===e){var s=this.container.find(".chosen-drop"),i=this.container.offset();i.top+s.outerHeight()+30>t(window).height()+t(window).scrollTop()&&(e="up")}return this.container.toggleClass("chosen-up","up"===e),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this})},s.prototype.update_results_content=function(t){return this.search_results.html(t)},s.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},s.prototype.set_tab_index=function(t){var e;return this.form_field.tabIndex?(e=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=e):void 0},s.prototype.set_label_behavior=function(){var e=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=t("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(t){return e.is_multiple?e.container_mousedown(t):e.activate_field()}):void 0},s.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},s.prototype.search_results_mouseup=function(e){var s;return s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first(),s.length?(this.result_highlight=s,this.result_select(e),this.search_field.focus()):void 0},s.prototype.search_results_mouseover=function(e){var s;return s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first(),s?this.result_do_highlight(s):void 0},s.prototype.search_results_mouseout=function(e){return t(e.target).hasClass("active-result")?this.result_clear_highlight():void 0},s.prototype.choice_build=function(e){var s,i,r=this;return s=t("<li />",{"class":"search-choice"}).html("<span title='"+e.html+"'>"+e.html+"</span>"),e.disabled?s.addClass("search-choice-disabled"):(i=t("<a />",{"class":"search-choice-close","data-option-array-index":e.array_index}),i.bind("click.chosen",function(t){return r.choice_destroy_link_click(t)}),s.append(i)),this.search_container.before(s)},s.prototype.choice_destroy_link_click=function(e){return e.preventDefault(),e.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(t(e.target))},s.prototype.choice_destroy=function(t){return this.result_deselect(t[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),t.parents("li").first().remove(),this.search_field_scale()):void 0},s.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},s.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},s.prototype.result_select=function(t){var e,s;return this.result_highlight?(e=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?e.removeClass("active-result"):this.reset_single_select_options(),s=this.results_data[e[0].getAttribute("data-option-array-index")],s.selected=!0,this.form_field.options[s.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(s):this.single_set_selected_text(s.text),(t.metaKey||t.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[s.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},s.prototype.single_set_selected_text=function(t){return null==t&&(t=this.default_text),t===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").attr("title",t).text(t)},s.prototype.result_deselect=function(t){var e;return e=this.results_data[t],this.form_field.options[e.options_index].disabled?!1:(e.selected=!1,this.form_field.options[e.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[e.options_index].value}),this.search_field_scale(),!0)},s.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>"),this.selected_item.addClass("chosen-single-with-deselect")):void 0},s.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":t("<div/>").text(t.trim(this.search_field.val())).html()},s.prototype.winnow_results_set_highlight=function(t){var e,s;return s=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),e=s.length?s.first():this.search_results.find(".active-result").first(),null!=e?this.result_do_highlight(e,t):void 0},s.prototype.no_results=function(e){var s;return s=t("<li class=\"no-results\">"+this.results_none_found+" \"<span></span>\"</li>"),s.find("span").first().html(e),this.search_results.append(s),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},s.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},s.prototype.keydown_arrow=function(){var t;return this.results_showing&&this.result_highlight?(t=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(t):void 0:this.results_show()},s.prototype.keyup_arrow=function(){var t;return this.results_showing||this.is_multiple?this.result_highlight?(t=this.result_highlight.prevAll("li.active-result"),t.length?this.result_do_highlight(t.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},s.prototype.keydown_backstroke=function(){var t;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(t=this.search_container.siblings("li.search-choice").last(),t.length&&!t.hasClass("search-choice-disabled")?(this.pending_backstroke=t,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},s.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},s.prototype.keydown_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),8!==e&&this.pending_backstroke&&this.clear_backstroke(),e){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(t),this.mouse_on_container=!1;break;case 13:t.preventDefault();break;case 38:t.preventDefault(),this.keyup_arrow();break;case 40:t.preventDefault(),this.keydown_arrow()}},s.prototype.search_field_scale=function(){var e,s,i,r,o,h,n,l,c;if(this.is_multiple){for(i=0,n=0,o="position:absolute; left: -1000px; top: -1000px; display:none;",h=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],l=0,c=h.length;c>l;l++)r=h[l],o+=r+":"+this.search_field.css(r)+";";return e=t("<div />",{style:o}),e.text(this.search_field.val()),t("body").append(e),n=e.width()+25,e.remove(),s=this.container.outerWidth(),n>s-10&&(n=s-10),this.search_field.css({width:n+"px"})}},s}(e)}).call(this)