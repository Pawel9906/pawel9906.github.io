	const vue = new Vue({

		el: "#app",
		data: {
			user: "",
			code: "standard",
			type: "DNA",
			wasStarted: false,
			resultDNA: "",
			resultRNA: "",
			resultPeptide: "",
			titleDNA: "",
			titleRNA: "",
			titlePeptide: "",
			phase: 1,

			plasmid: "",
			addition: "",
			restrictionSite: "",
			cut: "",
			wasStarted2: false,
			newPlasmids: "",
			partsOfDNA: "",
		},
		methods: {

			onlyDigits: function (event) {
				if (event.key === "." || event.key === "," || event.key === "e" || event.key === "E" || event.key === "+" || event.key === "-") {
					event.preventDefault()
				}


			},

			onlyGoodLetters: function (event) {
					 if (!onlyGoodLetters(event)) {
					 	event.preventDefault();
					 }
				},


			styleOn: function (event) {
				event.target.style = "border-color: deepskyblue"

			},

			styleOff: function (event) {
				event.target.style = ""

			},
			start: function () {


				//spr
				if (Number(vue.restrictionSite.length) < Number(vue.cut)) {
					alert("Cięcie musi zajść w obrębie sekwencji rozpoznawanej przez enzym");
					return;
				}

				
				
				vue.wasStarted2 = true;

				let partsOfPlasmid = cutPlasmid(vue.plasmid, vue.restrictionSite, parseInt(vue.cut));
				
					let partsOfAddition = cutDNA(vue.addition, vue.restrictionSite, vue.cut)
					let result = "";

					vue.partsOfDNA = partsOfAddition.join("\n\n");

					for (let part of partsOfAddition) {
						result = result + partsOfPlasmid[0] + part + partsOfPlasmid[1] + "\n\n";
					}

					vue.newPlasmids = result;





				},
			}


		})