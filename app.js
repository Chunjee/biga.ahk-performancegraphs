const chartsArr = ["array", "string", "function", "collection", "lang", "math", "number", "object", "util"]


function fn_scaleData(inputCollection) {
	for (let i = 0; i < inputCollection.length; i++) {
		if (inputCollection[i].speed <= 0) {
			inputCollection[i].speed = 0.00001
		}
	}
	return inputCollection
}



try {
	chartsArr.forEach(element => {
		// filter and prepare data
		let thisGroup = _.filter(originalData, {"group": element})
		thisGroup = fn_scaleData(thisGroup)
		let blueRange = chroma.scale(['#b2ebf2', '#0e3461']).colors(thisGroup.length);

		// grab html elements
		var ctx = document.getElementById(element + "Chart").getContext('2d');
		var ctx2 = document.getElementById(element + "Slow").getContext('2d');
		console.log(element)
		// format
		const data = {
			labels: [],
			datasets: [{
				data: [],
				backgroundColor: [],
			}],
		};
		var slowData = _.cloneDeep(data)


		// insert data into format
		thisGroup.forEach(function(item, index) {
		data.labels.push(item.label);
		data.datasets[0].data.push(item.speed);
		data.datasets[0].backgroundColor.push(blueRange[index]);
		});

		let FocusPercent = _.ceil((data.labels.length / 100) * 22) * -1
		if (FocusPercent > -3) {
			FocusPercent = -3
		}
		slowData.labels = _.reverse(data.labels.slice(FocusPercent));
		slowData.datasets[0].data = _.reverse(data.datasets[0].data.slice(FocusPercent))
		slowData.datasets[0].backgroundColor = _.reverse(data.datasets[0].backgroundColor.slice(FocusPercent));

		var myChart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				legend: { display: false },
				scales: { yAxes: [{ ticks: { min: 0 } }] }
			}
		});

		var myChart2 = new Chart(ctx2, {
			type: 'horizontalBar',
			data: slowData,
			options: {
				responsive: true,
				legend: { display: false },
				scales: { xAxes: [{ ticks: { min: 0 } }] }
			}
		});
	});
} catch (error) {
	console.log(error)
	// do nothing
}
