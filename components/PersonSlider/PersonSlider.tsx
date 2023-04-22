import React from 'react'
import { styles as classes } from './personSlider.styles'
import Person from '../Person/Person'

type PersonSliderProps = {}

const PersonSlider = (props: PersonSliderProps) => {

  return (
    <div>PersonSlider
      <Person />
      <Person />
      <Person />
    </div>
  )
}

export default PersonSlider;