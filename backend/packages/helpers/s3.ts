import process from 'process'

import { generateFileName } from '@helpers/global'
import aws, { S3 } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

aws.config.update({
  signatureVersion: 'v4',
  region: 'us-east-1',
  credentials: new aws.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  })
})

const spaceEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com')

export const s3 = new aws.S3({
  endpoint: spaceEndpoint
})

export const upload = (prefix: string) =>
  multer({
    storage: multerS3({
      s3,
      bucket: 'nsur',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(_req, file, cb) {
        cb(null, `${prefix}/${generateFileName(file.originalname)}`)
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024 // 5Mb
    }
  })

export const extractKey = (url: string) => {
  const split = url.split('/')
  return split[split.length - 1]!
}

export const moveFile = async (
  request: string | undefined,
  key: 'nda' | 'contract' | 'profileImage' | 'marketingMaterial',
  existing?: string
) => {
  if (request !== existing && request) {
    const copyParams: S3.Types.CopyObjectRequest = {
      Bucket: 'nsur',
      CopySource: `nsur/premierx/temp/${extractKey(request!)}`,
      Key: `premierx/${key}/${extractKey(request!)}`,
      ACL: 'public-read'
    }
    console.log(copyParams)
    await s3.copyObject(copyParams).promise()
    if (existing)
      await s3
        .deleteObject({
          Bucket: 'nsur',
          Key: extractKey(existing)
        })
        .promise()
    return request!.replace('premierx/temp', `premierx/${key}`)
  }
  if (existing && !request) {
    await s3
      .deleteObject({
        Bucket: 'nsur',
        Key: extractKey(existing)
      })
      .promise()
    return undefined
  }
  return existing
}
