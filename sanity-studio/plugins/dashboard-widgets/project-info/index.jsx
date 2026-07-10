import {defineDashboard} from 'sanity'

export const projectInfoWidget = defineDashboard({
  name: 'project-info',
  title: 'Jwazzy Travel Info',
  component: () => {
    return {
      type: 'component',
      component: () => (
        <div style={{padding: '1rem'}}>
          <h3>🎯 Jwazzy Travel CMS</h3>
          <p>Manage destinations, tours, bookings, and users.</p>
          <div style={{marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
            <strong>Quick Stats:</strong>
            <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
              <li>Destinations: Manage travel locations</li>
              <li>Tours: Create and organize tour packages</li>
              <li>Bookings: Track customer reservations</li>
              <li>Users: Manage customer accounts</li>
            </ul>
          </div>
        </div>
      )
    }
  }
})