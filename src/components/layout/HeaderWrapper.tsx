import React from 'react'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'

type HeaderWrapperProps = React.ComponentProps<typeof HeaderDesktop>

export function HeaderWrapper(props: HeaderWrapperProps) {
  return (
    <>
      <div className="hidden md:block">
        <HeaderDesktop {...props} />
      </div>
      <div className="block md:hidden">
        <HeaderMobile {...props} />
      </div>
    </>
  )
}
