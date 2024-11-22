import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Skeleton () {
    const css = {
        margin: "9px"
    }
    return (
        <ContentLoader 
    speed={2}
    width={282}
    height={304}
    style={css}
    viewBox="0 0 282 304"
    backgroundColor="#2d2d2d"
    foregroundColor="#151515"
    // {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="282" height="160" /> 
    <rect x="0" y="180" rx="0" ry="0" width="282" height="34" /> 
    <rect x="0" y="226" rx="0" ry="0" width="68" height="17" /> 
    <rect x="0" y="262" rx="2" ry="2" width="282" height="41" />
      </ContentLoader>
    )

};
