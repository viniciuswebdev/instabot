var TAG = 'followback';

casper.test.begin('Find people to follow', 1, 
    function suite(test) {

        var allLinks = '';

        casper.start('https://www.instagram.com/explore/tags/' + TAG, function() {
            links = this.evaluate(function(){
                var links = document.getElementsByTagName('a');
                links = Array.prototype.map.call(links,function(link){
                    return link.getAttribute('href');
                });
                return links;
            });

            for (var i in links) {
                var link =links[i];
                if (link.indexOf('/p/') != -1 && i > 9) {
                    casper.thenOpen('https://www.instagram.com' + link, function() {
                        userlinks = this.evaluate(function(){
                            var links = document.getElementsByTagName('a');
                            links = Array.prototype.map.call(links,function(link){
                                return link.getAttribute('href');
                            });
                            return links;
                        });

                        var userLink = userlinks[0];
                        allLinks = allLinks + ',' + 'https://www.instagram.com' + userLink;
                        
                    });
                }
            }
        });

        casper.then(function() {
            var fs = require('fs');
            fs.write('/tmp/peopletofollow', allLinks, 'w');
        });

        casper.run(function() {
            this.exit();
        });
    }
);