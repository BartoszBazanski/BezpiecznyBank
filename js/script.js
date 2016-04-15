$(function(){
	var minValue = parseInt($(".value h6 span").text(), 10);
	var maxValue = 100000;
	var minPeriod = parseInt($(".period h6 span").text(), 10);
	var maxPeriod = 30;
	var max = 0;
	var min = 0;
	var progressTarget = null;
	var unit = "";
	$('.slider').draggable({axis: "x", containment: "parent",
	drag: function(event){
		if($(event.target).parent().parent()[0].className == "value"){
			min = minValue;
			max = maxValue;
			progressTarget = $(".value h6 span");
			unit = " zł";
		} else if($(event.target).parent().parent()[0].className == "period"){
			min = minPeriod;
			max = maxPeriod;
			progressTarget = $(".period h6 span");
			unit = " lata";
			if(parseInt(progressTarget.text(),10) >= 5){unit = " lat"};
		}
		var progressBarWidth = $(event.target).parent().width() - 60;
		var progress = event.target.style.left.split("px")[0];
		var ratio = progress/progressBarWidth;
		progressTarget.text(Math.floor(min + (max - min) * ratio) + unit);
		calculateInstallment();
	}})
});
function calculateInstallment(){
	var loan = parseInt($(".value h6 span").text(), 10);
	var period = parseInt($(".period h6 span").text(), 10);
	var installment = Math.floor((1.2 * loan) / (period * 12));
	$(".installment span").text(installment + " zł");
}