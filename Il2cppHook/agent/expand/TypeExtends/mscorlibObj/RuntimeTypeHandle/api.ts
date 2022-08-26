
import { cache } from "decorator-cache-getter";

class System_RuntimeTypeHandle_API {

    /**
     * [*] 0xee7488a0 ---> 0xb1c036ec ---> 0x2ff6ec    |  internal Void .ctor(IntPtr val)
[*] 0xee7488cc ---> 0xb1c036f4 ---> 0x2ff6f4    |  internal Void .ctor(RuntimeType type)
[*] 0xee7488f8 ---> 0xb1c0371c ---> 0x2ff71c    |  private Void .ctor(SerializationInfo info,StreamingContext context)
[*] 0xee748924 ---> 0xb1c03738 ---> 0x2ff738    |  public IntPtr get_Value()
[*] 0xee748950 ---> 0xb1c03740 ---> 0x2ff740    |  public Void GetObjectData(SerializationInfo info,StreamingContext context)
[*] 0xee74897c ---> 0xb1c0375c ---> 0x2ff75c    |  public override Boolean Equals(Object obj)
[*] 0xee7489a8 ---> 0xb1c03764 ---> 0x2ff764    |  public override Int32 GetHashCode()
[*] 0xee7489d4 ---> 0xb25538f4 ---> 0xc4f8f4    |  internal static TypeAttributes GetAttributes(RuntimeType type)
[*] 0xee748a00 ---> 0xb255a818 ---> 0xc56818    |  private static Int32 GetMetadataToken(RuntimeType type)
[*] 0xee748a2c ---> 0xb2556e1c ---> 0xc52e1c    |  internal static Int32 GetToken(RuntimeType type)
[*] 0xee748a58 ---> 0xb255a81c ---> 0xc5681c    |  private static Type GetGenericTypeDefinition_impl(RuntimeType type)
[*] 0xee748a84 ---> 0xb255508c ---> 0xc5108c    |  internal static Type GetGenericTypeDefinition(RuntimeType type)
[*] 0xee748ab0 ---> 0xb2553bbc ---> 0xc4fbbc    |  internal static Boolean HasElementType(RuntimeType type)
[*] 0xee748adc ---> 0xb2555094 ---> 0xc51094    |  internal static Boolean HasInstantiation(RuntimeType type)
[*] 0xee748b08 ---> 0xb2553d40 ---> 0xc4fd40    |  internal static Boolean IsArray(RuntimeType type)
[*] 0xee748b34 ---> 0xb25539b4 ---> 0xc4f9b4    |  internal static Boolean IsByRef(RuntimeType type)
[*] 0xee748b60 ---> 0xb255a820 ---> 0xc56820    |  internal static Boolean IsComObject(RuntimeType type)
[*] 0xee748b8c ---> 0xb2553534 ---> 0xc4f534    |  internal static Boolean IsInstanceOfType(RuntimeType type,Object o)
[*] 0xee748bb8 ---> 0xb25539c4 ---> 0xc4f9c4    |  internal static Boolean IsPointer(RuntimeType type)
[*] 0xee748be4 ---> 0xb25539bc ---> 0xc4f9bc    |  internal static Boolean IsPrimitive(RuntimeType type)
[*] 0xee748c10 ---> 0xb255a824 ---> 0xc56824    |  internal static Boolean HasReferences(RuntimeType type)
[*] 0xee748c3c ---> 0xb25539cc ---> 0xc4f9cc    |  internal static Boolean IsComObject(RuntimeType type,Boolean isGenericCOM)
[*] 0xee748c68 ---> 0xb25538fc ---> 0xc4f8fc    |  internal static Boolean IsContextful(RuntimeType type)
[*] 0xee748c94 ---> 0xb25538d8 ---> 0xc4f8d8    |  internal static Boolean IsEquivalentTo(RuntimeType rtType1,RuntimeType rtType2)
[*] 0xee748cc0 ---> 0xb2553cec ---> 0xc4fcec    |  internal static Boolean IsSzArray(RuntimeType type)
[*] 0xee748cec ---> 0xb255a828 ---> 0xc56828    |  internal static Boolean IsInterface(RuntimeType type)
[*] 0xee748d18 ---> 0xb2553e08 ---> 0xc4fe08    |  internal static Int32 GetArrayRank(RuntimeType type)
[*] 0xee748d44 ---> 0xb25534e4 ---> 0xc4f4e4    |  internal static RuntimeAssembly GetAssembly(RuntimeType type)
[*] 0xee748d70 ---> 0xb2553e10 ---> 0xc4fe10    |  internal static RuntimeType GetElementType(RuntimeType type)
[*] 0xee748d9c ---> 0xb254af18 ---> 0xc46f18    |  internal static RuntimeModule GetModule(RuntimeType type)
[*] 0xee748dc8 ---> 0xb25538e4 ---> 0xc4f8e4    |  internal static Boolean IsGenericVariable(RuntimeType type)
[*] 0xee748df4 ---> 0xb25538e8 ---> 0xc4f8e8    |  internal static RuntimeType GetBaseType(RuntimeType type)
[*] 0xee748e20 ---> 0xb255380c ---> 0xc4f80c    |  internal static Boolean CanCastTo(RuntimeType type,RuntimeType target)
[*] 0xee748e4c ---> 0xb255a854 ---> 0xc56854    |  private static Boolean type_is_assignable_from(Type a,Type b)
[*] 0xee748e78 ---> 0xb2554ef8 ---> 0xc50ef8    |  internal static Boolean IsGenericTypeDefinition(RuntimeType type)
[*] 0xee748ea4 ---> 0xb2559aa4 ---> 0xc55aa4    |  internal static IntPtr GetGenericParameterInfo(RuntimeType type)
     */

