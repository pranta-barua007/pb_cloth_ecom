import { createSelector } from 'reselect';

const shopSelector = state => state.shop;

export const selectCollections = createSelector(
    [shopSelector],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)   
);

export const selectCollectionsIsFetching = createSelector (
    [shopSelector],
    shop => shop.isFetching
);

//transforming the collection to a boolean from 'null'
    // !!null = false; its a shorthand way to transform any object to a bool
//below selector resolves the problem that breaks the collection page 
export const selectIsCollectionLoaded = createSelector (
    [shopSelector],
    shop => !!shop.collections
);

