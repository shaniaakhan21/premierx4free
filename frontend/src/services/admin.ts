import useSWR from "swr";
import { deleteFetcher, getFetcher, patchFetcher, putFetcher } from "../helpers/axiosFetchers";
import { GenericResponse } from "./genericResponse.type";
import User from "../models/user.model";
import MarketingMaterialsCategory from "../models/marketingMaterialsCategory.model";
import MarketingMaterial from "../models/marketingMaterial.model";
import AgentProfile, { AgentProfileCompany } from "../models/agentProfile.model";
import Contract from "../models/contract.model";

export type CreateCategoryRequest = {
  name: string
}

export type CreateCategoryResponse = MarketingMaterialsCategory
export const createCategory = async (user: User, data: CreateCategoryRequest) => {
  return putFetcher<CreateCategoryRequest, CreateCategoryResponse>(['/admin/marketingMaterials/category', data, user, undefined, undefined])
}

export const useMarketingMaterialsCategories = (user: User) => useSWR(['/admin/marketingMaterials/category', user], getFetcher<GenericResponse<MarketingMaterialsCategory[]>>)

export type MarketingMaterialsSummaryResponse = {
  categories: (Pick<MarketingMaterialsCategory, '_id' | 'name'> & { count: number })[],
  data: (Pick<MarketingMaterialsCategory, '_id' | 'name'> & { documents: MarketingMaterial[] })[]
}

export const useMarketingMaterialsSummary = (user: User) => useSWR(['/admin/marketingMaterials/summary', user], getFetcher<GenericResponse<MarketingMaterialsSummaryResponse>>)

export const useMarketingMaterials = (user: User) => useSWR(['/admin/marketingMaterials', user], getFetcher<GenericResponse<MarketingMaterial[]>>)

export const removeMarketingMaterial = async (user: User, id: MarketingMaterial['_id']) => {
  return deleteFetcher(['/admin/marketingMaterials', user, [id], undefined])
}

export const createMarketingMaterial = async (user: User, data: Omit<MarketingMaterial, MarketingMaterial['_id']>) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value as (string | File)));
  return putFetcher<FormData, MarketingMaterial>(['/admin/marketingMaterials', formData, user, undefined, undefined])
}

export const updateMarketingMaterial = async (user: User, data: MarketingMaterial) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value as File));
  return patchFetcher<FormData, MarketingMaterial>(['/admin/marketingMaterials', formData, user, undefined, undefined])
}

export enum ContactSearchBy {
  All = 'all',
  Name = 'name',
  ContactNo = 'contactNo',
  CompanyName = 'companies.name',
  Email = 'user.email',
  ContactPersonName = 'companies.contactPersonName',
  ContactPersonPhone = 'companies.contactPersonPhone',
  Comment = 'companies.comment'
}

export type ContractSearchResponse = {
  count: number
  data: (AgentProfile & {
    companies: AgentProfileCompany
    contracts: Contract
  })[]
}

export const useContractSearch = (user: User, q?: string, limit?: number, skip?: number, by?: ContactSearchBy) => useSWR(['/admin/contract/search', user, [limit, skip], {
  q,
  by
}], getFetcher<GenericResponse<ContractSearchResponse>>)

export const createContract = (user: User, data: Omit<Contract, '_id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>) => {
  return putFetcher<Omit<Contract, Contract['_id']>, Contract>(['/admin/contract', data, user, undefined, undefined])
}

export const updateContract = (user: User, data: Omit<Contract, 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>) => {
  return patchFetcher<Omit<Contract, 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>, Contract>(['/admin/contract', data, user, undefined, undefined])
}
