'use client'

import { useMediaQuery } from 'usehooks-ts'
import type { Filters } from './index' // Desktop verzió (amit most írtál meg)
import { FiltersMobile } from './Mobile'
import { FiltersDesktop } from './Desktop'

type Props = {
  onChange: (filters: Filters) => void
}

export function FiltersWrapper({ onChange }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <FiltersMobile onChange={onChange} />
  }

  return (
    <div className="absolute top-[60px] right-[10px] z-[1000]">
      <FiltersDesktop onChange={onChange} />
    </div>
  )
}
