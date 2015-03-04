describe( "Directive: responsiveHeight", function () {

	var element;
	var $compile;

	var mockRootScope;
	var mockScope;
	var mockWindow;

	var ResponsiveHeightService;

	beforeEach( function () {
		module( 'angular.responsiveHeight' );
	} );

	beforeEach( inject( function ( _$rootScope_, _$compile_, _$window_, _ResponsiveHeightService_ ) {
		$compile = _$compile_;

		mockRootScope = _$rootScope_;
		mockScope = _$rootScope_.$new();
		mockWindow = _$window_;
		ResponsiveHeightService = _ResponsiveHeightService_;
	} ) );

	describe( 'link method', function () {

		it( "should add observers", function () {
			// *******
			// given
			// *******
			var someAspectRatio = '312';
			var somePreferredHeight = '789';
			var someMinHeight = '123';
			var someMaxHeight = '456';
			element = "<responsive-height data-aspect-ratio='" + someAspectRatio + "' data-preferred-height='" + somePreferredHeight + "' data-min-height='" + someMinHeight + "' data-max-height='" + someMaxHeight + "'></responsive-height>";
			element = $compile( element )( mockScope );

			spyOn( ResponsiveHeightService, 'calculateElementsHeight' );
			expect( ResponsiveHeightService.calculateElementsHeight.calls.count() ).toEqual( 0 );

			// ******
			// when
			// ******
			mockScope.$digest();

			// ******
			// then
			// ******
			expect( ResponsiveHeightService.calculateElementsHeight.calls.count() ).toEqual( 4 );
		} );

		it( "should recalculate the elements height on window resize", function () {
			// *******
			// given
			// *******
			var someMinHeight = '123';
			var someMaxHeight = '456';
			element = "<responsive-height data-min-height='" + someMinHeight + "' data-max-height='" + someMaxHeight + "'></responsive-height>";
			element = $compile( element )( mockScope );
			mockScope.$digest();

			var resizeEvent = document.createEvent( 'CustomEvent' ); // MUST be 'CustomEvent'
			resizeEvent.initCustomEvent( 'resize', false, false, null );

			// ******
			// when
			// ******
			spyOn( ResponsiveHeightService, 'calculateElementsHeight' );
			mockWindow.dispatchEvent( resizeEvent );

			// ******
			// then
			// ******
			expect( ResponsiveHeightService.calculateElementsHeight ).toHaveBeenCalledWith( 0, undefined, undefined, someMinHeight, someMaxHeight );
		} );

		it( "should update the css of the element with the new height on window resize", function () {
			// *******
			// given
			// *******
			var someMinHeight = '123';
			var someMaxHeight = '456';
			var expectedValue = '123';

			element = angular.element( "<responsive-height style='height: 34px; width:10px;display:block;' data-min-height='" + someMinHeight + "' data-max-height='" + someMaxHeight + "'></responsive-height>" );
			$compile( element )( mockScope );
			mockScope.$digest();

			var resizeEvent = document.createEvent( 'CustomEvent' ); // MUST be 'CustomEvent'
			resizeEvent.initCustomEvent( 'resize', false, false, null );

			// ******
			// when
			// ******
			spyOn( ResponsiveHeightService, 'calculateElementsHeight' ).and.returnValue( expectedValue );
			mockWindow.dispatchEvent( resizeEvent );

			// ******
			// then
			// ******
			expect( element.css( 'height' ) ).toEqual( expectedValue + 'px' );
		} );
	} );
} );