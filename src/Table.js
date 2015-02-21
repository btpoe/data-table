;
(function ($) {

	function Table(elem) {

		var table = this;
		var $elem = $(elem);
		elem = $elem.get(0);

		var o = {
			cellTag: 'span',
			cellClass: 'Table-cell',
			thAttr: 'data-th',
			formatHeader: function(text) {
				return text+':';
			}
		};

		table.init = function (options) {

			setProperties(options);

			if (elem.dataTable) {
				return elem.dataTable;
			}

			$elem.find('td').wrapInner('<' + o.cellTag + ' class="' + o.cellClass + '">');
			$elem.find('th').each(function(i) {
				$elem.find('td:nth-child('+(i+1)+')').attr(o.thAttr, o.formatHeader($(this).text()));
			});

			elem.dataTable = table;
			return elem.dataTable
		};

		function setProperties(options) {
			$.extend(o, options);
		}
	}

	$.fn.dataTable = function (options) {
		return this.each(function () {
			var opts = $(this).data('table');
			if (typeof opts === 'string') {
				opts = new Function('return {' + opts + '};')();
			}
			opts = $.extend({}, options, opts);
			return new Table(this).init(opts);
		});
	};

})(jQuery || Zepto);