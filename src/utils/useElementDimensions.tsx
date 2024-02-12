import {useState, useEffect, RefObject} from 'react';

function getElementDimensions(element: RefObject<HTMLElement>) {
  if (element.current === null || element.current === undefined) {
    return {width: 10, height: 10};
  }
  if(!element.current?.offsetWidth || !element.current?.offsetHeight) {
    return {width: 10, height: 10};
  }

  // @ts-ignore
  const { offsetWidth: width, offsetHeight: height } = element.current;
  return {
    width,
    height
  };
}

export default function useElementDimensions(element: RefObject<HTMLElement>) {
  const [elementDimensions, setElementDimensions] = useState(getElementDimensions(element));

  useEffect(() => {
    setElementDimensions(getElementDimensions(element));
    function handleResize() {
      setElementDimensions(getElementDimensions(element));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [element]);

  return elementDimensions;
}
