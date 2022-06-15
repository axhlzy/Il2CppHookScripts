
// std::string of MSVC 120 (2013)

/*
union
{
	value_type _Buf[_BUF_SIZE];
	pointer _Ptr;
};
size_type _Mysize;	// current length of string
size_type _Myres;	// current storage reserved for string
*/

const BUF_SIZE = 16;

export default class StdString {
	constructor(addr) {
		this.addr = addr;
	}

	get bufAddr() {
		if(this.reservedSize.compare(16) > 0) {
			return this.addr.readPointer();
		} else {
			return this.addr;
		}
	}

	get size() {
		return this.addr.add(BUF_SIZE).readPointer();
	}

	get reservedSize() {
		return this.addr.add(BUF_SIZE).add(Process.pointerSize).readPointer();
	}

	toString() {
		const size = this.size;
		if(size.isNull()) {
			return "<EMPTY std::string>";
		}
		return Memory.readCString(this.bufAddr, size.toInt32());
	}
}
