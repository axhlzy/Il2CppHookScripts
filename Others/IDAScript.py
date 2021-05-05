import idautils
import idc
import idaapi
import struct

def AddBpt_init():
    has_art = False
    module_base = GetFirstModule()
    while module_base != None:
        module_name = GetModuleName(module_base)
        if module_name.find('linker') >= 0:
            has_art = True
            break

        module_base = GetNextModule(module_base)

    if has_art == False:
        print '[*]unable to find libart.so module base'
        return

    module_size = GetModuleSize(module_base)

    print '[*]found linker base => 0x%08X, Size = 0x%08X' % (module_base, module_size)

    # DT_INIT_ARRAY / DT_INIT / Calling c-tor %s @ %p for '%s'
    init_func_ea = module_base + 0x18996
    init_array_ea = module_base + 0x18BB6

    AddBpt(init_func_ea)
    AddBpt(init_array_ea)

    print "\t[-]set breakpoint INIT => 0x%08X INIT_ARRAY => 0x%08X" % (init_func_ea, init_array_ea)


def AddBpt_jni_onload():
    has_art = False
    module_base = GetFirstModule()
    while module_base != None:
        module_name = GetModuleName(module_base)
        if module_name.find('libart.so') >= 0:
            has_art = True
            break

        module_base = GetNextModule(module_base)

    if has_art == False:
        print '[*]unable to find libart.so module base'
        return

    module_size = GetModuleSize(module_base)
    print '[*]found libart.so base => 0x%08X, Size = 0x%08X' % (module_base, module_size)

    # Calling JNI_OnLoad in
    blx_ea = module_base + 0x234D78
    AddBpt(blx_ea)
    print ("\t[-]set breakpoint JNI_OnLoad addr => 0x%X") % blx_ea
	
	
def Dump_Memory(start_addr, end_addr):  
  
    print '[*]begin to dump memory'
    handle_f = open('d:/dump.so', 'wb')
    for byte_addr in range(start_addr, end_addr):
        byte_value = idaapi.get_byte(byte_addr)
        handle_f.write(struct.pack('B',byte_value))
    handle_f.close()
    print '[-]dump memory save to d:/dump.so'
    print '[*]script finish'

def Search_Memory(start_addr, end_addr, value):
    print '[*]script Start'
    for ea_offset in range(start_addr, end_addr):
        cur_dword = idaapi.get_dword(ea_offset)
        #cur_dword = idaapi.get_long(ea_offset)
        #cur_dword = idaapi.get_word(ea_offset)
    
        if cur_dword != None and cur_dword == value:
            print('found target = %x' % ea_offset)
    print '[*]script End'


def main():
    # 添加init,init_arrary断点
    AddBpt_init()
    # 添加jni_onload断点
    AddBpt_jni_onload()
    # 内存dump
    #Dump_Memory(0xED6EABB6,0xED6EEBB6)
    # 内存搜索
    #Search_Memory(0xED6EABB6,0xED6EEBB6,0xfe75f06c)

main()
