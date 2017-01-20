console.__proto__.dump = function(groupName, ...args) {
	const types = args.map( (a) => typeof a ).join(", ")

	if (typeof window !== "undefined") {
		console.groupCollapsed(`${groupName}: [${types}]`)
		args.map( a => console.dir(a) )
		console.groupEnd()
	}
}

export default console
