var FOLLOW_BUTTON_NAME = 'Seguir';

casper.test.begin('Follow people', 1, 
    function suite(test) {
        casper.start('https://www.instagram.com', function() {
            var fs = require('fs');
            var utils = require('utils');
            var data = fs.read('/tmp/peopletofollow');
            var allLinks = data.split(',');

            for (var i in allLinks) {
                var link = allLinks[i]
                if (link.indexOf('undefined') == -1) {
                    casper.thenOpen(link, function() {
                        var x = require('casper').selectXPath;
                        this.clickLabel(FOLLOW_BUTTON_NAME, 'button');
                    });
                }
            }
        });

        casper.on('remote.message', function(message) {
            this.echo(message);
        });

        casper.run(function() {
            this.exit();
        });
    }
);