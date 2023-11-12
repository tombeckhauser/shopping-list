import React from 'react';

const ArchivedLabel = ({isArchived}) => {
  if (isArchived) 
    return (<span className='archived-label'>Archived</span>)
  return ''
}

export default ArchivedLabel;