import { UnityEngine_Physics_Impl as Physics } from "../../../../Physics/class"
import { UnityEngine_RaycastHit_Impl as RaycastHit } from "../../../../ValueType/RaycastHit/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../../ValueType/Vector3/class"
import { UnityEngine_Camera as Camera } from "./class"

export { }

// test 射线检测 
const testCam = (): void => {
    // setInterval(() => {

    // }, 200)


    let CameraMain: Camera = Camera.get_main()
    let mem = new Vector3(alloc(5))
    Il2Cpp.Input.get_mousePosition_Injected(mem)
    LOGZ(mem.toString())

    let v3 = new Vector3(allocVector(10, 20, 30))
    let ray = CameraMain.ScreenPointToRay_v3(v3)
    let raycastHit: RaycastHit = new RaycastHit(alloc(5))
    let bool = Physics.Raycast_Ray_RaycastHit(ray, raycastHit)
    LOGD(bool)

}
declare global {
    var testCam: () => void
}

globalThis.testCam = testCam