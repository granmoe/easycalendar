var fs = require('fs');

function DbHelper(filename) {
    this.dbfile = filename;
};
DbHelper.prototype = { 
    // only write out these explicit json keys, can develop a more complex
    // replacer function to also sanitize the values
    jsonFilter: ['month', 'year', 'events', 'id', 'title', 'time', 'day', 'address'],
    getMonthEvents: function(options, callback) { // options = {year: 2014, month: 12, app_init: false}
        var stream = fs.createReadStream(this.dbfile, {flags: 'r', encoding: 'utf-8'});
        var buffer = '';
        var pos, monthEvents;
        stream.on('data', function(d) {
            buffer += d.toString(); // add data into buffer as it is read in
            while (buffer) {
                pos = buffer.indexOf('\n');
                if (pos == 0) { // newline is first char
                    buffer = buffer.slice(1); // delete newline char
                    continue; // hopefully the file has something more than newline chars
                }
                if (pos < 0) pos = buffer.length; // last line
                monthEvents = process(buffer.slice(0,pos)); // hand off the line
                buffer = buffer.slice(pos+1); // slice the processed data off the buffer
                // only GET to /api/events passes the app_init flag, all other routes include year and month or id
                if (options.app_init) { // return the first month of events in the file
                    callback(monthEvents['events']);
                    return;
                } else {
                // Check month/year of events
                    // code here
                    // cb(monthEvents);
                }
            }
        });
        function process(line) {
            if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR
            if (line.length > 0) { // ignore empty lines
                var obj = JSON.parse(line) || ''; // parse the JSON
                return obj;
            }
        };
    } // getMonthEvents: function
};

module.exports = DbHelper;