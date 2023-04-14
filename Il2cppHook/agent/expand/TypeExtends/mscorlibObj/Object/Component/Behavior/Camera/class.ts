import { UnityEngine_Color_Impl as Color } from "../../../../ValueType/Color/class"
import { UnityEngine_Matrix4x4_Impl as Matrix4x4 } from "../../../../ValueType/Matrix4x4/class"
import { UnityEngine_Ray_Impl as Ray } from "../../../../ValueType/Ray/class"
import { UnityEngine_Rect as Rect } from "../../../../ValueType/Rect/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../ValueType/Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../../ValueType/Vector3/class"
import { UnityEngine_Behaviour_Impl as Behaviour } from "../class"
import { UnityEngine_CameraClearFlags, UnityEngine_Camera_MonoOrStereoscopicEye as MonoOrStereoscopicEye, UnityEngine_DepthTextureMode } from "./enum"

type UnityEngine_Camera_CameraCallback = NativePointer
type UnityEngine_RenderTexture = NativePointer

class UnityEngine_Camera_Impl extends Behaviour {

    onPreCull: UnityEngine_Camera_CameraCallback = lfv(this.handle, "onPreCull") as unknown as UnityEngine_Camera_CameraCallback
    onPreRender: UnityEngine_Camera_CameraCallback = lfv(this.handle, "onPreRender") as unknown as UnityEngine_Camera_CameraCallback
    onPostRender: UnityEngine_Camera_CameraCallback = lfv(this.handle, "onPostRender") as unknown as UnityEngine_Camera_CameraCallback

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_nearClipPlane(): number {
        return Il2Cpp.Api.Camera._get_nearClipPlane(this.handle)
    }

    set_nearClipPlane(value: number): void {
        return Il2Cpp.Api.Camera._set_nearClipPlane(this.handle, value)
    }

    get_farClipPlane(): number {
        return Il2Cpp.Api.Camera._get_farClipPlane(this.handle)
    }

    set_farClipPlane(value: number): void {
        return Il2Cpp.Api.Camera._set_farClipPlane(this.handle, value)
    }

    get_fieldOfView(): number {
        return Il2Cpp.Api.Camera._get_fieldOfView(this.handle)
    }

    set_fieldOfView(value: number): void {
        return Il2Cpp.Api.Camera._set_fieldOfView(this.handle, value)
    }

    get_orthographicSize(): number {
        return Il2Cpp.Api.Camera._get_orthographicSize(this.handle)
    }

    set_orthographicSize(value: number): void {
        return Il2Cpp.Api.Camera._set_orthographicSize(this.handle, value)
    }

    get_orthographic(): boolean {
        return Il2Cpp.Api.Camera._get_orthographic(this.handle)
    }

    get_depth(): number {
        return Il2Cpp.Api.Camera._get_depth(this.handle)
    }

    get_aspect(): number {
        return Il2Cpp.Api.Camera._get_aspect(this.handle)
    }

    set_aspect(value: number): void {
        return Il2Cpp.Api.Camera._set_aspect(this.handle, value)
    }

    get_cullingMask(): number {
        return Il2Cpp.Api.Camera._get_cullingMask(this.handle)
    }

    get_eventMask(): number {
        return Il2Cpp.Api.Camera._get_eventMask(this.handle)
    }

    get_backgroundColor(): Color {
        return new Color(Il2Cpp.Api.Camera._get_backgroundColor(this.handle))
    }

    set_backgroundColor(value: Color): void {
        return Il2Cpp.Api.Camera._set_backgroundColor(this.handle, value.handle)
    }

    get_clearFlags(): UnityEngine_CameraClearFlags {
        return Il2Cpp.Api.Camera._get_clearFlags(this.handle)
    }

    set_depthTextureMode(value: UnityEngine_DepthTextureMode): void {
        return Il2Cpp.Api.Camera._set_depthTextureMode(this.handle, value)
    }

    get_usePhysicalProperties(): boolean {
        return Il2Cpp.Api.Camera._get_usePhysicalProperties(this.handle)
    }

    set_usePhysicalProperties(value: boolean): void {
        return Il2Cpp.Api.Camera._set_usePhysicalProperties(this.handle, value)
    }

    get_sensorSize(): Vector2 {
        return new Vector2(Il2Cpp.Api.Camera._get_sensorSize(this.handle))
    }

    get_lensShift(): Vector2 {
        return new Vector2(Il2Cpp.Api.Camera._get_lensShift(this.handle))
    }

