// components/Loader.tsx
import './Loader.css'
import { mapHeight } from '../../blocks/MapBlock/constants'

interface LoaderProps {
  text?: string
  isVisible: boolean
  positionAbsolute?: boolean
}

const Loader = ({ text = 'Loading...', isVisible, positionAbsolute = false }: LoaderProps) => {
  return (
    <div
      className={`loader-overlay ${isVisible ? 'fade-in' : 'fade-out'}`}
      style={{ height: mapHeight + 'px', position: positionAbsolute ? 'absolute' : 'relative' }}
    >
      <div className="loader-spinner"></div>
      <div className="loader-text">{text}</div>
    </div>
  )
}
export default Loader
