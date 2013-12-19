var PSOL = window.PSOL || {};

PSOL.CandidatePoll = {
    themeGraphs: null,

    load: function() {
        var that = this;
        this.themeGraphs = $('#theme-graphs');
        $.getJSON(this.candidatesPerTheme, function(data){
            var counter = 0;
            for (var theme in data) {
                counter++;
                if (data.hasOwnProperty(theme)) {
                    that.buildTheme(theme, data, counter);
                }
            }
        });
    },

    buildTheme: function(theme, data, counter) {
        var themeData = data[theme],
            themeContainer = $('<div class="theme col-xs-12 col-sm-6 col-md-6 col-lg-6" id="theme-' + counter + '"></div>'),
            dataToShow = [],
            candidate, points;
        for (candidate in themeData) {
            if (themeData.hasOwnProperty(candidate)) {
                points = themeData[candidate];
                dataToShow.push([candidate, points]);
            }
        }
        themeContainer.appendTo(this.themeGraphs);
        // Build the chart
        themeContainer.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: theme
            },
            tooltip: {
                pointFormat: '{point.y} ({point.percentage:.1f}%)</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: theme,
                data: dataToShow
            }]
        });
    },

    setupChartBasics: function() {
        // Radialize the colors
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });
    },

    candidatesPerTheme: 'fixtures/candidaturas-psol-respostas.json'
};