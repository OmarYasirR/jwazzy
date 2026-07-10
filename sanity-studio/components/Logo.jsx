import React from 'react'

const Logo = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 'bold',
      fontSize: '18px'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #3B82F6, #F59E0B)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
      }}>
        J
      </div>
      <span>Jwazzy Travel</span>
    </div>
  )
}

export default Logo