const BlockDivider = ({
  fill = '#acacac',
  style,
}: {
  fill?: string
  style?: React.CSSProperties
}) => (
  <div className="w-full overflow-hidden leading-none -mt-[1px]" style={style}>
    <svg
      viewBox="0 0 2047 81.82"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0h2047v39.52c-4.8.17-9.68-.25-14.48.01-106.35,5.7-205.71,37.53-312.78,11.77-44.62-10.73-81.44-32.9-127.33-41.12-57.66-10.32-127.11-10.65-185.58-6.23-44.63,3.37-88.01,13.06-132.11,19.59-102.68,15.19-207.07,18.77-310.67,12.01-79.6-5.19-152.06-19.1-232.94-16.83-122.02,3.43-251.48,20.67-372.63,36.74-95.53,12.67-197.25,34.16-293.87,23.45-22.11-2.45-43.53-7.66-64.49-14.79L0,0Z"
        fill={fill}
      />
    </svg>
  </div>
)

export default BlockDivider
