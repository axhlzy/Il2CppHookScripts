import "frida-il2cpp-bridge"
import { cache } from "decorator-cache-getter";
import versioning from "versioning";

import "./API/api"
import "./API/gameobject"
import "./API/list"
import "./API/text"
import "./API/transform"

import "./base/base"
import "./base/breaker"
import "./base/enum"
import "./base/globle"
import "./base/info"

import "./bridge/expand/packer"
import "./bridge/fix/apiFix"
import "./bridge/fix/Il2cppClass"
import "./bridge/fix/il2cppMethod"

import "./java/info"

import "./native/std/std_deque"
import "./native/std/std_string"
import "./native/std/std_vector"

import "./utils/alloc"
import "./utils/cache"
import "./utils/caller"
import "./utils/checkP"
import "./utils/common"
import "./utils/logger"
import "./utils/math"
import "./utils/reader"
import "./utils/stack"

import "./globel"