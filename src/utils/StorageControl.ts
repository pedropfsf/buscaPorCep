// Core
import AsyncStorage from "@react-native-async-storage/async-storage"

// Types
import Data from "../types/Data";

class StorageControl {
  public static async set(value: Data): Promise<void> {
    const listCEPS: Data[] = await this.getListCEPS();

    for (const data of listCEPS) {
      if (value.cep === data.cep) {
        return;
      }
    }

    listCEPS.push(value);

    const jsonValue = JSON.stringify(listCEPS);
    await AsyncStorage.setItem('@CEPS', jsonValue);
  }

  public static async getByKey(key: string): Promise<any> {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }

  public static async getListCEPS(): Promise<Data[]> {
    const data = await this.getByKey("@CEPS");

    return data === null ? [] : data;
  }
}

export default StorageControl