
// std::vector of MSVC 120 (2013)

/*
pointer _Myfirst;	// pointer to beginning of array
pointer _Mylast;	// pointer to current end of sequence
pointer _Myend;		// pointer to end of array
*/

export default class StdVector {
	constructor(addr, options) {
		this.addr = addr;
		this.elementSize = options.elementSize ? options.elementSize : Process.pointerSize;
		this.introspectElement = options.introspectElement;
	}

	get myfirst() {
		return this.addr.readPointer();
	}

	get mylast() {
		return this.addr.add(Process.pointerSize).readPointer();
	}

	get myend() {
		return this.addr.add(2 * Process.pointerSize).readPointer();
	}

	countBetween(begin, end) {
		if(begin.isNull()) {
			return 0;
		}
		const delta = end.sub(begin);
		return delta.toInt32() / this.elementSize;
	}

	get size() {
		return this.countBetween(this.myfirst, this.mylast);
	}

	get capacity() {
		return this.countBetween(this.myfirst, this.myend);
	}

	toString() {
		let r = "std::vector(" + this.myfirst + ", " + this.mylast + ", " + this.myend + ")";
		r += "{ size: " + this.size + ", capacity: " + this.capacity;
		if(this.introspectElement) {
			r += ", content: [";
			const first = this.myfirst
			if(!first.isNull()) {
				const last = this.mylast;
				for(let p = first; p.compare(last) < 0; p = p.add(this.elementSize)) {
					if(p.compare(first) > 0) {
						r += ", ";
					}
					r += this.introspectElement(p);
				}
			}
			r += "]";
		}
		r += " }";
		return r;
	}
}
