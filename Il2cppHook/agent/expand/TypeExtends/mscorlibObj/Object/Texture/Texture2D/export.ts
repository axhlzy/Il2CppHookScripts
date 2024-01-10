globalThis.B_Texture2D = () => {
    setTimeout(() => {
        Il2Cpp.perform(() => {
            let libil2cpp = Module.findBaseAddress("libil2cpp.so")!
            let libunity = Module.findBaseAddress("libunity.so")!

            LOGD(`\nlibil2cpp -> ${libil2cpp} | libunity -> ${libunity}`)

            let il2cpp_resolve_icall: NativePointer = Module.findExportByName("libil2cpp.so", "il2cpp_resolve_icall")!

            let get_isReadable = callNp(il2cpp_resolve_icall, allocCStr("UnityEngine.Texture::get_isReadable()"))
            // setFunctionBool(get_isReadable, true)
            if (get_isReadable.isNull()) throw new Error("get_isReadable is null")
            let get_isReadable_ab = get_isReadable.sub(libunity)
            LOGD("get_isReadable ->" + get_isReadable + " | " + get_isReadable_ab)

            let EncodeToJPG = callNp(il2cpp_resolve_icall, allocCStr("UnityEngine.ImageConversion::EncodeToJPG(UnityEngine.Texture2D,System.Int32)"))
            if (EncodeToJPG.isNull()) throw new Error("EncodeToJPG is null")
            let EncodeToJPG_ab = EncodeToJPG.sub(libunity)
            LOGD("EncodeToJPG ->" + EncodeToJPG + " | " + EncodeToJPG_ab)

            // printExp("get_mainTexture",true)

            let addr = Il2Cpp.domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Image").method("get_mainTexture").virtualAddress
            LOGD("get_mainTexture => " + addr)
            let list_text2d = []

            A(addr, undefined, (ret: InvocationReturnValue) => {
                let text2d = new Il2Cpp.Texture2D(ret)
                list_text2d.push(text2d)
                let height = text2d.get_width()
                let width = text2d.get_height()
                // public static RenderTexture GetTemporaryShadowTexture(Int32 width,Int32 height,Int32 bits)
                LOGD("\nheight " + height + " width " + width)
                // let ins_descripter = alloc(20)
                // ins_descripter = callFunction(0x4BEE58, ins_descripter, width, height)
                // let ins_RenderTexture = callFunction(0x4BE988, ins_descripter)
                // LOGD("ins_RenderTexture " + ins_RenderTexture)

                callOnce(newLine)
                if (ret.isNull()) return

                let addr = ptr(0)
                // Memory.scan(addr,)

                let get_width = find_method("UnityEngine.CoreModule", "Texture", "get_width")
                let get_height = find_method("UnityEngine.CoreModule", "Texture", "get_height")
                let get_isReadable = find_method("UnityEngine.CoreModule", "Texture", "get_isReadable")
                if (get_width.isNull() || get_height.isNull() || get_isReadable.isNull()) throw new Error("get_width or get_height or get_isReadable is null")
                LOGO(`ret\t${ret} \n\t${new Il2Cpp.Object(ret).toString()}\n\tw: ${callNp(get_width, ret)} h: ${callNp(get_height, ret)} readable: ${callFunction(get_isReadable, ret)}`)

                // console.log(hexdump(ret.readPointer().add(0xfc).sub(0x10),{length: 0x30, ansi: true}))
                // Memory.protect(ret.readPointer().add(0xfc), 0x100, 'rwx')
                // ret.readPointer().add(0xfc).writePointer(method_IsVideoReadyStatic.virtualAddress)
                // ret.readPointer().add(0xfc).add(0x4).writePointer(method_IsVideoReadyStatic.handle)
                // console.log(hexdump(ret.readPointer().add(0xfc).sub(0x10),{length: 0x30, ansi: true}))

                // showMethodInfo(AddressToMethod(find_method("UnityEngine.ImageConversionModule","ImageConversion","EncodeToJPG")))

                Il2Cpp.perform(() => {
                    let EncodeToJPG = find_method("UnityEngine.ImageConversionModule", "ImageConversion", "EncodeToJPG")
                    if (EncodeToJPG.isNull()) throw new Error("EncodeToJPG is null")
                    let EncodeToJPGPtr = callNp(EncodeToJPG, ret)
                    LOGO(`\tEncodeToJPG -> ${EncodeToJPGPtr}`)
                    if (!EncodeToJPGPtr.isNull()) LOG(hexdump(EncodeToJPGPtr, { length: 0x30, ansi: true }))
                })

                Il2Cpp.perform(() => {
                    let EncodeToJPG = find_method("UnityEngine.ImageConversionModule", "ImageConversion", "EncodeToPNG")
                    if (EncodeToJPG.isNull()) throw new Error("EncodeToPNG is null")
                    let EncodeToJPGPtr = callNp(EncodeToJPG, ret)
                    LOGO(`\tEncodeToPNG -> ${EncodeToJPGPtr}`)
                    if (!EncodeToJPGPtr.isNull()) LOG(hexdump(EncodeToJPGPtr, { length: 0x30, ansi: true }))
                })
            })

            // todo 
            // hook LoadImage(Texture2D, Byte[]) : Boolean


            // todo 
            // hook LoadImage(Texture2D, Byte[], Boolean) : Boolean

        })
    }, 200)
}

declare global {
    var B_Texture2D: () => void
}

export { B_Texture2D }