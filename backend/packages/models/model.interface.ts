import { Transform } from 'class-transformer'
import mongoose from 'mongoose'

export default class ModelInterface {
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString()
    }

    return 'unknown value'
  })
  public _id!: string | mongoose.Types.ObjectId

  public __v!: number
}
