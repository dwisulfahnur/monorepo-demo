import http from "."
import { IUser } from "@packages/shared/types/user"

async function fetchUserData(): Promise<IUser> {
  const { data } = await http.get('/fetch-user-data')
  return data
}

async function updateUserData(payload: IUser): Promise<IUser> {
  const { data } = await http.put('/update-user-data', payload)
  return data
}

export default { fetchUserData, updateUserData }
