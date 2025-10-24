import React from 'react'
 const withLoading = (WrappedComponent) => {
  return function withLoadingComponent({isLoading,...props}){
    if(isLoading){
      <p>loading</p>
    }
    return <WrappedComponent {...props}/>
  }
}
export default withLoading
