import React from 'react'
import styled from 'styled-components'

const PreviewContainer = styled.div`
  padding: 1rem;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  margin: 1rem 0;
`

export const TourPreview = ({value}) => {
  if (!value) {
    return <div>No tour data</div>
  }

  return (
    <PreviewContainer>
      <h3>{value.name}</h3>
      <p>{value.description}</p>
      <p><strong>Duration:</strong> {value.duration} days</p>
      <p><strong>Group Size:</strong> {value.groupSize} people</p>
    </PreviewContainer>
  )
}