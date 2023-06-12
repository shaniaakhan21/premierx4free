import * as React from "react";

interface MarketingDocumentProps {
  fileName?: string,
  alt?: string
}

const MarketingDocumentPreview = ({
                                    fileName,
                                    alt,
                                    ...props
                                  }: MarketingDocumentProps & Partial<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>) => {
  if (!fileName) return null;
  if (fileName.endsWith('jpg') || fileName.endsWith('png') ||
    fileName.endsWith('gif') || fileName.endsWith('JPG') ||
    fileName.endsWith('JPEG') ||
    fileName.endsWith('PNG')) return <img className='currentDocumentIcon'
                                          src={fileName} alt={alt} {...props} />
  if (fileName.endsWith('pdf')) return <img src='/assets/svg/Dashboard/pdf-icon.png' className='currentDocumentIcon'
                                            alt={alt} {...props} />
  return <img src='/assets/svg/Dashboard/pdf-icon.png' className='currentDocumentIcon' alt={alt} {...props} />
}

export default MarketingDocumentPreview
