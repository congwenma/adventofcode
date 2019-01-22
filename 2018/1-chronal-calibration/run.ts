// console.log("hello typescript");
import * as fs from "fs";
import * as es from "event-stream";
import Frequency from "./src/frequency";

var stream = fs
  .createReadStream(__dirname + "/data/input.txt", "utf-8")
  .pipe(es.split());
// var stream = fs.createReadStream(__dirname + "/data/test_input.txt", "utf-8").pipe(es.split());

var freqs = new Frequency();

stream
  .pipe(
    es.mapSync(function(line: string) {
      // pause the readstream
      stream.pause();

      // skips eof line
      if (line !== "") {
        freqs.list.push(+line);
      }

      // resume the readstream, possibly from a callback
      stream.resume();
    })
  )
  .on("end", () => {
    console.log(`Sum is: ${freqs.sum()}`);
    console.log(`First Reoccured is: ${freqs.firstSumReoccurance()}`);
  });
