var TAG = 'followback';
var UNFOLLOW_BUTTON_NAME = 'Seguindo';

casper.test.begin('Find people to unfollow', 1, 
    function suite(test) {
        casper.start('https://www.instagram.com/explore/tags/' + TAG, function() {
            var fs = require('fs');
            var utils = require('utils');
            var data = fs.read('/tmp/peopletofollow');
            var allLinks = data.split(',');

            for (var i in allLinks) {
                var link = allLinks[i]
                if (link.indexOf('undefined') == -1) {
                    casper.thenOpen(link, function() {
                        var x = require('casper').selectXPath;
                        this.clickLabel(UNFOLLOW_BUTTON_NAME, 'button');
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