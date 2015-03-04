(function () {

	angular
		.module( 'angular.responsiveHeight' )
		.factory( 'ResponsiveHeightService', serviceDefinition );

	serviceDefinition.$inject = [ '$window' ];

	function serviceDefinition( $window ) {
		// ********
		// Private
		// ********
		var service = this;


		// ********
		// Public
		// ********
		var serviceInterface = {
			calculateElementsHeight: calculateElementsHeight,

			// private methods exposed for unit testing
			__convertToPixelValue: convertToPixelValue,
			__getUnit: getUnit,
			__limitHeightToMinAndMaxHeight: limitHeightToMinAndMaxHeight
		};


		// ****************
		// Initialization
		// ****************
		return serviceInterface;


		// ****************
		// Implementation
		// ****************
		function calculateElementsHeight( elementWidth, aspectRatio, preferredHeight, minHeight, maxHeight ) {
			var newHeight;

			if ( aspectRatio ) {
				newHeight = elementWidth / aspectRatio;
			}
			else if ( preferredHeight ) {
				newHeight = preferredHeight;
			}

			return limitHeightToMinAndMaxHeight( newHeight, minHeight, maxHeight );
		}

		function convertToPixelValue( value ) {
			switch ( getUnit( value ) ) {
				case '%':
					return $window.innerHeight * parseFloat( value ) * 0.01;
				case 'px':
					return parseFloat( value );
				default:
					return undefined;
			}
		}

		function getUnit( value ) {
			if ( !angular.isDefined( value ) ) {
				return false;
			}

			value += ''; // convert to string

			value = value.toLowerCase();
			var unit = value.match( /\D+$/ );

			return ( unit == null ) ? "px" : unit[ 0 ];
		}

		function limitHeightToMinAndMaxHeight( height, minHeight, maxHeight ) {

			minHeight = convertToPixelValue( minHeight );
			maxHeight = convertToPixelValue( maxHeight );

			height = Math.max( height, minHeight );
			height = Math.min( height, maxHeight );

			return height;
		}
	}

})();