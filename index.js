$(document).ready(function() {
	var mines = [];
	var areaSize;
	var mineNum;

	function calculusIfMineExist(colNo, rowNo) {
		if (colNo < 0 || colNo >= areaSize || rowNo < 0 || rowNo >= areaSize) {
			return 0;
		} else {
			return mines[colNo][rowNo];
		}
	}

	function sweep(colNo, rowNo) {
		var id = '#' + colNo + '_' + rowNo;
		if (colNo < 0 || colNo >= areaSize || rowNo < 0 || rowNo >= areaSize) {
			return;
		} else if ($(id).hasClass('triggerBox')) {
			return;
		}
		var sum = 0;
		sum += calculusIfMineExist(colNo - 1, rowNo - 1);
		sum += calculusIfMineExist(colNo, rowNo - 1);
		sum += calculusIfMineExist(colNo + 1, rowNo - 1);
		sum += calculusIfMineExist(colNo - 1, rowNo);
		sum += calculusIfMineExist(colNo + 1, rowNo);
		sum += calculusIfMineExist(colNo - 1, rowNo + 1);
		sum += calculusIfMineExist(colNo, rowNo + 1);
		sum += calculusIfMineExist(colNo + 1, rowNo + 1);


		$(id).removeClass('box');
		$(id).addClass('triggerBox');
		if (sum != 0) {
			$(id).html(sum);
		} else {
			sweep(colNo - 1, rowNo - 1);
			sweep(colNo, rowNo - 1);
			sweep(colNo + 1, rowNo - 1);
			sweep(colNo - 1, rowNo);
			sweep(colNo - 1, rowNo);
			sweep(colNo - 1, rowNo + 1);
			sweep(colNo, rowNo + 1);
			sweep(colNo + 1, rowNo + 1);
		}

	}

	//產生地圖
	$('#btn_create').click(function() {
		areaSize = $('#areaSize').val();
		mineNum = $('#mineNum').val();
		if (!areaSize) {
			areaSize = 10;
		}
		if (!mineNum) {
			mineNum = 10;
		}

		var scene = document.getElementById('scene');
		for (var i = 0; i < areaSize; i++) {
			var col = document.createElement('div');
			scene.appendChild(col);
			mines[i] = [];
			for (var j = 0; j < areaSize; j++) {
				var row = document.createElement('div');
				row.setAttribute('id', i + '_' + j);
				row.setAttribute('class', 'box');
				row.addEventListener('click', function(event) {
					var id = event.target.getAttribute('id');
					var colNo = parseInt(id.split('_')[0]);
					var rowNo = parseInt(id.split('_')[1]);
					if (mines[colNo][rowNo]) {
						alert('BOOM!!');
					} else {
						sweep(colNo, rowNo);
					}
				});
				col.appendChild(row);
				mines[i][j] = 0;

			}
		}

		var mineForPut = mineNum;
		while (mineForPut) {
			var i = Math.floor(Math.random() * areaSize);
			var j = Math.floor(Math.random() * areaSize);
			if (mines[i][j] != 1) {
				mineForPut--;
				mines[i][j] = 1;
			}
		}
		console.log(mines);

		$('#btn_create').attr("disabled", true);
	});



});