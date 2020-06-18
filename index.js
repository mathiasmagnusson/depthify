module.exports = function depthify(obj, delim = ".") {
	if (typeof obj !== "object") return obj;
	if (obj instanceof Array) return obj.map(o => depthify(o, delim));
	if (obj === null) return obj;

	let ret = {};
	for (const [key, val] of Object.entries(obj)) {
		if (!key.includes(delim || "."))
			ret[key] = depthify(val, delim);
		else {
			let split = key.split(delim || ".");
			let curr = ret;
			while (split.length > 1) {
				const part = split.shift();
				if (!curr.hasOwnProperty(part)) {
					curr[part] = {};
				}
				curr = curr[part];
			}
			curr[split.shift()] = depthify(val, delim);
		}
	}
	return ret;
}
