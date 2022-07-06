interface PlayerPrefs_Interface {

    // DeleteAll() : Void
    DeleteAll(): void;

    // DeleteKey(String) : Void
    DeleteKey(key: string): void;

    // GetFloat(String) : Single
    GetFloat(key: string): number;

    // GetFloat(String, Single) : Single
    GetFloat_2(key: string, defaultValue: number): number;

    // GetInt(String) : Int32
    GetInt(key: string): number;

    // GetInt(String, Int32) : Int32
    GetInt_2(key: string, defaultValue: number): number;

    // GetString(String) : String
    GetString(key: string): string;

    // GetString(String, String) : String
    GetString_2(key: string, defaultValue: string): string;

    // HasKey(String) : Boolean
    HasKey(key: string): boolean;

    // Save() : Void
    Save(): void;

    // SetFloat(String, Single) : Void
    SetFloat(key: string, value: number): void;

    // SetInt(String, Int32) : Void
    SetInt(key: string, value: number): void;

    // SetString(String, String) : Void
    SetString(key: string, value: string): void;

}
