import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { onSnapshot } from "@firebase/firestore";
import {
  dataFromSnapshot,
  getCollectionRef,
} from "../../firebase/firestoreService";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = await getCollectionRef("collections");
    this.unsubscribeFromSnapshot = onSnapshot(collectionRef, (snapshot) => {
      const collectionsMap = dataFromSnapshot(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
