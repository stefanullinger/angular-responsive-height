(function () {

	angular
		.module( 'angular.responsiveHeight' )
		.directive( 'responsiveHeight', directiveDefinition );

	directiveDefinition.$inject = [ '$rootScope', '$window', 'ResponsiveHeightEvent', 'ResponsiveHeightService' ];

	function directiveDefinition( $rootScope, $window, ResponsiveHeightEvent, ResponsiveHeightService ) {
		return {
			restrict: 'AE',
			link:     link
		};

		function link( scope, element, attrs ) {

			angular.element( $window ).on( 'resize', onResize );

			var removeAspectRatioObserver = attrs.$observe( 'aspectRatio', handleValueChange );
			var removePreferredHeightObserver = attrs.$observe( 'preferredHeight', handleValueChange );
			var removeMaxHeightObserver = attrs.$observe( 'maxHeight', handleValueChange );
			var removeMinHeightObserver = attrs.$observe( 'minHeight', handleValueChange );

			scope.$on( '$destroy', function () {
				angular.element( $window ).off( 'resize', onResize );

				removeAspectRatioObserver();
				removePreferredHeightObserver();
				removeMaxHeightObserver();
				removeMinHeightObserver();
			} );

			function handleValueChange( value ) {
				if ( value ) {
					onResize();
				}
			}

			function onResize() {
				var newHeight = ResponsiveHeightService.calculateElementsHeight( element[ 0 ].offsetWidth, attrs.aspectRatio, attrs.preferredHeight, attrs.minHeight, attrs.maxHeight );

				element.css( {
					height: newHeight + 'px'
				} );

				$rootScope.$broadcast( ResponsiveHeightEvent.HEIGHT_CHANGED, {
					element:   element,
					newHeight: newHeight
				} );
			}
		}
	}

})();