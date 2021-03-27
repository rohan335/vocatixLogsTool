This server logs http requests sent to it. They are sorted into one of the files found in /logs/.
The server creates a new batch of files for every level every day and logs all logs to that batch of files for the day (TLDR; rotates the files it logs to daily)
Another file for the day is also created if the file exceeds 50mb
The logs in /logs/ are labelled with their level and respective date
In order to log something, the log you want must be sent in the body of an http request as a json object.
Logs in /logs/ will be generated upon run
Run with npm run dev
Server listens on port 3000

The body must have parameters:
  -log, which is just a string. This is the actual log you want to be saved
  -type, which is a string and the level you want the log to be saved to. THIS MUST BE LOWERCASE AND ONE OF THE FOLLOWING:
    -error
    -warn
    -info
    -http
    -verbose
    -debug
    -silly
  -tag, which specifies the source of the request (String)
  -meta, here you can dump any other information you want to. This is a nested json.

Here is an example of an HTTP requests body:
{
    "log": "some sort of log lmao",
    "type": "verbose",
    "tag": "Crud Server",
    "meta" : {
        "some key": "some junk",
        "some other key": 4
    }
}

Here is an example of the log that would save to /logs/verbose-2021-03-27
{
  level: 'verbose',
  message: {
    log: 'some sort of log lmao',
    tag: 'Crud Server',
    meta: { 'some key': 'some junk', 'some other key': 4 }
  },
  timestamp: '2021-03-27T23:13:19.737Z'
}