    set_lensShift(value: Vector2): void {
        return Il2Cpp.Api.Camera._set_lensShift(this.handle, value.handle)
    }

    get_rect(): Rect {
        return new Rect(Il2Cpp.Api.Camera._get_rect(this.handle))
    }

    set_rect(value: Rect): void {
        return Il2Cpp.Api.Camera._set_rect(this.handle, value.handle)
    }

    get_pixelRect(): Rect {
        return new Rect(Il2Cpp.Api.Camera._get_pixelRect(this.handle))
    }

    set_pixelRect(value: Rect): void {
        return Il2Cpp.Api.Camera._set_pixelRect(this.handle, value.handle)
    }

    get_pixelWidth(): number {
        return Il2Cpp.Api.Camera._get_pixelWidth(this.handle).toInt32()
    }

    get_pixelHeight(): number {
        return Il2Cpp.Api.Camera._get_pixelHeight(this.handle).toInt32()
    }

    get_targetTexture(): UnityEngine_RenderTexture {
        return Il2Cpp.Api.Camera._get_targetTexture(this.handle)
    }

    get_targetDisplay(): number {
        return Il2Cpp.Api.Camera._get_targetDisplay(this.handle).toInt32()
    }

    get_cameraToWorldMatrix(): Matrix4x4 {
        return new Matrix4x4(Il2Cpp.Api.Camera._get_cameraToWorldMatrix(this.handle))
    }

    get_projectionMatrix(): Matrix4x4 {
        return new Matrix4x4(Il2Cpp.Api.Camera._get_projectionMatrix(this.handle))
    }

