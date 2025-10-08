import React from "react";

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
