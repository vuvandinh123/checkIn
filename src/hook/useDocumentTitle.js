import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = 'HITC | ' + title;
    } else {
      document.title = 'HITC | Check In';
    }
  }, [title]);
};

export default useDocumentTitle;
