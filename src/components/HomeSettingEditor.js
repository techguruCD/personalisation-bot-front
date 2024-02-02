import React, { useEffect, useRef, useState } from 'react'
import updateHomeSetting from '../utils/updateHomeSetting'
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

export default function HomeSettingEdit({
  // isEditing,
  // setEditing,
  valueKey,
  color,
  containerClassName,
  contentClassName
}) {
  const homeSetting = useSelector(state => state.app.homeSetting)
  const isAdmin = useSelector(state => state.app.isAdmin)

  const editRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!isEditing)
      editRef.current.innerHTML = homeSetting?.[valueKey] || ""
  }, [homeSetting])
  return (
    <div className={containerClassName || ""}>
      {
        isAdmin &&
        <div className='ml-auto w-fit flex gap-2 mb-1'>
          {
            isEditing &&
            <>
              <div
                onClick={() => updateHomeSetting(valueKey, editRef, setIsEditing)}
                className={`cursor-pointer w-8 p-1.5 border border-${color} rounded-full`}><CheckIcon className={`text-${color}`} /></div>
              <div
                onClick={(e) => {
                  setIsEditing(false)
                  editRef.current.innerHTML = homeSetting?.[valueKey]
                }}
                className={`cursor-pointer w-8 p-1.5 border border-${color} rounded-full`}><XMarkIcon className={`text-${color}`} /></div>
            </>
          }
          {
            !isEditing &&
            <div
              onClick={() => {
                setIsEditing(true)
              }}
              className={`cursor-pointer w-8 p-1.5 border border-${color} rounded-full`}><PencilIcon className={`text-${color}`} /></div>
          }
        </div>
      }
      <div ref={editRef} className={`${contentClassName} text-${color} focus-visible:outline-none ${isEditing ? `border border-${color}` : ''}`} contentEditable={isEditing && "plaintext-only"} />
    </div>
  )
}