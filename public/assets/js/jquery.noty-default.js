;(function($) {

	$.noty.themes.defaultTheme = {
		name: 'defaultTheme',
		helpers: {
			borderFix: function() {
				if (this.options.dismissQueue) {
					var selector = this.options.layout.container.selector + ' ' + this.options.layout.parent.selector;
					switch (this.options.layout.name) {
						case 'top':
							$(selector).css({borderRadius: '0px 0px 0px 0px'});
							$(selector).last().css({borderRadius: '0px 0px 5px 5px'}); break;
						case 'topCenter': case 'topLeft': case 'topRight':
						case 'bottomCenter': case 'bottomLeft': case 'bottomRight':
						case 'center': case 'centerLeft': case 'centerRight': case 'inline':
							$(selector).css({borderRadius: '0px 0px 0px 0px'});
							$(selector).first().css({'border-top-left-radius': '0', 'border-top-right-radius': '0'});
							$(selector).last().css({'border-bottom-left-radius': '5px', 'border-bottom-right-radius': '5px'}); break;
						case 'bottom':
							$(selector).css({borderRadius: '0px 0px 0px 0px'});
							$(selector).first().css({borderRadius: '5px 5px 0px 0px'}); break;
						default: break;
					}
				}
			}
		},
		modal: {
			css: {
				position: 'fixed',
				width: '100%',
				height: '100%',
				backgroundColor: '#000',
				zIndex: 10000,
				opacity: 0.6,
				display: 'none',
				left: 0,
				top: 0
			}
		},
		style: function() {

			this.$bar.css({
				overflow: 'hidden',
				background: "/* url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==') repeat-x scroll left top */ #fff"
			});

			this.$message.css({
				fontSize: '13px',
				lineHeight: '16px',
				textAlign: 'left',
				padding: '8px 10px 9px',
				width: 'auto',
				position: 'relative',
				fontWeight: 600
			});

			this.$closeButton.css({
				position: 'absolute',
				top: 6, right: 6,
				width: 20, height: 20,
				background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMEYxQkYwM0Q2RjcxMUUyQThCNUQ0NDhFMzFFQTRCNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMEYxQkYwNEQ2RjcxMUUyQThCNUQ0NDhFMzFFQTRCNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEwRjFCRjAxRDZGNzExRTJBOEI1RDQ0OEUzMUVBNEI3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEwRjFCRjAyRDZGNzExRTJBOEI1RDQ0OEUzMUVBNEI3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ckA27gAABCtJREFUeNpsVFtIrFUUXjOON3S83+/3S+mIo4iSIOLBOViSJ9OgQ8fCB3vr4UBCj+KL+CK9iCJGvWgaaBE6Vk56qFDzlh618UFF0FHH+/0yulvfqj840YbN7Pn3Xt/+1re+tXW7u7uk0+nI5XLR8fExpaSk0M3NDY2Ojpqnp6cfLS0tmU5OTmIeHh70RqPRkZWV9TInJ+fn8vLyXwIDA2ltbY28vLxk8hkiAGI6HA66vb2ljY2NpLq6usGAgADFFykfHx+FNQcrBlREJL9VVVUvFhYW8pVSEr+/v09Op5NoZ2eH9vb2CBsDAwPvBwcHuxAUGRmpkpOTVVJS0isT32JiYgTY29tbdXZ2PkcsZyHAAogPQ0ND77m5uSl3d3eVlpam4uPjVWxs7CugWMfFxckezvj6+gpwd3f3p8A4PDwkHfLmdENNJtPe6empaHh2dkaXl5d0f39PfAEFBQURBjS+vr6Wb56enuTn50fb29tyfm5uLo+1nRV29fX1P+Am3ApWBoNBNfLo6+uzREdHi44MKlpyitUtLS3PGExFRESo9PR0YWmxWNZAgCYmJl7XNpEKgtra2ho3Nzfp4OCAZmZmHjMbCRobG/sIDlhcXCRO82l4eLjoiTgUcGRkxGIYHx9/B6mGhYWJXWAfTv9XZkqrq6tkNput7e3tH3OqISUlJV9sbW0RA+CcDSDMSgfLIFObzfYu1dbWfo1qaaKHhoaqkJAQNTs7+wiHMMFUW2My6GupqalnyEYrGoOqioqK39yY8id8II51EuHxC4Curq5nbB0nM//dbrfT+vq6NACzeFJZWTnOhfTk2L/N/M9g0Gs9OoD+M5ACqnlxcRGA/2B1fn4uwVxRI5tY5+HhIRdoA2ve1xk4XQcCtI8wKAMRF+BD1uxLfGd/EgDY9JSYmPhVXl7edmlp6Y/oDFgKFyHG39//UJ+fn2/H7Xq9XloPG729vU8AhkpjsBPetFqtH2DNrUlsr5/6+/vNbC/xK2IRx8W0G4qLi79llp8hRWzgELM0Li8vi4EZ1NTQ0PA9dM3OznYyI+v8/DyxM4xgjqzEfzzKysq+E7rV1dVzkAomjYqKUkxdNTc3Px0eHs5iEBfaEeaG6Xt6egrYRqVYwxGIgX2KiooOYSEd9FtZWUnPzc39EzpxZ0iLaZpeXV2JRzHwooA1mN3d3YmmYA4tJycnHxcUFIzo8SczM9Pe0dHxHD2J3mSGEghABMHsmHj/IAmkwVoDa21t/Rxg/76HR0dHYg0GbcSLg/TRTvxQ/O/zxZVWDCrnmpqa2jTDo6jyFgJU6wbu3Tf4Nf4DDwQCoB20Qt9qDyxmYWHhOlvrbcSAPQoDGXQARGr4g15OSEgQEw8ODr41NTVVzl2SzRlEoAG41fYzMjJesg9tNTU13/B7eA+ZIAE7RQr8lwADABENrx3moHvQAAAAAElFTkSuQmCC)",
				display: 'none',
				cursor: 'pointer'
			});

			this.$buttons.css({
				padding: 5,
				textAlign: 'right',
				borderTop: '1px solid #ccc',
				backgroundColor: '#fff'
			});

			this.$buttons.find('button').css({
				marginLeft: 5
			});

			this.$buttons.find('button:first').css({
				marginLeft: 0
			});

			this.$bar.bind({
				mouseenter: function() { $(this).find('.noty_close').stop().fadeTo('normal',1); },
				mouseleave: function() { $(this).find('.noty_close').stop().fadeTo('normal',0); }
			});

			switch (this.options.layout.name) {
				case 'top':
					this.$bar.css({
						borderRadius: '0px 0px 5px 5px',
						borderBottom: '2px solid #eee',
						borderLeft: '2px solid #eee',
						borderRight: '2px solid #eee',
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					});
				break;
				case 'topCenter': case 'center': case 'bottomCenter': case 'inline':
					this.$bar.css({
						borderRadius: '5px',
						border: '1px solid #eee',
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					});
					this.$message.css({fontSize: '13px', textAlign: 'left', paddingRight: '30px'});
				break;
				case 'topLeft': case 'topRight':
				case 'bottomLeft': case 'bottomRight':
				case 'centerLeft': case 'centerRight':
					this.$bar.css({
						borderRadius: '5px',
						border: '1px solid #eee',
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					});
					this.$message.css({fontSize: '13px', textAlign: 'left'});
				break;
				case 'bottom':
					this.$bar.css({
						borderRadius: '5px 5px 0px 0px',
						borderTop: '2px solid #eee',
						borderLeft: '2px solid #eee',
						borderRight: '2px solid #eee',
						boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
					});
				break;
				default:
					this.$bar.css({
						border: '2px solid #eee',
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					});
				break;
			}

			switch (this.options.type) {
				/*case 'alert': case 'notification':
					this.$bar.css({backgroundColor: '#FFF', borderColor: '#CCC', color: '#444'}); break;
				case 'warning':
					this.$bar.css({backgroundColor: '#FFEAA8', borderColor: '#FFC237', color: '#826200'});
					this.$buttons.css({borderTop: '1px solid #FFC237'}); break;
				case 'error':
					this.$bar.css({backgroundColor: 'red', borderColor: 'darkred', color: '#FFF'});
					this.$message.css({fontWeight: 'bold'});
					this.$buttons.css({borderTop: '1px solid darkred'}); break;
				case 'information':
					this.$bar.css({backgroundColor: '#57B7E2', borderColor: '#0B90C4', color: '#FFF'});
					this.$buttons.css({borderTop: '1px solid #0B90C4'}); break;
				case 'success':
					this.$bar.css({backgroundColor: 'lightgreen', borderColor: '#50C24E', color: 'darkgreen'});
					this.$buttons.css({borderTop: '1px solid #50C24E'});break; */
				case 'Red':
					this.$bar.css({backgroundColor: '#FCBBBB', borderColor: '#FF3737', color: '#000000'});
					this.$bar.css({borderTop: 0});
					break;
				case 'Orange':
					this.$bar.css({backgroundColor: '#FFEAA8', borderColor: '#FFC237', color: '#000000'});
					this.$bar.css({borderTop: 0});
					break;
				case 'Green':
					this.$bar.css({backgroundColor: '#A8FFB9', borderColor: '#37FF3A', color: '#000000'});
					this.$bar.css({borderTop: 0});
					break;
				case 'Blue':
					this.$bar.css({backgroundColor: '#A8CEFF', borderColor: '#3798FF', color: '#000000'});
					this.$bar.css({borderTop: 0});
					break;
				default:
					this.$bar.css({backgroundColor: '#FFF', borderColor: '#CCC', color: '#000000'});
					this.$bar.css({borderTop: 0});
					break;
			}
		},
		callback: {
			onShow: function() { $.noty.themes.defaultTheme.helpers.borderFix.apply(this); },
			onClose: function() { $.noty.themes.defaultTheme.helpers.borderFix.apply(this); }
		}
	};

})(jQuery);
