export type CommandType = { commandSet: number, command: number }

export namespace JDB {

    export const HANDSHAKE:string = "JDWP-Handshake"

    export const HEADERLEN:number = 11

    export enum Flag {
        REQUEST_PACKET_TYPE = 0x00,
        REPLY_PACKET_TYPE = 0x80
    }

    // https://docs.oracle.com/javase/1.5.0/docs/guide/jpda/jdwp/jdwp-protocol.html#JDWP_VirtualMachine_Version
    export namespace CommandSet {

        // VirtualMachine Command Set (1)
        export class VirtualMachine {
            private static commandSet: number = 1

            static get Version(): CommandType {
                /**
                 * Reply Data
                        string	description	Text information on the VM version 
                        int	jdwpMajor	Major JDWP Version number 
                        int	jdwpMinor	Minor JDWP Version number 
                        string	vmVersion	Target VM JRE version, as in the java.version property 
                        string	vmName	Target VM name, as in the java.vm.name property 
                    Error Data
                        VM_DEAD	The virtual machine is not running. 
                 */
                return { commandSet: this.commandSet, command: 1 }
            }

            static get ClassesBySignature(): CommandType {
                return { commandSet: this.commandSet, command: 2 }
            }

            static get AllClasses(): CommandType {
                return { commandSet: this.commandSet, command: 3 }
            }

            // AllThreads Command (4)
            /**
             *  Reply Data
                    int	threads	Number of threads that follow. 
                        Repeated threads times:
                        threadID	thread	A running thread 
                Error Data
                    VM_DEAD	The virtual machine is not running. 
             */
            static get AllThreads(): CommandType {
                return { commandSet: this.commandSet, command: 4 }
            }

            // TopLevelThreadGroups Command (5)
            /**
             *  Reply Data
                    int	groups	Number of thread groups that follow. 
                        Repeated groups times:
                        threadGroupID	group	A top level thread group 
                Error Data
                    VM_DEAD	The virtual machine is not running. 
             */
            static get TopLevelThreadGroups(): CommandType {
                return { commandSet: this.commandSet, command: 5 }
            }

            // Dispose Command (6)
            static get Dispose(): CommandType {
                return { commandSet: this.commandSet, command: 6 }
            }

            // IDSizes Command (7)
            static get IDSizes(): CommandType {
                return { commandSet: this.commandSet, command: 7 }
            }

            // Suspend Command (8)
            /**
             *  Out Data
                    (None)
                Reply Data
                    (None)
                Error Data
                    VM_DEAD
             */
            static get Suspend(): CommandType {
                return { commandSet: this.commandSet, command: 8 }
            }

            // Resume Command (9)
            static get Resume(): CommandType {
                return { commandSet: this.commandSet, command: 9 }
            }

            // Exit Command (10)
            static get Exit(): CommandType {
                return { commandSet: this.commandSet, command: 10 }
            }

            // CreateString Command (11)
            /**
             * Creates a new string object in the target VM and returns its id.
                Out Data
                    string	utf	UTF-8 characters to use in the created string.  
                Reply Data
                    stringID	stringObject	Created string (instance of java.lang.String)  
                Error Data
                    VM_DEAD	The virtual machine is not running. 
             */
            static get CreateString(): CommandType {
                return { commandSet: this.commandSet, command: 11 }
            }

            // Capabilities Command (12)
            /**
             * Retrieve this VM's capabilities. The capabilities are returned as booleans, each indicating the presence or absence of a capability. The commands associated with each capability will return the NOT_IMPLEMENTED error if the cabability is not available.
                Out Data
                    (None)
                Reply Data
                    boolean	canWatchFieldModification	Can the VM watch field modification, and therefore can it send the Modification Watchpoint Event? 
                    boolean	canWatchFieldAccess	Can the VM watch field access, and therefore can it send the Access Watchpoint Event? 
                    boolean	canGetBytecodes	Can the VM get the bytecodes of a given method?  
                    boolean	canGetSyntheticAttribute	Can the VM determine whether a field or method is synthetic? (that is, can the VM determine if the method or the field was invented by the compiler?)  
                    boolean	canGetOwnedMonitorInfo	Can the VM get the owned monitors infornation for a thread? 
                    boolean	canGetCurrentContendedMonitor	Can the VM get the current contended monitor of a thread? 
                    boolean	canGetMonitorInfo	Can the VM get the monitor information for a given object?  
                Error Data
                    VM_DEAD	The virtual machine is not running. 
             */
            static get Capabilities(): CommandType {
                return { commandSet: this.commandSet, command: 12 }
            }

            // ClassPaths Command (13)
            /**
             * Retrieve the classpath and bootclasspath of the target VM. If the classpath is not defined, returns an empty list. If the bootclasspath is not defined returns an empty list.
                Out Data
                    (None)
                Reply Data
                    string	baseDir	Base directory used to resolve relative paths in either of the following lists. 
                    int	classpaths	Number of paths in classpath. 
                    Repeated classpaths times:
                    string	path	One component of classpath 
                    int	bootclasspaths	Number of paths in bootclasspath. 
                    Repeated bootclasspaths times:
                    string	path	One component of bootclasspath 
                Error Data
                VM_DEAD	The virtual machine is not running. 
             */
            static get ClassPaths(): CommandType {
                return { commandSet: this.commandSet, command: 13 }
            }
        }

        // ReferenceType Command Set (2)
        export class ReferenceType {
            private static commandSet: number = 2
        }

        // ClassType Command Set (3)
        export class ClassType {
            private static commandSet: number = 3
        }

        // ArrayType Command Set (4)
        export class ArrayType {
            private static commandSet: number = 4
        }

        // InterfaceType Command Set (5)
        export class InterfaceType {
            private static commandSet: number = 5
        }

        // Method Command Set (6)
        export class Method {
            private static commandSet: number = 6
        }

    }

    // // Command signatures
    // VERSION_SIG = (1, 1)
    // CLASSESBYSIGNATURE_SIG = (1, 2)
    // ALLCLASSES_SIG = (1, 3)
    // ALLTHREADS_SIG = (1, 4)
    // IDSIZES_SIG = (1, 7)
    // CREATESTRING_SIG = (1, 11)
    // SUSPENDVM_SIG = (1, 8)
    // RESUMEVM_SIG = (1, 9)
    // SIGNATURE_SIG = (2, 1)
    // FIELDS_SIG = (2, 4)
    // METHODS_SIG = (2, 5)
    // GETVALUES_SIG = (2, 6)
    // CLASSOBJECT_SIG = (2, 11)
    // INVOKESTATICMETHOD_SIG = (3, 3)
    // REFERENCETYPE_SIG = (9, 1)
    // INVOKEMETHOD_SIG = (9, 6)
    // STRINGVALUE_SIG = (10, 1)
    // THREADNAME_SIG = (11, 1)
    // THREADSUSPEND_SIG = (11, 2)
    // THREADRESUME_SIG = (11, 3)
    // THREADSTATUS_SIG = (11, 4)
    // EVENTSET_SIG = (15, 1)
    // EVENTCLEAR_SIG = (15, 2)
    // EVENTCLEARALL_SIG = (15, 3)
}


