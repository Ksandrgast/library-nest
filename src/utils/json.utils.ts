export class JsonUtils {

    static parseStringJsonToObject<T>(json: string): T {

        return JSON.parse(json);
    }

    static stringifyObjectToJson<T>(obj: T): string {

        return JSON.stringify(obj);
    }
}
