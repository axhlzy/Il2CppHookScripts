import { cache } from "decorator-cache-getter"

class UnityEngine_WWWForm_API {
        // internal static Encoding get_DefaultEncoding()
        @cache
        static get _get_DefaultEncoding() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "get_DefaultEncoding", 0, [], "pointer", [])
        }

        // public Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", ".ctor", 0, [], "void", ["pointer"])
        }

        // public Void AddField(String fieldName,String value)
        @cache
        static get _AddField() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "AddField", 2, ["System.String", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public Void AddField(String fieldName,String value,Encoding e)
        @cache
        static get _AddField_fieldName_value_e() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "AddField", 3, ["System.String", "System.String", "System.Text.Encoding"], "void", ["pointer", "pointer", "pointer", "pointer"])
        }

        // public Void AddBinaryData(String fieldName,Byte[] contents)
        @cache
        static get _AddBinaryData() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "AddBinaryData", 2, ["System.String", "System.Byte[]"], "void", ["pointer", "pointer", "pointer"])
        }

        // public Void AddBinaryData(String fieldName,Byte[] contents,String fileName,String mimeType)
        @cache
        static get _AddBinaryData_fieldName_contents_fileName_mimeType() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "AddBinaryData", 4, ["System.String", "System.Byte[]", "System.String", "System.String"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
        }

        // public String> get_headers()
        @cache
        static get _get_headers() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "get_headers", 0, [], "pointer", ["pointer"])
        }

        // public Byte[] get_data()
        @cache
        static get _get_data() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.WWWForm", "get_data", 0, [], "pointer", ["pointer"])
        }

}

Il2Cpp.Api.WWWForm = UnityEngine_WWWForm_API

declare global {
        namespace Il2Cpp.Api {
                class WWWForm extends UnityEngine_WWWForm_API { }
        }
}

export { }