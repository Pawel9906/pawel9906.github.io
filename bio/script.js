const DNAtoDNA = function (x) {
	x = x.toUpperCase();
	let result = "";
	for (let i = x.length - 1; i >= 0; i--) {
		switch (x[i]) {

			case ("A"):
			result += "T";
			break;
			case ("T"):
			result += "A";
			break;
			case ("G"):
			result += "C";
			break;
			case ("C"):
			result += "G";
			break;

		
		}
	}
	return [...result].reverse().join('');
};

const DNAtoRNA = function (x) {
	x = x.toUpperCase();
	let result = "";
	for (let i = x.length - 1; i >= 0; i--) {

			if (x[i] === "A") {
				result += "U"
			} else {
				result += DNAtoDNA(x[i]);
			}

		
	}
	return result;
};

















//aminokwasy itd.

const Code = function () {
	this.UUU = "Phe"
	this.UUC = "Phe"
	this.UUA = "Leu"
	this.UUG = "Leu"

	this.CUU = "Leu"
	this.CUC = "Leu"
	this.CUA = "Leu"
	this.CUG = "Leu"

	this.AUU = "Ile"
	this.AUC = "Ile"
	this.AUA = "Ile"
	this.AUG = "Met"

	this.GUU = "Val"
	this.GUC = "Val"
	this.GUA = "Val"
	this.GUG = "Val"


	this.UCU = "Ser"
	this.UCC = "Ser"
	this.UCA = "Ser"
	this.UCG = "Ser"

	this.CCU = "Pro"
	this.CCC = "Pro"
	this.CCA = "Pro"
	this.CCG = "Pro"

	this.ACU = "Thr"
	this.ACC = "Thr"
	this.ACA = "Thr"
	this.ACG = "Thr"

	this.GCU = "Ala"
	this.GCC = "Ala"
	this.GCA = "Ala"
	this.GCG = "Ala"


	this.UAU = "Tyr"
	this.UAC = "Tyr"
	this.UAA = "Stop"
	this.UAG = "Stop"

	this.CAU = "His"
	this.CAC = "His"
	this.CAA = "Gln"
	this.CAG = "Gln"

	this.AAU = "Asn"
	this.AAC = "Asn"
	this.AAA = "Lys"
	this.AAG = "Lys"

	this.GAU = "Asp"
	this.GAC = "Asp"
	this.GAA = "Glu"
	this.GAG = "Glu"


	this.UGU = "Cys"
	this.UGC = "Cys"
	this.UGA = "Stop"
	this.UGG = "Trp"

	this.CGU = "Arg"
	this.CGC = "Arg"
	this.CGA = "Arg"
	this.CGG = "Arg"

	this.AGU = "Ser"
	this.AGC = "Ser"
	this.AGA = "Arg"
	this.AGG = "Arg"

	this.GGU = "Gly"
	this.GGC = "Gly"
	this.GGA = "Gly"
	this.GGG = "Gly"


};

const codes = {};

codes.standard = new Code();

codes.mitVer = new Code();
codes.mitVer.AUA = "Met";
codes.mitVer.UGA = "Trp";
codes.mitVer.AGA = "Stop";
codes.mitVer.AGG = "Stop";

const threeToOne = {
	Gly: "G",
	Ala: "A",
	Phe: "F",
	Leu: "L",
	Ile: "I",
	Val: "V",
	Met: "M",
	Cys: "C",
	Ser: "S",
	Thr: "T",
	Tyr: "Y",
	Trp: "W",
	His: "H",
	Pro: "P",
	Glu: "E",
	Asp: "D",
	Gln: "Q",
	Asn: "N",
	Lys: "L",
	Arg: "R",
	Xxx: "X",
	Stop: 0,
}

const RNAtoPeptide = function (x, code, isOneLetter) {

	x = x.toUpperCase();
	let rnaArray = [];

	while (x.length > 2) {
		let newTriplet = x.slice(0, 3)
		rnaArray.push(newTriplet)
		x = x.slice(3)
	}

	let peptid = rnaArray.map( (el) => code[el] ? code[el] : "Xxx"      )

	

	peptid = peptid.join('')

	let stop = peptid.indexOf("Stop")
	if (stop !== -1) {
		peptid = peptid.slice(0, stop)
	}



	if (isOneLetter) {
		peptid = peptid.map( el => threeToOne[el]  )
	}

	return peptid;

}






let goodLetters = ['A', 'T', 'G', 'C'];

function onlyGoodLetters(e) {
	if ( goodLetters.indexOf(  e.key.toUpperCase() ) === -1 ) {
		return false
			}
			return true

} 









//Plazmidowe

const cutPlasmid = function(plasmid, restrictionSite, cut) {

	plasmid = plasmid.toUpperCase();
	restrictionSite = restrictionSite.toUpperCase();


	let index = plasmid.indexOf(restrictionSite);
	index += cut;
	let part1 = plasmid.slice(0, index);
	let part2 = plasmid.slice(index);
	return [part1, part2];
}

const cutDNA = function (dna, restrictionSite, cut) {

	dna = dna.toUpperCase();
	restrictionSite = restrictionSite.toUpperCase();


	result = dna.split(restrictionSite)

	if (dna.slice(0, restrictionSite.length - 1) !== restrictionSite) {
		result.shift();
	}

	//if (dna.slice(dna.length - restrictionSite.length ) == restrictionSite) {
		result.pop();
	//}

	

	let add1 = restrictionSite.slice(cut )
	let add2 = restrictionSite.slice(0, cut )
	

	for (let i = 0; i < result.length; i++) {
		result[i] = add1 + result[i] + add2;

	}






	return result;
}