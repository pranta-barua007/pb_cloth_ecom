import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsIsFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component'; //HOC
import CollectionsOverview from './collections-overview.component';

//here we need to name 'isLoading' exact same as our component 'WithSpinner' expects
const mapStateToProps = createStructuredSelector(
    {
        isLoading: selectCollectionsIsFetching
    }
);

//const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
    //above line is equivalent to writing in 'compose' pattern of functional programming
    //compose reads from right to left
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;