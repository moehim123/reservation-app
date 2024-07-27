import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const withSkeletonLoader = (Component) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div className="p-4">
          <Skeleton count={1} height={40} />
          <Skeleton count={1} height={30} style={{ marginTop: 10 }} />
          <Skeleton count={1} height={200} style={{ marginTop: 20 }} />
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default withSkeletonLoader;
