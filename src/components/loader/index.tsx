// components/Loader.tsx
import './Loader.css'
import { mapHeight } from '../../blocks/MapBlock/constants'

interface LoaderProps {
  text?: string
  isVisible: boolean
}

const Loader = ({ text = 'Loading...', isVisible }: LoaderProps) => {
  return (
    <div
      className={`loader-overlay ${isVisible ? 'fade-in' : 'fade-out'}`}
      style={{ height: mapHeight + 'px' }}
    >
      <div className="loader-spinner"></div>
      <div className="loader-text">{text}</div>
    </div>
  )
}
export default Loader
