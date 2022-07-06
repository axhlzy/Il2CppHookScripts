var Toast = (msg: string) => {
    Java.scheduleOnMainThread(() => {
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        Java.use("android.widget.Toast").makeText(context, Java.use("java.lang.String").$new(msg), 1).show()
    })
}

export { Toast }

declare global {
    var Toast: (msg: string) => void;
}

globalThis.Toast = Toast;