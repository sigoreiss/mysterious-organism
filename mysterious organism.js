// Returns a random DNA base
const returnRandBase = () => {
	const dnaBases = ["A", "T", "C", "G"];
	return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
	const newStrand = [];
	for (let i = 0; i < 15; i++) {
		newStrand.push(returnRandBase());
	}
	return newStrand;
};

//Factory function for creating P. Aequor organisms
const pAequorFactory = (specimenNum, dna) => {
	return {
		specimenNum,
		dna,

		//Returns a mutated organism with one random DNA base changed
		mutate() {
			let mutant;
			let i = Math.floor(Math.random() * 15 + 1);
			do {
				mutant = returnRandBase();
			} while (this.dna[i] === mutant);
			this.dna[i] = mutant;
		},

		//Compares two P. Aequor objects and returns the percentage of their common DNA
		compareDNA(aequor) {
			let count = 0;

			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === aequor.dna[i]) {
					count++;
				} else {
					continue;
				}
			}

			let percent = ((count / this.dna.length) * 100).toFixed(2);
			return `Specimen #${this.specimenNum} and specimen #${aequor.specimenNum} have ${percent}% DNA in common`;
		},

		//Returns 'true' if the objects DNA has at least 60% of C and G bases
		willLikelySurvive() {
			let count = 0;

			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === "C" || this.dna[i] === "G") {
					count++;
				} else {
					continue;
				}
			}

			let percent = ((count / this.dna.length) * 100).toFixed(2);

			if (percent >= 60) {
				return true;
			} else {
				return false;
			}
		},

		//Returns a complement DNA strand
		complementStrand() {
			const complement = [];

			for (let i = 0; i < this.dna.length; i++) {
				switch (this.dna[i]) {
					case "A":
						complement.push("T");
						break;
					case "T":
						complement.push("A");
						break;
					case "C":
						complement.push("G");
						break;
					case "G":
						complement.push("C");
						break;
				}
			}

			return complement;
		},
	};
};

const studyArray = [];
let aequor;
let k = 0;

do {
	aequor = pAequorFactory(k + 1, mockUpStrand());

	if (aequor.willLikelySurvive() === true) {
		studyArray.push(aequor);
		k++;
	} else {
		continue;
	}
} while (k < 30);
