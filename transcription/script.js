
	const vue = new Vue({

		el: "#app",
		data: {
			user: "",
			code: "standard",
			resultDNA: "",
			resultRNA: "",
			resultPeptide: "",
			aminoacidsString: "0",
			
		},
		methods: {

			start: function () {
						vue.resultDNA = DNAtoDNA(vue.user);
						vue.resultRNA = DNAtoRNA(vue.user);
						vue.resultPeptide = RNAtoPeptide(vue.resultRNA, codes[vue.code], Number(vue.aminoacidsString));
					
				




				},

				onlyGoodLetters: function (event) {
					 if (!onlyGoodLetters(event)) {
					 	event.preventDefault();
					 };
				}
			},
		


	})