    @cache
    static get _ctor_1() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", ".ctor", 1, "pointer", ["pointer"]);
    }

    @cache
    static get _ctor_2() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", ".ctor", 2, "pointer", ["pointer"]);
    }

    @cache
    static get _get_Value() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "get_Value", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetObjectData", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "Equals", 1, "bool", ["pointer"]);
    }

    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetHashCode", 0, "int", ["pointer"]);
    }

    @cache
    static get _GetAttributes() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetAttributes", 0, "int", ["pointer"]);
    }

    @cache
    static get _GetMetaDataToken() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetMetaDataToken", 0, "int", ["pointer"]);
    }

    @cache
    static get _GetGenericTypeDefinition() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetGenericTypeDefinition", 0, "pointer", []);
    }

    @cache
    static get _HasElementType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "HasElementType", 0, "bool", ["pointer"]);
    }

    @cache
    static get _HasInstantiation() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "HasInstantiation", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsArray() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsArray", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsByRef() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsByRef", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsPointer() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsPointer", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsPrimitive() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsPrimitive", 0, "bool", ["pointer"]);
    }

    @cache
    static get _HasReferences() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "HasReferences", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsComObject() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsComObject", 1, "bool", ["pointer", "bool"]);
    }

    @cache
    static get _IsContextful() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsContextful", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsGenericType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsGenericType", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsGenericTypeDefinition() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsGenericTypeDefinition", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsGenericParameter() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsGenericParameter", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsGenericTypeParameter() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsGenericTypeParameter", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsGenericTypeDefinition_2() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsGenericTypeDefinition", 1, "bool", ["pointer", "bool"]);
    }

    @cache
    static get _IsInterface() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsInterface", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNested() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNested", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedPublic() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedPublic", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedPrivate() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedPrivate", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedFamily() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedFamily", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedAssembly() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedAssembly", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedFamANDAssem() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedFamANDAssem", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsNestedFamORAssem() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsNestedFamORAssem", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsVisible() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsVisible", 0, "bool", ["pointer"]);
    }

    @cache
    static get _IsValueType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "IsValueType", 0, "bool", ["pointer"]);
    }

    @cache
    static get _GetElementType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeTypeHandle", "GetElementType", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2cpp.Api {
        class RuntimeTypeHandle extends System_RuntimeTypeHandle_API { }
    }
}

Il2cpp.Api.RuntimeTypeHandle = System_RuntimeTypeHandle_API;

export { }