import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

//HOC 
    //A component that returns a supped up component
    // here the supped up component is Spinner
const WithSpinner = WrappedComponent => { 
    const Spinner = ({  isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay> 
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return Spinner;
};

export default WithSpinner;