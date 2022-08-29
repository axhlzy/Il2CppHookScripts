import { ObjectIl2cpp_impl } from "../Object/class";

class PlayerPrefsImpl extends ObjectIl2cpp_impl implements PlayerPrefs_Interface {

    DeleteAll(): void {
        return Il2Cpp.Api.PlayerPrefs._DeleteAll(this.handle);
    }

    DeleteKey(key: string): void {
        return Il2Cpp.Api.PlayerPrefs._DeleteKey(this.handle, allocCStr(key));
    }

    GetFloat(key: string): number {
        return Il2Cpp.Api.PlayerPrefs._GetFloat(this.handle, allocCStr(key));
    }

    GetFloat_2(key: string, defaultValue: number = 0): number {
        return Il2Cpp.Api.PlayerPrefs._GetFloat_2(this.handle, allocCStr(key), defaultValue);
    }

    GetInt(key: string): number {
        return Il2Cpp.Api.PlayerPrefs._GetInt(this.handle, allocCStr(key));
    }

    GetInt_2(key: string, defaultValue: number = 0): number {
        return Il2Cpp.Api.PlayerPrefs._GetInt_2(this.handle, allocCStr(key), defaultValue);
    }

    GetString(key: string): string {
        return Il2Cpp.Api.PlayerPrefs._GetString(this.handle, allocCStr(key));
    }

    GetString_2(key: string, defaultValue: string = ""): string {
        return Il2Cpp.Api.PlayerPrefs._GetString_2(this.handle, allocCStr(key), allocCStr(defaultValue));
    }

    HasKey(key: string): boolean {
        return Il2Cpp.Api.PlayerPrefs._HasKey(this.handle, allocCStr(key));
    }

    Save(): void {
        return Il2Cpp.Api.PlayerPrefs._Save(this.handle);
    }

    SetFloat(key: string, value: number = 0): void {
        return Il2Cpp.Api.PlayerPrefs._SetFloat(this.handle, allocCStr(key), value);
    }

    SetInt(key: string, value: number = 0): void {
        return Il2Cpp.Api.PlayerPrefs._SetInt(this.handle, allocCStr(key), value);
    }

    SetString(key: string, value: string = ""): void {
        return Il2Cpp.Api.PlayerPrefs._SetString(this.handle, allocCStr(key), allocCStr(value));
    }

}

declare global {
    namespace Il2Cpp {
        class PlayerPrefs extends PlayerPrefsImpl { }
    }
}

Il2Cpp.PlayerPrefs = PlayerPrefsImpl;

export { PlayerPrefsImpl }
