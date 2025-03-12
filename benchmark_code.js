// Complex JavaScript code for benchmarking syntax highlighting
class DataStructure {
	constructor(size = 1000) {
		this.array = Array(size)
			.fill(0)
			.map((_, i) => i);
		this.map = new Map();
		this.set = new Set();
		this.buffer = new ArrayBuffer(size * 4);
		this.view = new DataView(this.buffer);
	}

	async initializeData() {
		return new Promise((resolve) => {
			setTimeout(() => {
				for (let i = 0; i < this.array.length; i++) {
					this.map.set(`key-${i}`, {
						value: i * 2,
						metadata: {
							timestamp: Date.now(),
							processed: Boolean(i % 2),
							tags: [`tag-${i % 10}`]
						}
					});
					this.set.add(i ** 2);
					this.view.setInt32(i * 4, i * 3);
				}
				resolve(true);
			}, 10);
		});
	}

	computeComplexOperation(x, y) {
		const result = x.map((val) => {
			const hash = this.#generateHash(val);
			return y.reduce(
				(acc, curr) => {
					return {
						sum: acc.sum + curr * Math.sin(val),
						product: acc.product * (curr + Math.cos(val)),
						meta: [
							...acc.meta,
							{ input: curr, output: curr ^ hash }
						]
					};
				},
				{ sum: 0, product: 1, meta: [] }
			);
		});

		return result.filter((item) => item.sum > item.product / 2);
	}

	#generateHash(input) {
		let hash = 0;
		const str = String(input);
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
	}

	static async batchProcess(dataArray, processingFn) {
		const results = await Promise.all(
			dataArray.map(async (data, index) => {
				try {
					const result = await processingFn(data);
					return { success: true, index, result };
				} catch (error) {
					console.error(`Error processing item ${index}:`, error);
					return { success: false, index, error: error.message };
				}
			})
		);

		return {
			successes: results.filter((r) => r.success),
			failures: results.filter((r) => !r.success),
			summary: `Processed ${results.length} items with ${
				results.filter((r) => r.success).length
			} successes`
		};
	}
}

// Decorator function example
function memoize(target, key, descriptor) {
	const originalMethod = descriptor.value;
	const cache = new Map();

	descriptor.value = function (...args) {
		const cacheKey = JSON.stringify(args);
		if (cache.has(cacheKey)) {
			console.log(`Cache hit for ${key}(${args})`);
			return cache.get(cacheKey);
		}

		const result = originalMethod.apply(this, args);
		cache.set(cacheKey, result);
		return result;
	};

	return descriptor;
}

// Complex prototype manipulation and nested promises
Object.defineProperty(Array.prototype, "asyncMap", {
	value: async function (callback) {
		const results = [];
		for (let i = 0; i < this.length; i++) {
			results.push(await callback(this[i], i, this));
		}
		return results;
	},
	enumerable: false
});

// Usage example with async/await, destructuring, and complex expressions
(async () => {
	const ds = new DataStructure(500);
	await ds.initializeData();

	const inputs = Array.from({ length: 20 }, (_, i) => i * 5 + Math.random());
	const modifiers = new Float32Array([0.5, 1.5, 2.5, 3.5, 4.5]);

	const { successes, failures, summary } = await DataStructure.batchProcess(
		inputs,
		async (input) => {
			const { sum, product, meta } = ds.computeComplexOperation(
				[input],
				[...modifiers]
			)[0];
			return { input, output: sum / product, meta };
		}
	);

	console.log(summary, successes.length, failures.length);
})().catch((error) => console.error("Fatal error:", error));