    WorldToScreenPoint(position: Vector3, eye: MonoOrStereoscopicEye): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._WorldToScreenPoint(this.handle, position, eye))
    }

    ViewportToWorldPoint(position: Vector3, eye: MonoOrStereoscopicEye): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._ViewportToWorldPoint(this.handle, position, eye))
    }

    ScreenToWorldPoint(position: Vector3, eye: MonoOrStereoscopicEye): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._ScreenToWorldPoint(this.handle, position, eye))
    }

    WorldToScreenPoint_1(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._WorldToScreenPoint(this.handle, position))
    }

    ViewportToWorldPoint_1(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._ViewportToWorldPoint(this.handle, position))
    }

    ScreenToWorldPoint_1(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._ScreenToWorldPoint(this.handle, position))
    }

    ScreenToViewportPoint(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Camera._ScreenToViewportPoint(this.handle, position))
    }

    ViewportPointToRay(pos: Vector2, eye: MonoOrStereoscopicEye): Ray {
        return new Ray(Il2Cpp.Api.Camera._ViewportPointToRay(this.handle, pos, eye))
    }

    ViewportPointToRay_2(pos: Vector3, eye: MonoOrStereoscopicEye): Ray {
        return new Ray(Il2Cpp.Api.Camera._ViewportPointToRay(this.handle, pos, eye))
    }

    ViewportPointToRay_1(pos: Vector3): Ray {
        return new Ray(Il2Cpp.Api.Camera._ViewportPointToRay(this.handle, pos.handle))
    }

    ScreenPointToRay_v2_eye(pos: Vector2, eye: MonoOrStereoscopicEye): Ray {
        return new Ray(Il2Cpp.Api.Camera._ScreenPointToRay(this.handle, pos.handle, eye))
    }

    ScreenPointToRay_v3_eye(pos: Vector3, eye: MonoOrStereoscopicEye): Ray {
        return new Ray(Il2Cpp.Api.Camera._ScreenPointToRay(this.handle, pos.handle, eye))
    }

    ScreenPointToRay_v3(pos: Vector3): Ray {
        return new Ray(Il2Cpp.Api.Camera._ScreenPointToRay(this.handle, pos.handle))
    }

    static get_main(): UnityEngine_Camera_Impl {
        return new UnityEngine_Camera_Impl(Il2Cpp.Api.Camera._get_main())
    }

    static get_current(): UnityEngine_Camera_Impl {
        return new UnityEngine_Camera_Impl(Il2Cpp.Api.Camera._get_current())
    }

    get_stereoEnabled(): boolean {
        return Il2Cpp.Api.Camera._get_stereoEnabled(this.handle)
    }

    static get GetAllCamerasCount(): number {
        return Il2Cpp.Api.Camera._GetAllCamerasCount().toInt32()
    }

    static GetAllCamerasImpl(cam: UnityEngine_Camera_Impl[]): number {
        return Il2Cpp.Api.Camera._GetAllCamerasImpl(cam)
    }

    static get get_allCamerasCount(): number {
        return Il2Cpp.Api.Camera._get_allCamerasCount()
    }

    static GetAllCameras(cameras: UnityEngine_Camera_Impl[]): number {
        return Il2Cpp.Api.Camera._GetAllCameras(cameras)
    }

    static FireOnPreCull(cam: UnityEngine_Camera_Impl): void {
        return Il2Cpp.Api.Camera._FireOnPreCull(cam)
    }

    static FireOnPreRender(cam: UnityEngine_Camera_Impl): void {
        return Il2Cpp.Api.Camera._FireOnPreRender(cam.handle)
    }

    static FireOnPostRender(cam: UnityEngine_Camera_Impl): void {
        return Il2Cpp.Api.Camera._FireOnPostRender(cam.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.Camera.__ctor(this.handle)
    }

    get_backgroundColor_Injected(ret: Color): void {
        return Il2Cpp.Api.Camera._get_backgroundColor_Injected(this.handle, ret.handle)
    }

    set_backgroundColor_Injected(value: Color): void {
        return Il2Cpp.Api.Camera._set_backgroundColor_Injected(this.handle, value.handle)
    }

    get_sensorSize_Injected(ret: Vector2): void {
        return Il2Cpp.Api.Camera._get_sensorSize_Injected(this.handle, ret.handle)
    }

    get_lensShift_Injected(ret: Vector2): void {
        return Il2Cpp.Api.Camera._get_lensShift_Injected(this.handle, ret.handle)
    }

    set_lensShift_Injected(value: Vector2): void {
        return Il2Cpp.Api.Camera._set_lensShift_Injected(this.handle, value.handle)
    }

    get_rect_Injected(ret: Rect): void {
        return Il2Cpp.Api.Camera._get_rect_Injected(this.handle, ret.handle)
    }

    set_rect_Injected(value: Rect): void {
        return Il2Cpp.Api.Camera._set_rect_Injected(this.handle, value.handle)
    }

    get_pixelRect_Injected(ret: Rect): void {
        return Il2Cpp.Api.Camera._get_pixelRect_Injected(this.handle, ret.handle)
    }

    set_pixelRect_Injected(value: Rect): void {
        return Il2Cpp.Api.Camera._set_pixelRect_Injected(this.handle, value.handle)
    }

    get_cameraToWorldMatrix_Injected(ret: Matrix4x4): void {
        return Il2Cpp.Api.Camera._get_cameraToWorldMatrix_Injected(this.handle, ret.handle)
    }

    get_projectionMatrix_Injected(ret: Matrix4x4): void {
        return Il2Cpp.Api.Camera._get_projectionMatrix_Injected(this.handle, ret.handle)
    }

    WorldToScreenPoint_Injected(position: Vector3, eye: MonoOrStereoscopicEye, ret: Vector3): void {
        return Il2Cpp.Api.Camera._WorldToScreenPoint_Injected(this.handle, position.handle, eye, ret.handle)
    }

    ViewportToWorldPoint_Injected(position: Vector3, eye: MonoOrStereoscopicEye, ret: Vector3): void {
        return Il2Cpp.Api.Camera._ViewportToWorldPoint_Injected(this.handle, position.handle, eye, ret.handle)
    }

    ScreenToWorldPoint_Injected(position: Vector3, eye: MonoOrStereoscopicEye, ret: Vector3): void {
        return Il2Cpp.Api.Camera._ScreenToWorldPoint_Injected(this.handle, position.handle, eye, ret.handle)
    }

    ScreenToViewportPoint_Injected(position: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Camera._ScreenToViewportPoint_Injected(this.handle, position.handle, ret.handle)
    }

    ViewportPointToRay_Injected(pos: Vector2, eye: MonoOrStereoscopicEye, ret: Ray): void {
        return Il2Cpp.Api.Camera._ViewportPointToRay_Injected(this.handle, pos.handle, eye, ret.handle)
    }

    ScreenPointToRay_Injected(pos: Vector2, eye: MonoOrStereoscopicEye, ret: Ray): void {
        return Il2Cpp.Api.Camera._ScreenPointToRay_Injected(this.handle, pos.handle, eye, ret.handle)
    }

}

Il2Cpp.Camera = UnityEngine_Camera_Impl

declare global {
    namespace Il2Cpp {
        class Camera extends UnityEngine_Camera_Impl { }
    }
}

export { UnityEngine_Camera_Impl as UnityEngine_Camera }