import React from 'react'

type Props = {}

function ResizeablePanel({children}: children: React.ReactNode) {
    let [ref, { height}] = useMeasure()
  return (
    <div>ResizeablePanel</div>
  )
}

export default ResizeablePanel