import React from 'react';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';
  
const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
      <CollectionPageContainer>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItemsContainer>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </CollectionItemsContainer>
      </CollectionPageContainer>
    );
};

// using 2nd option param " ownProps "
    //state is the TOP level STATE of the app
    // ownProps is the props which are the props of the component

const mapStateToProps = (state, ownProps) => (
    {
        collection: selectCollection(ownProps.match.params.collectionId)(state)
    }
);

//this is nececssary because unlike other selector , this selector uses a part of the STATE depending on URL param


export default connect(mapStateToProps)(CollectionPage);
