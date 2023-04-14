import { System_Collections_DictionaryEntry } from "./ValueType/DictionaryEntry/class"
import { mscorlib_System_Object_impl as System_Object } from "./class"

type System_Boolean = boolean
type System_Void = void
type System_Int32 = number
type System_Array = NativePointer

interface System_Collections_ICollection {
    CopyTo: (instance: NativePointer, array: System_Array, index: System_Int32) => System_Void
    get_Count: (instance: NativePointer) => System_Int32
    get_SyncRoot: (instance: NativePointer) => System_Object
}

interface System_Collections_IComparer {
    Compare: (instance: NativePointer, x: System_Object, y: System_Object) => System_Int32
}

interface System_Collections_IDictionary {
    get_Item: (instance: NativePointer, key: System_Object) => System_Object
    set_Item: (instance: NativePointer, key: System_Object, value: System_Object) => System_Void
    get_Keys: (instance: NativePointer) => System_Collections_ICollection
    Contains: (instance: NativePointer, key: System_Object) => System_Boolean
    Add: (instance: NativePointer, key: System_Object, value: System_Object) => System_Void
    GetEnumerator: (instance: NativePointer) => System_Collections_IDictionaryEnumerator
    Remove: (instance: NativePointer, key: System_Object) => System_Void
}

interface System_Collections_IDictionaryEnumerator {
    get_Key: (instance: NativePointer) => System_Object
    get_Value: (instance: NativePointer) => System_Object
    get_Entry: (instance: NativePointer) => System_Collections_DictionaryEntry
}

interface System_Collections_IEnumerable {
    GetEnumerator: (instance: NativePointer) => System_Collections_IEnumerator
}

interface System_Collections_IEnumerator {
    MoveNext(): (instance: NativePointer) => System_Boolean
    get_Current(): (instance: NativePointer) => System_Object
    Reset(): (instance: NativePointer) => System_Void
}

interface System_Collections_IEqualityComparer {
    Equals: (instance: NativePointer, x: System_Object, y: System_Object) => System_Boolean
    GetHashCode: (instance: NativePointer, obj: System_Object) => System_Int32
}

interface System_Collections_IHashCodeProvider {
    GetHashCode: (instance: NativePointer, obj: System_Object) => System_Int32
}

interface System_Collections_IList {
    get_Item: (instance: NativePointer, index: System_Int32) => System_Object
    set_Item: (instance: NativePointer, index: System_Int32, value: System_Object) => System_Void
    Add: (instance: NativePointer, value: System_Object) => System_Int32
    Contains: (instance: NativePointer, value: System_Object) => System_Boolean
    Clear: (instance: NativePointer) => System_Void
    get_IsReadOnly: (instance: NativePointer) => System_Boolean
    get_IsFixedSize: (instance: NativePointer) => System_Boolean
    IndexOf: (instance: NativePointer, value: System_Object) => System_Int32
    Insert: (instance: NativePointer, index: System_Int32, value: System_Object) => System_Void
    Remove: (instance: NativePointer, value: System_Object) => System_Void
    RemoveAt: (instance: NativePointer, index: System_Int32) => System_Void
}

interface System_Collections_IStructuralComparable {
    CompareTo: (instance: NativePointer, other: System_Object, comparer: System_Collections_IComparer) => System_Int32
}

interface System_Collections_IStructuralEquatable {
    Equals: (instance: NativePointer, other: System_Object, comparer: System_Collections_IEqualityComparer) => System_Boolean
    GetHashCode: (instance: NativePointer, comparer: System_Collections_IEqualityComparer) => System_Int32
}

export {
    System_Collections_ICollection as ICollection,
    System_Collections_IComparer as IComparer,
    System_Collections_IDictionary as IDictionary,
    System_Collections_IDictionaryEnumerator as IDictionaryEnumerator,
    System_Collections_IEnumerable as IEnumerable,
    System_Collections_IEnumerator as IEnumerator,
    System_Collections_IEqualityComparer as IEqualityComparer,
    System_Collections_IHashCodeProvider as IHashCodeProvider,
    System_Collections_IList as IList,
    System_Collections_IStructuralComparable as IStructuralComparable,
    System_Collections_IStructuralEquatable as IStructuralEquatable
}