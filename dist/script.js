// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen
// import logo from "./image/logo.png";
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://lh3.googleusercontent.com/RibVo0jgzOQhZlplY0qRULs0Kzs6LBBfrBjb0TN7qLQX5duGpmUqHEP-OzSv0tWhmcy_AjRZtkTN3X5bIddndkqRywcIR5B--RilZfusI66mLbKJuWxFjTcvK4Tssxw1MH6VkGR5Ik09ReGYXQCjK5YHXJBSq5V0Gt0yr5YTZwjOsOPLaAO7hwj1PYcDIHBP67dxIHVju1mbNcB_on2ZaHP5KzHJHBiPuVXxYmFmApARpIeg4Vs7P_l1rzGzmt-4ta0X2KfmYqEXpExNYabSDR05v6VLFfHySVkXybjHa9GxhsaIdCFcZnRlR-CEd2jpC3VLRUOik2LPq4vUxcnpG0tuXdWQfdwdSPiYe1rB6YgxvGSWRIwjIGrnoO_JgGeeYk_C5oAOsK-GagJluBzd0KdFKLtvniD4PwzqsH-miYIr6Wf8-lwiJVReeTDlum-XwCgjWg9_BdaUW8Gmpl8Mm91xOYZ5AkobSFY6ExX2E3IlFdR4gAU2XgnBCLJkf4nJU8bTxBM-Io2neMbTMFdAPeZqCDa3A7pS-CN71XjioZBpdCdp-UJd7xNoTrSDbgz8Ior0EzmG5vQNWdMYVnZzV-4gA9o9lJkRy1QaYs0tl3PRgqjD6Hgx4IYCJc2eAEwxTRwnC1rhVwXI-UWtJjKw23uqnjAsGNbrqL9FEDQoPL6y-Tm6mwXSWKK1D2FNXUKUwIZbrrFuRa4US4794cXqUBryg_qVCEgQSiF13RGayggN3t6qzEVMoDQ4Gv8vRzQt-vSle0JnsgIQ1Qx3QktTNnJHd6dvCQM0rJSeV9WavKsSBJkKAaoz8qKKrnjufPcjVgYfO4-PisHlzJWccPdW14qG1nPPImiCkZR8gZu_TLynuHERVXquuPZWTUnLGEZASkzCP4uZmv0xQa0Ag7oiaEAn85BVC0fjcz-1TrxgYbqHoY61=w637-h481-no?authuser=0"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "https://i.pinimg.com/564x/50/a1/54/50a1549d63224f13140de357549dd899.jpg",
			id: 1,
		},
		{
			name: "css3",
			img: "https://i.pinimg.com/750x/ab/be/e7/abbee775b92c0d24dac8f389598ef9e0.jpg",
			id: 2
		},
		{
			name: "html5",
			img: "https://lh3.googleusercontent.com/HGRtrgKBlGqqNNxhvkq6c0E9zDQRA_jgbuJEJkRhODkHzspjFYIT_vdd8Mfmrpfm4kedEWTEkCoAolk0ya2Gd5BP0ftlJpaKaxmzepJxcG6R-dFxCYjf1-yfUkMuq6UHhkmP76LWRVxT-2K5wHOImQZSbt96u1IcqpPUu5BLqfKo5FRj-tTv-Bv1MHW3DJnupqTMKW-2vIUrTTlwJ2GAqMDTOhEJms-FHTt5Xo9ZCs0K_HquCnjGVKgZWl75Kbxyur1Sz47HJMdM7LNmmwch7CL2TX6smhBHl6uHf6mOMSh0gJKoLwgldOcccGd_Zt64VPYlpQ-hL0M7ri8sxCU3L5TAJEUnCFrcri4lnZ_VWDHo2beKt_-k_uAVb4kpFC1m97P6FPjY_peBvE5z4_kCdRUvVZQYISwNVPQatjKN7HHytPJqZQPwq5fF9zdwjHPrVtHWP-rvSu4OKZYe8qOOjl4kXPOZfcfy8Si-Be6-8IOXPhNQDWOeXf0E34zdb3vXvqY91rFdtm4qhEbfUy7Ib9uZ9aVV-dKDGlpWqyNaGqz-FbDz_jfZITHTwRNXMJdrB-zuYTwv9SMAoLd_DwKSPKVbXqxSdi11liV52GsYHiZTLS7iHHrsQWEblkZbJ6tT_fo3qgiL-JOI-MdWi_o5eLYTHiRhwDhvUdpIRpkfKEx1Fv8Er9FQadGLcM7w9urDVBppZ5JxYaFtVGLVtzHpBQ0X7tYHKi7LtfhcQwuFMHZZlmEGc2FMnxxtG_9utHiG2tldjAhQubljO8cXV-SfLeG19jAeGuHUB6uoy9rsYIHMoJtKkA7XDE39dyYAE7iTBMsknhU7GE3YehuqCUxWe0JxWqp-9giuuVQCYO27O-30Ax00UNMDJBbpZ5eOOlwBIoibRRfJu3dLMyxa9HkVai1pBvzT6v3fuyD5szF1jA1d3KLm=w699-h932-no?authuser=0",
			id: 3
		},
		{
			name: "jquery",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
			id: 5
		},
		{
			name: "node",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
			id: 7
		},
		{
			name: "python",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
			id: 8
		},
		{
			name: "rails",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
			id: 9
		},
		{
			name: "sass",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
			id: 10
		},
		{
			name: "sublime",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
			id: 11
		},
		{
			name: "wordpress",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();