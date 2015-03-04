describe( "Service: ResponsiveHeightService", function () {
	var service;

	var mockWindow;

	beforeEach( function () {
		module( 'angular.responsiveHeight' );
	} );

	beforeEach( inject( function ( _$window_, _ResponsiveHeightService_ ) {
		mockWindow = _$window_;
		service = _ResponsiveHeightService_;
	} ) );

	describe( "Public Method: calculateElementsHeight", function () {
		it( "should calculate the new height based on the element's width and the provided aspect ratio, if the aspect ratio is provided", function () {
			// *******
			// given
			// *******
			var elementWidth = 123;
			var aspectRatio = 2;
			var expectedValue = elementWidth / aspectRatio;

			// ******
			// when
			// ******
			var result = service.calculateElementsHeight( elementWidth, aspectRatio, null, 0, 1000 );

			// ******
			// then
			// ******
			expect( result ).toEqual( expectedValue );
		} );

		it( "should calculate the new height based on the preferred height, if the aspect ratio is not provided and the preferred height is provided", function () {
			// *******
			// given
			// *******
			var preferredHeight = 123;

			// ******
			// when
			// ******
			var result = service.calculateElementsHeight( null, null, preferredHeight, 0, 1000 );

			// ******
			// then
			// ******
			expect( result ).toEqual( preferredHeight );
		} );
	} );

	describe( "Private Method: __convertToPixelValue", function () {
		it( "should return undefined, if value is neither px nor %", function () {
			// *******
			// given
			// *******

			// ******
			// when
			// ******
			var result = service.__convertToPixelValue( 'someValue' );

			// ******
			// then
			// ******
			expect( result ).toEqual( undefined );
		} );

		it( "should return the numeric value, if it is already in px", function () {
			// *******
			// given
			// *******

			// ******
			// when
			// ******
			var result = service.__convertToPixelValue( '123px' );

			// ******
			// then
			// ******
			expect( result ).toEqual( 123 );
		} );

		it( "should return a px-based value according to the viewport's height, if the value is provided in %", function () {
			// *******
			// given
			// *******
			mockWindow.innerHeight = 100;

			// ******
			// when
			// ******
			var result = service.__convertToPixelValue( '50%' );

			// ******
			// then
			// ******
			expect( result ).toEqual( 50 );
		} );
	} );

	describe( "Private Method: __getUnit", function () {
		it( "should return character group at the end of a value string when a value is provided", function () {
			// *******
			// given
			// *******
			var value = '20.9in-between28percent';

			// ******
			// when
			// ******
			var result = service.__getUnit( value );

			// ******
			// then
			// ******
			expect( result ).toBe( 'percent' );
		} );

		it( "should return false when no value is provided", function () {
			// *******
			// given
			// *******

			// ******
			// when
			// ******
			var result = service.__getUnit();

			// ******
			// then
			// ******
			expect( result ).toBe( false );
		} );

		it( "should return the unit lowercase", function () {
			// *******
			// given
			// *******
			var value = '20PX';

			// ******
			// when
			// ******
			var result = service.__getUnit( value );

			// ******
			// then
			// ******
			expect( result ).toBe( 'px' );
		} );
	} );

	describe( "Private Method: __limitHeightToMinAndMaxHeight", function () {
		it( "should set a value for the local variable 'minHeight'", function () {
			// *******
			// given
			// *******
			var someHeight = 123;
			var someMinHeight = 12;
			var someMaxHeight = 98;

			spyOn( Math, 'max' );

			// ******
			// when
			// ******
			service.__limitHeightToMinAndMaxHeight( someHeight, someMinHeight, someMaxHeight );

			// ******
			// then
			// ******
			expect( Math.max.calls.mostRecent().args[1] ).toEqual( someMinHeight );
		} );

		it( "should set a value for the local variable 'maxHeight'", function () {
			// *******
			// given
			// *******
			var someHeight = 123;
			var someMinHeight = 12;
			var someMaxHeight = 98;

			// ******
			// when
			// ******
			spyOn( Math, 'min' );
			service.__limitHeightToMinAndMaxHeight( someHeight, someMinHeight, someMaxHeight );

			// ******
			// then
			// ******
			expect( Math.min.calls.mostRecent().args[1] ).toEqual( someMaxHeight );
		} );

		it( "should return the value of minHeight, if height is less than minHeight and height is less than maxHeight", function () {
			// *******
			// given
			// *******
			var someHeight = 6;
			var someMinHeight = 12;
			var someMaxHeight = 18;

			// ******
			// when
			// ******
			var result = service.__limitHeightToMinAndMaxHeight( someHeight, someMinHeight, someMaxHeight );

			// ******
			// then
			// ******
			expect( result ).toEqual( someMinHeight );
		} );

		it( "should return the value of height, if height is greater than minHeight and height is less than maxHeight", function () {
			// *******
			// given
			// *******
			var someHeight = 12;
			var someMinHeight = 6;
			var someMaxHeight = 18;

			// ******
			// when
			// ******
			var result = service.__limitHeightToMinAndMaxHeight( someHeight, someMinHeight, someMaxHeight );

			// ******
			// then
			// ******
			expect( result ).toEqual( someHeight );
		} );

		it( "should return maxHeight, if height is greater than minHeight and height is greater than maxHeight", function () {
			// *******
			// given
			// *******
			var someHeight = 18;
			var someMinHeight = 6;
			var someMaxHeight = 12;

			// ******
			// when
			// ******
			var result = service.__limitHeightToMinAndMaxHeight( someHeight, someMinHeight, someMaxHeight );

			// ******
			// then
			// ******
			expect( result ).toEqual( someMaxHeight );
		} );
	} );
} );