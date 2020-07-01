// import React, { Component } from "react";
// import { Route } from "react-router-dom";
// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionPage from "../collection/collection.component";
// import { firestore } from "../../firebase/firebase.utils";
// import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
// import { connect } from "react-redux";
// import updateCollections from "./../../redux/shop/shop.actions";

// class ShopPage extends Component {
//   componentDidMount() {
//     const { updateCollections } = this.props;
//     const collectionRef = firestore.collection("collections");
//     collectionRef.onSnapshot(async (snapShot) => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
//       updateCollections(collectionsMap);
//     });
//   }

//   render() {
//     const { match } = this.props;
//     return (
//       <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route
//           path={`${match.path}/:collectionId`}
//           component={CollectionPage}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   updateCollections: (collectionsMap) =>
//     dispatch(updateCollections(collectionsMap)),
// });

// export default connect(null, mapDispatchToProps)(ShopPage);

import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils.js";

import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crwn-db-640ba/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));

    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
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
