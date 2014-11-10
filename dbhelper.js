var fs = require('fs');

// given a specific month/year,
//   collection: get events, create events, delete events
// given a month/year/event_id
//   model: create/delete/update a single event
//
//   Backbone will hold a full month of events at a time

function DbHelper(filename) {
    this.dbfile = filename;
};
DbHelper.prototype = { 
    // only write out these explicit json keys, can develop a more complex
    // replacer function to also sanitize the values
    jsonFilter: ['month', 'year', 'events', 'id', 'title', 'time', 'day', 'address'],
    getMonthEvents: function(options, callback) { // options = {year: 2014, month: 12, app_init: false}
        //callback = callback || function(){ console.log("Filler function to make node happy")};
        //console.log("callback: \n" + callback);
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
                // only GET to /api/events passes the app_init flag, all other routes include year and month
                if (options.app_init) { // return the first month of events in the file
                    // console.log("monthEvents: \n");
                    // console.dir(monthEvents);
                    // console.log("\n")
                    // console.log("events: \n");
                    //console.dir(monthEvents['events']);
                    console.log("\n")
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

//var destFile = 'events_dev.json';
// fs.writeFile(destFile, JSON.stringify(data, jsonFilter, 4), function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("JSON saved to " + destFile);
//     }
// });

// fs.appendFile(destFile, ", \n" + JSON.stringify(data, jsonFilter, 4), function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("JSON appended to " + destFile);
//     }
// });


// var data = 
// {
//     "month": "1",
//     "year": "2015",
//     "events": [
//         {
//             "month": "1",
//             "year": "2015",
//             "id": "3",
//             "title": "Node.js Training - Day 1",
//             "time": "9:00a - 4:00p",
//             "day": "11",
//             "address": "7601 Penn Ave S, Richfield, MN"
//         }
//     ]
// }
