
/**
 * 用来确定点击view的位置，配合上面这个函数使用 setClick() 以及 HookOnPointerClick() 使用
 * 启动游戏的时候进行模拟点击，配合HookOnPointerClick()即可确定gameobj，通过修改transform即可实现动态的隐藏一些按钮
 * 这里是针对一些bundle资源的u3d游戏，我们不能方便的去静态修改gameobj可见性,或者是一些其他原因我们不能修改，即可用这个动态修改的思路
 */
const HookMotionEvent = () => {
    Java.perform(() => {
        Java.use("android.view.View").onTouchEvent.implementation = function (event: any) {
            let ret = this.onTouchEvent(event)
            LOG("\n" + getLine(25) + " onTouchEvent " + getLine(25), LogColor.YELLOW)
            LOG(ret + "\t" + event, LogColor.C36)
            return ret
        }

        Java.use("android.app.Activity").dispatchTouchEvent.implementation = function (event: any) {
            let ret = this.dispatchTouchEvent(event)
            LOG("\n" + getLine(25) + " dispatchTouchEvent " + getLine(25), LogColor.YELLOW)
            LOG(ret + "\t" + event, LogColor.C36)
            return ret
        }
    })
}

/**
 * 配合HookOnPointerClick()，SetLocalScale()使用以达到动态隐藏gameobj
 * @param {Int} x 模拟点击的x位置
 * @param {Int} y 模拟点击的y位置
 */
const setClick = (x: number, y: number) => {
    if (x == undefined || y == undefined) return
    Java.perform(() => {
        let Instrumentation = Java.use("android.app.Instrumentation")
        let SystemClock = Java.use("android.os.SystemClock")
        let MotionEvent = Java.use("android.view.MotionEvent")
        let inst = Instrumentation.$new()
        let downTime = SystemClock.uptimeMillis()
        let downEvent = MotionEvent.obtain(downTime, downTime, 0, x, y, 0)
        let upTime = SystemClock.uptimeMillis()
        let upEvent = MotionEvent.obtain(upTime, upTime, 1, x, y, 0)
        inst.sendPointerSync(downEvent)
        inst.sendPointerSync(upEvent)
    })
}

export { HookMotionEvent, setClick }

declare global {
    var HookMotionEvent: () => void
    var setClick: (x: number, y: number) => void
}

globalThis.HookMotionEvent = HookMotionEvent
globalThis.setClick = setClick