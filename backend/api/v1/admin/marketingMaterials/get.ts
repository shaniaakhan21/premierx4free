import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsModel from '@models/marketingMaterials'

const getMarketingMaterials: CustomRequestHandler<{}> = async (req, res) => {
  res.json(
    successResponse(
      (await MarketingMaterialsModel.find({}).populate('category')).map((document) =>
        document.format(req.user!.roles ?? [])
      )
    )
  )
}

export default getMarketingMaterials
