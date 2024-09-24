var DoanhThu = '../data/DoanhThu.json';
var GetTiLeTheoDonGia = '../data/GetTiLeTheoDonGia.json';
var HomeDongHoNuoc = '../data/HomeDongHoNuoc.json';
var KhachHangTheoDoiTuong = '../data/KhachHangTheoDoiTuong.json';
var KhachHangTheoTram = '../data/KhachHangTheoTram.json';
var TinhHinhSuDungHoaDon = '../data/TinhHinhSuDungHoaDon.json';
var TinhHinhThuCuaNhanVien = '../data/TinhHinhThuCuaNhanVien.json';
var LuongNuocTieuThu = '../data/LuongNuocTieuThu.json';

async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
      return 'error';
    }
  }

jQuery(document).ready(function () {

    jQuery("select[name='Nam']").select2({ "width": "100%" });
    jQuery("select[name='Loai']").select2({ "width": "100%" });
    jQuery("select[name='Display']").select2({ "width": "100%" });
    jQuery("select[name='KhachHangFilter']").select2({ "width": "100%" });
    
    Chart.plugins.register({
        afterDatasetsDraw: function (chart, easing) {
            // To only draw at the end of animation, check for easing === 1
            var ctx = chart.ctx;
            if(chart.config.options.showNumber)
            {
                chart.data.datasets.forEach(function (dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgb(0, 0, 0)';

                            var fontSize = 14;
                            var fontStyle = 'normal';
                            var fontFamily = 'Helvetica Neue';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            var dataString = "0";
                            if(dataset.data[index] != undefined)
                                dataString = dataset.data[index].toString();

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            var padding = 5;
                            var position = element.tooltipPosition();
                            if(dataString != "0")
                                ctx.fillText(jQuery.number(dataString, 0, '.', ','), position.x, position.y - (fontSize / 2) - padding);
                        });
                    }
                });
            }
        }
    });
    // VNPT.Common.Post(LuongNuocTieuThu, JSON.stringify(jQuery("#form-chart-1").serializeObject()), function (result) {
        getData (LuongNuocTieuThu).then(function (result) {
        var ctx_1 = document.getElementById('chart-1').getContext('2d');
        window.chart_1 = new Chart(ctx_1, {
            type: 'line',
            data: result,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false
                },
                legend: {
                    position: 'top',
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                },
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: true,
                        align: 'bottom',
                        formatter: function (value, context) {
                            if (value > 40000)
                                return jQuery.number(value, 0, '.', ',');
                            else
                                return null;
                        }
                    }
                }
            },
        });
    });

    jQuery(document).on("click", "#btn-view-chart-1", function () {
        VNPT.Common.Post(LuongNuocTieuThu, JSON.stringify(jQuery("#form-chart-1").serializeObject()), function (result) {
            window.chart_1.data = result;
            window.chart_1.update();
            jQuery("#modal-chart-1").modal("hide");
        });
    });
    // doanh thu
    // VNPT.Common.Post(DoanhThu, JSON.stringify(jQuery("#form-chart-2").serializeObject()), function (result) {
        getData(DoanhThu).then(function (result) {
        var ctx_2 = document.getElementById('chart-2').getContext('2d');
        window.chart_2 = new Chart(ctx_2, {
            type: 'bar',
            data: result,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Doanh thu (VND)'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                scales: {
                    xAxes: [],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (value, index, values) {
                                return jQuery.number(value, 0, '.', ',');
                            }
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                                color: 'black',
                                display: true,
                                formatter: function (value, context) {
                                    if (value > 4000000000)
                                        return jQuery.number(value, 0, '.', ',');
                                    else
                                        return null;
                                        
                                }
            }
                    }
            }
        });
    });
    
    jQuery(document).on("click", "#btn-view-chart-2", function () {
        VNPT.Common.Post(DoanhThu, JSON.stringify(jQuery("#form-chart-2").serializeObject()), function (result) {
            window.chart_2.data = result;
            window.chart_2.update();
            jQuery("#modal-chart-2").modal("hide");
        });
    });
    // doi tuong
    // VNPT.Common.Post(KhachHangTheoDoiTuong, JSON.stringify(jQuery("#form-chart-3").serializeObject()), function (result) {
        getData (KhachHangTheoDoiTuong).then(function (result) {
        var ctx_chart_3= document.getElementById('chart-3').getContext('2d');
        window.chart_3 = new Chart(ctx_chart_3, {
            type: 'pie',
            data: result,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    title: "Khách hàng theo đối tượng sử dụng"
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltipEvents: [],
                showTooltips: true,
                tooltipCaretSize: 0,
                onAnimationComplete: function () {
                    this.showTooltip(this.segments, true);
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                            return jQuery.number(currentValue, 0, '.', ',') + ' (' + percentage + '%) / ' + jQuery.number(total, 0, '.', ',');
                        },
                        title: function (tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        color: 'white',
                        display: true,
                        formatter: function (value, context) {
                            var meta = context.dataset._meta;
                            let dataArr = context.chart.data.datasets[0].data;
                            var total = dataArr.reduce((a, b) => a + b, 0);
                            var percentage = parseFloat((value / total * 100).toFixed(1));
                            if (value > 2000)
                                return jQuery.number(value, 0, '.', ',') + ' (' + percentage + '%)';
                            else
                                return null;
                        }
                    }
                }
            }
        });
    });
    
    jQuery(document).on("click", "#btn-view-chart-3", function () {
        VNPT.Common.Post(KhachHangTheoDoiTuong, JSON.stringify(jQuery("#form-chart-3").serializeObject()), function (result) {
            window.chart_3.data = result;
            window.chart_3.update();
            jQuery("#modal-chart-3").modal("hide");
        });
    });
    // phan bo khach hang theo tram
    // VNPT.Common.Post(KhachHangTheoTram, JSON.stringify(jQuery("#form-chart-4").serializeObject()), function (result) {
        getData (KhachHangTheoTram).then(function (result) {
        var ctx_chart_4 = document.getElementById('chart-4').getContext('2d');
        window.chart_4 = new Chart(ctx_chart_4, {
            type: 'bar',
            data: result,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                },
                plugins: {
                    datalabels: {
                        color: 'white',
                        display: true,
                        formatter: function (value, context) {
                            if (value > 200)
                                return jQuery.number(value, 0, '.', ',');
                            else
                                return null;
                        }
                    }
                }
            },
        });
    });
    // tinh hinh su dung hoa don theo thang
    // VNPT.Common.Post(TinhHinhSuDungHoaDon, JSON.stringify(jQuery("#form-chart-6").serializeObject()), function (result) {
        getData (TinhHinhSuDungHoaDon).then(function (result) {
        var ctx_chart_6 = document.getElementById('chart-6').getContext('2d');
        window.chart_6 = new Chart(ctx_chart_6, {
            type: 'bar',
            data: result,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                },
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: true,
                        align: 'bottom',
                        formatter: function (value, context) {
                            if (value > 200)
                                return jQuery.number(value, 0, '.', ',');
                            else
                                return null;
                        }
                    }
                }
            },
        });
    });
    // dong ho nuoc
    // VNPT.Common.Post(HomeDongHoNuoc, JSON.stringify(jQuery("#form-chart-5").serializeObject()), function (result) {
        getData (HomeDongHoNuoc).then(function (result) {
        var ctx_5 = document.getElementById('chart-5').getContext('2d');
        window.chart_5 = new Chart(ctx_5, {
            type: 'line',
            data: result,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false
                },
                legend: {
                    position: 'top',
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                },
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: true,
                        align: 'bottom',
                        formatter: function (value, context) {
                            if (value > 0)
                                return jQuery.number(value, 0, '.', ',');
                            else
                                return null;
                        }
                    }
                }
            },
        });
    });
    jQuery(document).on("click", "#btn-view-chart-5", function () {
        VNPT.Common.Post(HomeDongHoNuoc, JSON.stringify(jQuery("#form-chart-5").serializeObject()), function (result) {
            window.chart_5.data = result;
            window.chart_5.update();
            jQuery("#modal-chart-5").modal("hide");
        });
    });
    // ti le thu cua nhan vien
    // VNPT.Common.Post(GetTiLeTheoDonGia, JSON.stringify(jQuery("#form-chart-7").serializeObject()), function (result) {
        getData (GetTiLeTheoDonGia).then(function (result) {
        var ctx_chart_7= document.getElementById('chart-7').getContext('2d');
        window.chart_7 = new Chart(ctx_chart_7, {
            type: 'doughnut',
            data: result,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    title: "Tỉ lệ thu của nhân viên"
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.yLabel, 0, '.', ',');
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltipEvents: [],
                showTooltips: true,
                tooltipCaretSize: 0,
                onAnimationComplete: function () {
                    this.showTooltip(this.segments, true);
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                            return jQuery.number(currentValue, 0, '.', ',') + ' (' + percentage + '%) / ' + jQuery.number(total, 0, '.', ',');
                        },
                        title: function (tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        color: 'white',
                        display: true,
                        formatter: function (value, context) {
                            var meta = context.dataset._meta;
                            let dataArr = context.chart.data.datasets[0].data;
                            var total = dataArr.reduce((a, b) => a + b, 0);
                            var percentage = parseFloat((value / total * 100).toFixed(1));
                            if (percentage >= 7)
                                return  percentage + '%';
                            else
                                return null;
                        }
                    }
                }
            }
        });
    });
    
    jQuery(document).on("click", "#btn-view-chart-7", function () {
        VNPT.Common.Post(GetTiLeTheoDonGia, JSON.stringify(jQuery("#form-chart-7").serializeObject()), function (result) {
            window.chart_7.data = result;
            window.chart_7.update();
            jQuery("#modal-chart-7").modal("hide");
        });
    });
    // tinh hinh thu theo thang
    // VNPT.Common.Post(TinhHinhThuCuaNhanVien, JSON.stringify(jQuery("#form-chart-8").serializeObject()), function (result) {
        getData (TinhHinhThuCuaNhanVien).then(function (result) {
        var ctx_chart_8 = document.getElementById('chart-8').getContext('2d');
        window.chart_8 = new Chart(ctx_chart_8, {
            type: 'horizontalBar',
            data: result,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + jQuery.number(tooltipItem.xLabel, 0, '.', ',');
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            fontStyle: 'bold',
                            fontSize: 10
                        }
                    }],
                },
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: true,
                        formatter: function (value, context) {
                            if (value > 20)
                                return jQuery.number(value, 0, '.', ',');
                            else
                                return null;
                        }
                    }
                }
            },
        });
    });
    jQuery(document).on("click", "#btn-view-chart-8", function () {
        VNPT.Common.Post(TinhHinhThuCuaNhanVien, JSON.stringify(jQuery("#form-chart-8").serializeObject()), function (result) {
            window.chart_8.data = result;
            window.chart_8.update();
            jQuery("#modal-chart-8").modal("hide");
        });
    });
});