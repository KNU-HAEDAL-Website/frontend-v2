import { ControllerRenderProps } from 'react-hook-form'

import { Input } from '@/components/ui'

type ImageInputProps = {
  field: ControllerRenderProps
}

export const ImageInput = ({ field }: ImageInputProps) => {
  return (
    <Input
      accept=".jpg, .jpeg"
      type="file"
      multiple={false}
      onChange={(e) =>
        field.onChange(e.target.files ? e.target.files[0] : null)
      }
    />
  )
}
