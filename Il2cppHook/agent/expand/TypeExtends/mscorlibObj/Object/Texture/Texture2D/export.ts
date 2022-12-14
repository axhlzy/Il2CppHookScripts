globalThis.B_Texture2D = () => {
    setTimeout(() => {
        Il2Cpp.perform(()=>{
            let libil2cpp = Module.findBaseAddress("libil2cpp.so")!
            let libunity = Module.findBaseAddress("libunity.so")!
    
            LOGD(`\nlibil2cpp -> ${libil2cpp} | libunity -> ${libunity}`)
    
            let il2cpp_resolve_icall :NativePointer =  Module.findExportByName("libil2cpp.so","il2cpp_resolve_icall")!
    
            let get_isReadable = callNp(il2cpp_resolve_icall,allocCStr("UnityEngine.Texture::get_isReadable()"))
            if (get_isReadable.isNull()) throw new Error("get_isReadable is null")
            let get_isReadable_ab = get_isReadable.sub(libunity)
            LOGD("get_isReadable ->" + get_isReadable + " | " + get_isReadable_ab)
    
            let EncodeToJPG = callNp(il2cpp_resolve_icall,allocCStr("UnityEngine.ImageConversion::EncodeToJPG(UnityEngine.Texture2D,System.Int32)"))
            if (EncodeToJPG.isNull()) throw new Error("EncodeToJPG is null")
            let EncodeToJPG_ab = EncodeToJPG.sub(libunity)
            LOGD("EncodeToJPG ->" + EncodeToJPG + " | " + EncodeToJPG_ab)
    
            A(Il2Cpp.Domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Image").method("get_mainTexture").virtualAddress,undefined,(ret:InvocationReturnValue)=>{
                callOnce(newLine)
                if (ret.isNull()) return
    
                let get_width = find_method("UnityEngine.CoreModule","Texture","get_width")
                let get_height = find_method("UnityEngine.CoreModule","Texture","get_height")
                let get_isReadable = find_method("UnityEngine.CoreModule","Texture","get_isReadable")
                if (get_width.isNull() || get_height.isNull() || get_isReadable.isNull()) throw new Error("get_width or get_height or get_isReadable is null")
                LOGO(`ret\t${ret} \n\t${new Il2Cpp.Object(ret).toString()}\n\tw: ${callNp(get_width,ret)} h: ${callNp(get_height,ret)} readable: ${callFunction(get_isReadable,ret)}`)
                
                // console.log(hexdump(ret.readPointer().add(0xfc).sub(0x10),{length: 0x30, ansi: true}))
                // Memory.protect(ret.readPointer().add(0xfc), 0x100, 'rwx')
                // ret.readPointer().add(0xfc).writePointer(method_IsVideoReadyStatic.virtualAddress)
                // ret.readPointer().add(0xfc).add(0x4).writePointer(method_IsVideoReadyStatic.handle)
                // console.log(hexdump(ret.readPointer().add(0xfc).sub(0x10),{length: 0x30, ansi: true}))
    
                // showMethodInfo(AddressToMethod(find_method("UnityEngine.ImageConversionModule","ImageConversion","EncodeToJPG")))
    
                Il2Cpp.perform(()=>{
                    let EncodeToJPG = find_method("UnityEngine.ImageConversionModule","ImageConversion","EncodeToJPG")
                    if (EncodeToJPG.isNull()) throw new Error("EncodeToJPG is null")
                    let EncodeToJPGPtr = callNp(EncodeToJPG, ret)
                    LOGO(`\tEncodeToJPG -> ${EncodeToJPGPtr}`)
                    if (!EncodeToJPGPtr.isNull()) LOG(hexdump(EncodeToJPGPtr,{length: 0x30, ansi: true}))
                })
    
                Il2Cpp.perform(()=>{
                    let EncodeToJPG = find_method("UnityEngine.ImageConversionModule","ImageConversion","EncodeToPNG")
                    if (EncodeToJPG.isNull()) throw new Error("EncodeToPNG is null")
                    let EncodeToJPGPtr = callNp(EncodeToJPG, ret)
                    LOGO(`\tEncodeToPNG -> ${EncodeToJPGPtr}`)
                    if (!EncodeToJPGPtr.isNull()) LOG(hexdump(EncodeToJPGPtr,{length: 0x30, ansi: true}))
                })
            })
        })
    }, 200)
}

declare global {
    var B_Texture2D: () => void
}

export { B_Texture2D }