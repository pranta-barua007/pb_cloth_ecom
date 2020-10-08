import React from 'react';

import { Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCollectionsIsFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

import { connect } from 'react-redux';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component'; //HOC


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); //making it a HOC
const CollectionPageWithSpinner = WithSpinner(CollectionPage); // MAKING it a HOC

class ShopPage extends React.Component {
    componentDidMount() {
        const { onCollectionIsFetchingChange } = this.props;
        onCollectionIsFetchingChange();
    }

    render() {
        const { match, isFetching, isCollectionLoaded } = this.props;
       
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                    render={(props) => 
                        <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />
                    }
                />
                <Route path={`${match.path}/:collectionId`} 
                    render={(props) => 
                        <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector(
    {
        isFetching: selectCollectionsIsFetching,
        isCollectionLoaded: selectIsCollectionLoaded
    }
);

const mapDispatchToProps = dispatch => (
    {
        onCollectionIsFetchingChange: () => dispatch(fetchCollectionStartAsync())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);