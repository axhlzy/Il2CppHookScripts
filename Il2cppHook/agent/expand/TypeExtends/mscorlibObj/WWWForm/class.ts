import { mscorlib_System_Object_impl } from "../class"

type System_Void = void
type System_String = string
type System_Text_Encoding = NativePointer

class UnityEngine_WWWForm_Impl extends mscorlib_System_Object_impl {

    // formData: System_Collections.Generic.List<System.Byte[]> = lfv(this.handle, "formData") as unknown as System_Collections.Generic.List<System.Byte[]>
    // fieldNames: System_Collections.Generic.List<System.String> = lfv(this.handle, "fieldNames") as unknown as System_Collections.Generic.List<System.String>
    // fileNames: System_Collections.Generic.List<System.String> = lfv(this.handle, "fileNames") as unknown as System_Collections.Generic.List<System.String>
    // types: System_Collections.Generic.List<System.String> = lfv(this.handle, "types") as unknown as System_Collections.Generic.List<System.String>
    // boundary: System_Byte[] = lfv(this.handle, "boundary") as unknown as System_Byte[]
    // containsFiles: System_Boolean = lfv(this.handle, "containsFiles") as unknown as System_Boolean

    formData : any = lfv(this.handle, "formData")
    fieldNames : any = lfv(this.handle, "fieldNames")
    fileNames : any = lfv(this.handle, "fileNames")
    types : any = lfv(this.handle, "types")
    boundary : any = lfv(this.handle, "boundary")
    containsFiles : any = lfv(this.handle, "containsFiles")

    constructor(handleOrWrapper: NativePointer) {
             super(handleOrWrapper)
    }
    static get_DefaultEncoding(): System_Text_Encoding {
        return Il2Cpp.Api.WWWForm._get_DefaultEncoding()
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.WWWForm.__ctor(this.handle)
    }

    AddField(fieldName:System_String, value:System_String): System_Void {
        return Il2Cpp.Api.WWWForm._AddField(this.handle , fieldName, value)
    }

    AddField_3(fieldName:System_String, value:System_String, e:System_Text_Encoding): System_Void {
        return Il2Cpp.Api.WWWForm._AddField(this.handle , fieldName, value, e)
    }

    // AddBinaryData(fieldName:System_String, contents:System_Byte[]): System_Void {
    //     return Il2Cpp.Api.WWWForm._AddBinaryData(this.handle , fieldName, contents)
    // }

    // AddBinaryData_4(fieldName:System_String, contents:System_Byte[], fileName:System_String, mimeType:System_String): System_Void {
    //     return Il2Cpp.Api.WWWForm._AddBinaryData(this.handle , fieldName, contents, fileName, mimeType)
    // }

    // get_headers(): System_Collections.Generic.Dictionary<System.String,System.String> {
    //         return Il2Cpp.Api.WWWForm._get_headers(this.handle)
    // }

    // get_data(): System_Byte[] {
    //         return Il2Cpp.Api.WWWForm._get_data(this.handle)
    // }

    get_headers(): any {
        return Il2Cpp.Api.WWWForm._get_headers(this.handle)
    }

    get_data(): any {
        return Il2Cpp.Api.WWWForm._get_data(this.handle)
    }

}

Il2Cpp.WWWForm = UnityEngine_WWWForm_Impl

declare global {
    namespace Il2Cpp{
            class WWWForm extends UnityEngine_WWWForm_Impl { }
    }
}

export { UnityEngine_WWWForm_Impl }