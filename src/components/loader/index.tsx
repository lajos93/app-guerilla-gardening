import { mapHeight } from '../../blocks/MapBlock/constants'

const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: mapHeight + 'px',
      background: '#f5f5f5',
    }}
  >
    <span className="animate-spin border-4 border-gray-300 border-t-transparent rounded-full w-12 h-12"></span>
  </div>
)

export default Loader
